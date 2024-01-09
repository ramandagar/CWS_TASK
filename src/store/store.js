
import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from './Slices/invoicesSlice';

const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
  },
});

export default store;
