import axios from 'axios';
import { SERVER_ENDPOINT } from '../../constants/constants';
import setTokenHeader from './interceptors';

const axiosInstance = axios.create({
  baseURL: SERVER_ENDPOINT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => setTokenHeader(config));

export default axiosInstance;
