import { createSlice } from '@reduxjs/toolkit';

const statusMessage = createSlice({
  name: 'statusMessageReducer',
  initialState: '',
  reducers: {
    updateStatusMessage: (state, action) => {
      return action.payload;
    },
  },
});

export default statusMessage;
