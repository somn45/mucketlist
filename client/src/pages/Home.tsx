import React, { useEffect, useState } from 'react';
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
import { getAccessToken } from '../utils/functions/accessToken';

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

const cookies = new Cookies();
const accessToken = getAccessToken();

function Home({ selectedGenres, isActive, tracks }: HomeProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [genres, setGenres] = useState<string[]>([]);
  useEffect(() => {
    if (!(Array.isArray(tracks) && tracks.length === 0))
      dispatch(inactiveAll(''));
  }, []);
  useEffect(() => {
    getSpotifyGenres();
    if (!cookies.get('F_UID')) navigate('/login');
  }, [accessToken]);

  const getSpotifyGenres = async () => {
    const response = await axios.post(`http://localhost:3001/tracks/genres`, {
      accessToken: accessToken,
    });
    setGenres(response.data.genres);
  };

  const searchTracksToGenre = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
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
    <div>
      <Outlet />
      <h2>Home</h2>
      <form>
        {isActive.genres ? (
          <>
            {genres.map((genre) => (
              <Genre key={genre} genre={genre} />
            ))}
          </>
        ) : (
          <h2>장르 목록을 불러오는 중입니다.</h2>
        )}
        <input
          type="submit"
          value="Search your favorite genres"
          onClick={searchTracksToGenre}
        />
      </form>
      {isActive.options ? <Settings /> : null}
      {tracks ? <Tracks tracks={tracks} /> : null}
    </div>
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
