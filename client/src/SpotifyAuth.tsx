import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { connect, useDispatch } from 'react-redux';
import { activeGenres } from './store/reducers/rootReducer';
import isArrayEmpty from './utils/functions/isArrayEmpty';
import { ITracks } from '../src/pages/Home/TrackList/TrackList';
import requestAxios from './utils/functions/requestAxios';
import getToken from './utils/functions/getToken';
import { AxiosResponse } from 'axios';

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

const ACCESS_TOKEN = getToken('accessToken');
const FIREBASE_UID = getToken('firebaseUid');
const cookies = new Cookies();

function SpotifyAuth({ tracks }: ITracks) {
  const code = new URLSearchParams(window.location.search).get('code');
  const dispatch = useDispatch();
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
        url: 'http://localhost:3001/users/spotify/auth',
        data: {
          code: code,
          firebaseUid: FIREBASE_UID,
        },
      };
      const response = await requestAxios<AuthAxiosRequest, AuthAxiosResponse>(
        requestAxiosParams
      );
      createAccessToken(response.data);
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  const filteringToken = () => {
    if (!FIREBASE_UID) return;
    refreshAccessToken();
    setTimeout(() => filteringToken(), 999 * 60 * 60);
  };

  const refreshAccessToken = async (): Promise<void> => {
    const requestAxiosParams = {
      method: 'post',
      url: 'http://localhost:3001/users/spotify/refresh',
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
    cookies.set('accessToken', res.accessToken, {
      maxAge: res.expiresIn,
      path: '/',
    });
  };
  return <></>;
}

const mapStateToProps = (state: ITracks) => {
  return {
    tracks: state.tracks,
  };
};

export default connect(mapStateToProps)(SpotifyAuth);
