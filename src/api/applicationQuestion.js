import { http } from './http';

export function applicationQuestionRegister(questionList, moimId) {
    return http.post(`/applications/questions?id=${moimId}`, questionList);
}
