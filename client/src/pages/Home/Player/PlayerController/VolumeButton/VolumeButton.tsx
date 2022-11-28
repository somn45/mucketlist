import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Icon from '../../../../../components/Icon';
import { PlayerType } from '../../../../../PlayerContext';
import {
  RootState,
  toggleVolume,
} from '../../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../../store/store';

interface VolumeButtonProps {
  player: Spotify.Player | null;
}

function VolumeButton({ player }: VolumeButtonProps) {
  const { volume, prevVolume } = useSelector(
    (state: RootState) => state.volume
  );
  const dispatch = useAppDispatch();

  const handleToggleVolume = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!player) return;
    volume === 0 ? convertUnmuteMode(player) : convertMuteMode(player);
    dispatch(toggleVolume());
  };

  const convertUnmuteMode = async (player: PlayerType) =>
    await player?.setVolume(prevVolume);

  const convertMuteMode = async (player: PlayerType) =>
    await player?.setVolume(0);

  return (
    <button onClick={handleToggleVolume}>
      <Icon icon={faVolumeUp} />
    </button>
  );
}

export default VolumeButton;
