import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import GenreModalWrap from './ModalWrap/GenreModalWrap';
import GenreModalTitle from './Title/GenreModalTitle';
import GenreModalForm from './Form/GenreModalForm';
import GenreModalCheckBoxList from './CheckboxList/GenreModalCheckBoxList';
import {
  activeOptions,
  clearGenres,
  createTracks,
  RootState,
} from '../../../store/reducers/rootReducer';
import GenreModalSubmit from './Submit/GenreModalSubmit';

import { ITrack } from '../../../types/trackTypes/trackTypes';

import getToken from '../../../utils/functions/getToken';
import { useAppDispatch } from '../../../store/store';
import { SERVER_ENDPOINT } from '../../../constants/constants';

interface SearchTrackAxiosReponse {
  tracks: ITrack[];
}

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
    const searchTrackQuery = {
      accessToken: getToken('accessToken'),
      genres: JSON.stringify(selectedGenres),
    };
    const urlParams = new URLSearchParams(searchTrackQuery).toString();
    console.log(urlParams);
    const { data } = await axios.get<SearchTrackAxiosReponse>(
      `${SERVER_ENDPOINT}/tracks/search?${urlParams}`
    );
    console.log(data);
    dispatch(createTracks(data.tracks));
    setTimeout(() => dispatch(activeOptions()), 600);
  };

  return (
    <GenreModalWrap isActive={isActive.genres}>
      <GenreModalForm>
        <GenreModalTitle />
        <GenreModalCheckBoxList />
        <GenreModalSubmit onClick={searchTracksToGenre} />
      </GenreModalForm>
    </GenreModalWrap>
  );
}

export default GenreModal;
