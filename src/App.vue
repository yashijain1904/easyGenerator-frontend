<script setup>
import Header from './components/Header.vue';
import { RouterView } from "vue-router";
import PageLoader from './components/PageLoader.vue';
</script>

<template>
  <div id='app' class='app-container' >
    <PageLoader/>
   <Header/>

  <main>
    <router-view />
  </main>
  </div>
</template>

<style scoped>
</style>
