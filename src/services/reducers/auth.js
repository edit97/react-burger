import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
    registerUser as apiRegisterUser,
    resetPassword as apiResetPassword,
    forgotPassword as apiForgotPassword,
    loginAction as apiLoginAction,
    logoutAction as apiLogoutAction,
    getUser as apiGetUser,
    updateUser as apiUpdateUser,
    checkAuth as apiCheckAuth,
} from '../api';


const initialState = {
    login: false,
    user: null,
    isLoggedIn: false,
    refreshToken: '',
    accessToken: '',
    failedAuth: false,
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
    'auth/updateUser',
    apiUpdateUser
);
export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    apiCheckAuth
);

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.fulfilled, (state, action) => {
                state.user = action?.payload?.user;
                state.isLoggedIn = true;
                state.failedAuth = false;
                state.accessToken = action?.payload?.accessToken;
                state.refreshToken = action?.payload?.refreshToken;
            })
            .addCase(loginAction.rejected, (state) => {
                state.isLoggedIn = false;
                state.failedAuth = true;
            });

        builder
            .addCase(logoutAction.fulfilled, (state) => {
                state.user = null;
                state.isLoggedIn = false;
                state.accessToken = '';
                state.refreshToken = '';
            })

        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action?.payload?.user;
            })
            .addCase(getUser.rejected, (state) => {
                state.isLoggedIn = false;
                state.failedAuth = true;
            })
        builder
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.accessToken = action?.payload?.accessToken;
                state.refreshToken = action?.payload?.refreshToken;
            })
        // builder.addMatcher(
        //     isRejectedWithValue,
        //     (state, action) => {
        //         console.log('action', action);
        //         if (action.payload?.status === 401) {
        //             state.isLoggedIn = false;
        //             state.failedAuth = true;
        //         }
        //         // Optional: set error message
        //         state.error = action.payload?.message || 'Something went wrong';
        //     }
        // );
    },
});


export const authReducer = slice.reducer;

export const {} = slice.actions;
