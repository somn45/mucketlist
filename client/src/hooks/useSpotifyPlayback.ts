import { useState, useEffect } from 'react';
import { playerType } from '../types/playerTypes/playerTypes';
import axios from 'axios';
import { SERVER_ENDPOINT } from '../constants/constants';
import { AuthAxiosResponse } from '../SpotifyAuth';

type useSpotifyPlayBackProps = [
  playerType,
  string,
  boolean,
  Spotify.PlaybackState | null
];

const useSpotifyPlayBack = (): useSpotifyPlayBackProps => {
  const [player, setPlayer] = useState<playerType>(null);
  const [deviceId, setDeviceId] = useState('');
  const [loading, setLoading] = useState(true);
  const [playState, setPlayState] = useState<Spotify.PlaybackState | null>(
    null
  );

  const createSpotifyPlayBack = async () => {
    const { data: tokenData } = await axios.get<AuthAxiosResponse>(
      `${SERVER_ENDPOINT}/cookies/send`,
      {
        withCredentials: true,
      }
    );
    const accessToken = tokenData.accessToken;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Mucketlist Player SDK',
        getOAuthToken: (cb) => {
          cb(accessToken);
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
  };

  useEffect(() => {
    createSpotifyPlayBack();
  }, []);
  return [player, deviceId, loading, playState];
};

export default useSpotifyPlayBack;
