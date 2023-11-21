import { configureStore } from '@reduxjs/toolkit';
import mapSlice from './features/map/querySlice';
import querySlice from './features/map/querySlice';

export const store = configureStore({
  reducer: {
    query: querySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
