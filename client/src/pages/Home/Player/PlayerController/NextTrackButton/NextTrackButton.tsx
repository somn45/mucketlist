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
  clearProgress: React.Dispatch<React.SetStateAction<number>>;
}

function NextTrackButton({ player, clearProgress }: NextTrackButtonProps) {
  const dispatch = useAppDispatch();

  const onNextTrack = () => {
    if (!player) return;
    clearProgress(0);
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
