import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Cookies } from 'react-cookie';
import Header from './Header/Header';
import GenreModal from './GenreModal/GenreModal';
import OptionModal from './OptionModal/OptionModal';
import TrackList, { TrackState } from './TrackList/TrackList';
import styled from 'styled-components';
import WebPlayback from '../../WebPlayback';
import isArrayEmpty from '../../utils/functions/isArrayEmpty';
import AddCustomTrack from './AddCustomTrack/AddCustomTrack';
import StatusMessage from '../../components/StatusMessage';

interface HomeStates {
  tracks: TrackState[];
  statusMessage: string;
}

const Main = styled.main`
  margin-top: 80px;
`;

const HomeSection = styled.section`
  padding-top: 40px;
  display: grid;
  grid-template-columns: repeat(4, 64px);
  grid-template-rows: repeat(8, 64px);
`;

const cookies = new Cookies();

function Home({ tracks, statusMessage }: HomeStates) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [homeStatusMessage, setHomeStatusMessage] = useState('');
  useEffect(() => {
    if (!cookies.get('firebaseUid')) navigate('/login');
  }, []);
  useEffect(() => {
    if (statusMessage) setHomeStatusMessage(statusMessage);
  }, [statusMessage]);
  return (
    <>
      <Outlet />
      <Header />
      {homeStatusMessage && <StatusMessage text={homeStatusMessage} />}
      <Main>
        <section>
          <GenreModal />
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

function mapStateToProps(state: HomeStates) {
  return {
    tracks: state.tracks,
    statusMessage: state.statusMessage,
  };
}

export default connect(mapStateToProps)(Home);
