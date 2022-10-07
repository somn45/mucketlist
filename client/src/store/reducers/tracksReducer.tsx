import { createSlice } from '@reduxjs/toolkit';
import { TrackState } from '../../pages/Home/TrackList/TrackList';

const tracks = createSlice({
  name: 'tracksReducer',
  initialState: [] as TrackState[],
  reducers: {
    createTracks: (state, action) => {
      return [...action.payload];
    },
    sortByPopularity: (state, action) => {
      return state.sort((a, b) => {
        if (a.popularity === b.popularity) return 0;
        return a.popularity > b.popularity ? 1 : -1;
      });
    },
    sortByRelease: (state, action) => {
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
    sortByRandom: (state, action) => {},
    clearTracks: (state, action) => {
      return [];
    },
  },
});

export default tracks;
