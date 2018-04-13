import React from 'react'

import firebase, { firebaseRef } from './../firebase'

class GameScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lives: null,
      question: '',
      questionAt: null,
      currentAnswer: '',
      loading: false
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
  checkAnswer (ev) {
    ev.preventDefault()
    // is loading
    this.setState({ isLoading: true })
    // the current user answer
    const userAnswer = this.state.currentAnswer
    // get game questions to get and compare the answers
    const questionsRef = firebaseRef.child('questions')
    questionsRef.once('value').then((snapshot) => {
      const questions = snapshot.val() || {}
      const parsedQuestions = []
      Object.keys(questions).forEach((question) => {
        parsedQuestions.push({
          ...questions[question]
        })
      })
      const { questionAt } = this.state
      const correctAnswer = parsedQuestions[questionAt - 1].answer
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
        this.setState({ currentAnswer: '' })
        document.getElementById('incorrectAnswerNotice').style.display = 'block'
        this.destroyLife()
        this.updateLivesCounter()
        setTimeout(() => {
          document.getElementById('incorrectAnswerNotice').style.display = 'none'
        }, 3000)
      }
    })
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
  getLives () {
    // get user progress
    const user = firebase.auth().currentUser
    const userRef = firebaseRef.child(`users/${user.uid}`)
    userRef.once('value').then((snapshot) => {
      const progress = snapshot.val() || {}
      const parsedProgress = []
      Object.keys(progress).forEach((item) => {
        parsedProgress.push({
          ...progress[item]
        })
      })
      this.setState({ lives: parsedProgress[0].lives })
    })
  }
  updateLivesCounter () {
    this.getLives()
  }
  updateQuestion () {
    // get user progress
    const user = firebase.auth().currentUser
    const userRef = firebaseRef.child(`users/${user.uid}`)
    userRef.once('value').then((snapshot) => {
      const progress = snapshot.val() || {}
      const parsedProgress = []
      Object.keys(progress).forEach((item) => {
        parsedProgress.push({
          ...progress[item]
        })
      })
      this.setState({ questionAt: parsedProgress[0].questionAt })
    })
    // end of game?
    const { questionAt } = this.state
    if (questionAt === 35) { // 35 for now, then 100
      this.setState({
        question: 'Has llegado a la última pregunta, por favor espera mientras añadimos las demás 😄'
      })
      document.getElementById('answerInput').style.display = 'none'
      document.getElementById('answerButton').style.display = 'none'
    } else {
      // get game questions
      const questionsRef = firebaseRef.child('questions')
      questionsRef.once('value').then((snapshot) => {
        const questions = snapshot.val() || {}
        const parsedQuestions = []
        Object.keys(questions).forEach((question) => {
          parsedQuestions.push({
            ...questions[question]
          })
        })
        this.setState({ question: parsedQuestions[questionAt - 1].question })
      })
    }
  }
  render () {
    const { questionAt } = this.state
    const { question } = this.state
    const { lives } = this.state

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
              <input
                id='answerInput'
                autoFocus
                type='text'
                value={this.state.currentAnswer}
                onChange={(ev) => this.updateAnswer(ev.target.value)}
              />
              <button type='submit' id='answerButton'>Submit</button>
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
