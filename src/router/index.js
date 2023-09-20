import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import RegisterMoimView from '../views/RegisterMoimVIew.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/registration', component: RegisterView },
    { path: '/create/moim', component: RegisterMoimView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
