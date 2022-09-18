import axios, { AxiosError } from 'axios';
import getTokens from './getTokens';

interface PlayProps {
  spotify_uri: string;
  device_id: string;
  playerInstance: Spotify.Player;
}

interface PlayError extends PlayProps {
  error: AxiosError;
}

const play = ({ spotify_uri, device_id, playerInstance }: PlayProps) => {
  const {
    _options: { getOAuthToken },
  } = playerInstance;
  getOAuthToken(async (accessToken: string) => {
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
        {
          uris: [spotify_uri],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokens()}`,
          },
        }
      );
    } catch (error) {
      if (error instanceof AxiosError)
        handlePlayerStateError({
          error,
          spotify_uri,
          device_id,
          playerInstance,
        });
      else console.log(error);
    }
  });
};

const handlePlayerStateError = ({
  error,
  spotify_uri,
  device_id,
  playerInstance,
}: PlayError) => {
  if (error.response?.status === 502 || error.response?.status === 404) {
    setTimeout(() => {
      console.log('Spotify api 네트워크 오류로 인해 트랙 재생을 재시도합니다.');
      play({ spotify_uri, device_id, playerInstance });
    }, 3000);
  }
};

export default play;
