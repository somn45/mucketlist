import { configureStore, createSlice } from '@reduxjs/toolkit';

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

const store = configureStore({
  reducer: genre.reducer,
});

export const { addGenre, removeGenre } = genre.actions;

export default store;
