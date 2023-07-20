import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      state.items.push(newItem);
    },
    deleteItem: (state, action) => {
      state.items.splice(action.payload, 1)

    },
  },
});

export const { addItem, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
