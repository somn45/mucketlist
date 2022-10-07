interface CheckboxProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

function Checkbox({ id, name, checked, onChange }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
    />
  );
}

export default Checkbox;
