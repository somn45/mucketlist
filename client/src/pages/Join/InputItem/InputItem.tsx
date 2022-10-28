import styled from 'styled-components';
import { InputProps } from '../../../utils/types/atomTypes';

const LabelStyle = styled.label`
  height: 20px;
  margin: 10px 0;
  color: white;
  font-weight: 600;
  &:first-child {
    margin-top: 0;
  }
`;

export const InputStyle = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 2px;
  background-color: #7fffd4;
  border: 1px solid #7fffd4;
  border-radius: 5px;
  font-size: 15px;
  &:focus,
  &:active {
    outline: none;
    border: 2px solid #adff2f;
  }
  &::placeholder {
    font-size: 15px;
    font-weight: 600;
  }
`;

function InputItem({
  htmlFor,
  type,
  value,
  setState,
  labelText,
  placeholder,
}: InputProps) {
  return (
    <>
      <LabelStyle htmlFor={htmlFor}>{labelText}</LabelStyle>
      <InputStyle
        type={type}
        value={value}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
}

export default InputItem;
