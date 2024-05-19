import { createSlice } from "@reduxjs/toolkit";

const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || { itemDetail: [], itemCount: 0 };

const initialState = {
  foodItems: {
    itemDetail: storedCartItems.itemDetail,
    itemCount: storedCartItems.itemCount
  }
};

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.foodItems.itemDetail.find(foodItem => foodItem.id === item.id);

      if (existingItem) {
        existingItem.count++;
      } else {
        state.foodItems.itemDetail.push({ 
          id: item.id, 
          name: item.name, 
          price: item.price, 
          image: item.image, 
          count: 1 
        });
      }

      state.foodItems.itemCount = state.foodItems.itemDetail.reduce((total, foodItem) => total + foodItem.count, 0);
      sessionStorage.setItem('cartItems', JSON.stringify(state.foodItems));
    },
    removeItem: (state, action) => {
      const foodItemId = action.payload;
      const existingItem = state.foodItems.itemDetail.find(foodItem => foodItem.id === foodItemId);

      if (existingItem) {
        if (existingItem.count > 1) {
          existingItem.count--;
        } else {
          state.foodItems.itemDetail = state.foodItems.itemDetail.filter(foodItem => foodItem.id !== foodItemId);
        }
        state.foodItems.itemCount = state.foodItems.itemDetail.reduce((total, foodItem) => total + foodItem.count, 0);
        sessionStorage.setItem('cartItems', JSON.stringify(state.foodItems));
      }
    },
    clearCart: (state) => {
      state.foodItems.itemDetail = [];
      state.foodItems.itemCount = 0;
      sessionStorage.setItem('cartItems', JSON.stringify(state.foodItems));
    }
  }
});

export const { addItem, removeItem, clearCart } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
