import React from 'react'
import Spinner from 'react-spinkit'
import _ from 'lodash'

import firebase, { firebaseRef } from './../firebase'

class GameScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lives: null,
      question: '',
      questionAt: null,
      currentAnswer: '',
      isLoading: true
    }
  }
  componentWillMount () {
    this.updateQuestion()
    this.getLives()
  }
  handleLogout () {
    firebase.auth().signOut().then(() => {
      if (process.env.NODE_ENV === 'production') {
        window.location.href = 'https://gladys.love'
      } else {
        window.location.href = 'http://localhost:3000'
      }
    }).catch((e) => console.log(e))
  }
  updateAnswer (answer) {
    this.setState({ currentAnswer: answer })
  }
  async getQuestions () {
    const questionsRef = firebaseRef.child('questions')
    const parsedQuestions = []
    await questionsRef.once('value').then((snapshot) => {
      const questions = snapshot.val() || {}
      Object.keys(questions).forEach((question) => {
        parsedQuestions.push({
          ...questions[question]
        })
      })
    })
    return parsedQuestions
  }
  async checkAnswer (ev) {
    ev.preventDefault()
    // is loading
    this.setState({ isLoading: true })
    // the current user answer
    const userAnswer = _.deburr(this.state.currentAnswer)
    // get game questions to get and compare the answers
    const questions = await this.getQuestions()
    const { questionAt } = this.state
    const correctAnswer = _.deburr(questions[questionAt - 1].answer)
    if (userAnswer.toLowerCase().includes(correctAnswer.toLowerCase())) {
      this.setState({ isLoading: false })
      document.getElementById('correctAnswerNotice').style.display = 'block'
      setTimeout(() => {
        this.setState({ currentAnswer: '' })
        document.getElementById('correctAnswerNotice').style.display = 'none'
        this.updateUserProgress()
        this.updateQuestion()
      }, 2000)
    } else {
      this.setState({ currentAnswer: '', isLoading: false })
      document.getElementById('incorrectAnswerNotice').style.display = 'block'
      this.destroyLife()
      this.updateLivesCounter()
      setTimeout(() => {
        document.getElementById('incorrectAnswerNotice').style.display = 'none'
      }, 3000)
    }
  }
  async getUserProgress () {
    const user = firebase.auth().currentUser
    const userRef = firebaseRef.child(`users/${user.uid}`)
    const parsedProgress = []
    await userRef.once('value').then((snapshot) => {
      const progress = snapshot.val() || {}
      Object.keys(progress).forEach((item) => {
        parsedProgress.push({
          ...progress[item]
        })
      })
    })
    return parsedProgress
  }
  updateUserProgress () {
    const user = firebase.auth().currentUser
    const userRef = firebaseRef.child(`users/${user.uid}/progress`)
    userRef.update({
      questionAt: this.state.questionAt + 1
    })
  }
  destroyLife () {
    const user = firebase.auth().currentUser
    const userRef = firebaseRef.child(`users/${user.uid}/progress`)
    userRef.update({
      lives: this.state.lives - 1
    })
  }
  async getLives () {
    // get user progress
    const progress = await this.getUserProgress()
    // get lives
    this.setState({ lives: progress[0].lives })
  }
  updateLivesCounter () {
    // update lives counter
    this.getLives()
  }
  async updateQuestion () {
    // has loaded
    this.setState({ isLoading: false })
    // get progress
    const progress = await this.getUserProgress()
    // update question
    this.setState({ questionAt: progress[0].questionAt })
    const { questionAt } = this.state
    // end of game?
    if (questionAt === 35) { // 35 for now, then 100
      this.setState({
        question: 'Has llegado a la última pregunta, por favor espera mientras añadimos las demás 😄'
      })
      document.getElementById('answerInput').style.display = 'none'
      document.getElementById('answerButton').style.display = 'none'
    } else {
      // get game questions
      const questions = await this.getQuestions()
      // set game question
      this.setState({ question: questions[questionAt - 1].question })
    }
  }
  render () {
    const { questionAt, question, lives, isLoading } = this.state

    return (
      <section className='gameScreen'>
        <div className='menu'>
          <div className='menu__level'>
            <p>⭐ Nivel: {questionAt}/100</p>
          </div>
          <div className='menu__lives'>
            <p>❤️ {lives} vidas</p>
          </div>
          <div className='menu__logout'>
            <a onClick={this.handleLogout}>🚪 Salir</a>
          </div>
        </div>
        <div className='questions'>
          <div className='questions__question'>
            <form onSubmit={(ev) => this.checkAnswer(ev)}>
              <label>{question}</label><br />
              <div className='questions__question__input'>
                <input
                  id='answerInput'
                  autoFocus
                  type='text'
                  value={this.state.currentAnswer}
                  onChange={(ev) => this.updateAnswer(ev.target.value)}
                />
                <button type='submit' id='answerButton'>Submit</button>
                <div id='loadingSpinner'>
                  {isLoading ? <Spinner name='folding-cube' color='white' /> : null}
                </div>
              </div>
            </form>
            <p id='correctAnswerNotice'>¡Tu respuesta es correcta!</p>
            <p id='incorrectAnswerNotice'>¡Tu respuesta es incorrecta!</p>
          </div>
        </div>
      </section>
    )
  }
}

export default GameScreen
