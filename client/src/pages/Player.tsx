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
} from '../store/reducers/rootReducer';

interface PlayerState {
  tracks: TrackState[];
  currentPlayingPosition: number;
}

const PlayerWrap = styled.div`
  background-color: white;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
`;

const VolumeButton = styled.button``;

function Player({ tracks, currentPlayingPosition }: PlayerState) {
  const dispatch = useDispatch();
  const playerState = useContext(PlayerContext);
  const [isPlay, setIsPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prevVolume, setPrevVolume] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const [isShowVolumeMixer, setIsShowVolumeMixer] = useState(false);

  useEffect(() => {
    const player = playerState.player;
    if (!player) return;
    detectFinishTrackPlay(player);
  }, [playerState.deviceId]);

  useEffect(() => {
    onPlay(tracks[currentPlayingPosition].uri);
  }, [currentPlayingPosition]);

  const detectFinishTrackPlay = (player: Spotify.Player) => {
    player.addListener('player_state_changed', async (state) => {
      if (!player) return;
      console.log('Player state changed', state);
      console.log('Playing Track', state.track_window.current_track.name);
      if (state.duration <= state.position) {
        dispatch(moveNextPosition(1));
      }
    });
  };

  const onPlay = (uri: string): void => {
    console.log(currentPlayingPosition);
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
    console.log(trackProgress);
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
    console.log('on next track', currentPlayingPosition);
    dispatch(moveNextPosition(1));
    setIsPlay(true);
  };
  return (
    <PlayerWrap>
      <button
        onClick={
          isPlay ? onPause : () => onPlay(tracks[currentPlayingPosition].uri)
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
      <button onClick={() => console.log(currentPlayingPosition)}>
        getPosition
      </button>
    </PlayerWrap>
  );
}

const mapStateToProps = (state: PlayerState) => {
  return {
    tracks: state.tracks,
    currentPlayingPosition: state.currentPlayingPosition,
  };
};

export default connect(mapStateToProps)(Player);
