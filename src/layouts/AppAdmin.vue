<template>
  <div class="min-h-screen">
    <div class="relative bg-blueGray-100 min-h-screen">
      <admin-navbar />
      <div v-if="apprenticeData">
        <header-stats />
        <div class="px-4 md:px-10 mx-auto w-full -m-24">
          <router-view />
        </div>
      </div>
      <div v-else class="min-h-screen">
        <no-data />
      </div>
        <footer-admin />
    </div>
  </div>
  
</template>
<script>
import { defineComponent } from "vue";
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
//import Sidebar from "@/components/Sidebar/Sidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";
import NoData from "@/components/NoData/NoData.vue";
import { useBoardStore } from "@/store/useBoardStore";

export default defineComponent({
  name: "AdminLayout",
  components: {
    AdminNavbar,
    HeaderStats,
    FooterAdmin,
    NoData
  },
  setup() {
    const boardStore = useBoardStore();
    const apprenticeData = boardStore.apprenticeData;

    console.log(apprenticeData);

    return { apprenticeData };
  },
});
</script>

