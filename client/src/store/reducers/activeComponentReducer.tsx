import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genres: false,
  options: false,
  handBook: false,
};

const activeComponent = createSlice({
  name: 'activeComponentReducer',
  initialState,
  reducers: {
    activeGenres: () => {
      console.log('active genres');
      return {
        genres: true,
        options: false,
        handBook: false,
      };
    },
    activeOptions: () => {
      return {
        genres: false,
        options: true,
        handBook: false,
      };
    },
    activeHandBook: () => {
      return {
        genres: false,
        options: false,
        handBook: true,
      };
    },
    inactiveAll: () => {
      return {
        genres: false,
        options: false,
        handBook: false,
      };
    },
  },
});
export default activeComponent;
