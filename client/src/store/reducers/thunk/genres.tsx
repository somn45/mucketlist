import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import getToken from '../../../utils/functions/getToken';

interface IInitialState {
  genres: string[];
  loading: boolean;
  errorMsg: string;
}

const initialState: IInitialState = {
  genres: [],
  loading: true,
  errorMsg: '',
};

const ACCESS_TOKEN = getToken('accessToken');

export const getSpotifyGenreList = createAsyncThunk<
  string[],
  void,
  {
    rejectValue: string;
  }
>('genres/getSpotifyGenreList', async (_, thunkApi) => {
  const response = await axios.post(
    `http://localhost:3001/tracks/genres`,
    {
      accessToken: ACCESS_TOKEN,
    },
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  if (response.status >= 400)
    return thunkApi.rejectWithValue('Spotify 장르를 불러오는 도중 문제 발생');
  return response.data.genres.slice(0, 20) as string[];
});

const genres = createSlice({
  name: 'genres',
  initialState: initialState as IInitialState,
  reducers: {
    clearSpotifyGenreList: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(getSpotifyGenreList.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getSpotifyGenreList.fulfilled, (state, action) => {
      return {
        ...state,
        genres: action.payload,
        loading: false,
      };
    });
    builder.addCase(getSpotifyGenreList.rejected, (state, action) => {
      return {
        ...state,
        errorMsg: 'error',
      };
    });
  },
});

export default genres;
