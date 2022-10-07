import Button, { ButtonProps } from '../../../../components/atom/Button';

function TogglePlayButton({ value, onClick }: ButtonProps) {
  return <Button value={value} onClick={onClick} />;
}

export default TogglePlayButton;
