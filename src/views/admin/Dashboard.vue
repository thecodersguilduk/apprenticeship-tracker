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
  function transformItemData(item) {
    return {
      id: item.id,
      name: item.name,
      ...(Array.isArray(item.column_values) ? item.column_values.reduce((acc, column) => {
        if (column && column.column && column.column.title) {
          const title = column.column.title;
          let value = "";

          // Check if it has values (like labels) or dates
          if (column.values && column.values.length > 0) {
            value = column.values[0].label; // Use the first label
          } else if (column.date) {
            value = column.date;
          } else if (column.text) {
            value = column.text
          }

          acc[title] = value; // Add the title as key, value as value
        }
        return acc;
      }, {}) : {}) // If column_values is undefined or not an array, use an empty object
    };
  }

  // Replace with your Monday.com board ID
  const boardId = 4662225022;
  const itemId = 5554800185; // This should be dynamic based on the user's monday.com id

  // Fetch board data on component mount
  mondayService.getBoardData(boardId, itemId).then(response => {
    console.log(response);

    // Transform the response data
    this.boardItems = transformItemData(response[0]);

    console.log('Board items loaded:', this.boardItems);
  }).catch(err => {
    console.error('Error loading board data:', err);
  });
}

};

</script>
