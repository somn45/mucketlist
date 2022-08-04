import { createSlice } from '@reduxjs/toolkit';

const settings = createSlice({
  name: 'settingsReducer',
  initialState: '',
  reducers: {
    addSettings: (state, action) => {
      return action.payload;
    },
    clearSettings: (state, action) => {
      return '';
    },
  },
});

export default settings;
