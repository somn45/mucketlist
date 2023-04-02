import { createSlice } from '@reduxjs/toolkit';

export interface IPlayingTrack {
  trackName: string;
  artist: string;
  trackImage: string;
}

export const PLAYING_TRACK_INITIAL_STATE = {
  trackName: 'track',
  artist: 'artist',
  trackImage: '',
};

const playingTrack = createSlice({
  name: 'playingTrack',
  initialState: PLAYING_TRACK_INITIAL_STATE,
  reducers: {
    setPlayingTrack: (state, action) => {
      return action.payload;
    },
    clearPlayingTrack: () => {
      return PLAYING_TRACK_INITIAL_STATE;
    },
  },
});

export default playingTrack;
