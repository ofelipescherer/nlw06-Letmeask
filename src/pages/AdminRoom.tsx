import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import '../styles/rooms.scss';



type RoomParams = {
  id: string
}



export function AdminRoom(){

  const history = useHistory();
  const param = useParams<RoomParams>();
  const roomId = param.id;
  const { questions, title } = useRoom(roomId)
 
  async function handleEndRoom(){
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/')

  }
  async function handleDeleteQuestion(questionId : string){
    if(window.confirm('Tem certeza que deseja excluir essa pergunta?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }


  async function handleCheckQuestionAsAnswer(questionId : string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }


  async function handleHighlightQuestion(questionId : string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true,
    })
  }


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo" />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
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
              isAnswered = {question.isAnswered}
              isHighLighted = {question.isHighLighted}
            >
              {!question.isAnswered && (
                  <>
                  <button
                  type="button"
                  onClick={() => handleCheckQuestionAsAnswer(question.id)}
                >
                  <img src={checkImg} alt="marcar"/>
                </button>
                <button
                  type="button"
                  onClick={() => handleHighlightQuestion(question.id)}
                >
                  <img src={answerImg} alt="destaque"/>
                </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="deleta"/>
              </button>
            </Question>
          )
        })}
        </div>
      </main>

    </div>
  )
}