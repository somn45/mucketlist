import { useEffect } from 'react';
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

interface HomeStates {
  activeComponent: {
    genres: boolean;
    options: boolean;
  };
  tracks: TrackState[];
}

interface HomeProps {
  isActive: {
    genres: boolean;
    options: boolean;
  };
  tracks: TrackState[];
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

function Home({ tracks, isActive }: HomeProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!cookies.get('firebaseUid')) navigate('/login');
  }, []);
  return (
    <>
      <Outlet />
      <Header />
      <Main>
        <section>
          <GenreModal />
          <OptionModal />
        </section>
        <HomeSection>
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
    isActive: state.activeComponent,
  };
}

export default connect(mapStateToProps)(Home);
