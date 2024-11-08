<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-line-chart />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-bar-chart />
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-page-visits />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-social-traffic />
      </div>
    </div>
  </div>
</template>
<script>
// import mondayService from '@/../services/mondayService';
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardBarChart from "@/components/Cards/CardBarChart.vue";
import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useBoardStore } from '../../store/useBoardStore';


export default {
  name: "dashboard-page",
  components: {
    CardLineChart,
    CardBarChart,
    CardPageVisits,
    CardSocialTraffic,
  },
  setup() {
    const boardStore = useBoardStore();

    // Fetch apprentice ID on component mount
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        boardStore.fetchApprenticeId(user.email);
      } else {
        console.log("User not logged in");
      }
    });

    return { boardStore };
  },
};
</script>
