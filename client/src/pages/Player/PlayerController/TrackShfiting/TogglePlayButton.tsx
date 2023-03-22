import { useSelector } from 'react-redux';

import { ButtonProps } from '../../../../types/atomTypes/atom';
import { playerType } from '../../../../types/playerTypes/playerTypes';

import {
  RootState,
  updatePlayState,
} from '../../../../store/reducers/rootReducer';
import { getTrackProgress } from '../../../../store/reducers/thunk/progress';
import { useAppDispatch } from '../../../../store/store';

interface TogglePlayButtonProps extends ButtonProps {
  player: playerType;
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
  const { tracks, isPlay, playingPosition } = useSelector(
    (state: RootState) => state
  );
  const onPause = async () => {
    if (!player) return;
    dispatch(getTrackProgress(player));
    player?.pause();
    dispatch(updatePlayState(false));
  };

  return (
    <button
      onClick={isPlay ? onPause : () => onPlay(tracks[playingPosition].uri)}
    >
      {value}
    </button>
  );
}

export default TogglePlayButton;
