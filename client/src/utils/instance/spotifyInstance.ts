import axios from 'axios';
import setTokenHeader from './interceptors';

const spotifyInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1/me',
  headers: {
    'Content-Type': 'application/json',
  },
});

spotifyInstance.interceptors.request.use((config) => setTokenHeader(config));

export default spotifyInstance;
