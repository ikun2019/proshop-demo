import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { apiSlice } from './modules/apiSlice';
import cartSliceReducer from './modules/cartSlice';
import authSliceReducer from './modules/authSlice';

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});