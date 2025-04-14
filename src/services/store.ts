import { configureStore } from '@reduxjs/toolkit';

import {burgerReducer} from './reducers';
import {orderReducer} from "./reducers";
import {authReducer} from "./reducers/auth";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, TReduxStore} from "../utils/types";

const store = configureStore({
	reducer: {
		burger: burgerReducer,
		order: orderReducer,
		auth: authReducer,
	},
});
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TReduxStore> = useSelector;

export default store;

