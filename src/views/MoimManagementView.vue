<script setup>
import { ref } from 'vue';
import MoimModification from '../components/MoimModification.vue';
import MoimMemberSetting from '../components/MoimMemberSetting.vue';

const option = ref('moim');

const changeOption = (value) => {
    option.value = value;
};
</script>
<template>
    <div class="text-center">
        <div>
            <button
                class="px-3 py-1.5 rounded-md border"
                :class="option === 'moim' ? 'bg-gray-100' : ''"
                @click="() => changeOption('moim')"
            >
                모임 관리
            </button>
            <button
                class="px-3 py-1.5 rounded-md border"
                :class="option === 'member' ? 'bg-gray-100' : ''"
                @click="() => changeOption('member')"
            >
                회원 관리
            </button>
            <MoimModification v-if="option === 'moim'"></MoimModification>
            <MoimMemberSetting v-if="option === 'member'"></MoimMemberSetting>
        </div>
    </div>
</template>
