import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Icon from '../../../../components/Icon';
import {
  RootState,
  updatePlayMode,
} from '../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../store/store';
import { PlayModeButton } from '../../../../styles/player/playerStyle';

function ShuffleMode() {
  const playMode = useSelector((state: RootState) => state.playMode);
  const dispatch = useAppDispatch();
  const handleShuffleMode = async () =>
    playMode === 'normal'
      ? dispatch(updatePlayMode('shuffle'))
      : dispatch(updatePlayMode('normal'));

  return (
    <PlayModeButton
      isShuffle={playMode === 'shuffle'}
      onClick={handleShuffleMode}
    >
      <Icon icon={faShuffle} />
    </PlayModeButton>
  );
}

export default ShuffleMode;
