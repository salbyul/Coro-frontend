import { ref } from 'vue';

const applicationList = ref([]);

export const setApplicationQuestion = (e, order) => {
    applicationList.value.forEach((application) => {
        if (application.order === order) {
            application.content = e.target.value;
        }
    });
};

export const init = (applicationQuestions) => {
    applicationQuestions.forEach((question) => {
        applicationList.value.push({ content: '', order: question.order });
    });
};

export const validateApplicationData = () => {
    for (let i = 0; i < applicationList.value.length; i++) {
        const application = applicationList.value.at(i);
        if (application.content === '') {
            return false;
        }
    }
    return true;
};

export const getApplication = () => {
    const application = [];
    for (let i = 0; i < applicationList.value.length; i++) {
        application.push(applicationList.value.at(i));
    }
    return application;
};
