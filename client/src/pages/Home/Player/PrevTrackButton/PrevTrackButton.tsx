import Button, { ButtonProps } from '../../../../components/atom/Button';

function PrevTrackButton({ onClick }: Omit<ButtonProps, 'value'>) {
  return <Button value="previous track" onClick={onClick} />;
}

export default PrevTrackButton;
