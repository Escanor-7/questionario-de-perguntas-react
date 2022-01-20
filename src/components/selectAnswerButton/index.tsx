import React, { useCallback, useEffect, useState, useContext } from "react";
import { FormContext } from '../../context/FormProvider';
import { Field, useField } from 'formik';

type AnswersProps = {
  type: string;
  correctAnswer: string;
  wrongAnswers: string[];
  question: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  values: {
    answers: object[];
  }
}

export const SelectAnswerButton = ({ type, correctAnswer, wrongAnswers, question, setFieldValue, values }: AnswersProps) => {
  const { user, setUser } = useContext(FormContext);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  const handleShuffleAnswers = useCallback(() => {
    if (type === 'multiple') {
      const answers = [...wrongAnswers, correctAnswer];
      const shuffleArray: string[] = [];

      for (let i = 0; shuffleArray.length < answers.length; i++) {
        // A multiplicação por 3 acontece porque temos apenas 4 posições no array de respostas.
        // Um número acima de 3 poderia resultar em undefined na criação de um número aleatório. 
        const shuffleId = Math.round((Math.random()) * 3);
        const verifyString = shuffleArray.find((item) => item === answers[shuffleId])
        if (!verifyString) {
          shuffleArray.push(answers[shuffleId])
        }
      }
      return setShuffledAnswers(shuffleArray);

    } else {
      const answers = [...wrongAnswers, correctAnswer];
      return setShuffledAnswers(answers);
    }
  }, [correctAnswer, type, wrongAnswers]);

  useEffect(() => {
    handleShuffleAnswers();
  }, [handleShuffleAnswers])

  const handleResponseCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const user_response = e.currentTarget.value;
    let current_question = question;
    const correct_answer = correctAnswer;
    let answerInfo: object = {};

    const existeResposta = (): any => {
      values.answers.find((item: any) => {
        if (item.current_question === current_question) {
          item.user_response = user_response;
        }
        return item.current_question === current_question;
      })
    }

    // const existe = () => {
    //   return values.answers.find((item: any) => item.current_question === current_question);
    // }

    if (existeResposta()) {
      return existeResposta();
    } else {
      console.log('Answers =>', values.answers);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // return answerInfo = { current_question, user_response, correct_answer }
      values.answers.push({ current_question, user_response, correct_answer });
    }
  }

  return (
    <>
      {shuffledAnswers.map((answer, id) => {
        return (
          <div key={id} >
            <input
              type='radio'
              name={question}
              id={String(id)}
              value={answer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue('answers', [...values.answers, handleResponseCapture(e)])
              }
            />
            <label key={id} >
              {answer}
            </label>
          </div>
        )
      }
      )}
    </>
  )
}