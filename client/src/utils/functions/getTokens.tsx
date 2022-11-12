import { Cookies } from 'react-cookie';

interface ICookies {
  accessToken: string;
}

const cookies = new Cookies();

const getTokens = () => {
  const tokenCookies: ICookies = cookies.get('accessToken');
  if (!tokenCookies) return '';
  return tokenCookies.accessToken;
};

export default getTokens;
