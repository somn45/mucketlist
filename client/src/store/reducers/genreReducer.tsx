import { createSlice } from '@reduxjs/toolkit';

const genre = createSlice({
  name: 'genreReducer',
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

export default genre;
