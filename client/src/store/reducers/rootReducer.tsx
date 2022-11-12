import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accessToken from '../reducers/accessTokenReducer';
import firebaseUidToken from '../reducers/firebaseUidToken';
import tracks from '../reducers/tracksReducer';
import settings from '../reducers/settingsReducer';
import activeComponent from './activeComponentReducer';
import volume from './volumeReducer';
import statusMessage from './statusMessageReducer';
import isPlay from './isPlayReducer';
import trackProgress from './thunk/progress';
import playingPosition from './playingPosition';
import playMode from './playMode';
import selectedGenres from './selectedGenres';
import genres from './thunk/genres';
import customTracks from './thunk/customTracks';
import recommendTrack from './thunk/recommendTrack';

const rootReducer = combineReducers({
  accessToken: accessToken.reducer,
  firebaseUidToken: firebaseUidToken.reducer,
  activeComponent: activeComponent.reducer,
  genres: genres.reducer,
  selectedGenres: selectedGenres.reducer,
  tracks: tracks.reducer,
  recommendTrack: recommendTrack.reducer,
  settings: settings.reducer,
  customTracks: customTracks.reducer,
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
  whitelist: ['tracks', 'selectedGenres'],
};

export const { addAccessToken } = accessToken.actions;
export const { addFirebaseUidToken, getFirebaseUidToken } =
  firebaseUidToken.actions;
export const { activeGenres, activeOptions, inactiveAll } =
  activeComponent.actions;
export const { clearSpotifyGenreList } = genres.actions;
export const { addGenre, removeGenre, clearGenres } = selectedGenres.actions;
export const {
  createTracks,
  addTrack,
  sortByPopularity,
  sortByRelease,
  sortByRandom,
  clearTracks,
} = tracks.actions;
export const { addSettings, clearSettings } = settings.actions;
export const { deleteCustomTrack } = customTracks.actions;
export const { onChangeVolume, toggleVolume } = volume.actions;
export const { updatePlayMode } = playMode.actions;
export const { clearTrackProgress } = trackProgress.actions;
export const { moveNextPosition, movePreviousPosition, moveRandomPosition } =
  playingPosition.actions;
export const { updatePlayState } = isPlay.actions;
export const { updateStatusMessage } = statusMessage.actions;

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
