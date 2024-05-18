import { defineStore } from 'pinia';
import axios from 'axios';
import LocalStorage from '../utils/storage/local-storage';

export const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: null,
  }),
  actions: {
    async loginUser(userData) {
      try {
        const response = await axios.post('http://localhost:3000/user/login', userData);
        this.accessToken = response?.data?.accessToken;
        LocalStorage.setItem('Auth', response?.data?.accessToken);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async registerUser(userData) {
      try {
        const response = await axios.post('http://localhost:3000/user/signup', userData);
        this.accessToken = response?.data?.accessToken;
        LocalStorage.setItem('Auth', response?.data?.accessToken);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  getters: {
    getAccessToken() {
      return LocalStorage.getItem('Auth') || this.accessToken;
    },
  },
});
