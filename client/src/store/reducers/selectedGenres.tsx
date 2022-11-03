import { createSlice } from '@reduxjs/toolkit';

const selectedGenres = createSlice({
  name: 'selectedGenresReducer',
  initialState: [] as string[],
  reducers: {
    addGenre: (state, action) => {
      state.push(action.payload);
    },
    removeGenre: (state, action) => {
      return state.filter((genre) => genre !== action.payload);
    },
  },
});

export default selectedGenres;
