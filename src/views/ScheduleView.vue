<script setup>
import Calendar from '../components/calendar/Calendar.vue';
import { onBeforeMount, ref, watch } from 'vue';
import {
    initDate,
    year,
    month,
    date,
    toLastMonth,
    toNextMonth,
} from '../composables/useHandlingDate';

const key = ref(0);

watch(month, () => {
    key.value = key.value + 1;
});

onBeforeMount(() => {
    initDate();
});
</script>
<template>
    <div>
        <div class="text-center my-10">
            <h1 class="text-4xl text-gray-700">모임명 일정</h1>
        </div>
        <div class="text-center">
            <h1 class="text-2xl text-gray-700">{{ year }} {{ month }}월</h1>
        </div>
        <div class="text-end mr-5">
            <button
                class="mr-5 px-2 py-1 border rounded-full duration-150 hover:duration-150 hover:bg-gray-50"
                :onClick="toLastMonth"
            >
                ←
            </button>
            <button
                class="px-2 py-1 border rounded-full duration-150 hover:duration-150 hover:bg-gray-50"
                :onClick="toNextMonth"
            >
                →
            </button>
        </div>
        <Calendar :dateTime="{ year, month }" :key="key"></Calendar>
    </div>
</template>
