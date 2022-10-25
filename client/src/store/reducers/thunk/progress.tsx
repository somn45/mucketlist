import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { RootState } from '../rootReducer';

interface progressState {
  value: number;
  message: string;
}

const initialState: progressState = {
  value: 0,
  message: '',
};

export const getTrackProgress = createAsyncThunk<
  number,
  Spotify.Player,
  {
    rejectValue: string;
  }
>(
  'trackProgress/getTrackProgress',
  async (player: Spotify.Player, thunkApi) => {
    const data = await player.getCurrentState();
    if (!data) return thunkApi.rejectWithValue('sorry');
    return data.position;
  }
);

const trackProgress = createSlice({
  name: 'trackProgressReducer',
  initialState,
  reducers: {
    clearTrackProgress: () => {
      return {
        value: 0,
        message: 'clear',
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getTrackProgress.fulfilled, (state, action) => {
      return {
        value: action.payload,
        message: 'success',
      };
    });
    builder.addCase(getTrackProgress.rejected, (state, action) => {
      return {
        value: state.value,
        message: 'failed',
      };
    });
  },
});

export default trackProgress;
