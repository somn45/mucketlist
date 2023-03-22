import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import axios from 'axios';

import Header from '../Header/Header';
import ResponsiveHomeSection from './ResponsiveHomeSection';
import StatusMessage from '../../components/StatusMessage';
import WebPlayback from '../../WebPlayback';
import Modals from '../Modals/Modals';

import { Main } from '../../styles/home/homeStyles';
import { ICustomTrack } from '../../types/trackTypes/trackTypes';

import { RootState } from '../../store/reducers/rootReducer';
import getToken from '../../utils/functions/getToken';

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
  } = useQuery<ICustomTrack[]>('customtracks', getCustomTrack);

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
        {isAcitvePlayer && <WebPlayback />}
      </Main>
    </>
  );
}

export default React.memo(Home);
