import axios from 'axios';
import getToken from './getToken';

export const setRepeatMode = async () => {
  await axios.put(
    `https://api.spotify.com/v1/me/player/repeat?state=track`,
    {
      state: 'track',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken('accessToken')}`,
      },
    }
  );
};

export const clearRepeatMode = async () => {
  await axios.put(
    `https://api.spotify.com/v1/me/player/repeat?state=off`,
    {
      state: 'track',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken('accessToken')}`,
      },
    }
  );
};

export const setShuffleMode = async () => {
  await axios.put(
    `https://api.spotify.com/v1/me/player/shuffle?state=${true}`,
    {
      state: true,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken('accessToken')}`,
      },
    }
  );
};

export const clearShuffleMode = async () => {
  await axios.put(
    `https://api.spotify.com/v1/me/player/shuffle?state=${false}`,
    {
      state: false,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken('accessToken')}`,
      },
    }
  );
};
