import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { connect, useDispatch } from 'react-redux';
import { activeGenres } from './store/reducers/rootReducer';
import isArrayEmpty from './utils/functions/isArrayEmpty';
import { ITracks } from '../src/pages/Home/TrackList/TrackList';
import getToken from './utils/functions/getToken';
import requestAxios from './utils/functions/requestAxios';

interface RefreshAxiosRequest {
  firebaseUid: string;
}

interface AuthAxiosRequest extends RefreshAxiosRequest {
  code: string;
}

interface AuthAxiosResponse {
  accessToken: string;
  expiresIn: number;
}

const ACCESS_TOKEN = getToken('accessToken');
const FIREBASE_UID = getToken('firebaseUid');

function SpotifyAuth({ tracks }: ITracks) {
  const code = new URLSearchParams(window.location.search).get('code');
  const cookies = new Cookies();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!code) return;
    requestSpotifyToken(code);
  }, [code]);
  useEffect(() => {
    filteringToken();
  });
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
      const afterFifty = Date.now() + 3300 * 1000;
      createAccessToken(response, afterFifty);
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  const filteringToken = () => {
    if (!FIREBASE_UID) return;
    !ACCESS_TOKEN && refreshAccessToken();
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
    console.log(response.accessToken);
    const afterFifty = Date.now() + 3300 * 1000;
    createAccessToken(response, afterFifty);
    if (isArrayEmpty(tracks)) {
      dispatch(activeGenres());
    }
  };

  const createAccessToken = (res: AuthAxiosResponse, afterFifty: number) => {
    cookies.set(
      'accessToken',
      {
        accessToken: res.accessToken,
        setTokenRefresh: afterFifty,
      },
      {
        maxAge: res.expiresIn,
        path: '/',
      }
    );
  };
  return <></>;
}

const mapStateToProps = (state: ITracks) => {
  return {
    tracks: state.tracks,
  };
};

export default connect(mapStateToProps)(SpotifyAuth);
