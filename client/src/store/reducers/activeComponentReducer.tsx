import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genres: false,
  options: false,
};

const activeComponent = createSlice({
  name: 'activeComponentReducer',
  initialState,
  reducers: {
    activeGenres: (state, action) => {
      return {
        genres: true,
        options: false,
      };
    },
    activeOptions: (state, action) => {
      return {
        genres: false,
        options: true,
      };
    },
    inactiveAll: (state, action) => {
      return {
        genres: false,
        options: false,
      };
    },
  },
});
export default activeComponent;
