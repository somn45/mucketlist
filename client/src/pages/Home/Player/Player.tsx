import { useState, useEffect, useContext } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { PlayerContext } from '../../../PlayerContext';
import {
  moveNextPosition,
  movePreviousPosition,
} from '../../../store/reducers/rootReducer';
import play from '../../../utils/functions/play';
import { TrackState } from '../TrackList/TrackList';

import GetPositionButton from './GetPositionButton/GetPositionButton';
import GetStateButton from './GetStateButton/GetStateButton';
import NextTrackButton from './NextTrackButton/NextTrackButton';
import PrevTrackButton from './PrevTrackButton/PrevTrackButton';
import RepeatMode from './RepeatMode/RepeatMode';
import ShuffleMode from './ShuffleMode/ShuffleMode';
import TogglePlayButton from './TogglePlayButton/TogglePlayButton';
import VolumeButton from './VolumeButton/VolumeButton';
import VolumeMixer from './VolumeMixer/VolumeMixer';

interface PlayerState {
  tracks: TrackState[];
  playback: {
    playingPosition: number;
    playMode: string;
  };
}

const PlayerWrap = styled.div`
  background-color: white;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
`;

function Player({ tracks, playback }: PlayerState) {
  const dispatch = useDispatch();
  const [isPlay, setIsPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prevVolume, setPrevVolume] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const [isShowVolumeMixer, setIsShowVolumeMixer] = useState(false);
  const [isFinishTrackPlay, setIsFinishTrackPlay] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const { player, deviceId } = useContext(PlayerContext);

  const onPlay = (uri: string): void => {
    if (!player) return;
    if (progress === 0 || progress === undefined) {
      {
        play({
          spotify_uri: uri,
          device_id: deviceId,
          playerInstance: player,
        });
      }
    } else {
      player?.resume();
      console.log('resume');
    }
    setIsPlay(true);
  };

  const onPause = async () => {
    const trackProgress = await getTrackProgress();

    if (!trackProgress) setProgress(0);
    else setProgress(trackProgress);
    player?.pause();
    setIsPlay(false);
  };
  const getState = () => {
    player?.getCurrentState().then((data) => {
      console.log(data);
      console.log(data?.position, data?.duration);
    });
  };

  const getTrackProgress = async () => {
    const data = await player?.getCurrentState();
    if (!data) return;
    return data.position;
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const volume = Number(e.target.value);
    setCurrentVolume(volume);

    player?.setVolume(volume);
  };
  const toggleVolume = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!player) return;
    const volume = await player.getVolume();
    if (volume === 0) await player.setVolume(prevVolume);
    else await player.setVolume(0);
    setPrevVolume(volume);
    setCurrentVolume(await player.getVolume());
  };
  const onPreviousTrack = () => {
    setProgress(0);
    dispatch(movePreviousPosition(1));
    setIsPlay(true);
  };
  const onNextTrack = () => {
    setProgress(0);
    console.log('on next track', playback.playingPosition);
    dispatch(moveNextPosition(1));
    setIsPlay(true);
  };
  const handleRepeatMode = () => {
    setIsRepeat((prevState) => !prevState);
    setIsShuffle(false);
  };
  const handleShuffleMode = async () => {
    setIsShuffle((prevState) => !prevState);
    setIsRepeat(false);
  };

  return (
    <PlayerWrap>
      <TogglePlayButton
        value={isPlay ? 'pause' : 'play'}
        onClick={
          isPlay ? onPause : () => onPlay(tracks[playback.playingPosition].uri)
        }
      />
      <VolumeMixer
        currentRange={currentVolume}
        onChange={handleVolume}
        onClick={toggleVolume}
      />
      <VolumeButton
        value="Volume"
        onClick={() => setIsShowVolumeMixer((prevState) => !prevState)}
      />
      <PrevTrackButton onClick={onPreviousTrack} />
      <NextTrackButton onClick={onNextTrack} />
      <GetStateButton onClick={getState} />
      <GetPositionButton
        onClick={() => console.log(playback.playingPosition)}
      />
      <RepeatMode onClick={handleRepeatMode} />
      <ShuffleMode onClick={handleShuffleMode} />
    </PlayerWrap>
  );
}

const mapStateToProps = (state: PlayerState) => {
  return {
    tracks: state.tracks,
    playback: state.playback,
  };
};

export default connect(mapStateToProps)(Player);
