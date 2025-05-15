type TAPIResponse = {
    success: boolean;
    accessToken?: string;
    refreshToken?: string;
    [key: string]: any; // fallback for any other fields
}

export const checkResponse = async (res: Response): Promise<TAPIResponse> => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

export const checkSuccess = <T = TAPIResponse>(res: TAPIResponse): Promise<T> => {
    if (res && res.success) {
        if (res.refreshToken) localStorage.setItem('refreshToken', res.refreshToken);
        if (res.accessToken) localStorage.setItem('accessToken', res.accessToken);
        return Promise.resolve(res as T);
    }
    return Promise.reject(`Ответ не success: ${JSON.stringify(res)}`);
};
