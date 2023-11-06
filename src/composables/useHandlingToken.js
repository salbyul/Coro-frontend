import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

export const setToken = (accessToken, refreshToken) => {
    cookies.set('accessToken', accessToken, '1d', '/', null, false);
    cookies.set('refreshToken', refreshToken, '1d', '/', null, false);
};

export const hasToken = () => {
    return cookies.isKey('accessToken');
};

export const getToken = () => {
    return cookies.get('accessToken');
};

export const removeToken = () => {
    if (hasToken()) {
        cookies.remove('accessToken');
        cookies.remove('refreshToken');
    }
};

export const getRefreshToken = () => {
    return cookies.get('refreshToken');
};
