import { createSlice } from '@reduxjs/toolkit';

const playingPosition = createSlice({
  name: 'playingPositionReducer',
  initialState: 0,
  reducers: {
    moveNextPosition: (state) => {
      return state + 1;
    },
    movePreviousPosition: (state) => {
      return state - 1;
    },
    moveRandomPosition: () => {
      const randomPosition = Math.floor(Math.random() * 100);
      return randomPosition;
    },
  },
});

export default playingPosition;
