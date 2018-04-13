import React from 'react'
import firebase from './../firebase'

let url = 'http://localhost:3000'
let emailClue = 'en****e**n***z**@gmail.com'
if (process.env.NODE_ENV === 'production') {
  url = 'https://gladys.love'
  emailClue = '**a*ys.a****ez**@hotmail.com'
}

class PreGameScreen extends React.Component {
  handleEmailLink (ev) {
    ev.preventDefault()
    const email = ev.target.email.value
    const actionCodeSettings = {
      url,
      handleCodeInApp: true
    }

    if (email.length > 0 && email === process.env.PLAYER_EMAIL) {
      document.getElementById('emailErrorNotice').style.display = 'none'
      document.getElementById('emailSendLink').value = ''
      firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem('emailForSignIn', email)
          const notice = document.getElementById('emailSentNotice')
          notice.style.display = 'block'
          setTimeout(() => {
            notice.style.display = 'none'
          }, 6000)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      document.getElementById('emailSendLink').value = ''
      document.getElementById('emailSendLink').focus()
      document.getElementById('emailErrorNotice').style.display = 'block'
    }
  }
  render () {
    return (
      <section className='preGameScreen'>
        <div className='instructions'>
          <p>Se enviará un link de acceso a tu email: <span>{emailClue}</span></p>
          <p>Completa tu email y da 'click' en el botón para enviar el link y darte acceso al juego 🔐</p>
          <p>Recuerda, tu progreso quedará guardado en tu cuenta 👾</p>
          <form onSubmit={this.handleEmailLink}>
            <input id='emailSendLink' type='email' name='email' autoFocus required />
            <button type='submit'>Enviar Link</button>
          </form>
          <p id='emailSentNotice'>¡Email enviado! Checa tu correo 📫</p>
          <p id='emailErrorNotice'>¡Uh oh! Ese no es un correo válido</p>
        </div>
      </section>
    )
  }
}

export default PreGameScreen
