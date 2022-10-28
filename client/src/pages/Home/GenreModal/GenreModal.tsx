import { useState, useEffect } from 'react';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';

import getTokens from '../../../utils/functions/getTokens';
import isArrayEmpty from '../../../utils/functions/isArrayEmpty';
import GenreModalTitle from './Title/GenreModalTitle';
import { TrackState } from '../TrackList/TrackList';
import GenreSelectionTab from './GenreSelectionTab/GenreSelectionTab';
import {
  activeOptions,
  clearSettings,
  createTracks,
} from '../../../store/reducers/rootReducer';
import GenreModalSubmit from './Submit/GenreModalSubmit';
import GenreModalForm from './Form/GenreModalForm';
import { Modal } from '../../../utils/styles/Modal';
import styled, { css, Keyframes, keyframes } from 'styled-components';

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

type AnimationType = Keyframes;

const FadeIn = keyframes`
  0% {
    opacity: 0;
  } 100% {
    opacity: 1;
  }
`;

const FadeOut = keyframes`
  0% {
    opacity: 1;
  } 100% {
    opacity: 0;
  }
`;

const GenreModalWrap = styled(Modal)<{ isActive: boolean }>`
  animation: ${(props) =>
    props.isActive
      ? css`
          ${FadeIn} 0.6s linear forwards
        `
      : css`
          ${FadeOut} 0.6s linear forwards
        `};
`;

function GenreModal({ tracks, isActive, selectedGenres }: GenreModalProps) {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [isActiveGenreModal, setIsActiveGenreModal] = useState(false);
  console.log(isActive.genres);

  useEffect(() => {
    if (!isActive.genres) return;
    getSpotifyGenres();
  }, [isActive.genres]);

  const getSpotifyGenres = async () => {
    setIsActiveGenreModal(true);
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
    setIsActiveGenreModal(false);
    setTimeout(() => dispatch(activeOptions('')), 600);
  };

  return (
    <>
      {isActive.genres && (
        <GenreModalWrap isActive={isActiveGenreModal}>
          <GenreModalForm>
            <GenreModalTitle />
            <GenreSelectionTab genres={genres} />
            <GenreModalSubmit onClick={searchTracksToGenre} />
          </GenreModalForm>
        </GenreModalWrap>
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
