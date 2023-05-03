import { createSlice } from '@reduxjs/toolkit';

const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState: '',
  reducers: {
    saveAccessToken: (state, action) => {
      return action.payload;
    },
  },
});

export default accessTokenSlice;
