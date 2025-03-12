import {checkResponse, checkSuccess} from "./helpers";

export const baseUrl = 'https://norma.nomoreparties.space/api';

export function request(endpoint, options = {}) {
    return fetch(`${baseUrl}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess)
}
