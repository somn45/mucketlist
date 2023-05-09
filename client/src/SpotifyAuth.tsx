import { useEffect } from 'react';
import getToken from './utils/functions/getToken';
import axios from 'axios';
import { changeisAccessTokenState } from './store/reducers/rootReducer';
import { useAppDispatch } from './store/store';
import { SERVER_ENDPOINT } from './constants/constants';
import { useNavigate } from 'react-router-dom';

export interface AuthAxiosResponse {
  accessToken: string;
}

function SpotifyAuth() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const code = new URLSearchParams(window.location.search).get('code');

  useEffect(() => {
    if (!code) return;
    requestSpotifyToken(code);
  }, [code]);

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
      console.error(error);
    }
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
    dispatch(changeisAccessTokenState(true));
    navigate('/');
  };

  return <></>;
}

export default SpotifyAuth;
