<template>
  <div class="home-conatiner">
    <h3 class="home-header">Welcome to the application.</h3>
  </div>

</template>

<script setup>
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router'
import { useLoaderStore } from '@/store/pageLoader';
import LocalStorage from '@/utils/storage/local-storage';


const pageLoader = useLoaderStore();
const router = useRouter()
const user = useUserStore();

pageLoader.setLoader(false);

const token = user.getAccessToken || LocalStorage.getItem('Auth');

if (token == null) {
  router.push({
    name: 'Login',
    path: '/login'
  });
}

</script>

<style scoped lang="scss">
.home-conatiner {
  width: 100%;
  height: 94%;
  justify-content: center;
  background-image: url('../assets/images/home-page.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;


  .home-header {
    text-align: center;
    font-size: 60px;
    font-weight: 500;
    margin-top: 24px;
  }
}
</style>