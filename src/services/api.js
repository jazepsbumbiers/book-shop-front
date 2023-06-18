import axios from 'axios';

export const localAPI = axios.create({
    baseURL: 'http://localhost:80/api',
});

export const endPoints = {
    index: '/books',
    top10: '/books/top-10',
    buy: '/books/buy',
};

export const getRequest = async (url, params = {}) => {
    let response = {};
    let errors = {};

    const query = Object.keys(params)
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');

    if (query) {
        url = `${url}?${query}`;
    }

    try {
        response = await localAPI.get(url);
    } catch (error) {
        const statusCode = error.response?.status ?? 500;
        const { message } = error.response?.data ?? { message: 'There has been an internal server error' };

        errors = { statusCode, message };
    }

    return {
        response,
        errors,
    };
};
