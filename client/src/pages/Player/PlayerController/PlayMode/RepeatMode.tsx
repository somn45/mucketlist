import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Icon from '../../../../components/Icon';
import {
  RootState,
  updatePlayMode,
} from '../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../store/store';
import { PlayModeButton } from '../../../../styles/player/playerStyle';

function RepeatMode() {
  const playMode = useSelector((state: RootState) => state.playMode);
  const dispatch = useAppDispatch();
  const handleRepeatMode = () => {
    playMode === 'normal'
      ? dispatch(updatePlayMode('repeat'))
      : dispatch(updatePlayMode('normal'));
  };
  return (
    <PlayModeButton isRepeat={playMode === 'repeat'} onClick={handleRepeatMode}>
      <Icon icon={faRepeat} />
    </PlayModeButton>
  );
}

export default RepeatMode;
