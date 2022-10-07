import styled from 'styled-components';
import Checkbox from '../../../../components/atom/Checkbox';
import Label from '../../../../components/atom/Label';
import Span from '../../../../components/atom/Span';

interface OptionModalItem {
  optionName: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  labelText: string;
}

const InputTab = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  input {
    display: none;
  }
  label {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    border: 3px solid black;
    border-radius: 50%;
    cursor: pointer;
  }
  input:checked + label {
    background-color: #7fffd4;
  }
`;

function OptionModalItem({
  optionName,
  checked,
  onChange,
  labelText,
}: OptionModalItem) {
  return (
    <InputTab>
      <Checkbox
        id={optionName}
        name={optionName}
        checked={checked}
        onChange={onChange}
      />
      <Label htmlFor={optionName} />
      <Span text={labelText} />
    </InputTab>
  );
}

export default OptionModalItem;
