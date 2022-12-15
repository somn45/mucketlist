import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const isPlay = createSlice({
  name: 'isPlayReducer',
  initialState: false,
  reducers: {
    updatePlayState: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export default isPlay;
