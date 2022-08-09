import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import Genre from '../components/Genre';
import Settings, { TrackState } from './Settings';
import Tracks from './Tracks';
import {
  clearSettings,
  createTracks,
  getAccessToken,
} from '../store/reducers/rootReducer';

interface HomeProps {
  accessToken: string;
  tracks: TrackState[];
  selectedGenres: string[];
  settings: string;
}

interface HomeStates {
  accessToken: string;
  tracks: TrackState[];
  genre: string[];
  settings: string;
}

const cookies = new Cookies();

function Home({ selectedGenres, tracks, accessToken, settings }: HomeProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  useEffect(() => {
    getSpotifyGenres();
    if (!cookies.get('F_UID')) navigate('/login');
  }, [accessToken]);

  const getSpotifyGenres = async () => {
    dispatch(getAccessToken(''));
    const response = await axios.post(`http://localhost:3001/tracks/genres`, {
      accessToken: accessToken,
    });
    setGenres(response.data.genres);
    setLoading(false);
    setIsOpenSettings(true);
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
  };
  return (
    <div>
      <Outlet />
      <h2>Home</h2>
      <form>
        {loading ? (
          <h2>장르 목록을 불러오는 중입니다.</h2>
        ) : (
          <>
            {genres.map((genre) => (
              <Genre key={genre} genre={genre} />
            ))}
          </>
        )}
        <input
          type="submit"
          value="Search your favorite genres"
          onClick={searchTracksToGenre}
        />
      </form>
      {isOpenSettings ? <Settings /> : null}
      {tracks ? <Tracks tracks={tracks} /> : null}
    </div>
  );
}

const mapStateToProps = (state: HomeStates) => {
  return {
    accessToken: state.accessToken,
    tracks: state.tracks,
    selectedGenres: state.genre,
    settings: state.settings,
  };
};

export default connect(mapStateToProps)(Home);
