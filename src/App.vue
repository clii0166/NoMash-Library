<script setup>
import BHeader from './components/BHeader.vue'
</script>

<template>
  <div class="main-container">
    <header>
      <BHeader />
    </header>

   
    <main class="container my-4">
      <router-view />
    </main>
  </div>
</template>
