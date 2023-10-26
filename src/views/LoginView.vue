<script setup>
import { onBeforeMount } from 'vue';
import { memberLogin } from '../api/auth';
import { email, password } from '../composables/useHandlingMemberData';
import { hasToken, setToken } from '../composables/useHandlingToken';

// 로그인 버튼 클릭 시
const login = async () => {
    try {
        const member = { email: email.value, password: password.value };
        const data = await memberLogin(member);
        const accessToken = data.body.token.accessToken;
        const refreshToken = data.body.token.refreshToken;
        setToken(accessToken, refreshToken);
        window.location.href = '/';
    } catch (error) {
        const code = error.response.data.code;
        if (code === '112' || code === '122') {
            alert('아이디나 비밀번호를 확인해주세요.');
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
    <div>
        <div class="py-3 mt-20">
            <input
                type="text"
                name="email"
                placeholder="이메일을 입력해주세요."
                class="text-sm pl-1 border py-1 block mx-auto mb-2 w-3/12"
                v-model="email"
            />
            <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                class="text-sm pl-1 border py-1 block mx-auto mb-2 w-3/12"
                v-model="password"
                @keypress.enter="login"
            />
            <button
                class="px-1.5 py-1 border w-3/12 bg-gray-50 rounded-md mb-3 mx-auto block duration-150 hover:duration-150 hover:bg-gray-100"
                @click="login"
            >
                로그인
            </button>
            <button
                class="px-1.5 py-1 border w-3/12 bg-sky-50 rounded-md mx-auto block duration-150 hover:duration-150 hover:bg-sky-100"
                onclick="window.location.href='/registration'"
            >
                회원가입
            </button>
        </div>
    </div>
</template>
