<script setup>
import { hasToken } from './composables/useHandlingToken';
import Header from './components/layouts/Header.vue';
function checkToken() {
    const currentPath = window.location.pathname;
    const notRequiredPath = ['/login', '/registration', '/404'];
    const isRequired =
        notRequiredPath.filter((path) => path === currentPath).length === 0;
    if (!hasToken() && isRequired) {
        window.location.href = '/login';
    }
}

checkToken();
</script>

<template>
    <div>
        <Header></Header>
        <RouterView />
    </div>
</template>
