import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playingPosition: 0,
  playMode: 'normal',
};

const playback = createSlice({
  name: 'playbackReducer',
  initialState,
  reducers: {
    moveNextPosition: (state, action) => {
      return {
        ...state,
        playingPosition: state.playingPosition + action.payload,
      };
    },
    movePreviousPosition: (state, action) => {
      return {
        ...state,
        playingPosition: state.playingPosition - action.payload,
      };
    },
    swtichRepeatMode: (state) => {
      const switchedPlayMode =
        state.playMode === 'normal' ? 'repeat' : 'normal';
      console.log(state.playingPosition);
      return {
        playingPosition: state.playingPosition,
        playMode: switchedPlayMode,
      };
    },
    switchShuffleMode: (state) => {
      const switchedPlayMode =
        state.playMode === 'normal' ? 'shuffle' : 'normal';
      const randomNumber = Math.floor(Math.random() * 100);
      return {
        playingPosition: randomNumber,
        playMode: switchedPlayMode,
      };
    },
  },
});

export default playback;
