// src/stores/auth.js
import { ref } from 'vue';

export const isAuthenticated = ref(!!localStorage.getItem('auth'));

const VALID_USER = 'admin';
const VALID_PASS = 'Password123!';

export function login(username, password) {
    const ok = username === VALID_USER && password === VALID_PASS;
    if (ok) {
        isAuthenticated.value = true;
        localStorage.setItem('auth', '1');
    }
    return ok;
}

export function logout() {
    isAuthenticated.value = false;
    localStorage.removeItem('auth');
}
