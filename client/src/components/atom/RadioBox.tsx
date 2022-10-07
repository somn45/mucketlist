interface RadioBoxProps {
  id: string;
  value: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function RadioBox({ id, value, checked, onChange }: RadioBoxProps) {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={true}
      onChange={onChange}
    />
  );
}

export default RadioBox;
