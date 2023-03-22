import { useMediaQuery } from 'react-responsive';

import AddCustomTrack from '../AddCustomTrack/AddCustomTrack';
import TrackList from '../TrackList/TrackList';

import {
  HomeDesktopSection,
  HomeMobileSection,
  HomeTabletSection,
} from '../../styles/home/homeStyles';

import { MOBILE_SIZE, TABLET_SIZE } from '../../constants/constants';

function ResponsiveHomeSection() {
  const isMobile = useMediaQuery({
    query: MOBILE_SIZE,
  });
  const isTablet = useMediaQuery({
    query: TABLET_SIZE,
  });

  const HomeSectionContent = (
    <>
      <AddCustomTrack />
      <TrackList />
    </>
  );
  return (
    <>
      {isMobile ? (
        <HomeMobileSection>{HomeSectionContent}</HomeMobileSection>
      ) : isTablet ? (
        <HomeTabletSection>{HomeSectionContent}</HomeTabletSection>
      ) : (
        <HomeDesktopSection>{HomeSectionContent}</HomeDesktopSection>
      )}
    </>
  );
}

export default ResponsiveHomeSection;
