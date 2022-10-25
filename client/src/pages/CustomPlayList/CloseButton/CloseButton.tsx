import styled from 'styled-components';
import { ButtonProps } from '../../../utils/types/atomTypes';

const CloseButtonStyle = styled.button`
  box-sizing: content-box;
  width: 20px;
  height: 20px;
  padding: 3px;
  font-size: 20px;
  color: white;
`;

function CloseButton({ value, onClick }: ButtonProps) {
  return <CloseButtonStyle onClick={onClick}>{value}</CloseButtonStyle>;
}

export default CloseButton;
