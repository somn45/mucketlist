import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const addAccessToken = (accessToken: string): void => {
  cookies.set('accessToken', accessToken, {
    maxAge: 3600,
  });
};

export const getAccessToken = (): string => {
  return cookies.get('accessToken');
};
