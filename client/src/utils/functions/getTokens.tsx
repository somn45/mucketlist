import { Cookies } from 'react-cookie';

type ICookieToken = string;

const cookies = new Cookies();

const getTokens = () => {
  const tokenCookies = cookies.get('accessToken');
  if (!tokenCookies) return '';
  return tokenCookies.accessToken;
};

export default getTokens;
