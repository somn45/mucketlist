import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const isSetAccessToken = createSlice({
  name: 'isSetAccessTokenReducer',
  initialState: false,
  reducers: {
    changeisAccessTokenState: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export default isSetAccessToken;
