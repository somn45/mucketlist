import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { addAccessToken, getAccessToken } from './utils/functions/accessToken';

const code = new URLSearchParams(window.location.search).get('code');

const cookies = new Cookies();

function SpotifyAuth() {
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    if (getAccessToken()) setAccessToken(getAccessToken());
    if (!code) return;
    requestTokens(code);
  }, []);

  useEffect(() => {
    if (getAccessToken()) return;
    refreshAccessToken();
  }, [accessToken]);

  const requestTokens = async (code: string): Promise<void> => {
    try {
      const response = await axios.post(
        'http://localhost:3001/users/spotify/auth',
        {
          code: code,
          fuid: cookies.get('F_UID'),
        }
      );
      addAccessToken(response.data.accessToken);
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  const refreshAccessToken = async (): Promise<void> => {
    const firebaseUid = cookies.get('F_UID');
    const response = await axios.post(
      'http://localhost:3001/users/spotify/refresh',
      {
        firebaseUid: firebaseUid,
      }
    );
    addAccessToken(response.data.accessToken);
  };
  return <div></div>;
}

export default SpotifyAuth;
