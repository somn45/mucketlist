import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const accessToken = createSlice({
  name: 'accessTokenReducer',
  initialState: '',
  reducers: {
    addAccessToken: (state, action) => {
      cookies.set('accessToken', action.payload, {
        maxAge: 3600,
      });
      return 'set';
    },
  },
});

export default accessToken;
