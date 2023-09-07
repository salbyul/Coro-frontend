import axios from 'axios';
import { getToken, hasToken } from '../composables/useHandlingToken';

function createInstance(baseURL, options) {
    return axios.create(Object.assign({ baseURL: baseURL }, options));
}

export const http = createInstance('http://localhost:8080/api');

// 토큰이 존재하면 헤더에 포함시킨다.
http.interceptors.request.use((config) => {
    if (!hasToken()) {
        return config;
    }
    const token = getToken();

    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

http.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);
