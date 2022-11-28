import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import GenreModal from './GenreModal/GenreModal';
import HandBookModal from './HandBookModal/HandBookModal';
import OptionModal from './OptionModal/OptionModal';

function Modals() {
  const {
    genres: { genres },
  } = useSelector((state: RootState) => state);
  const {
    genres: isActiveGenreModal,
    options: isActiveOptionModal,
    handBook: isActiveHandBook,
  } = useSelector((state: RootState) => state.activeComponent);
  return (
    <>
      {isActiveGenreModal && <GenreModal genres={genres} />}
      {isActiveOptionModal && <OptionModal />}
      {isActiveHandBook && <HandBookModal />}
    </>
  );
}

export default Modals;
