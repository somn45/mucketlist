import { useSelector } from 'react-redux';
import {
  RootState,
  updatePlayState,
} from '../../../../../store/reducers/rootReducer';
import { getTrackProgress } from '../../../../../store/reducers/thunk/progress';
import { useAppDispatch } from '../../../../../store/store';
import { ButtonProps } from '../../../../../utils/types/atomTypes';

interface TogglePlayButtonProps extends ButtonProps {
  player: Spotify.Player | null;
  onPlay: {
    (uri: string): void;
  };
}

function TogglePlayButton({
  value,
  player,
  onPlay,
}: Omit<TogglePlayButtonProps, 'onClick'>) {
  const dispatch = useAppDispatch();
  const tracks = useSelector((state: RootState) => state.tracks);
  const isPlay = useSelector((state: RootState) => state.isPlay);
  const playingPosition = useSelector(
    (state: RootState) => state.playingPosition
  );

  const onPause = async () => {
    if (!player) return;
    dispatch(getTrackProgress(player));
    player?.pause();
    dispatch(updatePlayState(false));
  };

  //

  return (
    <button
      onClick={isPlay ? onPause : () => onPlay(tracks[playingPosition].uri)}
    >
      {value}
    </button>
  );
}

export default TogglePlayButton;
