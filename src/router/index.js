import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import RegisterMoimView from '../views/RegisterMoimView.vue';
import MoimDetailView from '../views/MoimDetailView.vue';
import SearchView from '../views/SearchView.vue';
import JoinMoimView from '../views/JoinMoimView.vue';
import MyMoimView from '../views/MyMoimView.vue';
import MoimManagementView from '../views/MoimManagementView.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/registration', component: RegisterView },
    { path: '/create/moim', component: RegisterMoimView },
    { path: '/moim/:id', component: MoimDetailView },
    { path: '/search', component: SearchView },
    { path: '/moim/join/:id', component: JoinMoimView },
    { path: '/profile/moim', component: MyMoimView },
    { path: '/moim/setting/:id', component: MoimManagementView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
