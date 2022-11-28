import { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Cookies } from 'react-cookie';
import { connect, useDispatch } from 'react-redux';
import { activeGenres } from './store/reducers/rootReducer';
import isArrayEmpty from './utils/functions/isArrayEmpty';
import { ITracks } from '../src/pages/Home/TrackList/TrackList';
import getToken from './utils/functions/getToken';
interface TAccessToken {
  setTokenRefresh: number;
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
      const response = await axios.post(
        'http://localhost:3001/users/spotify/auth',
        {
          code: code,
          fuid: FIREBASE_UID,
        }
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
    const response = await axios.post(
      'http://localhost:3001/users/spotify/refresh',
      {
        firebaseUid: FIREBASE_UID,
      }
    );
    const afterFifty = Date.now() + 3300 * 1000;
    createAccessToken(response, afterFifty);
    cookies.set(
      'accessToken',
      {
        accessToken: response.data.accessToken,
        setTokenRefresh: afterFifty,
      },
      {
        maxAge: response.data.expiresIn,
        path: '/',
      }
    );
    if (isArrayEmpty(tracks)) {
      dispatch(activeGenres());
    }
  };

  const createAccessToken = (
    res: AxiosResponse<any, any>,
    afterFifty: number
  ) => {
    cookies.set(
      'accessToken',
      {
        accessToken: res.data.accessToken,
        setTokenRefresh: afterFifty,
      },
      {
        maxAge: res.data.expiresIn,
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
