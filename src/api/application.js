import { http } from './http';

// 해당 모임의 지원 질문 목록 획득
export function getApplicationQuestionList(moimId) {
    return http.get(`/applications/questions/${moimId}`);
}

// 지원서 제출
export function submitApplication(application, moimId) {
    return http.post(`/applications/${moimId}`, application);
}

// 해당 모임에 지원된 지원서 획득
export function fetchApplicationList(moimId, status) {
    if (status === undefined) {
        return http.get(`/applications?moim=${moimId}&status=all`);
    }
    return http.get(`/applications?moim=${moimId}&status=${status}`);
}

// 해당 멤버의 지원서 획득
export function fetchApplicationByMember(moimId, status) {
    if (status === undefined) {
        return http.get(`/applications/members?moim=${moimId}&status=all`);
    }
    return http.get(`/applications/members?moim=${moimId}&status=${status}`);
}

// 디테일 지원서 획득
export function fetchDetailedApplication(applicationId) {
    return http.get(`/applications/${applicationId}`);
}

// 지원서 합불합 결정
export function decideApplication(applicationId, value) {
    return http.put(`/applications/${applicationId}?status=${value}`);
}
