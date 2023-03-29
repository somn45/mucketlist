import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers/rootReducer';
import { playerType } from '../types/playerTypes/playerTypes';
import getToken from '../utils/functions/getToken';

type useSpotifyPlayBackProps = [
  playerType,
  string,
  boolean,
  Spotify.PlaybackState | null
];

const useSpotifyPlayBack = (): useSpotifyPlayBackProps => {
  const isActive = useSelector((state: RootState) => state.activeComponent);
  const [player, setPlayer] = useState<playerType>(null);
  const [deviceId, setDeviceId] = useState('');
  const [loading, setLoading] = useState(true);
  const [playState, setPlayState] = useState<Spotify.PlaybackState | null>(
    null
  );

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Mucketlist Player SDK',
        getOAuthToken: (cb) => {
          cb(getToken('accessToken'));
        },
        volume: 0.5,
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
        setLoading(false);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', async (state) => {
        setPlayState(state);
      });

      player.connect();
      setPlayer(player);
    };
  }, []);
  return [player, deviceId, loading, playState];
};

export default useSpotifyPlayBack;
