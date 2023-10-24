<script setup>
import { ref } from 'vue';
import { onBeforeMount } from 'vue';

const props = defineProps(['firstDay', 'line', 'day', 'lastDay', 'showModal']);
const date = ref();

const calculateDay = () => {
    const firstDay = props.firstDay; // 시작요일
    const line = props.line; // 몇 주
    const day = props.day; // 요일
    const lastDay = props.lastDay; // 이 달의 마지막 날

    let result = day - firstDay + (line - 1) * 7;
    if (result > 0 && result <= lastDay) {
        date.value = result;
    }
};

onBeforeMount(() => {
    calculateDay();
});
</script>
<template>
    <td
        class="border-r p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
        v-on:click="() => props.showModal(date)"
    >
        <div
            class="flex flex-col h-40 xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto"
        >
            <div class="top h-5 w-full">
                <span class="text-gray-500">{{ date }}</span>
            </div>
            <div class="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
        </div>
    </td>
</template>
