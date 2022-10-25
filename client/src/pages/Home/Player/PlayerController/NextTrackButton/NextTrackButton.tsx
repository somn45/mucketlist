import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Icon from '../../../../../components/Icon';
import {
  clearTrackProgress,
  moveNextPosition,
  RootState,
  updatePlayState,
} from '../../../../../store/reducers/rootReducer';
import { getTrackProgress } from '../../../../../store/reducers/thunk/progress';
import { useAppDispatch } from '../../../../../store/store';

interface NextTrackButtonProps {
  player: Spotify.Player | null;
}

function NextTrackButton({ player }: NextTrackButtonProps) {
  const dispatch = useAppDispatch();
  const playingPosition = useSelector(
    (state: RootState) => state.playingPosition
  );

  const onNextTrack = () => {
    if (!player) return;
    dispatch(clearTrackProgress());
    console.log('on next track', playingPosition);
    dispatch(moveNextPosition());
    dispatch(updatePlayState(true));
  };
  return (
    <button onClick={onNextTrack}>
      <Icon icon={faForwardStep} />
    </button>
  );
}

export default NextTrackButton;
