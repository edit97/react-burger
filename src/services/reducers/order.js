import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createOrder as apiCreateOrder} from '../api';


const initialState = {
    order: null,
};

export const createOrder = createAsyncThunk(
    'order/createOrder',
    apiCreateOrder
);

const slice = createSlice({
    name: 'order',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.fulfilled, (state, action) => {
                state.order = action.payload;
            })
    },
});


export const orderReducer = slice.reducer;

export const {

} = slice.actions;
