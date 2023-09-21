import { http } from './http';

// 회원가입
export function moimRegister(moim) {
    return http.post('/moims', moim);
}
