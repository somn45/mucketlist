import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import VolumeButton from './VolumeButton/VolumeButton';
import VolumeMixer from './VolumeMixer/VolumeMixer';
import VolumeMixerWrap from './VolumeMixerWrap/VolumeMixerWrap';
import Icon from '../../../../components/Icon';

import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import {
  RootState,
  onChangeVolume,
} from '../../../../store/reducers/rootReducer';
import { IPlayerContext } from '../../../../WebPlayback';

import NextTrackButton from './NextTrackButton/NextTrackButton';
import PrevTrackButton from './PrevTrackButton/PrevTrackButton';
import RepeatMode from './RepeatMode/RepeatMode';
import ShuffleMode from './ShuffleMode/ShuffleMode';
import TogglePlayButton from './TogglePlayButton/TogglePlayButton';
import { useAppDispatch } from '../../../../store/store';
import { getTrackProgress } from '../../../../store/reducers/thunk/progress';

interface PlayControllerProps extends IPlayerContext {
  onPlay: {
    (uri: string): void;
  };
}

const PlayerControllerWrap = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-around;
  position: relative;
  & > button {
    width: 20px;
    height: 20px;
  }
`;

function PlayerController({
  player,
  onPlay,
}: Omit<PlayControllerProps, 'deviceId'>) {
  const [isShowVolumeMixer, setIsShowVolumeMixer] = useState(false);
  const isPlay = useSelector((state: RootState) => state.isPlay);
  const dispatch = useAppDispatch();

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!player) return;
    const volume = Number(e.target.value);
    dispatch(onChangeVolume(volume));
    player?.setVolume(volume);
  };

  return (
    <PlayerControllerWrap>
      <TogglePlayButton
        value={isPlay ? <Icon icon={faPause} /> : <Icon icon={faPlay} />}
        player={player}
        onPlay={onPlay}
      />
      <PrevTrackButton player={player} />
      <NextTrackButton player={player} />
      <RepeatMode />
      <ShuffleMode />
      <VolumeMixerWrap
        onMouseEnter={() => setIsShowVolumeMixer(true)}
        onMouseLeave={() => setIsShowVolumeMixer(false)}
      >
        <VolumeButton player={player} />
        {isShowVolumeMixer ? <VolumeMixer player={player} /> : <></>}
      </VolumeMixerWrap>
    </PlayerControllerWrap>
  );
}

export default PlayerController;
