import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'

import '../styles/auth.scss'
import { useContext } from 'react'
import { AuthContext } from '../App'

export function NewRoom(){
  const { user } = useContext(AuthContext)

  return (
  <div id="page-auth">
    <aside>
      <img src={illustrationImg} alt="Ilustração"/>
      <strong>Crie salas de Q&amp;A ao vivo</strong>
      <p>Tire as dúvidas de sua audiência em tempo real</p>
    </aside>
    <main>
    <div className="main-content">
      <img src={logoImg} alt="Letmeask" />
      <h1>{user?.name}</h1>
      <h2>Criar uma nova sala</h2>
      <div className="separator">ou entre em uma sala</div>
      <form>
          <input 
            type="text"
            placeholder="Nome da sala"
          />
          <Button type="submit">
            Entrar na sala
          </Button>
      </form>
      <p>
        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
      </p>
    </div>
    </main>
  </div>
  )
}