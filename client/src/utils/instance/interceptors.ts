import axios, { AxiosRequestConfig } from 'axios';
import { SERVER_ENDPOINT } from '../../constants/constants';

interface TokenData {
  accessToken: string;
}

const setTokenHeader = async (config: AxiosRequestConfig<any>) => {
  const { data: tokenData } = await axios.get<TokenData>(
    `${SERVER_ENDPOINT}/cookies/send`,
    {
      withCredentials: true,
    }
  );
  if (tokenData.accessToken && config.headers)
    config.headers['Authorization'] = `Bearer ${tokenData.accessToken}`;
  return config;
};

export default setTokenHeader;
