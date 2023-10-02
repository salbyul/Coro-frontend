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

export function updateMoim(moimId, moim) {
    return http.put(`/moims/${moimId}`, moim);
}
