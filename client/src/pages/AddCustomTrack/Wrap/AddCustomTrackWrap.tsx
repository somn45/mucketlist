import {
  MobileAddCustomTrackWrap,
  TabletListAddCustomTrackWrap,
} from '../../../styles/addCustomTrack/addCustomTrackStyle';
import { IChildren } from '../../../types/moduleTypes/moduleTypes';

interface AddCustomTrackWrapProps extends IChildren {
  isMobile: boolean;
}

function AddCustomTrackWrap({ children, isMobile }: AddCustomTrackWrapProps) {
  return isMobile ? (
    <MobileAddCustomTrackWrap>{children}</MobileAddCustomTrackWrap>
  ) : (
    <TabletListAddCustomTrackWrap>{children}</TabletListAddCustomTrackWrap>
  );
}

export default AddCustomTrackWrap;
