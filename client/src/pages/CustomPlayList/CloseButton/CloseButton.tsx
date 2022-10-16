import styled from 'styled-components';
import Button, { ButtonProps } from '../../../components/atom/Button';

const CloseButtonStyle = styled.button`
  box-sizing: content-box;
  width: 20px;
  height: 20px;
  padding: 3px;
  font-size: 20px;
  color: white;
`;

function CloseButton({ value, onClick }: ButtonProps) {
  return (
    <Button ButtonStyle={CloseButtonStyle} value={value} onClick={onClick} />
  );
}

export default CloseButton;
