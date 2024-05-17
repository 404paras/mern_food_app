import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodItems: {
    itemDetail: [],
    itemCount: 0
  }
};

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { foodItem } = action.payload;
      const existingItem = state.foodItems.itemDetail.find(item => item._id === foodItem._id);

      if (existingItem) {
        existingItem.count++;
      } else {
        state.foodItems.itemDetail.push({ ...foodItem, count: 1 });
      }
      
      state.foodItems.itemCount = state.foodItems.itemDetail.reduce((total, item) => total + item.count, 0);
    },
    removeItem: (state, action) => {
      const { foodItemId } = action.payload;
      const existingItem = state.foodItems.itemDetail.find(item => item._id === foodItemId);

      if (existingItem) {
        if (existingItem.count > 1) {
          existingItem.count--;
        } else {
          state.foodItems.itemDetail = state.foodItems.itemDetail.filter(item => item._id !== foodItemId);
        }
        state.foodItems.itemCount--;
      }
    },
    clearCart: (state) => {
      state.foodItems.itemDetail = [];
      state.foodItems.itemCount = 0;
    }
  }
});

export const { addItem, removeItem, clearCart } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
