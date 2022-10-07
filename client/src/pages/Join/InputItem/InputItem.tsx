import styled from 'styled-components';
import Input from '../../../components/atom/Input';
import Label from '../../../components/atom/Label';

interface JoinInputItemProps {
  labelText: string;
  htmlFor: string;
  type: 'text';
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

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
  labelText,
  htmlFor,
  value,
  setState,
  placeholder,
}: JoinInputItemProps) {
  return (
    <>
      <Label LabelStyle={LabelStyle} value={labelText} htmlFor={htmlFor} />
      <Input
        InputStyle={InputStyle}
        type="text"
        value={value}
        setState={setState}
        placeholder={placeholder}
      />
    </>
  );
}

export default InputItem;
