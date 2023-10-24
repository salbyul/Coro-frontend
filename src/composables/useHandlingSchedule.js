import { ref } from 'vue';

export const title = ref('');
export const content = ref('');

export const validateSchedule = () => {
    if (!title.value || title.value.length < 1 || title.value.length > 100) {
        return false;
    }
    return true;
};

export const init = () => {
    title.value = '';
    content.value = '';
};
