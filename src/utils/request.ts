import {checkResponse, checkSuccess} from "./helpers";

export const baseUrl = 'https://norma.nomoreparties.space/api';

export function request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return fetch(`${baseUrl}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess<T>);
}
