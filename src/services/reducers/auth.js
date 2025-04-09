import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
    registerUser as apiRegisterUser,
    resetPassword as apiResetPassword,
    forgotPassword as apiForgotPassword,
    loginAction as apiLoginAction,
    logoutAction as apiLogoutAction,
    getUser as apiGetUser,
    updateUser as apiUpdateUser,
} from '../api';


const initialState = {
    login: false,
    user: null,
    failedAuth: false,
    refreshToken: '',
    accessToken: ''
};

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    apiRegisterUser
);
export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    apiForgotPassword
);
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    apiResetPassword
);
export const loginAction = createAsyncThunk(
    'auth/loginAction',
    apiLoginAction
);
export const logoutAction = createAsyncThunk(
    'auth/logoutAction',
    apiLogoutAction
);
export const getUser = createAsyncThunk(
    'auth/getUser',
    apiGetUser
);
export const updateUser = createAsyncThunk(
    'auth/getUser',
    apiUpdateUser
);

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.fulfilled, (state, action) => {
                state.user = action?.payload?.user;
                state.failedAuth = false;
                state.accessToken = action?.payload?.accessToken;
                state.refreshToken = action?.payload?.refreshToken;
            })
            .addCase(loginAction.rejected, (state) => {
                state.failedAuth = true;
            });

        builder
            .addCase(logoutAction.fulfilled, (state) => {
                state.user = null;
                state.failedAuth = false;
                state.accessToken = '';
                state.refreshToken = '';
            })

        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action?.payload?.user;
            })
    },
});


export const authReducer = slice.reducer;

export const {

} = slice.actions;
