import { useContext } from 'react';
import { LayoutTemplate } from '../LayoutTemplate';
import { FormContext } from '../../context/FormProvider';

export const IssueReview = () => {
  const { setCurrentStep, steps } = useContext(FormContext);

  return (
    <LayoutTemplate>
      <button onClick={() => {
        localStorage.setItem('current_step', steps.welcome);
        setCurrentStep(steps.welcome)
      }} >Cancel</button>
      <button onClick={() => {
        localStorage.setItem('current_step', steps.form);
        setCurrentStep(steps.form);
      }} >Start</button>
    </LayoutTemplate>
  )
}