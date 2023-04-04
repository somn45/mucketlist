export const SERVER_ENDPOINT = process.env.REACT_APP_SERVER_DOMAIN;
export const SPOTIFY_AUTH_URL_CONFIG = {
  response_type: 'code',
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID
    ? process.env.REACT_APP_SPOTIFY_CLIENT_ID
    : '',
  redirect_uri: process.env.REACT_APP_DOMAIN,
  scope:
    'user-read-private user-read-email streaming user-read-playback-state, user-modify-playback-state',
  state: '1SMWKN29Nksmwogl49SWM238FM1879Smx',
};

export const MOBILE_SIZE = '(max-width: 767px)';
export const TABLET_SIZE = '(max-width: 1023px)';
export const WIDE_SCREEN_SIZE = '(min-width: 1440px)';
