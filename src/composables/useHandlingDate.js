import { ref } from 'vue';

export const year = ref();
export const month = ref();
export const date = ref();
export const dayOfWeek = ref();

export const initDate = () => {
    const now = new Date();
    year.value = now.getFullYear();
    month.value = now.getMonth() + 1;
    date.value = now.getDate();
    dayOfWeek.value = now.getDay();
};

export const toLastMonth = () => {
    if (month.value === 1) {
        year.value = year.value - 1;
        month.value = 12;
    } else {
        month.value = month.value - 1;
    }
};

export const toNextMonth = () => {
    if (month.value === 12) {
        year.value = year.value + 1;
        month.value = 1;
    } else {
        month.value = month.value + 1;
    }
};
