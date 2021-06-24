import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'

import '../styles/rooms.scss';

export function Room(){
  return (
    <div id="page-room">
      <header>
        <div className="class-name-content">
          <img src={logoImg} alt="Logo" />
          <div>codigo</div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea
            placeholder="O que você deseja perguntar?"
          />
          
          <div className="form-footer">
            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>

    </div>
  )
}