import { Cookies } from 'react-cookie';

type TokenKey = 'accessToken' | 'firebaseUid' | 'newUserHandBook';

const cookies = new Cookies();

const getToken = (key: TokenKey) => {
  const cookieToken = cookies.get(key);
  return cookieToken;
};

export default getToken;
