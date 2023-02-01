import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header/Header';
import GenreModal from './GenreModal/GenreModal';
import OptionModal from './OptionModal/OptionModal';
import TrackList from './TrackList/TrackList';
import styled from 'styled-components';
import WebPlayback from '../../WebPlayback';
import isArrayEmpty from '../../utils/functions/isArrayEmpty';
import AddCustomTrack from './AddCustomTrack/AddCustomTrack';
import StatusMessage from '../../components/StatusMessage';
import { RootState } from '../../store/reducers/rootReducer';
import { useMediaQuery } from 'react-responsive';
import getToken from '../../utils/functions/getToken';
import Modals from './Modals';

const Main = styled.main`
  margin-top: 80px;
  display: flex;
  justify-content: center;
`;

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

function Home() {
  const [statusMessageState, setStatusMessageState] = useState('');
  const [isAcitvePlayer, setIsAcitvePlayer] = useState(false);
  const { tracks, statusMessage } = useSelector((state: RootState) => state);
  const isActive = useSelector((state: RootState) => state.activeComponent);

  const customTracks = useSelector(
    (state: RootState) => state.customTracks.tracks
  );
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });

  useEffect(() => {
    if (!statusMessage) return;
    setStatusMessageState(statusMessage);
  }, [statusMessage]);

  useEffect(() => {
    if (isActive.genres || isActive.options) setIsAcitvePlayer(false);
    else setIsAcitvePlayer(true);
  }, [isActive]);

  const HomeSectionContent = (
    <>
      <AddCustomTrack />
      <TrackList />
    </>
  );

  return (
    <>
      <Outlet context={{ customTracks }} />
      <Header />
      {statusMessageState && <StatusMessage text={statusMessageState} />}
      <Main>
        <section>
          <Modals />
        </section>
        {isMobile ? (
          <HomeMobileSection>{HomeSectionContent}</HomeMobileSection>
        ) : isTablet ? (
          <HomeTabletSection>{HomeSectionContent}</HomeTabletSection>
        ) : (
          <HomeDesktopSection>{HomeSectionContent}</HomeDesktopSection>
        )}
        {isAcitvePlayer && <WebPlayback />}
      </Main>
    </>
  );
}

export default React.memo(Home);
