import { http } from './http';

// 회원가입
export function memberRegister(member) {
    return http.post('/members', member);
}

// 로그인
export function memberLogin(member) {
    return http.post('/members/login', member);
}

// 가입한 모임
export function fetchMyMoim() {
    return http.get(`/members/moims`);
}

// 모임에 지원한 지원서 획득
export function fetchApplicationList(moimId, status) {
    if (status === undefined) {
        return http.get(`/members/applications/?moim=${moimId}&status=all`);
    }
    return http.get(`/members/applications/?moim=${moimId}&status=${status}`);
}
