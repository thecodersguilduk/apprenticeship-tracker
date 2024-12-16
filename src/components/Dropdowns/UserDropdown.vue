<template>
  <div class="flex text-white gap-2 items-center">
    <a
      class="text-blueGray-500 block pl-4 cursor-pointer flex items-center"
      href="#"
      ref="btnDropdownRef"
      @click="toggleDropdown"
    >
    <span v-if="apprenticeData?.name">Welcome {{ apprenticeData?.name }}</span>
    <span v-else>Welcome</span>
    <span class="font-bold text-xl"><img class="" :src="downCarat" alt="click to reveal menu including logout button" /></span>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      :class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        @click="logout"
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-black"
      >
        Logout
      </a>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { createPopper } from "@popperjs/core";
import { signOut, auth } from "@/firebase";
import image from "@/assets/img/team-1-800x800.jpg";
import downCarat from "@/assets/img/caret-down-svgrepo-com.svg";
import { router } from "@/main.js";
import { useBoardStore } from "../../store/useBoardStore";
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const boardStore = useBoardStore();
    const { apprenticeData } = storeToRefs(boardStore);

    // Define dropdown-related states and references
    const dropdownPopoverShow = ref(false);
    const btnDropdownRef = ref(null);
    const popoverDropdownRef = ref(null);

    // Toggle dropdown function
    const toggleDropdown = (event) => {
      event.preventDefault();
      dropdownPopoverShow.value = !dropdownPopoverShow.value;
      if (dropdownPopoverShow.value) {
        createPopper(btnDropdownRef.value, popoverDropdownRef.value, {
          placement: "bottom-start",
        });
      }
    };

    // Logout function
    const logout = async () => {
      localStorage.removeItem("board");
      await signOut(auth);
      router.push("/auth/login");
    };

    return {
      apprenticeData,
      image,
      dropdownPopoverShow,
      toggleDropdown,
      logout,
      btnDropdownRef,
      popoverDropdownRef,
      downCarat
    };
  },
};
</script>
