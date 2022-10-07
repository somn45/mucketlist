import Button, { ButtonProps } from '../../../../components/atom/Button';

function GetStateButton({ onClick }: Omit<ButtonProps, 'value'>) {
  return <Button value="get state" onClick={onClick} />;
}

export default GetStateButton;
