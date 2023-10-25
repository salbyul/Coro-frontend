<script setup>
import { onBeforeMount, ref } from 'vue';
import { fetchMyMoim } from '../api/member';
import SummaryMoim from '../components/SummaryMoim.vue';

const isLoaded = ref(false);
const moimList = ref([]);

const init = async () => {
    try {
        const data = await fetchMyMoim();
        moimList.value = data.body.list;
        isLoaded.value = true;
    } catch (error) {}
};

onBeforeMount(async () => {
    await init();
});
</script>
<template>
    <div>
        <h1 class="text-2xl text-center">내 모임</h1>
        <SummaryMoim v-for="moim in moimList" :moim="moim"></SummaryMoim>
    </div>
</template>
