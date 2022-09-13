import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PlayerContext } from '../PlayerContext';
import play from '../utils/functions/play';
import { connect } from 'react-redux';
import { TrackState } from './Settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { AxiosError } from 'axios';

interface PlayerState {
  tracks: TrackState[];
}

const PlayerWrap = styled.div`
  background-color: white;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
`;

const VolumeButton = styled.button``;

const VolumeMixer = styled.div`
  background-color: #bbbbbb;
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-rows: repeat(11, 1fr);
`;

function Player({ tracks }: PlayerState) {
  const playerState = useContext(PlayerContext);
  const [isPlay, isSetPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prevVolume, setPrevVolume] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const [isShowVolumeMixer, setIsShowVolumeMixer] = useState(false);
  const [currentPlayingPosition, setCurrentPlayingPosition] = useState(0);

  useEffect(() => {
    if (!playerState.deviceId) return;
    detectPlayerState();
  }, [playerState.deviceId]);

  const detectPlayerState = () => {
    const player = playerState.player;
    if (!player) return;
    player.addListener('player_state_changed', async (state) => {
      console.log('Player state changed', state);
      console.log('Playing Track', state.track_window.current_track.name);
      if (state.position === 0 && state.paused) {
        setTimeout(() => onNextTrack(), 3000);
      }
    });
  };

  const onPlay = (uri: string): void => {
    const player = playerState.player;
    if (!playerState.player) return;
    console.log(progress);
    if (progress === 0 || progress === undefined) {
      play({
        spotify_uri: uri,
        device_id: playerState.deviceId,
        playerInstance: playerState.player,
      });
    } else {
      player?.resume();
      console.log('resume');
    }
    isSetPlay(true);
  };
  const onPause = async () => {
    const player = playerState.player;
    const trackProgress = await getTrackProgress();
    if (!trackProgress) setProgress(0);
    else setProgress(trackProgress);
    player?.pause();
    isSetPlay(false);
  };
  const getState = () => {
    const player = playerState.player;
    player?.getCurrentState().then((data) => {
      console.log(data);
    });
  };
  const getTrackProgress = async () => {
    const player = playerState.player;
    const data = await player?.getCurrentState();
    if (!data) return;
    return data.position;
  };
  /*
  const toggleVolume = async () => {
    setIsShowVolumeMixer((prevState) => !prevState);
    const player = playerState.player;
    if (!player) return;
    const volume = await player.getVolume();
    if (volume === 0) await player.setVolume(prevVolume);
    else await player.setVolume(0);
    setPrevVolume(volume);
    dispatch(onChangeVolume(await player.getVolume()));
  };
  */
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
    setCurrentPlayingPosition(currentPlayingPosition - 1);
    setProgress(0);
    console.log(currentPlayingPosition);
    onPlay(tracks[currentPlayingPosition - 1].uri);
  };
  const onNextTrack = () => {
    setCurrentPlayingPosition(currentPlayingPosition + 1);
    setProgress(0);
    console.log(currentPlayingPosition);
    onPlay(tracks[currentPlayingPosition + 1].uri);
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
  };
};

export default connect(mapStateToProps)(Player);
