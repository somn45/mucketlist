import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import requestAxios from './utils/functions/requestAxios';
import getToken from './utils/functions/getToken';
import axios, { AxiosResponse } from 'axios';
import { changeisAccessTokenState } from './store/reducers/rootReducer';
import { useAppDispatch } from './store/store';
import { SERVER_ENDPOINT } from './constants/constants';

interface RefreshAxiosRequest {
  firebaseUid: string;
}

interface AuthAxiosResponse {
  accessToken: string;
  expiresIn: number;
}

const FIREBASE_UID = getToken('firebaseUid');
console.log(FIREBASE_UID);
const cookies = new Cookies();

function SpotifyAuth() {
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
      console.log('request');
      const { data } = await axios.post<AuthAxiosResponse>(
        `${SERVER_ENDPOINT}/users/spotify/auth`,
        {
          code: code,
          firebaseUid: FIREBASE_UID,
        }
      );
      createAccessToken(data);
    } catch (error) {
      console.log(error);
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
    createAccessToken(data);
  };

  const createAccessToken = (res: AuthAxiosResponse) => {
    cookies.set('accessToken', res.accessToken, {
      maxAge: res.expiresIn,
      path: '/',
    });
    dispatch(changeisAccessTokenState(true));
  };
  return <></>;
}

export default SpotifyAuth;
