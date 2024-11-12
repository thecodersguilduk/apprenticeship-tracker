

<template>
  <div id="app">
     <!-- Splash Screen -->
     <SplashScreen />
     <!-- Main Content -->
    <div v-if="isAppLoaded">
      <!-- Your main page content goes here -->
      <router-view />
    </div>
    
  </div>
</template>

<script>
import SplashScreen from './components/SplashScreen.vue';
export default {
  components: {
    SplashScreen
  },
  data() {
    return {
      isAppLoaded: false, // Controls when the main app content is displayed
    };
  },
  mounted() {
    // Simulate a page load or wait for data/API to finish loading
    setTimeout(() => {
      this.isAppLoaded = true; // Show the main content after splash screen
    }, 1000); // Show main content after 2.5 seconds (matching the splash screen duration)
  },
};
</script>
