import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import getTokens from '../../../utils/functions/getTokens';

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
  void,
  {
    rejectValue: string;
  }
>('genres/getSpotifyGenreList', async (_, thunkApi) => {
  const accessToken = getTokens();
  try {
    const response = await axios.post(
      `http://localhost:3001/tracks/genres`,
      {
        accessToken: accessToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.genres.slice(0, 20);
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.message);
    } else console.log('error');
  }
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
