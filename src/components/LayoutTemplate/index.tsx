import * as S from './LayoutTemplate.styles';

type LayoutTemplateProps = {
  children: React.ReactNode;
}

export const LayoutTemplate = ({ children }: LayoutTemplateProps) => {

  return (
    <S.Container>
      {children}
    </S.Container>
  )
}