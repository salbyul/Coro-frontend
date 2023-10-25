import { http } from './http';

// 회원가입
export function memberRegister(member) {
    return http.post('/members', member);
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

// 회원 수정을 위한 정보 획득
export function fetchInformationForModification() {
    return http.get('/members/me');
}

// 비밀번호 변경
export function modifyMemberPassword(data) {
    return http.put('/members/me', data);
}
