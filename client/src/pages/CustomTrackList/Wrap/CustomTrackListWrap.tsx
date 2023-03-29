import { IChildren } from '../../../types/moduleTypes/moduleTypes';
import { CustomTrackListWrap as StyledCustomTrackListWrap } from '../../../styles/customTracks/cusomTrackStyle';

function CustomTrackListWrap({ children }: IChildren) {
  return <StyledCustomTrackListWrap>{children}</StyledCustomTrackListWrap>;
}

export default CustomTrackListWrap;
