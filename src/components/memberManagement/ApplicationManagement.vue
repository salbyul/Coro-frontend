<script setup>
import { useRoute } from 'vue-router';
import { onBeforeMount, ref, watch } from 'vue';
import {
    fetchApplicationList,
    fetchDetailedApplication,
    decideApplication,
} from '../../api/application';

const route = useRoute();
const moimId = route.params.id;
const applicantList = ref([]);
const applicationId = ref(0);
const detailedApplication = ref([]);

const ACCEPT = 'accept';
const REFUSE = 'refuse';

const decide = async (value) => {
    try {
        const data = await decideApplication(applicationId.value, value);
        alert('처리 되었습니다.');
        window.location.href = `/moim/${moimId}`;
    } catch (error) {
        console.log(error);
    }
};

watch(applicationId, async () => {
    const data = await fetchDetailedApplication(applicationId.value);
    detailedApplication.value = data.body.application.applicationAnswerDTOList;
});

onBeforeMount(async () => {
    try {
        const data = await fetchApplicationList(moimId, 'wait');
        if (data.body.applicationList.length > 0) {
            applicantList.value = data.body.applicationList;
            applicationId.value = applicantList.value.at(0).id;
        }
    } catch (error) {
        console.log(error);
    }
});
</script>
<template>
    <div>
        <div>
            <select class="border my-10 p-1" v-model="applicationId">
                <option disabled>지원자</option>
                <option
                    v-for="applicant in applicantList"
                    :value="applicant.id"
                >
                    {{ applicant.applicantName }}
                </option>
            </select>
        </div>
        <div>
            <div
                v-for="(applicationAnswer, index) in detailedApplication"
                class="border-b"
            >
                <div class="py-10 text-xl">
                    {{ `질문${index + 1}. ${applicationAnswer.question}` }}
                </div>
                <div class="py-10 text-lg text-gray-700">
                    {{ applicationAnswer.answer }}
                </div>
            </div>
        </div>
        <div class="my-10">
            <button
                class="px-3 py-1.5 mr-20 bg-sky-200 text-gray-700 rounded-md duration-150 hover:duration-150 hover:bg-sky-300"
                @click="() => decide(ACCEPT)"
            >
                합격
            </button>
            <button
                class="px-3 py-1.5 bg-red-200 text-gray-700 rounded-md duration-150 hover:duration-150 hover:bg-red-300"
                @click="() => decide(REFUSE)"
            >
                불합격
            </button>
        </div>
    </div>
</template>
