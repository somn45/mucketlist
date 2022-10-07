import Button, { ButtonProps } from '../../../../components/atom/Button';

function ShuffleMode({ onClick }: Omit<ButtonProps, 'value'>) {
  return <Button value="shuffle" onClick={onClick} />;
}

export default ShuffleMode;
