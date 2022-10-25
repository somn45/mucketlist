import { createSlice } from '@reduxjs/toolkit';

const isPlay = createSlice({
  name: 'isPlayReducer',
  initialState: false,
  reducers: {
    updatePlayState: (state, action) => {
      return action.payload;
    },
  },
});

export default isPlay;
