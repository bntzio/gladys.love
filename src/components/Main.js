import React from 'react'

import GameScreen from './../components/GameScreen'
import FinalScreen from './../components/FinalScreen'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = { won: false }
  }
  renderFinalScreen (hasWon) {
    if (hasWon === true) {
      return <FinalScreen />
    }
    return <GameScreen />
  }
  render () {
    const hasWon = this.state.won
    return this.renderFinalScreen(hasWon)
  }
}

export default Main
