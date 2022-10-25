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
import statusMessage from './statusMessageReducer';
import customTrack from './customTrackReducer';
import isPlay from './isPlayReducer';
import trackProgress from './thunk/progress';
import playingPosition from './playingPosition';
import playMode from './playMode';

const rootReducer = combineReducers({
  accessToken: accessToken.reducer,
  firebaseUidToken: firebaseUidToken.reducer,
  activeComponent: activeComponent.reducer,
  genre: genre.reducer,
  tracks: tracks.reducer,
  customTrack: customTrack.reducer,
  settings: settings.reducer,
  isPlay: isPlay.reducer,
  volume: volume.reducer,
  progress: trackProgress.reducer,
  playMode: playMode.reducer,
  playingPosition: playingPosition.reducer,
  statusMessage: statusMessage.reducer,
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
export const { addCustomTrack, deleteCustomTrack } = customTrack.actions;
export const { addSettings, clearSettings } = settings.actions;
export const { onChangeVolume, toggleVolume } = volume.actions;
export const { updatePlayMode } = playMode.actions;
export const { clearTrackProgress } = trackProgress.actions;
export const { moveNextPosition, movePreviousPosition, moveRandomPosition } =
  playingPosition.actions;
export const { updatePlayState } = isPlay.actions;
export const { updateStatusMessage } = statusMessage.actions;

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
