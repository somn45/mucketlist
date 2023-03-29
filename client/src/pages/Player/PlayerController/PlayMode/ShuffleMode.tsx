import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Icon from '../../../../components/Icon';
import {
  RootState,
  updatePlayMode,
} from '../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../store/store';
import { PlayModeButton } from '../../../../styles/player/playerStyle';
import { IPlayerContext } from '../../../../types/playerTypes/playerTypes';
import {
  clearRepeatMode,
  clearShuffleMode,
  setShuffleMode,
} from '../../../../utils/functions/changePlayMode';
import getToken from '../../../../utils/functions/getToken';

function ShuffleMode({ deviceId }: Omit<IPlayerContext, 'player'>) {
  const playMode = useSelector((state: RootState) => state.playMode);
  const dispatch = useAppDispatch();

  const handleShuffleMode = async () => {
    if (playMode === 'normal') {
      setShuffleMode();
      dispatch(updatePlayMode('shuffle'));
    }
    if (playMode === 'repeat') {
      await clearRepeatMode();
      await setShuffleMode();
      dispatch(updatePlayMode('shuffle'));
    }
    if (playMode === 'shuffle') {
      clearShuffleMode();
      dispatch(updatePlayMode('normal'));
    }
  };

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
