import axios from 'axios';

export const localAPI = axios.create({
    baseURL: 'http://localhost:80',
});

export const getRequest = async (url, params = {}) => {
    let response = null;
    const query = Object.keys(params)
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');

    if (query) {
        url = `${url}?${query}`;
    }

    try {
        response = await localAPI.get(url);
    } catch (error) {
        throw new Error(error);
    }

    return response;
};
