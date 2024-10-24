<template>
  <div>
    <!-- <ul>
      <li v-for="item in boardItems" :key="item.id">
        {{ item.name }}
      </li>
    </ul> -->

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
import mondayService from '@/../services/mondayService';
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardBarChart from "@/components/Cards/CardBarChart.vue";
import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
export default {
  name: "dashboard-page",
  components: {
    CardLineChart,
    CardBarChart,
    CardPageVisits,
    CardSocialTraffic,
  },
  data() {
    return {
      boardItems: [],
    };
  },
  mounted() {
    // Replace with your Monday.com board ID
    const boardId = 4662225022;
    const itemId = 5554800185;

    // Fetch board data on component mount
    mondayService.getBoardData(boardId, itemId).then(response => {
      // Assuming response contains the array of items, map it to boardItems
      this.boardItems = response.map(item => ({
        id: item.id,
        name: item.name,
      }));
      console.log('Board items loaded:', this.boardItems);
    }).catch(err => {
      console.error('Error loading board data:', err);
    });
  }
};

</script>
