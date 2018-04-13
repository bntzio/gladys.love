import React from 'react'

import firebase from './../firebase'

class GameScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = { questionAt: 1, currentAnswer: '' }
  }
  handleLogout () {
    console.log(process.env.NODE_ENV)
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
    const answer = this.state.currentAnswer
    const questionNumber = this.state.questionAt
    switch (questionNumber) {
      case 1:
        if (answer === 'ans1') {
          this.setState({ questionAt: 2 })
          return this.setState({ currentAnswer: '' })
        } else {
          return this.setState({ currentAnswer: '' })
        }
      case 2:
        if (answer === 'ans2') {
          this.setState({ questionAt: 3 })
          return this.setState({ currentAnswer: '' })
        } else {
          return this.setState({ currentAnswer: '' })
        }
      case 3:
        if (answer === 'ans3') {
          this.setState({ questionAt: 4 })
          return this.setState({ currentAnswer: '' })
        } else {
          return this.setState({ currentAnswer: '' })
        }
      case 4:
        if (answer === 'ans4') {
          this.setState({ questionAt: 5 })
          return this.setState({ currentAnswer: '' })
        } else {
          return this.setState({ currentAnswer: '' })
        }
    }
  }
  renderQuestion (questionNumber) {
    switch (questionNumber) {
      case 1:
        return (
          <div className='questions__question'>
            <form onSubmit={(ev) => this.checkAnswer(ev)}>
              <label htmlFor='firstQuestion'>Question #1</label><br />
              <input
                autoFocus
                name='firstQuestion'
                type='text'
                value={this.state.currentAnswer}
                onChange={(ev) => this.updateAnswer(ev.target.value)}
              />
              <button type='submit'>Submit</button>
            </form>
          </div>
        )
      case 2:
        return (
          <div className='questions__question'>
            <form onSubmit={(ev) => this.checkAnswer(ev)}>
              <label htmlFor='secondQuestion'>Question #2</label><br />
              <input
                autoFocus
                name='secondQuestion'
                type='text'
                value={this.state.currentAnswer}
                onChange={(ev) => this.updateAnswer(ev.target.value)}
              />
              <button type='submit'>Submit</button>
            </form>
          </div>
        )
      case 3:
        return (
          <div className='questions__question'>
            <form onSubmit={(ev) => this.checkAnswer(ev)}>
              <label htmlFor='thirdQuestion'>Question #3</label><br />
              <input
                autoFocus
                name='thirdQuestion'
                type='text'
                value={this.state.currentAnswer}
                onChange={(ev) => this.updateAnswer(ev.target.value)}
              />
              <button type='submit'>Submit</button>
            </form>
          </div>
        )
      case 4:
        return (
          <div className='questions__question'>
            <form onSubmit={(ev) => this.checkAnswer(ev)}>
              <label htmlFor='fourthQuestion'>Question #4</label><br />
              <input
                autoFocus
                name='fourthQuestion'
                type='text'
                value={this.state.currentAnswer}
                onChange={(ev) => this.updateAnswer(ev.target.value)}
              />
              <button type='submit'>Submit</button>
            </form>
          </div>
        )
      case 5:
        return (
          <div className='questions__question'>
            <form onSubmit={(ev) => this.checkAnswer(ev)}>
              <label htmlFor='fifthQuestion'>Question #5</label><br />
              <input
                autoFocus
                name='fifthQuestion'
                type='text'
                value={this.state.currentAnswer}
                onChange={(ev) => this.updateAnswer(ev.target.value)}
              />
              <button type='submit'>Submit</button>
            </form>
          </div>
        )
    }
  }
  render () {
    const questionNumber = this.state.questionAt
    return (
      <section className='gameScreen'>
        <div className='logout'>
          <a onClick={this.handleLogout}>Logout</a>
        </div>
        <div className='questions'>
          {this.renderQuestion(questionNumber)}
        </div>
      </section>
    )
  }
}

export default GameScreen
