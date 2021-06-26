import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type QuestionType = {
  id: string,
  author: {
    name: string,
    avatar: string
  }
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean,
}

type firebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string
  }
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean,
}>

export function useRoom(roomId : string) {
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
          isAnswered: value.isAnswered
        }
      })

      setTitle(room.val().title)
      setQuestions(parsedQuestions)
    })
  }, [roomId]);

  return { questions, title }
}