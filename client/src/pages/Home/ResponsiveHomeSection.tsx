import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import AddCustomTrack from './AddCustomTrack/AddCustomTrack';
import TrackList from './TrackList/TrackList';

const HomeSection = styled.section`
  padding-top: 40px;
  display: grid;
  gap: 6px;
  position: relative;
`;

const HomeMobileSection = styled(HomeSection)`
  grid-template-columns: repeat(5, 48px);
  grid-template-rows: repeat(8, 48px);
`;

const HomeTabletSection = styled(HomeSection)`
  grid-template-columns: repeat(7, 64px);
  grid-template-rows: repeat(9, 64px);
`;

const HomeDesktopSection = styled(HomeSection)`
  grid-template-columns: repeat(10, 64px);
  grid-template-rows: repeat(10, 64px);
`;

function ResponsiveHomeSection() {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
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
