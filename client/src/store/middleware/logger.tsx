import { Middleware } from '@reduxjs/toolkit';

const logger: Middleware = (store) => (next) => (action) => {
  const state = store.getState();
  const tracks = state.tracks;
  const position = state.currentPlayingPosition;
  if (action.type === 'currentPlayingPositionReducer/movePreviousPosition') {
    if (!tracks[position - 1]) return;
  }
  if (action.type === 'currentPlayingPositionReducer/moveNextPosition') {
    if (!tracks[position + 1]) return;
  }
  return next(action);
};

export default logger;
