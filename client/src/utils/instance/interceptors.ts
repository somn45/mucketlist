import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { SERVER_ENDPOINT } from '../../constants/constants';
import getToken from '../functions/getToken';

interface TokenData {
  accessToken: string;
}

const setTokenHeader = async (config: AxiosRequestConfig<any>) => {
  const firebaseUid = getToken('firebaseUid');
  if (!firebaseUid) return config;
  try {
    const { data: tokenData } = await axios.get<TokenData>(
      `${SERVER_ENDPOINT}/cookies/send`,
      {
        withCredentials: true,
      }
    );
    if (tokenData.accessToken && config.headers)
      config.headers['Authorization'] = `Bearer ${tokenData.accessToken}`;
    else {
      await axios.post(
        `${SERVER_ENDPOINT}/users/spotify/refresh`,
        {
          firebaseUid,
        },
        {
          withCredentials: true,
        }
      );
    }
    return config;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.data.errorMsg === 'token expired'
    ) {
    }
  }
};

export default setTokenHeader;
