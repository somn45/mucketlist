import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Cookies } from 'react-cookie';
import Header from './Header/Header';
import GenreModal from './GenreModal/GenreModal';
import OptionModal from './OptionModal/OptionModal';
import TrackList from './TrackList/TrackList';
import styled from 'styled-components';
import WebPlayback from '../../WebPlayback';

interface HomeStates {
  activeComponent: {
    genres: boolean;
    options: boolean;
  };
}

interface HomeProps {
  isActive: {
    genres: boolean;
    options: boolean;
  };
}

const HomeSection = styled.section`
  background-color: white;
`;

const cookies = new Cookies();

function Home({ isActive }: HomeProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!cookies.get('firebaseUid')) navigate('/login');
  }, []);
  return (
    <>
      <Outlet />
      <Header />
      <main>
        <section>
          <GenreModal />
          <OptionModal />
        </section>
        <HomeSection>
          <TrackList />
          {cookies.get('firebaseUid') && <WebPlayback />}
        </HomeSection>
      </main>
    </>
  );
}

function mapStateToProps(state: HomeStates) {
  return {
    isActive: state.activeComponent,
  };
}

export default connect(mapStateToProps)(Home);
