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

function GenreModal() {
  const dispatch = useAppDispatch();
  const { selectedGenres } = useSelector((state: RootState) => state);
  const isActive = useSelector((state: RootState) => state.activeComponent);
  useEffect(() => {
    dispatch(clearGenres());
  }, []);

  const searchTracksToGenre = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (selectedGenres.length === 0) return;
    const reqeustAxiosParams = {
      method: 'get',
      url: `${SERVER_ENDPOINT}/tracks/search`,
      data: {
        accessToken: getToken('accessToken'),
        genres: JSON.stringify(selectedGenres),
      },
    };
    const response = await requestAxios<
      SearchTrackAxiosRequest,
      SearchTrackAxiosReponse
    >(reqeustAxiosParams);
    dispatch(createTracks(response.data.tracks));
    setTimeout(() => dispatch(activeOptions()), 600);
  };

  return (
    <GenreModalWrap isActive={isActive.genres}>
      <GenreModalForm>
        <GenreModalTitle />
        <GenreSelectionTab />
        <GenreModalSubmit onClick={searchTracksToGenre} />
      </GenreModalForm>
    </GenreModalWrap>
  );
}

export default GenreModal;
