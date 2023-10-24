import { http } from './http';

export const registerSchedule = (id, schedule) => {
    return http.post(`/schedules?moim=${id}`, schedule);
};
