<script setup>
import { onBeforeMount, ref } from 'vue';
import {
    getApplicationQuestionList,
    submitApplication,
    fetchApplicationList,
} from '../api/application';
import { useRoute } from 'vue-router';
import {
    init,
    setApplicationQuestion,
    validateApplicationData,
    getApplication,
} from '../composables/useHandlingApplicationData';

const route = useRoute();
const moimId = route.params.id;
const questionList = ref([]);

const goBack = () => {
    window.history.back();
};

const submit = async () => {
    try {
        if (!validateApplicationData()) {
            alert('모든 질문에 답변을 해야 합니다.');
            return;
        }
        const applicationList = getApplication();

        const data = await submitApplication({ applicationList }, moimId);
        alert('지원이 완료되었습니다.');
        window.location.href = `/moim/${moimId}`;
    } catch (error) {
        const code = error.response.data.code;
        console.log(error);
        if (code === '306') {
            alert('이미 지원한 모임입니다.');
        }
    }
};

onBeforeMount(async () => {
    try {
        const applicationList = await fetchApplicationList(moimId, 'wait');
        if (applicationList.body.applicationList.length > 0) {
            alert('이미 지원한 모임입니다.');
            goBack();
        }
        const fetchedquestionList = await getApplicationQuestionList(moimId);
        console.log(fetchedquestionList);
        questionList.value = fetchedquestionList.body.questionList;
        init(fetchedquestionList.body.questionList);
    } catch (error) {
        console.log(error);
    }
});
</script>
<template>
    <div class="w-7/12 mx-auto">
        <h1 class="text-3xl text-center text-gray-700 pb-5">지원하기</h1>
        <hr />
        <!-- 질문 리스트 -->
        <div v-for="question in questionList" class="my-5">
            <h2 class="text-md mb-3">
                질문 {{ question.order }}. {{ question.content }}
            </h2>
            <textarea
                class="resize-none border w-full p-2"
                placeholder="답변을 입력해주세요."
                @change="(e) => setApplicationQuestion(e, question.order)"
            ></textarea>
        </div>
        <div class="text-center">
            <button
                class="mr-5 px-4 py-1.5 text-gray-700 bg-sky-200 duration-150 rounded-md hover:duration-150 hover:bg-sky-300"
                @click="submit"
            >
                제출
            </button>
            <button
                class="px-4 py-1.5 text-gray-700 bg-red-200 duration-150 rounded-md hover:duration-150 hover:bg-red-300"
                @click="goBack"
            >
                취소
            </button>
        </div>
    </div>
</template>
