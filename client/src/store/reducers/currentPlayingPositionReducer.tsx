import { createSlice } from '@reduxjs/toolkit';

const currentPlayingPosition = createSlice({
  name: 'currentPlayingPositionReducer',
  initialState: 0,
  reducers: {
    moveNextPosition: (state, action) => {
      console.log(action.payload);
      return state + action.payload;
    },
    movePreviousPosition: (state, action) => {
      return state - action.payload;
    },
  },
});

export default currentPlayingPosition;
