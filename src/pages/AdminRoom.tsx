import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/rooms.scss';



type RoomParams = {
  id: string
}



export function AdminRoom(){

  const { user } = useAuth();
  const param = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = param.id;
  const { questions, title } = useRoom(roomId)
 
  async function handleSendQuestion(event : FormEvent){
    event.preventDefault()

    if (newQuestion.trim() === ''){
      return;
    }

    if(!user){
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${param.id}/questions`).push(question)

    setNewQuestion('');

  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo" />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined>Encerrar sala</Button>
          </div>

        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> /*Para fazer o if ternário sem o else, use &&*/ } 
        </div>

        <div className="question-list">
        {questions.map(question => {
          return (
            <Question 
              key={question.id}
              content= {question.content}
              author = {question.author}
            />
          )
        })}
        </div>
      </main>

    </div>
  )
}