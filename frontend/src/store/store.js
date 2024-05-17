// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartItemsReducer from "./cartItemsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartItemsReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
