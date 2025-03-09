import { configureStore } from '@reduxjs/toolkit';

import {burgerReducer} from './reducers';
import {orderReducer} from "./reducers";

const store = configureStore({
	reducer: {
		burger: burgerReducer,
		order: orderReducer,
	},
});

export default store;

