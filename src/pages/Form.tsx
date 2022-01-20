import { FormProvider } from '../context/FormProvider';
import { FormSteps } from '../components/FormSteps';

export const Form = () => {
  if (localStorage.getItem('current_step')) {
    localStorage.getItem('current_step')
  } else {
    localStorage.setItem('current_step', 'WELCOMEPAGE');
  }

  return (
    <FormProvider >
      <FormSteps />
    </FormProvider>
  )
}