import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const token = Cookies.get('token') ? Cookies.get('token') : null;

const initialState = {
    loading: false,
    userInfo: {}, // for user object
    token: token, // for storing the JWT
    error: null,
    success: false,
    isAuthenticated: token ? true : false,
    // for monitoring the registration process.
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload;
            Cookies.set('token', action.payload);
        },
        logoutSuccess: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            Cookies.remove('token');
        },
    },
    extraReducers: {},
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;