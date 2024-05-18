import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('pageLoader', {
  state: () => ({
    show: false,
  }),
  actions: {
    setLoader(loaderState) {
      this.show = loaderState;
    },
  },
  getters: {
    isLoaderShown() {
      return this.show;
    },
  },
});
