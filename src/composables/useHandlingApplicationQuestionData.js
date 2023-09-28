import { ref } from 'vue';

const questionList = ref([]);
export const sequence = ref(1);

export const addQuestion = (questionDiv) => {
    questionList.value.push(questionDiv);
};

export const deleteQuestion = (questionDiv) => {
    const newList = questionList.value.filter(
        (question) => question.id !== questionDiv.id
    );
    questionList.value = newList;
};

export const questionListInit = () => {
    questionList.value = [];
};

export const getQuestionList = () => {
    let order = 1;
    const result = [];
    questionList.value.forEach((question) => {
        if (question.childNodes[0].value !== '') {
            result.push({
                content: question.childNodes[0].value,
                order: order++,
            });
        }
    });
    return result;
};
