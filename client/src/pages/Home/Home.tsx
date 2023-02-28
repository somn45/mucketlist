import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header/Header';
import TrackList from './TrackList/TrackList';
import styled from 'styled-components';
import WebPlayback from '../../WebPlayback';
import AddCustomTrack from './AddCustomTrack/AddCustomTrack';
import StatusMessage from '../../components/StatusMessage';
import { RootState } from '../../store/reducers/rootReducer';
import { useMediaQuery } from 'react-responsive';
import Modals from './Modals';
import { useQuery } from 'react-query';
import axios from 'axios';
import getToken from '../../utils/functions/getToken';
import { ICustomPlayList } from '../CustomPlayList/CustomPlayList';

interface AxiosGetCustomTracksRes {
  tracks: ICustomPlayList[];
}

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
  const { statusMessage } = useSelector((state: RootState) => state);
  const isActive = useSelector((state: RootState) => state.activeComponent);

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

  const getCustomTrack = async () => {
    const firebaseUid = getToken('firebaseUid');
    const { data } = await axios.get<AxiosGetCustomTracksRes>(
      `http://localhost:3001/tracks/read?firebaseUid=${firebaseUid}`
    );
    return data.tracks;
  };

  const {
    isLoading,
    isError,
    data: customTracks,
    error,
  } = useQuery<ICustomPlayList[]>('customtracks', getCustomTrack);

  const HomeSectionContent = (
    <>
      <AddCustomTrack />
      <TrackList />
    </>
  );

  return (
    <>
      <Outlet context={{ isLoading, isError, customTracks, error }} />
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
