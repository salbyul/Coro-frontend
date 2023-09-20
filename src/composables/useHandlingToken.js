import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

export const setToken = (token) => {
    cookies.set('token', token, '1d', null, null, true);
};

export const hasToken = () => {
    return cookies.isKey('token');
};

export const getToken = () => {
    return cookies.get('token');
};

export const removeToken = () => {
    if (hasToken()) {
        cookies.remove('token');
    }
};
