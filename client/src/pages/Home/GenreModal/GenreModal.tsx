import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import getToken from '../../../utils/functions/getToken';
import GenreModalTitle from './Title/GenreModalTitle';
import GenreSelectionTab from './GenreSelectionTab/GenreSelectionTab';
import {
  activeGenres,
  activeOptions,
  clearGenres,
  createTracks,
  RootState,
} from '../../../store/reducers/rootReducer';
import GenreModalSubmit from './Submit/GenreModalSubmit';
import GenreModalForm from './Form/GenreModalForm';
import { Modal } from '../../../utils/styles/Modal';
import styled, { css, keyframes } from 'styled-components';
import { useAppDispatch } from '../../../store/store';
import requestAxios from '../../../utils/functions/requestAxios';
import { TrackState } from '../TrackList/TrackList';
import tracks from '../../../store/reducers/tracksReducer';
import isArrayEmpty from '../../../utils/functions/isArrayEmpty';

interface GenreModalProps {
  genres: string[];
}

interface SearchTrackAxiosRequest {
  accessToken: string;
  genres: string;
}

interface SearchTrackAxiosReponse {
  tracks: TrackState[];
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

const SERVER_ENDPOINT = 'http://localhost:3001';
const ACCESS_TOKEN = getToken('accessToken');

function GenreModal({ genres }: GenreModalProps) {
  const dispatch = useAppDispatch();
  const {
    tracks,
    selectedGenres,
    genres: { loading },
  } = useSelector((state: RootState) => state);
  const isActive = useSelector((state: RootState) => state.activeComponent);

  useEffect(() => {
    dispatch(clearGenres());
  }, []);

  useEffect(() => {
    if (isArrayEmpty(tracks)) dispatch(activeGenres());
  }, [isActive.genres]);

  const searchTracksToGenre = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (selectedGenres.length === 0) return;
    const reqeustAxiosParams = {
      method: 'get',
      url: `${SERVER_ENDPOINT}/tracks/search`,
      data: {
        accessToken: ACCESS_TOKEN,
        genres: JSON.stringify(selectedGenres),
      },
    };
    const response = await requestAxios<
      SearchTrackAxiosRequest,
      SearchTrackAxiosReponse
    >(reqeustAxiosParams);
    dispatch(createTracks(response.tracks));
    setTimeout(() => dispatch(activeOptions()), 600);
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

export default GenreModal;
