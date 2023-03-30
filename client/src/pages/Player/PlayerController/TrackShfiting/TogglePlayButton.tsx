import { useSelector } from 'react-redux';

import { ButtonProps } from '../../../../types/atomTypes/atom';
import { playerType } from '../../../../types/playerTypes/playerTypes';

import {
  RootState,
  updatePlayState,
} from '../../../../store/reducers/rootReducer';
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
    player?.pause();
    dispatch(updatePlayState(false));
  };

  const handlePlay = (uri: string) => {
    if (!player) return;
    player.activateElement();
    onPlay(uri);
  };

  return (
    <button
      onClick={isPlay ? onPause : () => handlePlay(tracks[playingPosition].uri)}
    >
      {value}
    </button>
  );
}

export default TogglePlayButton;
