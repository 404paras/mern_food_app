import {configureStore , createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login: state=>{
            state.isAuthenticated = true;
        }
        ,
        logout: state=>{
            state.isAuthenticated = false;
        }

    }
})

export const {login,logout} = authSlice.actions;

const store = configureStore({
    reducer:authSlice.reducer,
})

export default store;