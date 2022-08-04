import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { connect, useDispatch } from 'react-redux';
import { addAccessToken } from './store/store';

interface SpotifyAuthProps {
  accessToken: string;
}

interface SpotifyAuthState {
  accessToken: string;
}

const code = new URLSearchParams(window.location.search).get('code');
const cookies = new Cookies();

function SpotifyAuth({ accessToken }: SpotifyAuthProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken) {
      dispatch(addAccessToken(accessToken));
      return;
    }
    if (!code) return;
    requestTokens(code);
  }, []);

  useEffect(() => {
    if (accessToken) return;
    setTimeout(() => {
      refreshAccessToken(accessToken);
    }, 1000);
  }, []);

  const requestTokens = async (code: string): Promise<void> => {
    try {
      const response = await axios.post(
        'http://localhost:3001/users/spotify/auth',
        {
          code: code,
          fuid: cookies.get('F_UID'),
        }
      );
      dispatch(addAccessToken(response.data.accessToken));
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  const refreshAccessToken = async (accessToken: string): Promise<void> => {
    const firebaseUid = cookies.get('F_UID');
    const response = await axios.post(
      'http://localhost:3001/users/spotify/refresh',
      {
        firebaseUid: firebaseUid,
      }
    );
    dispatch(addAccessToken(response.data.accessToken));
  };
  return <div></div>;
}

const mapStateToProps = (state: SpotifyAuthState) => {
  return {
    accessToken: state.accessToken,
  };
};

export default connect(mapStateToProps)(SpotifyAuth);
