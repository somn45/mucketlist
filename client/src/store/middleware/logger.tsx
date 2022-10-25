import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../reducers/rootReducer';

const logger: Middleware = (store) => (next) => (action) => {
  const state: RootState = store.getState();
  const tracks = state.tracks;
  const position = state.playingPosition;
  if (action.type === 'playingPositionReducer/movePreviousPosition') {
    if (!tracks[position - 1]) return;
  }
  if (action.type === 'playingPositionReducer/moveNextPosition') {
    if (!tracks[position + 1]) return;
  }
  return next(action);
};

export default logger;
