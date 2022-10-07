import Button, { ButtonProps } from '../../../../components/atom/Button';

function RepeatMode({ onClick }: Omit<ButtonProps, 'value'>) {
  return <Button value="repeat" onClick={onClick} />;
}

export default RepeatMode;
