import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';
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
import { useAppDispatch } from '../../store/store';
import { getSpotifyGenreList } from '../../store/reducers/thunk/genres';

const Main = styled.main`
  margin-top: 80px;
`;

const HomeSection = styled.section`
  padding-top: 40px;
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(4, 64px);
  grid-template-rows: repeat(8, 64px);
`;

const cookies = new Cookies();

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [homeStatusMessage, setHomeStatusMessage] = useState('');
  const tracks = useSelector((state: RootState) => state.tracks);
  const statusMessage = useSelector((state: RootState) => state.statusMessage);
  const genres = useSelector((state: RootState) => state.genres.genres);
  const customTracks = useSelector(
    (state: RootState) => state.customTracks.tracks
  );

  useEffect(() => {
    if (!cookies.get('firebaseUid')) navigate('/login');
    dispatch(getSpotifyGenreList());
  }, []);
  useEffect(() => {
    if (statusMessage) setHomeStatusMessage(statusMessage);
  }, [statusMessage]);
  console.log('test');

  return (
    <>
      <Outlet context={{ customTracks }} />
      <Header />
      {homeStatusMessage && <StatusMessage text={homeStatusMessage} />}
      <Main>
        <section>
          <GenreModal genres={genres} />
          <OptionModal />
        </section>
        <HomeSection>
          <AddCustomTrack />
          <TrackList />
          {!isArrayEmpty(tracks) && <WebPlayback />}
        </HomeSection>
      </Main>
    </>
  );
}

export default React.memo(Home);
