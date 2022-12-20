import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { activeGenres, RootState } from '../../store/reducers/rootReducer';
import { getSpotifyGenreList } from '../../store/reducers/thunk/genres';
import { useAppDispatch } from '../../store/store';
import getToken from '../../utils/functions/getToken';
import isArrayEmpty from '../../utils/functions/isArrayEmpty';
import GenreModal from './GenreModal/GenreModal';
import HandBookModal from './HandBookModal/HandBookModal';
import OptionModal from './OptionModal/OptionModal';

const FIREBASE_UID = getToken('firebaseUid');

function Modals() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    tracks,
    isSetAccessToken,
    genres: { genres, loading },
  } = useSelector((state: RootState) => state);
  const {
    genres: isActiveGenreModal,
    options: isActiveOptionModal,
    handBook: isActiveHandBook,
  } = useSelector((state: RootState) => state.activeComponent);

  useEffect(() => {
    if (!FIREBASE_UID) navigate('/login');
    if (isSetAccessToken)
      dispatch(getSpotifyGenreList(getToken('accessToken')));
  }, [isSetAccessToken]);
  useEffect(() => {
    if (isArrayEmpty(tracks) && !loading) dispatch(activeGenres());
  }, [loading, isSetAccessToken]);

  return (
    <>
      {isActiveGenreModal && <GenreModal genres={genres} />}
      {isActiveOptionModal && <OptionModal />}
      {isActiveHandBook && <HandBookModal />}
    </>
  );
}

export default Modals;
