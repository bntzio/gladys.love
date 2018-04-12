import React from 'react'

import IntroScreen from './../components/IntroScreen'
import GameScreen from './../components/GameScreen'
import FinalScreen from './../components/FinalScreen'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = { won: false, started: false }
    this.handleStartGame = this.handleStartGame.bind(this)
  }
  handleStartGame () {
    this.setState({ started: true })
  }
  renderScreen (hasWon, hasStarted) {
    if (hasWon === true) {
      return (
        <main className='finalScreen'>
          <FinalScreen />
        </main>
      )
    } else {
      if (hasStarted === true) {
        return (
          <main className='gameScreen'>
            <GameScreen />
          </main>
        )
      }
      return (
        <main className='introScreen'>
          <IntroScreen startGame={this.handleStartGame} />
        </main>
      )
    }
  }
  render () {
    const hasWon = this.state.won
    const hasStarted = this.state.started
    return this.renderScreen(hasWon, hasStarted)
  }
}

export default Main
