import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Cookies } from 'react-cookie';
import { ICustomPlayList } from '../../../pages/CustomPlayList/CustomPlayList';
import { TrackState } from '../../../pages/Home/TrackList/TrackList';
import getTokens from '../../../utils/functions/getTokens';
import store from '../../store';

interface ArtistOffset {
  artist: string;
  offset: number;
}

interface IinitialState {
  loading: boolean;
  track?: TrackState;
  artistsOffset: ArtistOffset[];
  genreOffset: number;
  errorMsg: string;
}

interface ResponseGetRecommendTrack {
  track: TrackState;
  query: string;
}

const initialState: IinitialState = {
  loading: false,
  track: undefined,
  artistsOffset: [],
  genreOffset: 1,
  errorMsg: '',
};

export const getRecommendTrack = createAsyncThunk<
  ResponseGetRecommendTrack,
  ICustomPlayList,
  {
    rejectValue: string;
  }
>('recommendTracksReducer/getRecommendTrack', async (track, thunkApi) => {
  const { artists, genres } = track;
  console.log(artists[0]);
  const state = store.getState();
  const artistOffset = state.recommendTrack.artistsOffset.filter(
    (artistOffset) => artistOffset.artist === artists[0]
  );
  const accessToken = getTokens();
  const response = await axios.put(`http://localhost:3001/tracks/recommend`, {
    accessToken: accessToken,
    artist: artists[0],
    genres: genres[0],
    artistOffset: artistOffset.length > 1 ? artistOffset[0].offset : 1,
    genreOffset: state.recommendTrack.genreOffset,
  });
  if (response.status >= 400) return thunkApi.rejectWithValue('error');
  return response.data as ResponseGetRecommendTrack;
});

const recommendTrack = createSlice({
  name: 'recommendTracksReducer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getRecommendTrack.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getRecommendTrack.fulfilled, (state, action) => {
      const duplicatedTrack = state.artistsOffset.filter(
        (artistOffset) =>
          artistOffset.artist === action.payload.track.artists[0].name
      );
      console.log(action.payload.query);
      if (action.payload.query === 'genres') {
        return {
          ...state,
          loading: true,
          track: action.payload.track,
          genreOffset: state.genreOffset + 1,
        };
      } else if (duplicatedTrack.length === 0) {
        console.log(action.payload.track.artists);
        return {
          ...state,
          loading: true,
          track: action.payload.track,
          artistsOffset: [
            ...state.artistsOffset,
            { artist: action.payload.track.artists[0].name, offset: 1 },
          ],
        };
      } else {
        const newArtistsOffset = state.artistsOffset.map((artistOffset) =>
          artistOffset.artist === action.payload.track.artists[0].name
            ? { ...artistOffset, offset: artistOffset.offset + 1 }
            : artistOffset
        );
        return {
          ...state,
          loading: false,
          track: action.payload.track,
          artistsOffset: newArtistsOffset,
        };
      }
    });
    builder.addCase(getRecommendTrack.rejected, (state) => {
      return state;
    });
  },
});

export default recommendTrack;
