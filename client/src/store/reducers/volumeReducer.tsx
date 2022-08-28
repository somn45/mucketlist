import { createSlice } from '@reduxjs/toolkit';

const volume = createSlice({
  name: 'volumeReducer',
  initialState: 0.5,
  reducers: {
    onChangeVolume: (state, action) => {
      return action.payload;
    },
  },
});

export default volume;
