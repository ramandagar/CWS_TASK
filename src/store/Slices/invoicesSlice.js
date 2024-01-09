// invoicesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: [],
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
      console.log('state?.invoices?.length',state?.invoices?.length)
    },
  },
});

export const { addInvoice } = invoicesSlice.actions;
export const selectInvoices = (state) => state.invoices.invoices;

export default invoicesSlice.reducer;
