import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accessToken from '../reducers/accessTokenReducer';
import firebaseUidToken from '../reducers/firebaseUidToken';
import genre from '../reducers/genreReducer';
import tracks from '../reducers/tracksReducer';
import settings from '../reducers/settingsReducer';
import activeComponent from './activeComponentReducer';

const rootReducer = combineReducers({
  accessToken: accessToken.reducer,
  firebaseUidToken: firebaseUidToken.reducer,
  activeComponent: activeComponent.reducer,
  genre: genre.reducer,
  tracks: tracks.reducer,
  settings: settings.reducer,
});

const persistConfig = {
  key: 'rootReducer',
  storage: storage,
  whitelist: ['tracks'],
};

export const { addAccessToken } = accessToken.actions;
export const { addFirebaseUidToken, getFirebaseUidToken } =
  firebaseUidToken.actions;
export const { activeGenres, activeOptions, inactiveAll } =
  activeComponent.actions;
export const { addGenre, removeGenre } = genre.actions;
export const {
  createTracks,
  sortByPopularity,
  sortByRelease,
  sortByRandom,
  clearTracks,
} = tracks.actions;
export const { addSettings, clearSettings } = settings.actions;

export default persistReducer(persistConfig, rootReducer);
