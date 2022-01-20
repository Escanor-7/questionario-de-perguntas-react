import { useContext } from 'react';
import { FormContext } from '../../context/FormProvider';
import * as S from './Welcome.styles';
import { useFormik } from 'formik';
import { LayoutTemplate } from '../LayoutTemplate';

export const Welcome = () => {
  const { setCurrentStep, setUser, steps } = useContext(FormContext);

  const formik = useFormik({
    initialValues: {
      name: '',
      questions: ''
    },
    onSubmit: values => {
      localStorage.setItem('user', JSON.stringify(values));
      return setUser([values])
    }
  })

  const handleCurrentStep = () => {
    localStorage.setItem('current_step', steps.review);
    setTimeout(() => {
      setCurrentStep(steps.review);
    }, 500)
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} >
        <LayoutTemplate>
          <S.FieldContainer>
            <label>Nome</label>
            <input
              type='text'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </S.FieldContainer>

          <S.FieldContainer>
            <label>Quantas perguntas deseja responder?</label>
            <input
              type='text'
              name='questions'
              value={formik.values.questions}
              onChange={formik.handleChange}
            />
          </S.FieldContainer>

          <button type='submit' onClick={() => handleCurrentStep()} >Continue</button>
        </LayoutTemplate>
      </form>
    </>
  )
}