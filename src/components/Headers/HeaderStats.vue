<template>
  <!-- Header -->
  <div class="relative bg-blue-200 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="KSBs Progress"
              :statTitle="ksbProgressTitle"  
              statArrow="up"
              :statPercent="ksbProgressPercent"  
              statPercentColor="text-blue-500"
              statDescripiron="Since last month"
              statIconName="far fa-chart-bar"
              statIconColor="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="OTJ HOURS LOGGED"
              :statTitle="otjHoursTitle"  
              statArrow="up"
              :statPercent="otjHoursPercent"  
              statPercentColor="text-red-500"
              statDescripiron="Since last week"
              statIconName="fas fa-chart-pie"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="PORTFOLIO/ACTIVITY LOG"
              :statTitle="portfolioActivityTitle"  
              statArrow="up"
              :statPercent="portfolioActivityPercent"  
              statPercentColor="text-orange-500"
              statDescripiron="Since yesterday"
              statIconName="fas fa-users"
              statIconColor="bg-pink-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="SESSIONS ATTENDED"
              :statTitle="sessionsAttendedTitle" 
              statArrow="up"
              :statPercent="sessionsAttendedPercent" 
              statPercentColor="text-blue-500"
              statDescripiron="Since last month"
              statIconName="fas fa-book-open"
              statIconColor="bg-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";


export default {
  components: {
    CardStats,
  },
  data() {
    return {
      ksbProgressTitle: "Loading...",
      ksbProgressPercent: "0",
      otjHoursTitle: "Loading...",
      otjHoursPercent: "0",
      portfolioActivityTitle: "Loading...",
      portfolioActivityPercent: "0",
      sessionsAttendedTitle: "Loading...",
      sessionsAttendedPercent: "0",
    };
  },
  mounted() {
    // this.fetchData();
  },
  methods: {
    // async fetchData() {
    //   try {
    //     // Replace with your actual Monday API endpoint and logic to fetch data
    //     const response = await fetch(API_URL);
    //     if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    //     const data = await response.json();
    //     console.log("Data fetched from Monday API:", data);
    //     // // Extract necessary data from the API response
    //     // this.ksbProgressTitle = data.ksbProgress.title; // Adjust based on your response structure
    //     // this.ksbProgressPercent = data.ksbProgress.percent; // Adjust based on your response structure
    //     // this.otjHoursTitle = data.otjHours.title; // Adjust based on your response structure
    //     // this.otjHoursPercent = data.otjHours.percent; // Adjust based on your response structure
    //     // this.portfolioActivityTitle = data.portfolioActivity.title; // Adjust based on your response structure
    //     // this.portfolioActivityPercent = data.portfolioActivity.percent; // Adjust based on your response structure
    //     // this.sessionsAttendedTitle = data.sessionsAttended.title; // Adjust based on your response structure
    //     // this.sessionsAttendedPercent = data.sessionsAttended.percent; // Adjust based on your response structure
    //   } catch (error) {
    //     console.error("Error fetching data from Monday API:", error);
    //     if (error.response) {
    //   console.error("Error response data:", error.response.data);
    // }
    //   }
    // },
  },
};
</script>
