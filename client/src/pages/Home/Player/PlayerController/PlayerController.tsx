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

interface PlayControllerProps extends IPlayerContext {
  onPlay: {
    (uri: string): void;
  };
}

const PlayerControllerWrap = styled.div`
  width: 180px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  return (
    <>
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
      </PlayerControllerWrap>
      <VolumeMixerWrap
        onMouseEnter={() => setIsShowVolumeMixer(true)}
        onMouseLeave={() => setIsShowVolumeMixer(false)}
      >
        <VolumeButton player={player} />
        {isShowVolumeMixer ? <VolumeMixer player={player} /> : <></>}
      </VolumeMixerWrap>
    </>
  );
}

export default PlayerController;
