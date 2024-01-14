import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.product.id === product.id);

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += quantity;
      } else {
        state.cartItems.push({ product, quantity });
      }
    },
    
    removeFromCart: (state, action) => {
        const itemIndex = state.cartItems.findIndex(item => item.product.id === action.payload.id);
  
        if (itemIndex !== -1) {
          state.cartItems.splice(itemIndex, 1);
        }
      },
    addQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.cartItems.find(element => element.product.id === id);
      if (item) {
        item.quantity++;
      }
    },
    removeQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.cartItems.find(element => element.product.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export const { addToCart, removeFromCart, addQuantity, removeQuantity } = cartSlice.actions;
export default cartSlice.reducer;