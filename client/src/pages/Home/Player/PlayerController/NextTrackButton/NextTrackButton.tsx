import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../../../../components/Icon';
import {
  clearTrackProgress,
  moveNextPosition,
  updatePlayState,
} from '../../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../../store/store';

interface NextTrackButtonProps {
  player: Spotify.Player | null;
}

function NextTrackButton({ player }: NextTrackButtonProps) {
  const dispatch = useAppDispatch();

  const onNextTrack = () => {
    if (!player) return;
    dispatch(clearTrackProgress());
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
