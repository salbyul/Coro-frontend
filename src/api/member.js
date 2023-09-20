import { http } from './http';

// 회원가입
export function memberRegister(member) {
    return http.post('/members', member);
}

// 로그인
export function memberLogin(member) {
    return http.post('/members/login', member);
}
