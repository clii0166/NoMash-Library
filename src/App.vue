<script setup>
import BHeader from './components/BHeader.vue'
// now routed via <router-view>
// import LibraryRegistrationForm from './components/LibraryRegistrationForm.vue'
// import JSONLab from './components/JSONLab.vue'
</script>

<template>
  <div class="main-container">
    <header>
      <BHeader />
    </header>

    <main class="main-box">
      <!-- <LibraryRegistrationForm /> -->
      <!-- <JSONLab /> -->
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.main-container { }
.main-box { }
</style>
