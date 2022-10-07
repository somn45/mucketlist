import { StyledComponent } from 'styled-components';

export interface FormProps {
  FormStyle?: StyledComponent<'form', any, {}, never>;
  children?: JSX.Element | JSX.Element[];
}

function Form({ children, FormStyle }: FormProps) {
  return FormStyle ? (
    <FormStyle>{children}</FormStyle>
  ) : (
    <form>{children}</form>
  );
}

export default Form;
