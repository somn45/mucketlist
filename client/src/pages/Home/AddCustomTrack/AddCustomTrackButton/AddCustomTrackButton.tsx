import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Button, { ButtonProps } from '../../../../components/atom/Button';
import Icon from '../../../../components/atom/Icon';

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

function AddCustomTrackButton({ onClick }: Omit<ButtonProps, 'value'>) {
  return (
    <Button
      ButtonStyle={AddCustomTrackButtonStyle}
      value={<Icon icon={faHeart} />}
      onClick={onClick}
    />
  );
}

export default AddCustomTrackButton;
