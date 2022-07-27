import { configureStore, createSlice } from '@reduxjs/toolkit';
import { TrackState } from '../pages/Settings';

const genre = createSlice({
  name: 'genreReducer',
  initialState: [] as string[],
  reducers: {
    addGenre: (state, action) => {
      state.push(action.payload);
    },
    removeGenre: (state, action) => {
      return state.filter((genre) => genre !== action.payload);
    },
  },
});

const tracks = createSlice({
  name: 'tracksReducer',
  initialState: [] as TrackState[],
  reducers: {
    createTracks: (state, action) => {
      return [...action.payload];
    },
    sortByPopularity: (state, action) => {
      state.sort((a, b) => {
        if (a.popularity > b.popularity) return 1;
        else if (b.popularity > a.popularity) return -1;
        else return 0;
      });
    },
    sortByRelease: (state, action) => {
      state.sort((a, b) => {
        if (a.album.release_date > b.album.release_date) return 1;
        else if (b.album.release_date > a.album.release_date) return -1;
        else return 0;
      });
    },
    sortByRandom: (state, action) => {
      state.sort((a, b) => {
        const randomNumber1 = Math.random();
        const randomNumber2 = Math.random();
        if (randomNumber1 > randomNumber2) return 1;
        else if (randomNumber2 > randomNumber1) return -1;
        else return 0;
      });
    },
  },
});

const settings = createSlice({
  name: 'settingsReducer',
  initialState: '',
  reducers: {
    addSettings: (state, action) => {
      return action.payload;
    },
    clearSettings: (state, action) => {
      return '';
    },
  },
});

const store = configureStore({
  reducer: {
    genre: genre.reducer,
    tracks: tracks.reducer,
    settings: settings.reducer,
  },
});

export const { addGenre, removeGenre } = genre.actions;
export const { createTracks, sortByPopularity, sortByRelease, sortByRandom } =
  tracks.actions;
export const { addSettings, clearSettings } = settings.actions;

export default store;
