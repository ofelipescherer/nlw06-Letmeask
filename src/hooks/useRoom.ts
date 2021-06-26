import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
  id: string,
  author: {
    name: string,
    avatar: string
  }
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean,
  likeCount: number,
  likeId: string | undefined,
}

type firebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string
  }
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean,
  likes: Record<string, {
    authorId: string
  }>
}>

export function useRoom(roomId : string) {
  const { user } = useAuth()
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const firebaseQuestions : firebaseQuestions = room.val().questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => { //desestruturação em array
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
          //Método some() returna true ou false, se encontrar o objeto, tipo um find, mas que retorna booleano
        }
      })

      setTitle(room.val().title)
      setQuestions(parsedQuestions)
    })

    return () => {
      roomRef.off('value')
    }

  }, [roomId, user?.id]);

  return { questions, title }
}