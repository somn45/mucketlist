import { IChildren } from '../../../types/moduleTypes/moduleTypes';
import { CustomTrackHeader as StyledCustomTrackHeader } from '../../../styles/customTracks/cusomTrackStyle';

function CustomTrackHeader({ children }: IChildren) {
  return <StyledCustomTrackHeader>{children}</StyledCustomTrackHeader>;
}

export default CustomTrackHeader;
