import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ICustomPlayList } from '../../../pages/CustomPlayList/CustomPlayList';

interface customTracksState {
  tracks: ICustomPlayList[];
  loading: boolean;
  errorMsg?: string;
}

interface ResponseGetCustomTracks {
  tracks: ICustomPlayList[];
}

const initialState: customTracksState = {
  tracks: [],
  loading: false,
  errorMsg: '',
};

export const getCustomTracks = createAsyncThunk<
  ICustomPlayList[],
  string,
  {
    rejectValue: string;
  }
>('customTracks/getCustomTracks', async (firebaseUid, thunkApi) => {
  const response = await axios.get(
    `http://localhost:3001/tracks/read?firebaseUid=${firebaseUid}`
  );
  if (response.status >= 400)
    return thunkApi.rejectWithValue('커스텀 트랙을 불러오는 도중 문제 발생');
  return response.data.tracks as ICustomPlayList[];
});

const customTracks = createSlice({
  name: 'customTracksReducer',
  initialState,
  reducers: {
    deleteCustomTrack: (state, action) => {
      return {
        ...state,
        tracks: state.tracks.filter((track) => track.id !== action.payload),
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getCustomTracks.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getCustomTracks.fulfilled, (state, action) => {
      return {
        ...state,
        tracks: action.payload,
        loading: false,
      };
    });
    builder.addCase(getCustomTracks.rejected, (state, action) => {
      return {
        ...state,
        errorMsg: action.payload,
      };
    });
  },
});

export default customTracks;
