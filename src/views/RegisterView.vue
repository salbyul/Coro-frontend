<script setup>
import { onBeforeMount } from 'vue';
import {
    email,
    password,
    checkPassword,
    nickname,
    verifyData,
    createMemberObject,
} from '../composables/useHandlingMemberData';
import { memberRegister } from '../api/member';
import { hasToken } from '../composables/useHandlingToken';

// 회원가입 버튼 클릭 시
const register = async () => {
    if (!verifyData()) return;
    try {
        const member = createMemberObject();
        const data = await memberRegister(member);
        alert('회원가입이 완료되었습니다.');
        window.location.href = '/login';
    } catch (error) {
        const code = error.response.data.code;
        const message = error.response.data.message;
        if (code !== '000') {
            alert(message);
        }
    }
};
onBeforeMount(() => {
    if (hasToken()) {
        alert('먼저 로그아웃을 해야 합니다.');
        window.location.href = '/';
    }
});
</script>
<template>
    <div class="text-center">
        <h1 class="mt-10 text-6xl text-gray-500">가입하기</h1>
        <div class="my-10">
            <!-- 이메일 -->
            <input
                type="email"
                name="email"
                placeholder="이메일을 입력해주세요."
                class="block border pl-2 mb-3 w-3/12 mx-auto py-1"
                v-model="email"
            />
            <!-- 비밀번호 -->
            <label for="password" class="text-xs">
                <p>
                    영문, 숫자, 특수문자를 사용해서 10자 이상, 30자 미만
                </p></label
            >
            <input
                type="password"
                name="password"
                id="password"
                placeholder="비밀번호를 입력해주세요."
                class="block border pl-2 mb-2 mt-1 w-3/12 mx-auto py-1"
                v-model="password"
            />
            <input
                type="password"
                name="checkPassword"
                placeholder="비밀번호 확인"
                class="block border pl-2 mb-3 w-3/12 mx-auto py-1"
                v-model="checkPassword"
            />
            <!-- 닉네임 -->
            <label for="nickname" class="text-xs">
                <p>2자 이상, 15자 이하</p></label
            >
            <input
                type="text"
                name="nickname"
                id="nickname"
                placeholder="닉네임을 입력해주세요."
                class="block border pl-2 mb-4 mt-1 w-3/12 mx-auto py-1"
                v-model="nickname"
            />
        </div>
        <div>
            <button
                class="border block mx-auto mb-3 w-3/12 bg-sky-50 rounded-md duration-150 hover:duration-150 hover:bg-sky-100"
                @click="register"
            >
                가입하기
            </button>
            <button
                class="border block mx-auto w-3/12 bg-gray-50 rounded-md duration-150 hover:duration-150 hover:bg-gray-100"
                onclick="window.location.href='/login'"
            >
                취소
            </button>
        </div>
    </div>
</template>
