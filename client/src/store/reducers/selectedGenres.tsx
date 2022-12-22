import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = [] as string[];

const selectedGenres = createSlice({
  name: 'selectedGenresReducer',
  initialState,
  reducers: {
    addGenre: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    removeGenre: (state, action: PayloadAction<string>) => {
      return state.filter((genre) => genre !== action.payload);
    },
    clearGenres: () => {
      return initialState;
    },
  },
});

export default selectedGenres;
