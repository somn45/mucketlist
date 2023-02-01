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

export const getSpotifyGenreList = createAsyncThunk<
  string[],
  string,
  {
    rejectValue: string;
  }
>('genres/getSpotifyGenreList', async (accessToken, thunkApi) => {
  const response = await axios.post(
    `https://mucketlist-server.site/tracks/genres`,
    {
      accessToken: accessToken,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log('get genre');
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
