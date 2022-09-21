import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import Player from './pages/Player';
import { PlayerContext } from './PlayerContext';

import getTokens from './utils/functions/getTokens';

export interface IPlayerContext {
  player: Spotify.Player | null;
  deviceId: string;
}

function WebPlayback() {
  const dispatch = useDispatch();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState('');
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Mucketlist Player SDK',
        getOAuthToken: (cb) => {
          cb(getTokens());
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.connect();
    };
  }, []);

  return (
    <PlayerContext.Provider value={{ player, deviceId }}>
      <Player />
    </PlayerContext.Provider>
  );
}

export default WebPlayback;
