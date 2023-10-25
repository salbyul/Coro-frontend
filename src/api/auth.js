import { getRefreshToken } from '../composables/useHandlingToken';
import { http } from './http';

export const refreshTokens = (config) => {
    return http.post('/auth/new', null, config);
};

// 로그인
export function memberLogin(member) {
    return http.post('/auth/login', member);
}

// 로그아웃
export function memberLogout() {
    return http.delete('/auth/logout', {
        headers: { refresh: getRefreshToken() },
    });
}
