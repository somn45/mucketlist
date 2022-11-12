import { createSlice } from '@reduxjs/toolkit';

const initialState = [] as string[];

const selectedGenres = createSlice({
  name: 'selectedGenresReducer',
  initialState,
  reducers: {
    addGenre: (state, action) => {
      state.push(action.payload);
    },
    removeGenre: (state, action) => {
      return state.filter((genre) => genre !== action.payload);
    },
    clearGenres: () => {
      return initialState;
    },
  },
});

export default selectedGenres;
