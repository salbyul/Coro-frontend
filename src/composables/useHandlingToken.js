import { useCookies } from 'vue3-cookies';

export const setToken = (token) => {
    const { cookies } = useCookies();
    cookies.set('token', token, '1d', null, null, true);
};

export const hasToken = () => {
    const { cookies } = useCookies();
    return cookies.isKey('token');
};

export const getToken = () => {
    const { cookies } = useCookies();
    return cookies.get('token');
};
