import { StyledComponent } from 'styled-components';

export interface InputProps {
  InputStyle: StyledComponent<'input', any, {}, never>;
  type: 'text' | 'password';
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

function Input({ type, value, setState, placeholder, InputStyle }: InputProps) {
  return (
    <InputStyle
      type={type}
      value={value}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder}
    ></InputStyle>
  );
}

export default Input;
