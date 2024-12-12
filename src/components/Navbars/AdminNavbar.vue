<template>
  <!-- Navbar -->
  <nav
    class="w-full z-10 bg-blue-200 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
  >
    <div
      class="w-full mx-aut items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
    >
      <!-- Brand -->
      <a
        class="text-blue text-sm uppercase hidden lg:inline-block font-semibold"
        href="javascript:void(0)"
      >
         <img :src="whiteLogo" class="w-40 object-cover" alt="The Coders Guild Logo">
      </a>

      <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
        <user-dropdown />
      </ul>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";
import whiteLogo from "@/assets/img/logo/The_Coders_Guild_Logo_White.svg";

export default {
  components: {
    UserDropdown
  },

  data(){
    return {
      whiteLogo
    }
  }
};
</script>
