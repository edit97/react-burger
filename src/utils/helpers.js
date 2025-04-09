export const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    if (res.status === 401) {
        window.location.href = '/login'
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const checkSuccess = (res) => {
    if (res && res.success) {
        res.refreshToken && localStorage.setItem('refreshToken', res.refreshToken)
        res.accessToken && localStorage.setItem('accessToken', res.accessToken)
        return res;
    }
    return Promise.reject(`Ответ не success: ${res}`);
};
