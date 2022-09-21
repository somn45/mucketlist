import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PlayerContext } from '../PlayerContext';
import play from '../utils/functions/play';
import { connect, useDispatch } from 'react-redux';
import { TrackState } from './Settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import {
  moveNextPosition,
  movePreviousPosition,
  switchShuffleMode,
  swtichRepeatMode,
} from '../store/reducers/rootReducer';

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

const VolumeButton = styled.button``;

function Player({ tracks, playback }: PlayerState) {
  const dispatch = useDispatch();
  const playerState = useContext(PlayerContext);
  const [isPlay, setIsPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prevVolume, setPrevVolume] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const [isShowVolumeMixer, setIsShowVolumeMixer] = useState(false);
  const [isFinishTrackPlay, setIsFinishTrackPlay] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  console.log(isShuffle, isRepeat);

  useEffect(() => {
    const player = playerState.player;
    if (!player) return;
    detectFinishTrackPlay(player);
  }, [playerState.deviceId]);

  useEffect(() => {
    console.log(playback.playingPosition);
    onPlay(tracks[playback.playingPosition].uri);
  }, [playback.playingPosition]);

  useEffect(() => {
    if (!isFinishTrackPlay) return;
    setIsFinishTrackPlay(false);
    if (isRepeat) {
      dispatch(swtichRepeatMode());
      onPlay(tracks[playback.playingPosition].uri);
    } else if (isShuffle) dispatch(switchShuffleMode());
    else dispatch(moveNextPosition(1));
  }, [isFinishTrackPlay]);

  const detectFinishTrackPlay = (player: Spotify.Player) => {
    player.addListener('player_state_changed', async (state) => {
      if (!player) return;
      console.log('Player state changed', state);
      console.log('Playing Track', state.track_window.current_track.name);
      if (state.duration <= state.position) {
        setProgress(0);
        setIsFinishTrackPlay(true);
      }
    });
  };

  const onPlay = (uri: string): void => {
    console.log(playback.playingPosition);
    const player = playerState.player;
    if (!playerState.player) return;
    if (progress === 0 || progress === undefined) {
      {
        play({
          spotify_uri: uri,
          device_id: playerState.deviceId,
          playerInstance: playerState.player,
        });
      }
    } else {
      player?.resume();
      console.log('resume');
    }
    setIsPlay(true);
  };
  const onPause = async () => {
    const player = playerState.player;
    const trackProgress = await getTrackProgress();

    if (!trackProgress) setProgress(0);
    else setProgress(trackProgress);
    player?.pause();
    setIsPlay(false);
  };
  const getState = () => {
    const player = playerState.player;
    player?.getCurrentState().then((data) => {
      console.log(data);
      console.log(data?.position, data?.duration);
    });
  };

  const getTrackProgress = async () => {
    const player = playerState.player;
    const data = await player?.getCurrentState();
    if (!data) return;
    return data.position;
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const volume = Number(e.target.value);
    setCurrentVolume(volume);
    const player = playerState.player;
    player?.setVolume(volume);
  };
  const toggleVolume = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const player = playerState.player;
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
      <button
        onClick={
          isPlay ? onPause : () => onPlay(tracks[playback.playingPosition].uri)
        }
      >
        {isPlay ? 'pause' : 'play'}
      </button>
      <div>
        {!isShowVolumeMixer ? null : (
          <>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={currentVolume}
              onChange={handleVolume}
            />
            <div onClick={toggleVolume}>
              <FontAwesomeIcon icon={faVolumeUp} />
            </div>
          </>
        )}
        <VolumeButton
          onClick={() => setIsShowVolumeMixer((prevState) => !prevState)}
        >
          Volume
        </VolumeButton>
      </div>
      <button onClick={onPreviousTrack}>previousTrack</button>
      <button onClick={onNextTrack}>nextTrack</button>
      <button onClick={getState}>getState</button>
      <button onClick={() => console.log(playback.playingPosition)}>
        getPosition
      </button>
      <button onClick={handleRepeatMode}>repeat</button>
      <button onClick={handleShuffleMode}>shuffle</button>
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
