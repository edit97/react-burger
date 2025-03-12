import {request} from "../utils/request";

export const fetchIngredients = () => {
    return request('/ingredients')
};

export const createOrder = async (ingredients) => {
    return request('/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({'ingredients': ingredients})
    })
};
