import { createSlice } from '@reduxjs/toolkit';
import { ICustomPlayList } from '../../pages/CustomPlayList/CustomPlayList';

const customTrack = createSlice({
  name: 'customTrackReducer',
  initialState: [] as ICustomPlayList[],
  reducers: {
    addCustomTrack: (state, action) => {
      return action.payload;
    },
    deleteCustomTrack: (state, action) => {
      return state.filter((track) => track.id !== action.payload);
    },
  },
});

export default customTrack;
