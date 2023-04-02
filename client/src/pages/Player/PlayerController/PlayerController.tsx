import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import Icon from '../../../components/Icon';
import NextTrackButton from './TrackShfiting/NextTrackButton';
import { useEffect } from 'react';

import PrevTrackButton from './TrackShfiting/PrevTrackButton';
import RepeatMode from './PlayMode/RepeatMode';
import ShuffleMode from './PlayMode/ShuffleMode';
import TogglePlayButton from './TrackShfiting/TogglePlayButton';
import PlayerControllerWrap from './Wrap/PlayerControllerWrap';
import VolumeButton from './VolumeController/VolumeButton';
import VolumeMixer from './VolumeController/VolumeMixer';
import VolumeMixerWrap from './VolumeController/VolumeMixerWrap';

import { IPlayerContext } from '../../../types/playerTypes/playerTypes';

import {
  clearPlayingTrack,
  RootState,
  updatePlayState,
} from '../../../store/reducers/rootReducer';
import isArrayEmpty from '../../../utils/functions/isArrayEmpty';
interface PlayControllerProps extends IPlayerContext {
  onPlay: {
    (uri: string): void;
  };
}

function PlayerController({ player, deviceId, onPlay }: PlayControllerProps) {
  const dispatch = useDispatch();
  const [isShowVolumeMixer, setIsShowVolumeMixer] = useState(false);
  const { tracks, isPlay } = useSelector((state: RootState) => state);
  useEffect(() => {
    if (!tracks || isArrayEmpty(tracks)) {
      dispatch(updatePlayState(false));
      dispatch(clearPlayingTrack());
    }
  }, [tracks]);

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
