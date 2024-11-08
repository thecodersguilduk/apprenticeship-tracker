<template>
  <div class="flex text-black gap-2 items-center">
    Welcome  {{ apprenticeName }}
    
    <a
      class="text-blueGray-500 block pl-4"
      href="#pablo"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
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
      v-bind:class="{
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
import { createPopper } from "@popperjs/core";
import { signOut, auth } from "@/firebase";
import image from "@/assets/img/team-1-800x800.jpg";
import { router } from "@/main.js";
import { useBoardStore } from "../../store/useBoardStore";
import { computed } from "vue";
export default {

  data() {
    return {
      dropdownPopoverShow: false,
      image: image,
      boardItems: [],
    };
  },
  setup(){
    const boardStore = useBoardStore();
        // Computed property to get apprentice's name from the store
        const apprenticeName = computed(() => boardStore.boardItems.name || "Loading...");

        return{
          apprenticeName
        }

  },
  methods: {
    logout: async function (){
      await signOut(auth);
      router.push("/auth/login");
    },
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
  },
};
</script>
