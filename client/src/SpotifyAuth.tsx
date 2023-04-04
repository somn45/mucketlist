import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import getToken from './utils/functions/getToken';
import axios, { AxiosResponse } from 'axios';
import { changeisAccessTokenState } from './store/reducers/rootReducer';
import { useAppDispatch } from './store/store';
import { SERVER_ENDPOINT } from './constants/constants';
import { useNavigate } from 'react-router-dom';

interface RefreshAxiosRequest {
  firebaseUid: string;
}

interface AuthAxiosResponse {
  accessToken: string;
  expiresIn: number;
}

const FIREBASE_UID = getToken('firebaseUid');
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
      const { data } = await axios.post<AuthAxiosResponse>(
        `${SERVER_ENDPOINT}/users/spotify/auth`,
        {
          code: code,
          firebaseUid: FIREBASE_UID,
        }
      );
      createAccessToken(data, 'request');
    } catch (error) {
      console.error(error);
    }
  };

  const filteringToken = () => {
    if (!FIREBASE_UID) return;
    refreshAccessToken();
    setTimeout(() => {
      dispatch(changeisAccessTokenState(false));
      filteringToken();
    }, 999 * 60 * 60);
  };

  const refreshAccessToken = async (): Promise<void> => {
    const { data } = await axios.post<AuthAxiosResponse>(
      `${SERVER_ENDPOINT}/users/spotify/refresh`,
      {
        firebaseUid: FIREBASE_UID,
      }
    );
    createAccessToken(data, 'refresh');
  };

  const createAccessToken = (
    res: AuthAxiosResponse,
    req: 'request' | 'refresh'
  ) => {
    cookies.set('accessToken', res.accessToken, {
      maxAge: res.expiresIn,
      path: '/',
    });
    dispatch(changeisAccessTokenState(true));
    if (req === 'request') navigate('/');
  };
  return <></>;
}

export default SpotifyAuth;
