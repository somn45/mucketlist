import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accessToken from '../reducers/accessTokenReducer';
import firebaseUidToken from '../reducers/firebaseUidToken';
import genre from '../reducers/genreReducer';
import tracks from '../reducers/tracksReducer';
import settings from '../reducers/settingsReducer';
import activeComponent from './activeComponentReducer';
import volume from './volumeReducer';
import trackProgress from './trackProgressReducer';
import playback from './playbackReducer';

const rootReducer = combineReducers({
  accessToken: accessToken.reducer,
  firebaseUidToken: firebaseUidToken.reducer,
  activeComponent: activeComponent.reducer,
  genre: genre.reducer,
  tracks: tracks.reducer,
  settings: settings.reducer,
  volume: volume.reducer,
  trackProgress: trackProgress.reducer,
  playback: playback.reducer,
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
export const { onChangeVolume } = volume.actions;
export const { getTrackProgress, clearTrackProgress } = trackProgress.actions;
export const {
  moveNextPosition,
  movePreviousPosition,
  swtichRepeatMode,
  switchShuffleMode,
} = playback.actions;

export default persistReducer(persistConfig, rootReducer);
