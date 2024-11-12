<template>
    <div v-if="isVisible" class="splash-screen">
      <div class="splash-content">
        <img src="..//assets/img/The_Coders_Guild_Logo_Blue.png" class="p-8" alt="">
        <h1 class="text-4xl text-white font-bold p-4">Welcome to TCG Apprenticeship Dashboard</h1>
        <h2 class="text-2xl p-4">Loading...</h2>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isVisible: true, // Controls whether the splash screen is visible
      };
    },
    mounted() {
      // Hide splash screen after a certain amount of time or after the app is fully loaded
      setTimeout(() => {
        this.isVisible = false;
      }, 4000); // Show splash screen for 2 seconds (adjust the time as needed)
    },
  };
  </script>
  
  <style scoped>
  /* Splash screen styling */
  .splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #2574a9fc; /* Customize background color */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 1s ease-in-out;
  }
  
  .splash-content {
    text-align: center;
    color: white;
  }
  
  /* Add animation or other styles as needed */
  </style>
  