import Button, { ButtonProps } from '../../../../components/atom/Button';

function VolumeButton({
  value,
  onClick,
}: Omit<ButtonProps, 'ButtonStyle' | 'title'>) {
  return <Button value={value} onClick={onClick} />;
}

export default VolumeButton;
