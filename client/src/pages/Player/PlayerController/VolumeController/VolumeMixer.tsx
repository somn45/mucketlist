import { useSelector } from 'react-redux';

import {
  VolumeMixerContainer,
  VolumeRange,
} from '../../../../styles/player/playerStyle';
import { IPlayer } from '../../../../types/playerTypes/playerTypes';

import {
  onChangeVolume,
  RootState,
} from '../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../store/store';

function VolumeMixer({ player }: IPlayer) {
  const { volume, mute } = useSelector((state: RootState) => state.volume);
  const dispatch = useAppDispatch();

  const handleVolume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentVolume = Number(e.target.value);
    await player?.setVolume(currentVolume);
    dispatch(onChangeVolume(currentVolume));
    console.log(volume);
  };

  return (
    <VolumeMixerContainer>
      <VolumeRange
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolume}
      />
    </VolumeMixerContainer>
  );
}

export default VolumeMixer;
