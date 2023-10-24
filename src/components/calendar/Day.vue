<script setup>
import { ref } from 'vue';
import { onBeforeMount } from 'vue';

const props = defineProps(['lastDay', 'showModal', 'currentDate', 'schedules']);
const date = ref();
const schedules = ref([]);

const calculateDay = () => {
    const lastDay = props.lastDay; // 이 달의 마지막 날

    const currentDate = props.currentDate;
    if (currentDate > 0 && currentDate <= lastDay) {
        date.value = currentDate;
    }
};

onBeforeMount(() => {
    calculateDay();
    schedules.value = props.schedules;
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
            <div class="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                <div
                    v-for="s in schedules"
                    class="bg-sky-100 rounded-md text-gray-700"
                >
                    {{ s.title }}
                </div>
            </div>
        </div>
    </td>
</template>
