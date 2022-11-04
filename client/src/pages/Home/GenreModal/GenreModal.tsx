import { useState, useEffect } from 'react';
import axios from 'axios';
import { connect, useSelector } from 'react-redux';

import getTokens from '../../../utils/functions/getTokens';
import isArrayEmpty from '../../../utils/functions/isArrayEmpty';
import GenreModalTitle from './Title/GenreModalTitle';
import { TrackState } from '../TrackList/TrackList';
import GenreSelectionTab from './GenreSelectionTab/GenreSelectionTab';
import {
  activeOptions,
  clearSettings,
  createTracks,
  RootState,
} from '../../../store/reducers/rootReducer';
import GenreModalSubmit from './Submit/GenreModalSubmit';
import GenreModalForm from './Form/GenreModalForm';
import { Modal } from '../../../utils/styles/Modal';
import styled, { css, keyframes } from 'styled-components';
import { useAppDispatch } from '../../../store/store';
import { getSpotifyGenreList } from '../../../store/reducers/thunk/genres';

interface GenreModalStates {
  tracks: TrackState[];
  activeComponent: {
    genres: boolean;
    options: boolean;
  };
  selectedGenres: string[];
}

interface GenreModalProps {
  genres: string[];
  tracks: TrackState[];
  isActive: {
    genres: boolean;
    options: boolean;
  };
  selectedGenres: string[];
}

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

function GenreModal({ genres, isActive, selectedGenres }: GenreModalProps) {
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.genres.loading);

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
    setTimeout(() => dispatch(activeOptions('')), 600);
  };

  return (
    <GenreModalWrap isActive={isActive.genres}>
      <GenreModalForm>
        <GenreModalTitle />
        {!loading ? <GenreSelectionTab genres={genres} /> : <></>}
        <GenreModalSubmit onClick={searchTracksToGenre} />
      </GenreModalForm>
    </GenreModalWrap>
  );
}

function mapStateToProps(state: GenreModalStates) {
  return {
    tracks: state.tracks,
    isActive: state.activeComponent,
    selectedGenres: state.selectedGenres,
  };
}

export default connect(mapStateToProps)(GenreModal);
