import styled from 'styled-components';
import Icon from '../../../components/Icon';
import { InputProps } from '../../../utils/types/atomTypes';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface InputItemProps extends InputProps {
  icon: IconDefinition;
}

const InputTab = styled.div`
  position: relative;
  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 10px;
    top: 10px;
  }
`;

const InputStyle = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 40px;
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
  type,
  value,
  setState,
  placeholder,
  icon,
}: Omit<InputItemProps, 'InputStyle'>) {
  return (
    <InputTab>
      <InputStyle
        type={type}
        value={value}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
      />
      <Icon icon={icon} />
    </InputTab>
  );
}

export default InputItem;
