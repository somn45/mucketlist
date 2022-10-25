import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Icon from '../../../../../components/Icon';
import {
  RootState,
  toggleVolume,
} from '../../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../../store/store';

interface VolumeButtonProps {
  player: Spotify.Player | null;
}

function VolumeButton({ player }: VolumeButtonProps) {
  const volume = useSelector((state: RootState) => state.volume.volume);
  const prevVolume = useSelector((state: RootState) => state.volume.prevVolume);
  const dispatch = useAppDispatch();
  console.log(volume);
  console.log(prevVolume);

  const handleToggleVolume = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!player) return;
    if (volume === 0) {
      await player.setVolume(prevVolume);
      dispatch(toggleVolume());
    } else {
      dispatch(toggleVolume());
      await player.setVolume(0);
    }
  };
  return (
    <button onClick={handleToggleVolume}>
      <Icon icon={faVolumeUp} />
    </button>
  );
}

export default VolumeButton;
