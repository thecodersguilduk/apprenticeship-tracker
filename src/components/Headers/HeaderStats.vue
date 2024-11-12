<template>
  <!-- Header -->
  <div class="relative bg-blue-200 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <div class="w-full max-w-xl bg-white border-blue-800 shadow-lg rounded-lg p-4 mx-auto my-4">
          <!-- Header for Coach and Cohort Information -->
          <div class="mb-2">
            <h1 class="text-xl font-bold text-gray-900 mb-1"> {{ apprenticeData?.name }} </h1>
            <h1 class="text-md font-medium text-gray-600 mb-1">Your Coach: {{ apprenticeData?.coach }}</h1>
            <h2 class="text-md font-medium text-gray-600">Cohort Name: {{ apprenticeData?.cohort }}</h2>
            <h2 class="text-md font-medium text-gray-600">Start Date: {{ apprenticeData?.start_date }} </h2>
            <h2 class="text-md font-medium text-gray-600">Predicted End Date: {{ endDate }}</h2>
            <h2 class="text-md font-medium text-gray-600">Employer Name: {{ apprenticeData?.employer }} </h2>
            <h2 class="text-md font-medium text-gray-600">Standard: {{ apprenticeData?.standard }} </h2>
          </div>
        </div>
        <!-- Card stats -->
        <div class="flex flex-wrap gap-2">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats statSubtitle="RAG Rating" :statTitle="ksbProgressTitle" statArrow="up"
              :statPercent="ksbProgressPercent" statPercentColor="text-blue-500" statDescripiron="Since last month"
              statIconName="far fa-chart-bar" statIconColor="bg-red-500" />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats statSubtitle="KSBs Progress" :statTitle="ksbProgressTitle" statArrow="up"
              :statPercent="ksbProgressPercent" statPercentColor="text-blue-500" statDescripiron="Since last month"
              statIconName="far fa-chart-bar" statIconColor="bg-red-500" />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats statSubtitle="OTJ HOURS LOGGED" :statTitle="OTJH_Achieved" statArrow="up"
              :statPercent="otjHoursPercent" statPercentColor="text-red-500" statDescripiron="Since last week"
              statIconName="fas fa-chart-pie" statIconColor="bg-orange-500" />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats statSubtitle="PORTFOLIO/ACTIVITY LOG" :statTitle="portfolioActivityTitle" statArrow="up"
              :statPercent="portfolioActivityPercent" statPercentColor="text-orange-500"
              statDescripiron="Since yesterday" statIconName="fas fa-users" statIconColor="bg-pink-500" />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats statSubtitle="SESSIONS ATTENDED" :statTitle="sessionsAttendedTitle" statArrow="up"
              :statPercent="sessionsAttendedPercent" statPercentColor="text-blue-500" statDescripiron="Since last month"
              statIconName="fas fa-book-open" statIconColor="bg-purple-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";
import { useBoardStore } from "../../store/useBoardStore";
import { storeToRefs } from 'pinia';

export default {
  components: {
    CardStats,
  },
  setup() {
    const boardStore = useBoardStore();
    const { apprenticeData } = storeToRefs(boardStore);
    console.log(apprenticeData);

    return {
      apprenticeData
    };
  },
};
</script>
