import { http } from './http';

// 회원가입
export function moimRegister(moim) {
    return http.post('/moims', moim);
}

export function search(option, value, page, size) {
    return http.get(
        `/moims/search?option=${option}&value=${value}&page=${page}&size=${size}`
    );
}

export function getDetail(moimId) {
    return http.get(`/moims/${moimId}`);
}
