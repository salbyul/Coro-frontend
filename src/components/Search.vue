<script setup>
import { onMounted } from 'vue';
import {
    searchOption,
    searchValue,
} from '../composables/useHandlingSearchData';

const submit = () => {
    window.location.href = `/search?option=${searchOption.value}&value=${searchValue.value}&page=1`;
};
onMounted(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('value')) {
        searchValue.value = params.get('value');
    }
    if (params.has('option')) {
        searchOption.value = params.get('option');
    }
});
</script>
<template>
    <div class="flex justify-center">
        <select class="border rounded-sm px-2" v-model="searchOption">
            <option value="name">모임명</option>
            <option value="tag">태그</option>
        </select>
        <input
            type="text"
            class="border py-1 px-2 w-8/12 rounded-sm mr-2"
            placeholder="검색어를 입력해주세요."
            v-model="searchValue"
            @keypress.enter="submit"
        />
        <button
            class="px-2 py-1 border rounded-sm bg-sky-100 text-gray-700"
            @click="submit"
        >
            검색
        </button>
    </div>
</template>
