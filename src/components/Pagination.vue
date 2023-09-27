<script setup>
import { onMounted, ref } from 'vue';
const props = defineProps(['pageInfo']);
const pageList = ref([]);
const currentPage = ref(0);

const movePage = (page) => {
    const params = new URLSearchParams(location.search);
    const option = params.get('option');
    const value = params.get('value');
    window.location.href = `/search?option=${option}&value=${value}&page=${page}`;
};

const calculatePage = () => {
    let startPage = Number(props.pageInfo.page) - 2;
    const newPageList = [];
    for (let i = 0; i < 5; i++) {
        if (startPage > Number(props.pageInfo.totalPages)) {
            break;
        }
        if (startPage < 1) {
            startPage++;
            continue;
        }
        newPageList.push(startPage++);
    }
    pageList.value = newPageList;
};

onMounted(() => {
    calculatePage();
    const params = new URLSearchParams(location.search);
    if (params.has('page')) {
        currentPage.value = Number(params.get('page'));
    }
});
</script>
<template>
    <div class="text-center">
        <button
            class="px-1 border rounded-sm border-gray-500 bg-blue-50"
            v-if="!pageInfo.isFirst"
            @click="() => movePage(1)"
        >
            &lt;
        </button>
        <template v-for="p in pageList">
            <button
                v-if="p > 0"
                class="px-1 border rounded-sm border-gray-500 bg-blue-50"
                :class="currentPage == p ? 'bg-blue-200' : ''"
                @click="() => movePage(p)"
            >
                {{ p }}
            </button>
        </template>
        <button
            class="px-1 border rounded-sm border-gray-500 bg-blue-50"
            v-if="!pageInfo.isLast"
            @click="() => movePage(Number(pageInfo.totalPages))"
        >
            &gt;
        </button>
    </div>
</template>
