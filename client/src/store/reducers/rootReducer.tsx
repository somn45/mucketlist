import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tracks from '../reducers/tracksReducer';
import activeComponent from './activeComponentReducer';
import volume from './volumeReducer';
import statusMessage from './statusMessageReducer';
import isPlay from './isPlayReducer';
import trackProgress from './thunk/progress';
import playingPosition from './playingPosition';
import playMode from './playMode';
import selectedGenres from './selectedGenres';
import recommendTrack from './thunk/recommendTrack';
import isSetAccessToken from './isSetAccessToken';

const rootReducer = combineReducers({
  activeComponent: activeComponent.reducer,
  selectedGenres: selectedGenres.reducer,
  tracks: tracks.reducer,
  recommendTrack: recommendTrack.reducer,
  isPlay: isPlay.reducer,
  isSetAccessToken: isSetAccessToken.reducer,
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

export const { activeGenres, activeOptions, activeHandBook, inactiveAll } =
  activeComponent.actions;
export const { addGenre, removeGenre, clearGenres } = selectedGenres.actions;
export const {
  createTracks,
  addTrack,
  sortByPopularity,
  sortByRelease,
  sortByRandom,
  clearTracks,
} = tracks.actions;
export const { onChangeVolume, toggleVolume } = volume.actions;
export const { updatePlayMode } = playMode.actions;
export const { clearTrackProgress } = trackProgress.actions;
export const { moveNextPosition, movePreviousPosition, moveRandomPosition } =
  playingPosition.actions;
export const { updatePlayState } = isPlay.actions;
export const { changeisAccessTokenState } = isSetAccessToken.actions;
export const { updateStatusMessage } = statusMessage.actions;

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
