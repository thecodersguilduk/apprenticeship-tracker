<template>
  <div>
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <router-view />
        <footer-small absolute />
      </section>
    </main>
  </div>
</template>
<script>
import FooterSmall from "@/components/Footers/FooterSmall.vue";

export default {
  data() {

  },
  components: {
    FooterSmall,
  },
};
</script>
