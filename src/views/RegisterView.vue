<script setup></script>
<template>
    <div class="text-center">
        <h1 class="mt-10 text-6xl text-gray-500">가입하기</h1>
        <div class="my-10">
            <input
                type="email"
                name="email"
                placeholder="이메일을 입력해주세요."
                class="block border pl-2 mb-4 w-3/12 mx-auto py-1"
            />
            <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                class="block border pl-2 mb-4 w-3/12 mx-auto py-1"
            />
            <input
                type="password"
                name="passwordVerify"
                placeholder="비밀번호 확인"
                class="block border pl-2 mb-4 w-3/12 mx-auto py-1"
            />
            <input
                type="text"
                name="nickname"
                placeholder="닉네임을 입력해주세요."
                class="block border pl-2 mb-4 w-3/12 mx-auto py-1"
            />
        </div>
        <div>
            <button
                class="border block mx-auto mb-3 w-3/12 bg-sky-50 rounded-md duration-150 hover:duration-150 hover:bg-sky-100"
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
