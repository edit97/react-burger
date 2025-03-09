import {ingredientsUrl, orderUrl} from "./config";

export const fetchIngredients = async () => {
    const response = await fetch(ingredientsUrl);
    const result = await response.json();

    if (result.success === true) {
        return result.data;
    } else {
        throw new Error("Can't get data from server");
    }
};

export const createOrder = async (ingredients) => {
    const response = await fetch(orderUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({'ingredients': ingredients})
    });
    const result = await response.json();

    if (result.success === true) {
        return result.order;
    } else {
        throw new Error("Can't get data from server");
    }
};
