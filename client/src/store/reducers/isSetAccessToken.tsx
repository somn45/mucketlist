import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const isSetAccessToken = createSlice({
  name: 'isSetAccessTokenReducer',
  initialState: false,
  reducers: {
    changeisAccessTokenState: (state, action: PayloadAction<boolean>) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export default isSetAccessToken;
