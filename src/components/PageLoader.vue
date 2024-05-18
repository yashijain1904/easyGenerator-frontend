<template>
    <div class="loader" v-if="isLoaderVisible">
    <img class="loader__spinner" src="@/assets/icons/spinner.svg" alt="loader">
</div>

</template>

<script setup>
import { useLoaderStore } from '@/store/pageLoader';
import { computed } from 'vue';
const pageLoader = useLoaderStore();


const isLoaderVisible = computed(() => {
  return pageLoader.isLoaderShown; 
});

    
</script>

<style lang="scss" scoped>
.loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(50, 50, 50, 0.5);
    .loader__spinner {
        position: fixed;
        width: 40px;
        height: 40px;
        top: calc(50% - 20px);
        left: calc(50% - 20px);
    }
}

</style>