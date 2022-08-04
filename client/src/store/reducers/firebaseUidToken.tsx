import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const AFTER_WEEKS = 3600 * 24 * 7;

const firebaseUidToken = createSlice({
  name: 'firebaseUidTokenReducer',
  initialState: '',
  reducers: {
    addFirebaseUidToken: (state, action) => {
      cookies.set('F_UID', action.payload, {
        maxAge: AFTER_WEEKS,
      });
      return 'set';
    },
    getFirebaseUidToken: (state, action) => {
      return cookies.get('F_UID');
    },
  },
});

export default firebaseUidToken;
