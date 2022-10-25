import { createSlice } from '@reduxjs/toolkit';

type playModeType = 'normal' | 'repeat' | 'shuffle';

const playMode = createSlice({
  name: 'playModeReducer',
  initialState: 'normal' as playModeType,
  reducers: {
    updatePlayMode: (state, action) => {
      return action.payload;
    },
  },
});

export default playMode;
