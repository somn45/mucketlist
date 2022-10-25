import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../../../../components/Icon';
import {
  clearTrackProgress,
  movePreviousPosition,
  updatePlayState,
} from '../../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../../store/store';
interface PrevTrackButton {
  player: Spotify.Player | null;
}

function PrevTrackButton({ player }: PrevTrackButton) {
  const dispatch = useAppDispatch();
  const onPreviousTrack = () => {
    if (!player) return;
    dispatch(clearTrackProgress());
    dispatch(movePreviousPosition());
    dispatch(updatePlayState(true));
  };

  return (
    <button onClick={onPreviousTrack}>
      <Icon icon={faBackwardStep} />
    </button>
  );
}

export default PrevTrackButton;
