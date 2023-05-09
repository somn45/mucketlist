import { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import Header from '../Header/Header';
import ResponsiveHomeSection from './ResponsiveHomeSection';
import StatusMessage from '../../components/StatusMessage';
import Modals from '../Modals/Modals';

import { Main } from '../../styles/home/homeStyles';
import { ICustomTrack } from '../../types/trackTypes/trackTypes';

import { RootState } from '../../store/reducers/rootReducer';
import getToken from '../../utils/functions/getToken';
import Player from '../Player/Player';
import { getCustomTracks } from '../../API';

interface AxiosGetCustomTracksRes {
  tracks: ICustomTrack[];
}

function Home() {
  const [statusMessageState, setStatusMessageState] = useState('');
  const [isAcitvePlayer, setIsAcitvePlayer] = useState(false);
  const { statusMessage } = useSelector((state: RootState) => state);
  const isActive = useSelector((state: RootState) => state.activeComponent);

  useEffect(() => {
    if (!statusMessage) return;
    setStatusMessageState(statusMessage);
  }, [statusMessage]);

  useEffect(() => {
    if (isActive.genres || isActive.options) setIsAcitvePlayer(false);
    else setIsAcitvePlayer(true);
  }, [isActive]);

  const initCustomTrack = useCallback(async () => {
    const firebaseUid = getToken('firebaseUid');
    const customTracks = await getCustomTracks(firebaseUid);
    return customTracks;
  }, []);

  const {
    isLoading,
    isError,
    data: customTracks,
    error,
  } = useQuery<ICustomTrack[]>('customtracks', initCustomTrack);

  return (
    <>
      <Outlet context={{ isLoading, isError, customTracks, error }} />
      <Header />
      {statusMessageState && <StatusMessage text={statusMessageState} />}
      <Main>
        <section>
          <Modals />
        </section>
        <ResponsiveHomeSection />
        {isAcitvePlayer && <Player />}
      </Main>
    </>
  );
}

export default Home;
