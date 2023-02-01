import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import requestAxios from './utils/functions/requestAxios';
import getToken from './utils/functions/getToken';
import { AxiosResponse } from 'axios';
import {
  activeGenres,
  changeisAccessTokenState,
} from './store/reducers/rootReducer';
import { useAppDispatch } from './store/store';
import { useNavigate } from 'react-router';

interface RefreshAxiosRequest {
  firebaseUid: string;
}

interface AuthAxiosRequest extends RefreshAxiosRequest {
  code: string;
}

interface AuthAxiosResponse extends AxiosResponse {
  accessToken: string;
  expiresIn: number;
}

const FIREBASE_UID = getToken('firebaseUid');
console.log(FIREBASE_UID);
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
      const requestAxiosParams = {
        method: 'post',
        url: 'https://mucketlist-server.site/users/spotify/auth',
        data: {
          code: code,
          firebaseUid: FIREBASE_UID,
        },
      };
      navigate('/');
      const response = await requestAxios<AuthAxiosRequest, AuthAxiosResponse>(
        requestAxiosParams
      );
      createAccessToken(response.data);
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
    const requestAxiosParams = {
      method: 'post',
      url: 'https://mucketlist-server.site/users/spotify/refresh',
      data: {
        firebaseUid: FIREBASE_UID,
      },
    };
    const response = await requestAxios<RefreshAxiosRequest, AuthAxiosResponse>(
      requestAxiosParams
    );
    createAccessToken(response.data);
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
