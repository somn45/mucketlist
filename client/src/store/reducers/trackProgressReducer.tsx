import { createSlice } from '@reduxjs/toolkit';

const trackProgress = createSlice({
  name: 'trackProgressReducer',
  initialState: 0,
  reducers: {
    getTrackProgress: (state, action) => {
      const player: Spotify.Player = action.payload;
    },
    clearTrackProgress: () => {
      return 0;
    },
  },
});

export default trackProgress;
