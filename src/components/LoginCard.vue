<template>
<div class="login-card-container">
  <h3 class="login-header" v-show="mode==='register'">Register</h3>
  <h3 class="login-header" v-show="mode==='login'">Login</h3>
  <form>
    <div v-if="mode==='register'" class="user-name">
      <label for="userName" class="form-label">Name</label>
      <input 
        type="text" 
        class="form-control form-data-input" 
        id="userName" 
        v-model="state.name"
        aria-describedby="name_error"
      />  
    </div>
    <div class="user-email" :class="{ error: v$.email.$errors.length }">
      <label for="email" class="form-label">Email</label>
      <input 
        type="text" 
        class="form-control form-data-input" 
        id="email" 
        v-model="state.email"
        aria-describedby="email_error"
        @blur="v$.email.$touch"
      />
      <div
        id="email_error"
        v-if="v$.email.$error"
        >
        <small
          class="form-text error is-invalid"
          v-if="v$.email.required.$invalid"
        >
          Please enter your email 
        </small>
        <small
          class="form-text error is-invalid"
          v-else-if="v$.email.email.$invalid"
        >
          Please enter valid email address
        </small>
      </div>
    </div>
    <div class="user-password">
      <label for="userPassword" class="form-label">Password</label>
      <input type="password" 
        class="form-control form-data-input" 
        id="userPassword" 
        v-model="state.password"
        @blur="v$.password.$touch"
        aria-describedby="password_error"
      >
      <div
        id="password_error"
        v-if="v$.password.$error"
        >
        <small
          class="form-text error is-invalid"
          v-if="v$.password.required.$invalid"
        >
          Please enter your Password 
        </small>
        <small
          class="form-text error is-invalid"
          v-else-if="v$.password.minLength.$invalid && mode==='register'"
        >
        Please enter a password with at least 8 characters.
        </small>
        <small
          class="form-text error is-invalid"
          v-else-if="v$.password.containsLetter.$invalid && mode==='register'"
        >
        Password must contains atleast 1 letter.
        </small>
        <small
          class="form-text error is-invalid"
          v-else-if="v$.password.containsNumber.$invalid && mode==='register'"
        >
        Password must contains atleast 1 number.
        </small>
        <small
          class="form-text error is-invalid"
          v-else-if="v$.password.containsSpecialChar.$invalid && mode==='register'"
        >
        Password must contains atleast 1 special character.
        </small>
      </div>
      
    </div>
  </form>

  <button type="submit" class="btn btn-outline-dark submit-btn"  @click="emitToParent" :disabled="(v$.password.$error || v$.email.$error || state.email === '' || state.password === '') && mode==='register'">Submit</button>
  
  <div class="create-account" v-if="mode==='register'">
    <p class="create-account-heading">Already have an account?</p>
    <router-link class="router-class" to="/login">Sign In</router-link>
  </div>
  <div class="create-account" v-if="mode==='login'">
    <p class="create-account-heading">Create a new account?</p>
    <router-link class="router-class" to="/register">Sign Up</router-link>
  </div>
</div>
</template>

<script setup>
import { ref,reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators';
import { defineEmits } from 'vue';

const props = defineProps({
  mode: String,
})

const { mode } = props

const state= reactive({
        name: '',
        email: '',
        password: ''
      })

const rules = {
    name: {
      required,
    },
    email: {
      required,
      email 
    },
    password: {
      required,
      minLength: minLength(8),
      containsLetter: helpers.regex(/[a-zA-Z]/),
      containsNumber: helpers.regex(/[0-9]/),
      containsSpecialChar: helpers.regex(/[!@#$%^&*(),.?":{}|<>]/)
    }
};

const v$ = useVuelidate(rules, state);

const emitEvent = defineEmits(['onFromSubmit']);

const emitToParent = () => {
      if (mode === 'register') {
        emitEvent('onFromSubmit', state.name, state.password, state.email);
      } else {
        emitEvent('onFromSubmit', state.email, state.password);
      }
    }
</script>

<style scoped lang="scss">
.login-card-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  padding: 60px 40px 50px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;

  .login-header {
    margin-bottom: 8px;
    font-size: 37px;
    font-weight: 700;
  }
  .is-invalid {
    color:#E22B24;
  }

.user-name, .user-password, .user-email {
    display: flex;
    flex-direction: column;
    width: 320px;
    margin: 16px 0px;
    .form-data-input {
      line-height: 1.5;
    }
  }

  .submit-btn {
    width: 110px;
    height: 40px;
    margin-top: 8px;
    border-radius: 20px;
    cursor: pointer
  }

  .create-account {
    margin-top: 28px;

    .router-class {
      display: inline-block;
      margin-left: 6px;
    }

    .create-account-heading {
      display: inline-block;
      color: #00000085;
      margin: 0px;
    }
  }
}
</style>
