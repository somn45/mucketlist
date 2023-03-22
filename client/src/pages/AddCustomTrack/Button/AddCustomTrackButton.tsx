import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Icon from '../../../components/Icon';

import { StyledAddCustomTrackButton } from '../../../styles/addCustomTrack/addCustomTrackStyle';
import { ButtonProps } from '../../../types/atomTypes/atom';

function AddCustomTrackButton({ onClick }: ButtonProps) {
  return (
    <StyledAddCustomTrackButton onClick={onClick}>
      <Icon icon={faHeart} />
    </StyledAddCustomTrackButton>
  );
}

export default AddCustomTrackButton;
