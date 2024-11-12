<template>
  <!-- Header -->
  <div class="relative bg-blue-200 md:pt-32 pb-32 pt-12">
    <div class=" md:px-10 mx-auto w-full">
      <h1 class="text-white text-3xl lg:text-5xl font-bold ">{{ apprenticeData?.name }} - {{ apprenticeData?.cohort }} Cohort</h1>
        <div class="flex flex-wrap py-4 gap-2">
          <div class="w-full lg:w-6/12 xl:w-3/12 ">
            <card-stats statSubtitle="RAG Rating" :statTitle="rag"
              :statPercent="rag" statPercentColor="text-blue-500"
              :bgColour="rag_colour" colour="text-white" />
          </div>

          <div class="w-full lg:w-6/12 xl:w-3/12 ">
            <card-stats statSubtitle="KSBs Progress" :statTitle="ksbProgressTitle" statArrow="up"
              :statPercent="ksbProgressPercent" statPercentColor="text-blue-500" statDescription="Since last month"
              statIconName="far fa-chart-bar" statIconColor="bg-red-500" />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 ">
            <card-stats statSubtitle="OTJ HOURS LOGGED" :statTitle="OTJH_Achieved" statArrow="up"
              :statPercent="otjHoursPercent" statPercentColor="text-red-500" statDescription="Since last week"
              statIconName="fas fa-chart-pie" statIconColor="bg-orange-500" />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 ">
            <card-stats statSubtitle="PORTFOLIO/ACTIVITY LOG" :statTitle="portfolioActivityTitle" statArrow="up"
              :statPercent="portfolioActivityPercent" statPercentColor="text-orange-500"
              statDescription="Since yesterday" statIconName="fas fa-users" statIconColor="bg-pink-500" />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 ">
            <card-stats statSubtitle="SESSIONS ATTENDED" :statTitle="sessionsAttendedTitle" statArrow="up"
              :statPercent="sessionsAttendedPercent" statPercentColor="text-blue-500" statDescription="Since last month"
              statIconName="fas fa-book-open" statIconColor="bg-purple-500" />
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";
import { useBoardStore } from "../../store/useBoardStore";
import { storeToRefs } from 'pinia';
import { ragRatingColor } from "../../helpers/ragRatingColors";
import { watch, ref } from 'vue';

export default {
  components: {
    CardStats,
  },
  setup() {
    const boardStore = useBoardStore();
    const { apprenticeData } = storeToRefs(boardStore);
    const rag_colour = ref('bg-gray-500')
    const rag = ref('0');
    console.log(apprenticeData);

    watch(apprenticeData, (newData) => {
      if (newData && newData.rag) {
        rag.value = newData.rag
        rag_colour.value = ragRatingColor(newData.rag);
      }

    }, { immediate: true });

    return {
      apprenticeData,
      rag_colour,
      rag
    };
  },
};
</script>
