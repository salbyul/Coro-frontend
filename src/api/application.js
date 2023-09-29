import { http } from './http';

export function getApplicationQuestionList(moimId) {
    return http.get(`/applications/questions/${moimId}`);
}

export function submitApplication(application, moimId) {
    return http.post(`/applications/${moimId}`, application);
}

export function fetchApplicationList(moimId, status) {
    if (status === undefined) {
        return http.get(`/applications/${moimId}?status=all`);
    }
    return http.get(`/applications/${moimId}?status=${status}`);
}
