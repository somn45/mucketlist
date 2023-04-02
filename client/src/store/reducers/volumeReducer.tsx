import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IVolumeReducer {
  volume: number;
  prevVolume: number;
}

const volume = createSlice({
  name: 'volumeReducer',
  initialState: {
    volume: 0.5,
    prevVolume: 0.5,
    mute: false,
  },
  reducers: {
    onChangeVolume: (state, action: PayloadAction<number>) => {
      const currentVolume = action.payload;
      return {
        volume: currentVolume,
        prevVolume: state.prevVolume,
        mute: currentVolume >= 0.1 ? false : true,
      };
    },
    toggleVolume: (state) => {
      const currentMute = !state.mute;
      const currentVolume = state.volume;
      return {
        prevVolume: currentMute ? currentVolume : state.prevVolume,
        volume: currentMute ? 0 : state.prevVolume,
        mute: currentMute,
      };
    },
  },
});

export default volume;
