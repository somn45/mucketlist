import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import logger from './middleware/logger';
import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: true,
      },
    }).concat(logger),
});

export const persistor = persistStore(store);

export default store;
