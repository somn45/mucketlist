import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const statusMessage = createSlice({
  name: 'statusMessageReducer',
  initialState: '',
  reducers: {
    updateStatusMessage: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export default statusMessage;
