<script setup>
import { onBeforeMount, ref } from 'vue';
import { search } from '../api/moim';
import SummaryMoim from '../components/SummaryMoim.vue';
import Pagination from '../components/Pagination.vue';

const params = new URLSearchParams(location.search);
const isLoaded = ref(false);
const currentData = ref({});
const moimList = ref([]);
const page = ref('');

const init = async (option, value) => {
    try {
        page.value = params.has('page') ? params.get('page') : 0;
        const data = await search(option, value, Number(page.value) - 1, 10);
        currentData.value = data.body;
        moimList.value = data.body.list;
        isLoaded.value = true;
    } catch (error) {}
};
onBeforeMount(() => {
    if (!(params.has('option') && params.has('value'))) {
        window.location.href = '/';
    }
    init(params.get('option'), params.get('value'));
});
</script>
<template>
    <div>
        <div class="my-7">
            <SummaryMoim v-for="moim in moimList" :moim="moim"></SummaryMoim>
            <Pagination
                v-if="isLoaded"
                :page-info="{
                    isFirst: currentData.isFirst,
                    isLast: currentData.isLast,
                    totalPages: currentData.totalPages,
                    page,
                }"
            ></Pagination>
        </div>
    </div>
</template>
