// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Views
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import LoginView from '@/views/LoginView.vue';
import DeniedView from '@/views/DeniedView.vue'; // optional

// Auth state
import { isAuthenticated } from '@/stores/auth';

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    {
        path: '/about',
        name: 'About',
        component: AboutView,
        meta: { requiresAuth: true }, // <-- protected
    },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/denied', name: 'Denied', component: DeniedView }, // optional
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated.value) {
        // Redirect unauthenticated users to /login with original url
        next({ path: '/login', query: { redirect: to.fullPath } });
        // next({ path: '/denied' });
    } else {
        next();
    }
});

export default router;
