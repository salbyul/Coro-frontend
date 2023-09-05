<script setup></script>
<template>
    <div>
        <img src="../../public/logo/five.png" class="w-5/12 mx-auto" />
        <div class="py-3">
            <input
                type="text"
                name="email"
                placeholder="이메일을 입력해주세요."
                class="text-sm pl-1 border py-1 block mx-auto mb-2 w-3/12"
            />
            <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                class="text-sm pl-1 border py-1 block mx-auto mb-2 w-3/12"
            />
            <button
                class="px-1.5 py-1 border w-3/12 bg-gray-50 rounded-md mb-3 mx-auto block duration-150 hover:duration-150 hover:bg-gray-100"
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
