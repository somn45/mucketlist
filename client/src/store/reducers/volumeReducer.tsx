import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IVolumeReducer {
  volume: number;
  prevVolume: number;
}

const volume = createSlice({
  name: 'volumeReducer',
  initialState: {
    volume: 0.5,
    prevVolume: 0,
  },
  reducers: {
    onChangeVolume: (state, action: PayloadAction<number>) => {
      return {
        volume: action.payload,
        prevVolume: state.prevVolume,
      };
    },
    toggleVolume: (state) => {
      return {
        volume: state.prevVolume,
        prevVolume: state.volume,
      };
    },
  },
});

export default volume;
