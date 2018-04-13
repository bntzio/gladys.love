import React from 'react'
import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom'

import IntroScreen from './../components/IntroScreen'
import AuthScreen from './../components/AuthScreen'
import GameScreen from './../components/GameScreen'
import FinalScreen from './../components/FinalScreen'

import firebase, { firebaseRef } from './../firebase'

class Main extends React.Component {
  handleAuth () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.email === process.env.PLAYER_EMAIL) {
          this.props.history.push('/game')
        } else {
          this.props.history.push('/')
        }
      }
    })
  }
  componentWillMount () {
    this.handleAuth()
  }
  componentDidMount () {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        email = window.prompt('¿Cuál es tu email?')
      }
      firebase.auth().signInWithEmailLink(email, window.location.href)
        .then((result) => {
          const { isNewUser } = result.additionalUserInfo
          if (isNewUser) {
            const user = firebase.auth().currentUser
            firebaseRef.child(`users/${user.uid}/progress`).set({
              hasWon: false,
              lives: 50,
              questionAt: 1
            })
          }
          window.localStorage.removeItem('emailForSignIn')
        })
        .catch((error) => console.log(error))
    }
  }
  render () {
    return (
      <Switch>
        <Route exact path='/' component={IntroScreen} />
        <Route path='/auth' component={AuthScreen} />
        <Route path='/game' component={GameScreen} onEnter={this.handleAuth} />
        <Route path='/gameover' component={FinalScreen} />
      </Switch>
    )
  }
}

export default withRouter(Main)
