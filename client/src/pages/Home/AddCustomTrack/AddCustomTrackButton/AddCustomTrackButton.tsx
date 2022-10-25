import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Icon from '../../../../components/Icon';
import { ButtonProps } from '../../../../utils/types/atomTypes';

const AddCustomTrackButtonStyle = styled.button`
  width: 32px;
  height: 32px;
  padding: 7px;
  box-sizing: content-box;
  svg {
    width: 25px;
    height: 25px;
    color: #ff5474;
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
