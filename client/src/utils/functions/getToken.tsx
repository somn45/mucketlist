import { Cookies } from 'react-cookie';

type ICookieToken = string;

const cookies = new Cookies();

const getToken = (key: string) => {
  const cookieToken: ICookieToken = cookies.get(key);
  return cookieToken ? cookieToken : '';
};

export default getToken;
