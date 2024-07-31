// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    error: null,
    status: 'idle',
  },
  reducers: {
    loginStart: (state) => {
      state.status = 'loading';
    },
    loginSuccess: (state) => {
      state.status = 'succeeded';
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    signupStart: (state) => {
      state.status = 'loading';
    },
    signupSuccess: (state) => {
      state.status = 'succeeded';
    },
    signupFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  signupStart,
  signupSuccess,
  signupFailure,
} = authSlice.actions;

export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
