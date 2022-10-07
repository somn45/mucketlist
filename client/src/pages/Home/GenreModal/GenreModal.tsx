import { useState, useEffect } from 'react';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';

import getTokens from '../../../utils/functions/getTokens';
import isArrayEmpty from '../../../utils/functions/isArrayEmpty';
import GenreModalTitle from './Title/GenreModalTitle';
import { TrackState } from '../TrackList/TrackList';
import GenreSelectionTab from './GenreSelectionTab/GenreSelectionTab';
import {
  activeGenres,
  activeOptions,
  clearSettings,
  createTracks,
} from '../../../store/reducers/rootReducer';
import { Modal } from '../../../utils/styles/Modal';
import GenreModalSubmit from './Submit/GenreModalSubmit';
import GenreModalForm from './Form/GenreModalForm';

interface GenreModalStates {
  tracks: TrackState[];
  activeComponent: {
    genres: boolean;
    options: boolean;
  };
  genre: string[];
}

interface GenreModalProps {
  tracks: TrackState[];
  isActive: {
    genres: boolean;
    options: boolean;
  };
  selectedGenres: string[];
}

function GenreModal({ tracks, isActive, selectedGenres }: GenreModalProps) {
  console.log(isActive);
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (!isActive.genres) return;
    getSpotifyGenres();
  }, [isActive.genres]);

  const getSpotifyGenres = async () => {
    if (!isArrayEmpty(tracks)) return;
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
    <>
      {isActive.genres && (
        <Modal>
          <GenreModalForm>
            <GenreModalTitle />
            <GenreSelectionTab genres={genres} />
            <GenreModalSubmit onClick={searchTracksToGenre} />
          </GenreModalForm>
        </Modal>
      )}
    </>
  );
}

function mapStateToProps(state: GenreModalStates) {
  return {
    tracks: state.tracks,
    isActive: state.activeComponent,
    selectedGenres: state.genre,
  };
}

export default connect(mapStateToProps)(GenreModal);
