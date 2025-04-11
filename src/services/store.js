import { configureStore } from '@reduxjs/toolkit';

import {burgerReducer} from './reducers';
import {orderReducer} from "./reducers";
import {authReducer} from "./reducers/auth";

const store = configureStore({
	reducer: {
		burger: burgerReducer,
		order: orderReducer,
		auth: authReducer,
	},
});

export default store;

