import { useContext } from 'react';
import * as S from './QuestionForm.styles';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { LayoutTemplate } from '../LayoutTemplate';
import { FormContext } from '../../context/FormProvider';
import { SelectAnswerButton } from '../selectAnswerButton';
import { Formik, useFormik, Form, Field, } from 'formik';

type QuestionProps = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string
}

export const QuestionForm = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState<Number>();
  const [questions, setQuestions] = useState<QuestionProps[]>([]);

  const handleCaptureTheNumberOfQuestions = () => {
    const user = localStorage.getItem('user');

    if (user) {
      const userInfo = JSON.parse(user);
      setNumberOfQuestions(userInfo.questions);
    }
  }

  useEffect(() => {
    handleCaptureTheNumberOfQuestions();
    const getQuestion = async () => {
      await api.get(`/api.php?amount=${numberOfQuestions}`)
        // await api.get(`/api.php?amount=2`)
        .then((res) => setQuestions(res.data.results))
        .catch((err) => console.log('Deu erro', err))
    }
    getQuestion();
  }, [numberOfQuestions]);

  return (
    <LayoutTemplate>
      <Formik
        initialValues={{
          answers: [],
        }}
        onSubmit={(values) => {
          console.log('Valores do submit =>', values)
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* <Field render={({ field }: any) => (
              questions.map((question: QuestionProps, index: number) => {
                return (
                  <div>
                    <input
                      type='radio'
                      name={question.question}
                      value={question.incorrect_answers}
                    />
                  </div>
                )
              })
            )} /> */}
            {questions.map((question: QuestionProps, index: number) => {
              // console.log('Questoes =>',question);
              return (
                <S.FieldItem key={index} >
                  <p>{question.question}</p>
                  <SelectAnswerButton
                    type={question.type}
                    correctAnswer={question.correct_answer}
                    wrongAnswers={question.incorrect_answers}
                    question={question.question}
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                </S.FieldItem>
              )
            })}
            <button type='submit' >Enviar</button>
          </Form>
        )}
      </Formik>
    </LayoutTemplate>
  )
}