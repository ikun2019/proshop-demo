import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { apiSlice } from './modules/apiSlice';

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});