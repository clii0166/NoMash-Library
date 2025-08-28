<template>
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <h2 class="text-center mb-3">Login</h2>

      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="user" class="form-label">Username</label>
          <input id="user" v-model="user" type="text" class="form-control" autocomplete="username" />
        </div>

        <div class="mb-3">
          <label for="pass" class="form-label">Password</label>
          <input id="pass" v-model="pass" type="password" class="form-control" autocomplete="current-password" />
        </div>

        <div class="d-grid">
          <button class="btn btn-primary" type="submit">Sign in</button>
        </div>

        <p v-if="error" class="text-danger mt-3">Invalid credentials. Try: admin / Password123!</p>
      </form>
    </div>
  </div>
</template>

<script setup>
// Keep login state in a tiny store
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { login } from '@/stores/auth';

const route = useRoute();
const router = useRouter();

const user = ref('');
const pass = ref('');
const error = ref(false);

const onSubmit = () => {
  error.value = false;
  if (login(user.value, pass.value)) {
    // redirect to original target or About
    const target = route.query.redirect || '/about';
    router.replace(target);
  } else {
    error.value = true;
  }
};
</script>
