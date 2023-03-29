import { createSlice } from '@reduxjs/toolkit';

const playingTrack = createSlice({
  name: 'playingTrack',
  initialState: {
    trackName: 'track',
    artist: 'artist',
    trackImage: '',
  },
  reducers: {
    setPlayingTrack: (state, action) => {
      return action.payload;
    },
  },
});

export default playingTrack;
