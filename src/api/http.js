import axios from 'axios';
import {
    getRefreshToken,
    getToken,
    hasToken,
    removeToken,
    setToken,
} from '../composables/useHandlingToken';
import { refreshTokens } from './auth';

function createInstance(baseURL, options) {
    return axios.create(Object.assign({ baseURL: baseURL }, options));
}

export const http = createInstance('https://moim.ddns.net/api');

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
    async (error) => {
        const {
            config,
            response: { status },
        } = error;
        const code = error.response.data.code;
        if (code === '002') {
            try {
                const originalConfig = config;
                config.headers.refresh = getRefreshToken();
                const data = await refreshTokens(config);
                const accessToken = data.body.token.accessToken;
                const refreshToken = data.body.token.refreshToken;
                setToken(accessToken, refreshToken);
                return http(error.config);
            } catch (error) {
                removeToken();
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
const MAX_RETRY_COUNT = 2;
