import axios from 'axios';
import { getAccessToken } from './accessToken';

interface PlayProps {
  spotify_uri: string;
  device_id: string;
  playerInstance: {
    _options: Spotify.PlayerInit;
  };
}

const play = ({
  spotify_uri,
  device_id,
  playerInstance: {
    _options: { getOAuthToken },
  },
}: PlayProps) => {
  getOAuthToken(async (accessToken: string) => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
      {
        uris: [spotify_uri],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
  });
};

export default play;
