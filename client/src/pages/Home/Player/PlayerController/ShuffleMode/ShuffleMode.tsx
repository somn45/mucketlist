import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Icon from '../../../../../components/Icon';
import {
  RootState,
  updatePlayMode,
} from '../../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../../store/store';

function ShuffleMode() {
  const playMode = useSelector((state: RootState) => state.playMode);
  const dispatch = useAppDispatch();
  const handleShuffleMode = async () => {
    if (playMode === 'normal') dispatch(updatePlayMode('shuffle'));
    else dispatch(updatePlayMode('normal'));
  };
  return (
    <button onClick={handleShuffleMode}>
      <Icon icon={faShuffle} />
    </button>
  );
}

export default ShuffleMode;
