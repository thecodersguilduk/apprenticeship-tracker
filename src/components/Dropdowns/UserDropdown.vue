<template>
  <div class="flex text-white gap-2 items-center">
    Welcome {{ apprenticeData?.name }}

    <a
      class="text-blueGray-500 block pl-4"
      href="#pablo"
      ref="btnDropdownRef"
      @click="toggleDropdown"
    >
      <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        >
          <img
            alt="..."
            class="w-full rounded-full align-middle border-none shadow-lg"
            :src="image"
          />
        </span>
      </div>
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
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
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
    };
  },
};
</script>
