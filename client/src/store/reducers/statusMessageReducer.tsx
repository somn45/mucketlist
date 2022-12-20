import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const statusMessage = createSlice({
  name: 'statusMessageReducer',
  initialState: '',
  reducers: {
    updateStatusMessage: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export default statusMessage;
