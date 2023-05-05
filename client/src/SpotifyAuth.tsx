import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import getToken from './utils/functions/getToken';
import axios from 'axios';
import {
  changeisAccessTokenState,
  saveAccessToken,
} from './store/reducers/rootReducer';
import { useAppDispatch } from './store/store';
import { SERVER_ENDPOINT } from './constants/constants';
import { useNavigate } from 'react-router-dom';

interface RefreshAxiosRequest {
  firebaseUid: string;
}

interface AuthAxiosResponse {
  accessToken: string;
}

const cookies = new Cookies();

function SpotifyAuth() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const code = new URLSearchParams(window.location.search).get('code');

  useEffect(() => {
    if (!code) return;
    requestSpotifyToken(code);
  }, [code]);
  useEffect(() => {
    filteringToken();
  }, []);

  const requestSpotifyToken = async (code: string): Promise<void> => {
    try {
      const firebaseUid = getToken('firebaseUid');
      const { data: tokenData } = await axios.post<AuthAxiosResponse>(
        `${SERVER_ENDPOINT}/users/spotify/auth`,
        {
          code: code,
          firebaseUid,
        }
      );
      setAccessTokenCookie(tokenData, 'request');
    } catch (error) {
      console.log(error);
    }
  };

  const filteringToken = () => {
    const firebaseUid = getToken('firebaseUid');
    if (!firebaseUid) return;
    refreshAccessToken();
    setTimeout(() => {
      dispatch(changeisAccessTokenState(false));
      filteringToken();
    }, 999 * 60 * 60);
  };

  const refreshAccessToken = async (): Promise<void> => {
    /*
        const { data: tokenData } = await axios.post<AuthAxiosResponse>(
      `${SERVER_ENDPOINT}/users/spotify/refresh`,
      {
        firebaseUid: FIREBASE_UID,
      }
    );
    setAccessTokenCookie(data, 'refresh');
    */
  };

  const setAccessTokenCookie = async (
    res: AuthAxiosResponse,
    req: 'request' | 'refresh'
  ) => {
    await axios.post(
      `${SERVER_ENDPOINT}/cookies/set`,
      {
        accessToken: res.accessToken,
      },
      {
        withCredentials: true,
      }
    );
    const { data: tokenData } = await axios.get<AuthAxiosResponse>(
      `${SERVER_ENDPOINT}/cookies/send`,
      {
        withCredentials: true,
      }
    );
    dispatch(saveAccessToken(tokenData.accessToken));
    console.log('pass set cookie');
    dispatch(changeisAccessTokenState(true));
    navigate('/');
  };

  return <></>;
}

export default SpotifyAuth;
