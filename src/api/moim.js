import { http } from './http';

// 회원가입
export function moimRegister(moim) {
    return http.post('/moims', moim);
}

// 검색
export function search(option, value, page, size) {
    return http.get(
        `/moims/search?option=${option}&value=${value}&page=${page}&size=${size}`
    );
}

// Detail 페이지
export function getDetail(moimId) {
    return http.get(`/moims/${moimId}`);
}

// 수정을 위한 모임정보 가져오기
export function fetchDataForModification(moimId) {
    return http.get(`/moims/modification/${moimId}`);
}

// 모임 수정
export function updateMoim(moimId, moim) {
    return http.put(`/moims/${moimId}`, moim);
}

// 회원 관리위한 데이터 획득
export function fetchMoimMember(moimId) {
    return http.get(`/moims/${moimId}/members`);
}

// 회원 관리 업데이트
export function updateMoimMember(moimId, moimMemberList) {
    return http.put(`/moims/${moimId}/members`, moimMemberList);
}

// 회원 추방
export function deportMember(moimId, id) {
    return http.delete(`/moims/${moimId}/members?moimMember=${id}`);
}
