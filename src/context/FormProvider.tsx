import { createContext, useState } from 'react';

const steps = {
  welcome: "WELCOMEPAGE",
  review: "REVIEWPAGE",
  form: "FORMPAGE",
}

export const FormContext = createContext<any>({} as any);

export const FormProvider: React.FC = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<Number | String | null>(localStorage.getItem('current_step'));
  const [user, setUser] = useState([]);

  return (
    <FormContext.Provider value={{
      currentStep,
      setCurrentStep,
      user,
      setUser,
      steps
    }}
    >
      {children}
    </FormContext.Provider>
  )
}