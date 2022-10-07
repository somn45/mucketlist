import Button, { ButtonProps } from '../../../../components/atom/Button';

function GetPositionButton({ onClick }: Omit<ButtonProps, 'value'>) {
  return <Button value="position" onClick={onClick} />;
}

export default GetPositionButton;
