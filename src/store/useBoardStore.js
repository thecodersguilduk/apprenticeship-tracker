// useBoardStore.js
import { defineStore } from 'pinia';

export const useBoardStore = defineStore('board', {
  state: () => ({
    apprenticeData: null, // Holds the data to be distributed
  }),
  actions: {
    setApprenticeData(data) {
      this.apprenticeData = data;
    },
  },
  persist: true
});
