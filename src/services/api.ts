import {request} from "../utils/request";
import {IRegisterUser, TIngredient} from "../utils/types";

export const fetchIngredients = () => {
    return request('/ingredients')
};

export const createOrder = async (ingredients: TIngredient[]) => {
    return request('/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({'ingredients': ingredients})
    })
};

export const registerUser = async ({
                                       email,
                                       name,
                                       password,
                                   }: IRegisterUser) => {
    return request('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, name, password})
    })
};

export const forgotPassword = async ({email}: { email: string }) => {
    return request('/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    })
};

export const resetPassword = async ({password, token}: { password: string; token: string }) => {
    return request('/password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, token})
    })
};

export const loginAction = async ({password, email}: { password: string; email: string }) => {
    return request('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
};

export const logoutAction = async () => {
    return request('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
};
export const getUser = async (token: string | null) => {
    return request('/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': token || ''
        }
    })
};

export const updateUser = async ({email, name, token}: { email: string; name: string; token: string }) => {
    return request('/auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({email, name})
    })
};

export const checkAuth = async () => {
    return request('/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        }),
    })
        .then((res) => {
            console.log(res, 'RESPONSE');
        })
};

