import { configureStore } from '@reduxjs/toolkit';
import accessToken from './reducers/accessTokenReducer';
import firebaseUidToken from './reducers/firebaseUidToken';
import genre from './reducers/genreReducer';
import tracks from './reducers/tracksReducer';
import settings from './reducers/settingsReducer';

const store = configureStore({
  reducer: {
    accessToken: accessToken.reducer,
    firebaseUidToken: firebaseUidToken.reducer,
    genre: genre.reducer,
    tracks: tracks.reducer,
    settings: settings.reducer,
  },
});

export const { addAccessToken, getAccessToken } = accessToken.actions;
export const { addFirebaseUidToken, getFirebaseUidToken } =
  firebaseUidToken.actions;
export const { addGenre, removeGenre } = genre.actions;
export const { createTracks, sortByPopularity, sortByRelease, sortByRandom } =
  tracks.actions;
export const { addSettings, clearSettings } = settings.actions;

export default store;
