import { useContext } from 'react';
import { Welcome } from "../Welcome";
import { QuestionForm } from "../QuestionForm";
import { IssueReview } from '../IssueReview';
import { FormContext } from '../../context/FormProvider';

export const FormSteps = () => {
  const { currentStep } = useContext(FormContext);

  return (
    <>
      {currentStep === 'WELCOMEPAGE' && (
        <Welcome />
      )}

      {currentStep === 'REVIEWPAGE' && (
        <IssueReview />
      )}

      {currentStep === 'FORMPAGE' && (
        <QuestionForm />
      )}
    </>
  )
}