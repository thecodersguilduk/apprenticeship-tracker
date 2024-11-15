<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto">
        <card-line-chart />
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
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
import { useBoardStore  } from "../../store/useBoardStore";
import { storeToRefs } from 'pinia';


export default {
  name: "dashboard-page",
  components: {
    CardLineChart,
    CardPageVisits,
    CardSocialTraffic,
  },

  setup() {
    const boardStore = useBoardStore();
    const { apprenticeData } = storeToRefs(boardStore);

    return { apprenticeData };
  },
};
</script>
