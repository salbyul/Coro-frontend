<script setup>
import { ref } from 'vue';
import MemberManagement from '../components/memberManagement/MemberManagement.vue';
import ApplicationManagement from '../components/memberManagement/ApplicationManagement.vue';

const option = ref('member');
const changeOption = (value) => {
    option.value = value;
};
</script>
<template>
    <div>
        <div class="my-20">
            <button
                class="px-3 py-1.5 rounded-md border mx-3"
                :class="option === 'member' ? 'bg-gray-50' : ''"
                @click="() => changeOption('member')"
            >
                회원 관리
            </button>
            <button
                class="px-3 py-1.5 rounded-md border mx-3"
                :class="option === 'application' ? 'bg-gray-50' : ''"
                @click="() => changeOption('application')"
            >
                지원 관리
            </button>
            <div>
                <MemberManagement v-if="option === 'member'"></MemberManagement>
                <ApplicationManagement
                    v-if="option === 'application'"
                ></ApplicationManagement>
            </div>
        </div>
    </div>
</template>
