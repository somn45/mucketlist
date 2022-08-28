import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PlayerContext } from '../PlayerContext';
import play from '../utils/functions/play';
import { useDispatch } from 'react-redux';

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

function Player() {
  const playerState = useContext(PlayerContext);
  const [isPlay, isSetPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prevVolume, setPrevVolume] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const [isShowVolumeMixer, setIsShowVolumeMixer] = useState(false);
  console.log(currentVolume);
  useEffect(() => {}, [playerState.deviceId]);
  const onPlay = () => {
    const player = playerState.player;
    if (!playerState.player) return;
    if (progress === 0 || progress === undefined) {
      play({
        spotify_uri: 'spotify:track:6yPUKT5y3u6om1YCuKRuml',
        device_id: playerState.deviceId,
        playerInstance: playerState.player,
      });
    } else {
      player?.resume();
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
    player?.getCurrentState().then((data) => {});
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
  return (
    <PlayerWrap>
      <button onClick={isPlay ? onPause : onPlay}>
        {isPlay ? 'pause' : 'play'}
      </button>
      <div>
        {!isShowVolumeMixer ? null : (
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={currentVolume}
            onChange={handleVolume}
          />
        )}
        <VolumeButton
          onClick={() => setIsShowVolumeMixer((prevState) => !prevState)}
        >
          Volume
        </VolumeButton>
      </div>
      <button onClick={getState}>getState</button>
    </PlayerWrap>
  );
}

export default Player;
