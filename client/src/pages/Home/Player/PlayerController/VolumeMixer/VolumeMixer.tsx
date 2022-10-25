import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  onChangeVolume,
  RootState,
} from '../../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../../store/store';

interface VolumeMixerProps {
  player: Spotify.Player | null;
}

const VolumeMixerWrap = styled.div`
  margin-left: 5px;
`;

const RangeStyle = styled.input`
  width: 100px;
`;

function VolumeMixer({ player }: VolumeMixerProps) {
  const volume = useSelector((state: RootState) => state.volume.volume);
  const dispatch = useAppDispatch();
  const handleVolume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!player) return;
    const currentVolume = Number(e.target.value);
    dispatch(onChangeVolume(currentVolume));
    await player.setVolume(currentVolume);
  };

  return (
    <VolumeMixerWrap>
      <RangeStyle
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolume}
      />
    </VolumeMixerWrap>
  );
}

export default VolumeMixer;
