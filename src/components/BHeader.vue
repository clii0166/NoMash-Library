<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home (Week 5)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>

        <!-- Right side spacer -->
        <li class="nav-item ms-2" v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li class="nav-item ms-2" v-else>
          <button class="nav-link btn btn-link p-0" @click="handleLogout">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { isAuthenticated, logout } from '@/stores/auth';

const router = useRouter();

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>
