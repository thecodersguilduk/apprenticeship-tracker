<template>
  <!-- Header -->
  <div class="relative bg-blue-200 md:pt-32 pb-32 pt-12">
    <div class=" md:px-10 mx-auto w-full">
      <h1 class="text-white text-3xl lg:text-5xl font-bold ">{{ apprenticeData?.name }} - {{ apprenticeData?.cohort }} Cohort</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-4 gap-2">
          <div class="">
            <card-stats statSubtitle="RAG Rating" :statTitle="rag"
              statPercentColor="text-blue-500"
              :bgColour="rag_colour" colour="text-white" />
          </div>

          <div class="">
            <card-stats statSubtitle="Start Date" :statTitle="start_date"
              :statPercent="rag" statPercentColor="text-blue-500"
               />
          </div>

          <div class="">
            <card-stats statSubtitle="Practical End Date" :statTitle="practical_end_date"
               statPercentColor="text-blue-500"
                />
          </div>

          <div class="">
            <card-stats statSubtitle="Time to EPA" :statTitle="time_to_epa"
              statPercentColor="text-blue-500"
              colour="text-black" />
          </div>

          <div class="">
            <card-stats statSubtitle="KSB Progress" :statTitle="ksb_progress" statArrow="up"
              :statPercent="ksb_progress" statPercentColor="text-blue-500" statDescription="Since last month"
              statIconName="far fa-chart-bar" statIconColor="bg-red-500" />
          </div>
          <div class="">
            <card-stats statSubtitle="OTJ HOURS LOGGED" :statTitle="OTJH_Achieved" statArrow="up"
              :statPercent="otjHoursPercent" statPercentColor="text-red-500" statDescription="Since last week"
              statIconName="fas fa-chart-pie" statIconColor="bg-orange-500" />
          </div>
          <div class="">
            <card-stats statSubtitle="PORTFOLIO/ACTIVITY LOG" :statTitle="portfolioActivityTitle" statArrow="up"
              :statPercent="portfolioActivityPercent" statPercentColor="text-orange-500"
              statDescription="Since yesterday" statIconName="fas fa-users" statIconColor="bg-pink-500" />
          </div>
          <div class="">
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
import { getDifferenceFormatted } from "../../helpers/getDifferenceBetweenDates";

export default {
  components: {
    CardStats,
  },
  setup() {
    const boardStore = useBoardStore();
    const { apprenticeData } = storeToRefs(boardStore);
    const rag_colour = ref('bg-gray-500')
    const rag = ref('0');
    const start_date = ref('');
    const practical_end_date = ref('Not set yet');
    const time_to_epa = ref('');
    const ksb_progress = ref('');
    console.log(apprenticeData);

    watch(apprenticeData, (newData) => {
      if (newData && newData.rag) {
        rag.value = newData.rag
        rag_colour.value = ragRatingColor(newData.rag);
      }

      if (newData && newData.start_date) {
        start_date.value = newData.start_date
      }

      if (newData && newData.practical_end_date) {
        practical_end_date.value = newData.practical_end_date
        time_to_epa.value = getDifferenceFormatted(practical_end_date.value);
      }

      if (newData && newData.ksb_progress) {
        ksb_progress.value = newData.ksb_progress
      }


    }, { immediate: true });

    return {
      apprenticeData,
      rag_colour,
      rag,
      start_date,
      practical_end_date,
      time_to_epa,
      ksb_progress
    };
  },
};
</script>
