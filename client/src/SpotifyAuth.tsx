import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const code = new URLSearchParams(window.location.search).get('code');
const cookies = new Cookies();

function SpotifyAuth() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    if (!code) return;
    requestTokens(code);
  }, []);

  const requestTokens = async (code: string) => {
    try {
      const response = await axios.post('http://localhost:3001/spotify/auth', {
        code: code,
        fuid: cookies.get('F_UID'),
      });
      cookies.set('accessToken', response.data.accessToken, {
        maxAge: response.data.expiresIn,
      });
      setAccessToken(response.data.accessToken);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return <div></div>;
}

export default SpotifyAuth;
