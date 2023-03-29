import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type playModeType = 'normal' | 'repeat' | 'shuffle';

const playMode = createSlice({
  name: 'playModeReducer',
  initialState: 'normal' as playModeType,
  reducers: {
    updatePlayMode: (state, action: PayloadAction<playModeType>) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export default playMode;
