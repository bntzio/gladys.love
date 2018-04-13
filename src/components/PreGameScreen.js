import React from 'react'
import firebase from './../firebase'

let url = 'http://localhost:3000'
if (process.env.NODE_ENV === 'production') {
  url = 'https://gladys.love'
}

class PreGameScreen extends React.Component {
  componentDidMount () {
    const actionCodeSettings = {
      url,
      handleCodeInApp: true
    }
    const email = process.env.PLAYER_EMAIL
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  render () {
    return (
      <section className='preGameScreen'>
        <div className='instructions'>
          <p>Se ha enviado un link de acceso a tu email: <span>**a*ys.a****ez**@hotmail.com</span></p>
          <p>Haz 'click' en el link para acceder al juego 🔐</p>
          <p>Recuerda, tu progreso quedará guardado en tu cuenta 👾</p>
        </div>
      </section>
    )
  }
}

export default PreGameScreen
