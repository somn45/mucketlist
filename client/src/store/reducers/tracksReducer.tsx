import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackState } from '../../pages/Home/TrackList/TrackList';

const tracks = createSlice({
  name: 'tracksReducer',
  initialState: [] as TrackState[],
  reducers: {
    createTracks: (state, action: PayloadAction<TrackState[]>) => {
      return [...action.payload];
    },
    addTrack: (state, action: PayloadAction<TrackState>) => {
      return [...state, action.payload];
    },
    sortByPopularity: (state) => {
      return state.sort((a, b) => {
        if (a.popularity === b.popularity) return 0;
        return a.popularity > b.popularity ? 1 : -1;
      });
    },
    sortByRelease: (state) => {
      return state.sort((a, b) => {
        if (
          new Date(a.album.release_date).getTime() ===
          new Date(b.album.release_date).getTime()
        )
          return 0;
        return new Date(a.album.release_date).getTime() >
          new Date(b.album.release_date).getTime()
          ? -1
          : 1;
      });
    },
    sortByRandom: (state) => {},
    clearTracks: () => {
      return [];
    },
  },
});

export default tracks;
