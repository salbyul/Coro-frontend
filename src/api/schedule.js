import { http } from './http';

export const registerSchedule = (moimId, schedule) => {
    return http.post(`/schedules?moim=${moimId}`, schedule);
};

export const fetchMonthlySchedule = (moimId, date) => {
    return http.get(`/schedules/month?moim=${moimId}&date=${date}`);
};

export const fetchSchedules = (moimId, date) => {
    return http.get(`/schedules?moim=${moimId}&date=${date}`);
};

export const deleteSchedule = (scheduleId) => {
    return http.delete(`/schedules?schedule=${scheduleId}`);
};
