import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';
import Icon from '../../../../components/Icon';
import { ButtonProps } from '../../../../utils/types/atomTypes';

const TransisionAddCustomTrackButton = keyframes`
  0% {
    width: 20px;
    height: 20px;
    color: #fe3fcb;
  } 60% {
    width: 25px;
    height: 25px;
    color: #fe3fcb;
  } 100% {
    width: 25px;
    height: 25px;
    color: #E93636;
  }
`;

const AddCustomTrackButtonStyle = styled.button`
  width: 32px;
  height: 32px;
  padding: 7px;
  box-sizing: content-box;
  &:hover {
    svg {
      animation: ${TransisionAddCustomTrackButton} 1.2s ease forwards;
    }
  }
  svg {
    width: 22px;
    height: 22px;
    color: #fe3fcb;
  }
`;

function AddCustomTrackButton({ onClick }: ButtonProps) {
  return (
    <AddCustomTrackButtonStyle onClick={onClick}>
      <Icon icon={faHeart} />
    </AddCustomTrackButtonStyle>
  );
}

export default AddCustomTrackButton;
