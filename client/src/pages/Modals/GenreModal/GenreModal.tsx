import { useEffect } from 'react';
import { useSelector } from 'react-redux';

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

import { useAppDispatch } from '../../../store/store';
import { getSpotifyTracks } from '../../../API';

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
    const tracks = await getSpotifyTracks(selectedGenres);
    dispatch(createTracks(tracks));
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
