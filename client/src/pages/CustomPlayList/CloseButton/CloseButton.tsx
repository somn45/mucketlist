import Button, { ButtonProps } from '../../../components/atom/Button';

function CloseButton({ value, onClick }: ButtonProps) {
  return <Button value={value} onClick={onClick} />;
}

export default CloseButton;
