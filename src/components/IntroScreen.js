import React from 'react'
import { Link } from 'react-router-dom'

class IntroScreen extends React.Component {
  render () {
    return (
      <section className='introScreen'>
        <div className='instructions'>
          <h1>Hola Gladys 👋</h1>
          <br />
          <p>
            Bienvenida a gladys.love 🕹️<br />
            Un juego en donde pondrás a prueba tus habilidades de novia.<br />
            Se trata de una serie de preguntas tanto muy fáciles cómo increíblemente difíciles acerca del creador de gladys.love el asombroso Enrique Benitez.<br />
            Para ganar tendrás que responder correctamente a todas las preguntas.<br />
            De lo contrario, no obtendrás el código de acceso al 'secreto' guardado 🔑<br />
            Tienes 50 vidas ❤️ con cada pregunta errónea se te destruirá una vida 💔<br />
            Si fracasas en tu misión, nunca sabrás cuál es el 'secreto' que te espera 📦<br />
            ¡Oh! Y algo más, entre menos vidas lléves, menor será el premio que te depára. ¿Estás preparada?<br />
            Toma todo el tiempo que necesites ⏳ podrías tardar meses en llegar a la llave.<br />
            Toca la puerta para entrar <Link to='/auth'>🚪</Link>
          </p>
        </div>
      </section>
    )
  }
}

export default IntroScreen
