import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { activeGenres, RootState } from '../../store/reducers/rootReducer';
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
  const { tracks, isSetAccessToken } = useSelector((state: RootState) => state);
  const {
    genres: isActiveGenreModal,
    options: isActiveOptionModal,
    handBook: isActiveHandBook,
  } = useSelector((state: RootState) => state.activeComponent);

  useEffect(() => {
    if (!FIREBASE_UID) navigate('/login');
  }, []);
  useEffect(() => {
    if (isArrayEmpty(tracks) && isSetAccessToken) dispatch(activeGenres());
  }, [isSetAccessToken]);

  return (
    <>
      {isActiveGenreModal && <GenreModal />}
      {isActiveOptionModal && <OptionModal />}
      {isActiveHandBook && <HandBookModal />}
    </>
  );
}

export default Modals;
