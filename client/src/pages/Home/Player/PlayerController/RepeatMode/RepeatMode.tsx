import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Icon from '../../../../../components/Icon';
import {
  RootState,
  updatePlayMode,
} from '../../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../../store/store';

function RepeatMode() {
  const playMode = useSelector((state: RootState) => state.playMode);
  const dispatch = useAppDispatch();
  const handleRepeatMode = () => {
    dispatch(updatePlayMode('repeat'));
    if (playMode === 'normal') dispatch(updatePlayMode('repeat'));
    else dispatch(updatePlayMode('normal'));
  };
  return (
    <button onClick={handleRepeatMode}>
      <Icon icon={faRepeat} />
    </button>
  );
}

export default RepeatMode;
