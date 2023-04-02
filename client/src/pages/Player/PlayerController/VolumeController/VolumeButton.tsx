import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { IPlayer, playerType } from '../../../../types/playerTypes/playerTypes';

import Icon from '../../../../components/Icon';
import {
  RootState,
  toggleVolume,
} from '../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../store/store';

function VolumeButton({ player }: IPlayer) {
  const { volume, prevVolume, mute } = useSelector(
    (state: RootState) => state.volume
  );
  const dispatch = useAppDispatch();

  const handleToggleVolume = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!player) return;
    mute ? convertUnmuteMode(player) : convertMuteMode(player);
    dispatch(toggleVolume());
  };

  const convertUnmuteMode = async (player: playerType) =>
    await player?.setVolume(prevVolume);

  const convertMuteMode = async (player: playerType) =>
    await player?.setVolume(0);

  return (
    <button onClick={handleToggleVolume}>
      {volume === 0 ? <Icon icon={faVolumeMute} /> : <Icon icon={faVolumeUp} />}
    </button>
  );
}

export default VolumeButton;
