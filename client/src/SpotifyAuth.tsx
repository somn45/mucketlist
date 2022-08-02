import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { addAccessToken } from './store/store';

const code = new URLSearchParams(window.location.search).get('code');
const cookies = new Cookies();

function SpotifyAuth() {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    const accessToken = cookies.get('accessToken');
    if (accessToken) {
      dispatch(addAccessToken(accessToken));
      return;
    }
    if (!code) return;
    requestTokens(code);
  }, []);

  useEffect(() => {
    if (accessToken) return;
    refreshAccessToken(accessToken);
  }, [accessToken]);

  const requestTokens = async (code: string): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:3001/spotify/auth', {
        code: code,
        fuid: cookies.get('F_UID'),
      });
      dispatch(addAccessToken(response.data.accessToken));
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  const refreshAccessToken = async (accessToken: string): Promise<void> => {
    const firebaseUid = cookies.get('F_UID');
    const response = await axios.post('http://localhost:3001/spotify/refresh', {
      firebaseUid: firebaseUid,
    });
    dispatch(addAccessToken(response.data.accessToken));
  };
  return <div></div>;
}

export default SpotifyAuth;
