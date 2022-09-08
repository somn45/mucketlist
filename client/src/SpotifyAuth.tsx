import { useEffect } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { connect, useDispatch } from 'react-redux';
import { activeGenres } from './store/reducers/rootReducer';
import { ITracks } from './pages/Settings';

interface TAccessToken {
  setTokenRefresh: number;
}

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
          fuid: cookies.get('F_UID'),
        }
      );
      const afterFifty = Date.now() + 3300 * 1000;
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
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };
  const filteringToken = () => {
    if (!cookies.get('F_UID')) return;
    const accessToken: TAccessToken = cookies.get('accessToken');
    if (!accessToken) return refreshAccessToken();
    else if (!accessToken.setTokenRefresh) return refreshAccessToken();
    const now = Date.now();
    if (accessToken.setTokenRefresh < now) return;
    else return refreshAccessToken();
  };
  const refreshAccessToken = async (): Promise<void> => {
    const firebaseUid = cookies.get('F_UID');
    const response = await axios.post(
      'http://localhost:3001/users/spotify/refresh',
      {
        firebaseUid: firebaseUid,
      }
    );
    const afterFifty = Date.now() + 3300 * 1000;
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
    if (!(Array.isArray(tracks) && tracks.length === 0))
      dispatch(activeGenres(''));
  };
  return <></>;
}

const mapStateToProps = (state: ITracks) => {
  return {
    tracks: state.tracks,
  };
};

export default connect(mapStateToProps)(SpotifyAuth);
