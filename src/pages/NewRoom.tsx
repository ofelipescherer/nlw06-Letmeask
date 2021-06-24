import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Link, useHistory } from 'react-router-dom'
import { FormEvent } from 'react'

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { database } from '../services/firebase'

export function NewRoom(){
  const { user } = useAuth();
  const history = useHistory();

  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event : FormEvent) {
    event.preventDefault() //Faz com que o input não recarregue a página

    if(newRoom.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id //Usuario começa com undefined, o ? serve para n dar erro. Mesmo sabendo que o usuario nunca sera undefined nesse momento
    })


    history.push(`/rooms/${firebaseRoom.key}`)
  }

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
      <form onSubmit={handleCreateRoom}>
          <input 
            type="text"
            placeholder="Nome da sala"
            onChange={event => setNewRoom(event.target.value)}
          />
          <Button type="submit">
            Criar sala
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