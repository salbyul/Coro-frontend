<script setup>
import { hasToken, removeToken } from '../../composables/useHandlingToken';

function logout() {
    removeToken();
    window.location.href = '/login';
    // TODO 서버랑 통신해서 로그아웃해야 함
}
</script>
<template>
    <div class="mb-10">
        <div class="text-center">
            <h1 class="text-5xl text-green-300">
                <a href="/">Moim</a>
            </h1>
        </div>
        <div class="flex justify-between" v-if="hasToken()">
            <div class="ml-3">
                <router-link to="/create/moim">
                    <button
                        class="px-3 py-1 border border-gray-300 rounded-md bg-green-200 text-gray-700"
                    >
                        모임 만들기
                    </button>
                </router-link>
            </div>
            <div class="mr-3">
                <!-- TODO -->
                <button
                    class="px-3 py-1.5 border bg-orange-100 rounded-md mr-3 duration-150 text-gray-700 hover:duration-150 hover:bg-orange-200"
                >
                    내 모임
                </button>
                <button @click="logout">logout</button>
            </div>
        </div>
    </div>
</template>
