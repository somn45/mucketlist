import React, { useEffect, useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import Genre from '../components/Genre';
import Settings, { TrackState } from './Settings';
import Tracks from './Tracks';
import {
  activeOptions,
  clearSettings,
  createTracks,
  inactiveAll,
} from '../store/reducers/rootReducer';
import styled, { css, keyframes } from 'styled-components';
import { FormFrame } from '../utils/styles/FormFrame';
import { Modal } from '../utils/styles/Modal';
import getTokens from '../utils/functions/getTokens';

interface HomeProps {
  isActive: {
    genres: boolean;
    options: boolean;
  };
  tracks: TrackState[];
  selectedGenres: string[];
}

interface HomeStates {
  activeComponent: {
    genres: boolean;
    options: boolean;
  };
  tracks: TrackState[];
  genre: string[];
}

interface GenresFormProps {
  open: boolean;
}

const HomeSec = styled.section`
  margin-top: 100px;
  background-color: white;
`;

const OpenGenreModal = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 0.8;
  }
`;

const GenresForm = styled(FormFrame)<GenresFormProps>`
  animation: ${(props) =>
    props.open === false
      ? css`
          ${OpenGenreModal} 0.4s ease-out
        `
      : css`
          ${OpenGenreModal} 0.4s ease-out
        `};
`;

const GenreSelectionTab = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  row-gap: 10px;
  margin-bottom: 30px;
  justify-content: space-between;
`;

const Submit = styled.input`
  width: 250px;
  height: 50px;
  border: 0;
  border-radius: 5px;
  background-color: #20b2aa;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const cookies = new Cookies();

function Home({ selectedGenres, isActive, tracks }: HomeProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    if (!cookies.get('F_UID')) navigate('/login');
    if (!(Array.isArray(tracks) && tracks.length === 0)) {
      dispatch(inactiveAll(''));
    }
  }, []);
  useEffect(() => {
    if (!isActive.genres) return;
    getSpotifyGenres();
  }, [isActive.genres]);

  const getSpotifyGenres = async () => {
    if (!(Array.isArray(tracks) && tracks.length === 0)) return;
    const accessToken = getTokens();
    const response = await axios.post(
      `http://localhost:3001/tracks/genres`,
      {
        accessToken: accessToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setGenres(response.data.genres.slice(0, 20));
    //setTimeout(() => setIsOpenGenres(true), 500);
  };

  const searchTracksToGenre = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const accessToken = getTokens();
    if (selectedGenres.length === 0) return;
    const genres = JSON.stringify(selectedGenres);
    const response = await axios.get(
      `http://localhost:3001/tracks/search?accessToken=${accessToken}&genre=${genres}`
    );

    dispatch(createTracks(response.data.tracks));
    dispatch(clearSettings(''));
    dispatch(activeOptions(''));
  };
  return (
    <HomeSec>
      <Outlet />
      {isActive.genres ? (
        <Modal>
          <GenresForm open={isActive.genres}>
            <h2>좋아하는 장르는 무엇입니까?</h2>
            <GenreSelectionTab>
              {genres.map((genre) => (
                <Genre key={genre} genre={genre} />
              ))}
            </GenreSelectionTab>
            <Submit
              type="submit"
              value="트랙 검색하기"
              onClick={searchTracksToGenre}
            />
          </GenresForm>
        </Modal>
      ) : null}
      {isActive.options ? <Settings /> : null}
      {tracks ? <Tracks tracks={tracks} /> : null}
    </HomeSec>
  );
}

const mapStateToProps = (state: HomeStates) => {
  return {
    tracks: state.tracks,
    isActive: state.activeComponent,
    selectedGenres: state.genre,
  };
};

export default connect(mapStateToProps)(Home);
