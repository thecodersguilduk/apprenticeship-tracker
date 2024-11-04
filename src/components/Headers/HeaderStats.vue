<template>
  <!-- Header -->
  <div class="relative bg-blue-200 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <!-- Loading and Error Handling -->
      <div v-if="isLoading" class="text-center text-gray-500 py-8">
        Loading data...
      </div>
      <div v-else-if="errorMessage" class="text-center text-red-500 py-8">
        {{ boardStore.error }}
      </div>
      <div v-else>
        <div class="w-full max-w-xl bg-white border-blue-800 shadow-lg rounded-lg p-4 mx-auto my-4">
          <!-- Header for Coach and Cohort Information -->
          <div class="mb-2">
            <h1 class="text-xl font-bold text-gray-900 mb-1"> {{ apprenticeName }} </h1>
            <h1 class="text-md font-medium text-gray-600 mb-1">Your Coach: {{ coachName }}</h1>
            <h2 class="text-md font-medium text-gray-600">Cohort Name: {{ cohort }}</h2>
            <h2 class="text-md font-medium text-gray-600">Start Date: {{ startDate }} </h2>
            <h2 class="text-md font-medium text-gray-600">Predicted End Date: {{ endDate }}</h2>
            <h2 class="text-md font-medium text-gray-600">Employer Name: {{ employer }} </h2>
            <h2 class="text-md font-medium text-gray-600">Standard: {{ standard }} </h2>
          </div>
        </div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
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
import { computed } from "vue";

export default {
  components: {
    CardStats,
  },
  setup() {
    const boardStore = useBoardStore();
    const isLoading = boardStore.loading; // Access the loading state
const errorMessage = boardStore.error; // Access the error message
// Computed properties to access store data directly
const OTJH_Achieved = computed(() => boardStore.boardItems.OTJH_Achieved || "Loading...");
    const coachName = computed(() => boardStore.coachName || "Loading...");
    const cohort = computed(() => boardStore.cohort || "Loading...");
    const startDate = computed(() => boardStore.startDate || "Loading...");
    const endDate = computed(() => boardStore.endDate || "Loading...");
    const standard = computed(() => boardStore.standard || "Loading...");
    const employer = computed(() => boardStore.employer || "Loading...");
    const apprenticeName = computed(() => boardStore.boardItems.name || "Loading...")

    return {
      OTJH_Achieved,
      coachName,
      cohort,
      startDate,
      standard,
      employer,
      endDate,
      apprenticeName,
      isLoading,
      errorMessage
    };
  },
};
</script>
