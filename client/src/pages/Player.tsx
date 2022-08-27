import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { PlayerContext } from '../PlayerContext';
import play from '../utils/functions/play';

const PlayerWrap = styled.div`
  background-color: white;
  position: fixed;
  bottom: 0;
`;

function Player() {
  const playerState = useContext(PlayerContext);
  useEffect(() => {}, [playerState.deviceId]);
  const onPlay = () => {
    if (!playerState.player) return;
    play({
      spotify_uri: 'spotify:track:3GEn54OTwjZLkXyI7gSIzZ',
      device_id: playerState.deviceId,
      playerInstance: playerState.player,
    });
  };
  return (
    <PlayerWrap>
      <button onClick={onPlay}>Play</button>
    </PlayerWrap>
  );
}

export default Player;
