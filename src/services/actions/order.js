import * as config from '../../config';
import {ORDER_LOAD, RESET_CONSTRUCTOR} from "./index";

export function createOrder(ingredients) {
	return function (dispatch) {
		fetch(config.createOrderUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify({'ingredients': ingredients})
			}
		)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					return Promise.reject(response.status);
				}
			})
			.then(result => {
				if (result.success) {
					let orderNumber = result.order.number;
					dispatch({
						type: ORDER_LOAD,
						number: orderNumber
					})
					dispatch({
						type:RESET_CONSTRUCTOR
					});
				}
			})
			.catch(error => {
				console.log(error);
				alert('Error ' + error + ' while connecting to Api');
			});

	}
}
