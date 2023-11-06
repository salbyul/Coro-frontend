<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import Day from './Day.vue';
import DayModal from './DayModal.vue';
import {
    getStartDay,
    getNumberOfDaysInMonth,
} from '../../composables/useHandlingCalendar';
import { fetchMonthlySchedule } from '../../api/schedule';
import { useRoute } from 'vue-router';

const props = defineProps(['dateTime']);
const year = ref(props.dateTime.year);
const month = ref(props.dateTime.month);
const isVisibleModal = ref(false);
const dateOfModal = ref(1);
const route = useRoute();
const schedules = ref([]);
const key = ref(0);

const showModal = (date) => {
    if (!date) return;
    dateOfModal.value = date;
    isVisibleModal.value = true;
};

const getSchedule = async () => {
    try {
        const moimId = route.params.id;
        const currentDate = year.value + '-' + month.value + '-01';
        const response = await fetchMonthlySchedule(moimId, currentDate);
        schedules.value = response.body.schedule.scheduleDTOList;
    } catch (error) {}
};

const extractSchedule = (date) => {
    return schedules.value.filter(
        (schedule) => schedule.theDay.split('-')[2] == date
    );
};

const calculateDate = (day, firstDay, line) => {
    return day - firstDay + (line - 1) * 7;
};

watch(schedules, () => {
    key.value = key.value + 1;
});

onBeforeMount(async () => {
    await getSchedule();
});
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
                        :lastDay="getNumberOfDaysInMonth(year, month)"
                        :showModal="showModal"
                        :currentDate="
                            calculateDate(i, getStartDay(year, month), line)
                        "
                        :schedules="
                            extractSchedule(
                                calculateDate(i, getStartDay(year, month), line)
                            )
                        "
                        :key="key"
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
            :key="key"
        ></DayModal>
    </div>
</template>
