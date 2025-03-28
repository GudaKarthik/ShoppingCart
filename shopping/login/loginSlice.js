//import React, { act, use } from "react";
import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from "@react-native-async-storage/async-storage";


const initialState =  {
    isLoggedIn : false,
    loading : false,
    token : '',
    error : ''
}


export const login = createAsyncThunk("auth/login", async ({ userName, password }, { rejectWithValue }) => {
    console.log('Clicked ',userName,password)
    try {
      
      const response = await axios.post('https://fakestoreapi.com/auth/login', { username :  userName, password }, {
        headers: { "Content-Type": 'application/json' },
      });
      
      const token = response.data.token
      console.log("The slice token is ",JSON.stringify(response.data.token))
      return token;
    } catch (error) {
        console.log("Error response ",error)
      return rejectWithValue(error.response?.data || "Login failed");
    }
  });


export const loadToken = createAsyncThunk("auth/loadToken", async () => {
    const token = await AsyncStorage.getItem("token");
    return token;
  });


export const logout = createAsyncThunk("auth/logout", async () => {
  console.log("Logout")
    await AsyncStorage.removeItem("token");
    return "";
  });
   

const loginSlice = createSlice({
    name:'auth',
    initialState,
    extraReducers : builder => {
        builder.addCase(login.pending, state => {
            state.loading = true
        })

        builder.addCase(login.fulfilled, (state,action) => {
            state.isLoggedIn = true
            state.loading = false
            state.token = action.payload
            state.error = ''
        })

        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.token = ''
            state.error = action.error.message
        })

        builder.addCase(loadToken.fulfilled, (state,action) => {
            if (action.payload) {
                state.isLoggedIn = true;
                state.token = action.payload;
              } else {
                state.isLoggedIn = false;
                state.token = "";
              }
            
        })

        builder.addCase(logout.fulfilled,(state,action) => {
            state.token = "";
        })
    }
})


export default loginSlice.reducer;
