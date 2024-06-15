// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  id:"",
  role: "",
  name: "",
  email: "",
  address: "",
  phone: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      
      state.isAuthenticated = true;
      state.id=action.payload.id
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
      state.address = action.payload.address;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.id=""
      state.role = "";
      state.email = "";
      state.name = "";
      state.address = "";
      state.mobile = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
