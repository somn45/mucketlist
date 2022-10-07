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
    let errorCost = 0;
    setTimeout(retryPlay, 3000);
    errorCost++;
    if (errorCost > 5) {
      console.log(
        '재시도 횟수가 초과되었습니다. 플레이 버튼을 다시 눌러주세요. '
      );
    }
  }
};

const retryPlay = () => {};

export default play;
