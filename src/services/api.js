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

export const registerUser = async ({
                                       email,
                                       name,
                                       password,
                                   }) => {
    return request('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, password })
    })
};

export const forgotPassword = async ({email}) => {
    return request('/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
};

export const resetPassword = async ({password, token}) => {
    return request('/password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, token })
    })
};

export const loginAction = async ({password, email}) => {
    return request('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
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
export const getUser = async (token) => {
    return request('/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': token
        }
    })
};

export const updateUser = async ({email, name, token}) => {
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
            token : localStorage.getItem('refreshToken')
        }),
    })
        .then((res)=>{
            console.log(res, 'RESPONSE');
        })
};

