import { CloseButton } from '../../../styles/customTracks/cusomTrackStyle';
import { ButtonProps } from '../../../types/atomTypes/atom';

function MoveHomeButton({ value, onClick }: ButtonProps) {
  return <CloseButton onClick={onClick}>{value}</CloseButton>;
}

export default MoveHomeButton;
