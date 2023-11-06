<script setup>
import { onBeforeMount, ref } from 'vue';
import {
    fetchInformationForModification,
    modifyMemberPassword,
} from '../api/member';
import {
    originalPassword,
    newPassword,
    newPasswordVerify,
    validatePassword,
} from '../composables/useHandlingPassword';

const information = ref({});

const submit = async () => {
    try {
        if (!validatePassword()) return;
        const body = {
            originalPassword: originalPassword.value,
            newPassword: newPassword.value,
        };
        await modifyMemberPassword(body);
        alert('비밀번호가 변경되었습니다.');
        window.location.href = '/';
    } catch (error) {
        const code = error.response.data.code;
        if (code === '122') {
            alert('기존 비밀번호가 올바르지 않습니다.');
        }
    }
};

onBeforeMount(async () => {
    try {
        const data = await fetchInformationForModification();
        information.value = data.body.member;
    } catch (error) {}
});
</script>
<template>
    <div>
        <div class="mx-auto mt-10 w-fit px-10">
            <div class="my-5">
                <label for="email" class="mr-5 block text-sm">이메일</label>
                <input
                    class="mb-3 text-gray-700 text-lg pl-2 rounded-md"
                    id="email"
                    type="text"
                    disabled
                    :value="information.email"
                />
            </div>
            <div class="my-5">
                <label for="nickname" class="mr-5 block text-sm">닉네임</label>
                <input
                    class="mb-3 text-gray-700 text-lg pl-2 rounded-md"
                    id="nickname"
                    type="text"
                    disabled
                    :value="information.nickname"
                />
            </div>
            <div class="my-5">
                <label for="originalPassword" class="mr-5 block text-sm"
                    >기존 비밀번호</label
                >
                <input
                    type="password"
                    id="originalPassword"
                    class="mb-3 text-gray-700 bg-white border rounded-md pl-2 text-lg"
                    v-model="originalPassword"
                />
            </div>
            <div class="my-5">
                <label for="newPassword" class="mr-5 block text-sm"
                    >새로운 비밀번호</label
                >
                <input
                    type="password"
                    id="newPassword"
                    class="mb-3 text-gray-700 bg-white border rounded-md pl-2 text-lg"
                    v-model="newPassword"
                />
            </div>
            <div class="my-5">
                <label for="newPasswordVerify" class="mr-5 block text-sm"
                    >새로운 비밀번호 확인</label
                >
                <input
                    type="password"
                    id="newPasswordVerify"
                    class="mb-3 text-gray-700 bg-white border rounded-md pl-2 text-lg"
                    v-model="newPasswordVerify"
                />
            </div>
        </div>

        <div class="mx-auto w-fit">
            <button
                class="px-3 py-1.5 bg-green-200 text-gray-700 rounded-md duration-150 hover:duration-150 hover:bg-green-300"
                @click="submit"
            >
                변경
            </button>
        </div>
    </div>
</template>
