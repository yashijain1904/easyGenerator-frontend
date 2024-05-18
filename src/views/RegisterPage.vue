<template>
  <div class="register-page-container">
    <div class="login-card-container">
      <LoginCard mode="register" @onFromSubmit="registerUser" />
    </div>
  </div>
</template>

<script setup>
import LoginCard from '@/components/LoginCard.vue';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router'
import { useLoaderStore } from '@/store/pageLoader';

const pageLoader = useLoaderStore();
const router = useRouter()
const user = useUserStore();

const registerUser = async (userName, userPassword, userEmail) => {
  try {
    const payload = {
      name: userName,
      password: userPassword,
      email: userEmail
    };
    pageLoader.setLoader(true);
    await user.registerUser(payload);
    pageLoader.setLoader(false);
    router.push({
      name: 'Home',
      path: '/',
    });
  } catch (err) {
    pageLoader.setLoader(false);
    alert(`Error in register ${err?.response?.data?.error}`);
  }

}
</script>

<style scoped lang="scss">
.register-page-container {
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/home-page.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;

  .login-card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 40px;
    backdrop-filter: blur(3px);
  }
}
</style>