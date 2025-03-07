import * as config from '../../config';
import {INGREDIENTS_LOAD} from "./index";

export function getIngredients() {
	return function(dispatch) {
		fetch(config.getIngredientsUrl)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					return Promise.reject(response.status);
				}
			})
			.then(result => {
				dispatch({
					type: INGREDIENTS_LOAD,
					data: result.data
				})
			})
			.catch(error => {
				console.log(error);
				alert('Error ' + error + ' while connecting to Api');
			});


	}
}
