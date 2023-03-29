import { faRepeat } from '@fortawesome/free-solid-svg-icons';
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
  setRepeatMode,
} from '../../../../utils/functions/changePlayMode';
import getToken from '../../../../utils/functions/getToken';

function RepeatMode({ deviceId }: Omit<IPlayerContext, 'player'>) {
  const playMode = useSelector((state: RootState) => state.playMode);
  const dispatch = useAppDispatch();

  const handleRepeatMode = async () => {
    if (playMode === 'normal') {
      setRepeatMode();
      dispatch(updatePlayMode('repeat'));
    }
    if (playMode === 'shuffle') {
      await clearShuffleMode();
      await setRepeatMode();
      dispatch(updatePlayMode('repeat'));
    }
    if (playMode === 'repeat') {
      clearRepeatMode();
      dispatch(updatePlayMode('normal'));
    }
  };

  return (
    <PlayModeButton isRepeat={playMode === 'repeat'} onClick={handleRepeatMode}>
      <Icon icon={faRepeat} />
    </PlayModeButton>
  );
}

export default RepeatMode;
