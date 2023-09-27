import { http } from './http';

// 회원가입
export function moimRegister(moim) {
    return http.post('/moims', moim);
}

export function search(option, value, page, size) {
    return http.get(
        `/moims?option=${option}&value=${value}&page=${page}&size=${size}`
    );
}
