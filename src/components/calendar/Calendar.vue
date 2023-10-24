<script setup>
import { ref } from 'vue';
import Day from './Day.vue';
import DayModal from './DayModal.vue';
import {
    getStartDay,
    getNumberOfDaysInMonth,
} from '../../composables/useHandlingCalendar';

const props = defineProps(['dateTime']);
const year = ref(props.dateTime.year);
const month = ref(props.dateTime.month);
const isVisibleModal = ref(false);
const dateOfModal = ref(-1);

const showModal = (date) => {
    if (!date) return;
    dateOfModal.value = date;
    isVisibleModal.value = true;
};
</script>
<template>
    <div class="my-5">
        <table class="border mx-auto w-full">
            <thead>
                <tr class="border-b">
                    <th
                        class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs text-red-500"
                    >
                        Sunday
                    </th>
                    <th
                        class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs"
                    >
                        Monday
                    </th>
                    <th
                        class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs"
                    >
                        Tuesday
                    </th>
                    <th
                        class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs"
                    >
                        Wednesday
                    </th>
                    <th
                        class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs"
                    >
                        Thursday
                    </th>
                    <th
                        class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs"
                    >
                        Friday
                    </th>
                    <th
                        class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs text-blue-500"
                    >
                        Saturday
                    </th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr v-for="line in 6" class="border-b">
                    <Day
                        v-for="i in 7"
                        :firstDay="getStartDay(year, month)"
                        :line="line"
                        :day="i"
                        :lastDay="getNumberOfDaysInMonth(year, month)"
                        :showModal="showModal"
                    ></Day>
                </tr>
            </tbody>
        </table>
        <DayModal
            :show="isVisibleModal"
            @close="isVisibleModal = false"
            :year="year"
            :month="month"
            :date="dateOfModal"
        ></DayModal>
    </div>
</template>
