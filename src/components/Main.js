import React from 'react'

import GameScreen from './../components/GameScreen'
import FinalScreen from './../components/FinalScreen'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = { won: false }
  }
  renderScreen (hasWon) {
    if (hasWon === true) {
      return (
        <main className='finalScreen'>
          <FinalScreen />
        </main>
      )
    }
    return (
      <main className='gameScreen'>
        <GameScreen />
      </main>
    )
  }
  render () {
    const hasWon = this.state.won
    return this.renderScreen(hasWon)
  }
}

export default Main
