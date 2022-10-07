import Button, { ButtonProps } from '../../../../components/atom/Button';

function NextTrackButton({ onClick }: Omit<ButtonProps, 'value'>) {
  return <Button value="previous track" onClick={onClick} />;
}

export default NextTrackButton;
