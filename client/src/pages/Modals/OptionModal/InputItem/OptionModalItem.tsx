import styled from 'styled-components';

interface IOptionModalItem {
  name: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  text: string;
}

const OptionModalInputItem = styled.div`
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

function OptionModalItem({ name, checked, onChange, text }: IOptionModalItem) {
  return (
    <OptionModalInputItem>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name}></label>
      <span>{text}</span>
    </OptionModalInputItem>
  );
}

export default OptionModalItem;
