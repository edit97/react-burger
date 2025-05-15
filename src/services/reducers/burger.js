import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchIngredients as apiFetchIngredients} from '../api';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    ingredients: [],
    selectedIngredients: [],
    totalAmount: 0,
};

export const fetchIngredients = createAsyncThunk(
    'burger/fetchIngredients',
    apiFetchIngredients
);

const slice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        setSelectedIngredients: {
            reducer(state, {payload}){
                let list =  state.selectedIngredients

                if (payload.type === 'bun') {
                    list = list.filter(item => item.type !== 'bun');
                }

                state.selectedIngredients = [...list, payload]
            },
            prepare: (ingredient) => {
                return { payload: { ...ingredient, id: uuidv4() } };
            }
        },
        deleteSelectedIngredient(state, {payload}) {
            state.selectedIngredients = state.selectedIngredients.filter((i) => i.id !== payload.id);
        },
        moveSelectedIngredient(state, {payload}) {
            const ingredients = [...state.selectedIngredients];
            ingredients.splice(payload.to, 0,ingredients.splice(payload.from,1)[0]);

            state.selectedIngredients = ingredients;
        },
        clearSelectedIngredient(state) {
            state.selectedIngredients = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.ingredientsRequest = true;
                state.ingredientsError = null;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload.data;
                state.ingredientsRequest = false;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.ingredientsError = action.error;
                state.ingredientsRequest = false;
            });
    },
});


export const burgerReducer = slice.reducer;

export const {
    setSelectedIngredients,
    deleteSelectedIngredient,
    moveSelectedIngredient,
    clearSelectedIngredient
} = slice.actions;
