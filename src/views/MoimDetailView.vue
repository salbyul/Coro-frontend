<script setup>
import { onBeforeMount, ref } from 'vue';
import { getDetail } from '../api/moim';
import { useRoute } from 'vue-router';

const detail = ref({});
const route = useRoute();
const id = route.params.id;

const join = () => {
    window.location.href = `/moim/join/${id}`;
};

onBeforeMount(async () => {
    try {
        const data = await getDetail(id);
        detail.value = data.body.moim;
    } catch (error) {}
});
</script>
<template>
    <div class="mx-auto w-7/12 text-center border-y">
        <div class="pb-2 mb-2">
            <div class="text-2xl text-gray-700 my-2">{{ detail.name }}</div>
            <div class="my-3">
                <span
                    v-for="tag in detail.tagList"
                    class="text-sm mx-2 bg-gray-100 text-gray-700 p-1 rounded-md"
                    ># {{ tag }}</span
                >
            </div>
            <hr />
            <div class="text-end my-3">
                <a
                    v-if="detail.joined"
                    :href="`/moim/${id}/schedule`"
                    class="px-3 py-1.5 border bg-green-200 text-gray-700 rounded-md duration-150 hover:duration-150 hover:bg-green-300"
                >
                    일정
                </a>
                <a
                    v-if="!detail.joined"
                    class="px-3 py-1.5 ml-3 border bg-sky-200 text-gray-700 rounded-md duration-150 hover:duration-150 hover:bg-sky-300"
                    @click="join"
                    :href="`/moim/join/${id}`"
                >
                    가입신청
                </a>
                <a
                    v-if="detail.canManage"
                    class="px-3 py-1.5 ml-3 border bg-sky-200 text-gray-700 rounded-md duration-150 hover:duration-150 hover:bg-sky-300"
                    :href="`/moim/setting/${id}`"
                >
                    관리
                </a>
            </div>
        </div>
        <div>
            <div class="my-4">
                <img
                    v-if="detail.photoName !== null"
                    v-bind:src="`data:${detail.contentType};base64,${detail.photo}`"
                    v-bind:alt="detail.photoName"
                    class="mx-auto"
                />
                <img
                    v-else
                    src="/defaultMoimPhoto.jpg"
                    alt="defaultImage"
                    class="mx-auto"
                />
            </div>
            <div class="whitespace-pre-wrap">
                {{ detail.introduction }}
            </div>
        </div>
    </div>
</template>
