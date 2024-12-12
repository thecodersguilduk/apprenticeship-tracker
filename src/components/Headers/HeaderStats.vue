<template>
  <!-- Header -->
  <div v-if="apprenticeData" class="relative bg-blue-200 md:pt-32 pb-32 pt-12">
    <div class=" md:px-10 mx-auto w-full">
      <h1 class="text-white text-3xl lg:text-5xl font-bold "><a href="/">{{ apprenticeData?.name }}</a> - {{ apprenticeData?.cohort }} Cohort</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-4 gap-2">
          <div class="">
            <card-stats statSubtitle="RAG Rating" :statTitle="rag"
              statPercentColor="text-blue-500"
              :bgColour="rag_colour" colour="text-white" />
          </div>

          <div class="">
            <card-stats statSubtitle="Start Date" :statTitle="start_date"
               statPercentColor="text-blue-500"
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
            <card-stats statSubtitle="KSB Progress" :statTitle="ksb_progress" />
          </div>
          <div class="">
            <card-stats statSubtitle="OTJ HOURS LOGGED" :statTitle="otjh_achieved" :statTarget="otjh_target"  />
          </div>
          <div class="">
            <card-stats statSubtitle="PORTFOLIO/ACTIVITY LOG" :statTitle="portfolioact_log_progress" 
            :driveLink="drive_link"
              
                 />
          </div>
          <div class="h-full w-full bg-white relative">
            <a target="_blank" class="absolute inset-0 cursor-pointer flex items-center justify-center font-bold" href="https://wkf.ms/3OeZTQh">Submit OTJ Logs!</a>
          </div>
        </div>
    </div>
  </div>
  <div v-else>
    <p>Your data was not found - please speak to your coach</p>
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
    const otjh_achieved = ref('');
    const otjh_target = ref('');
    const portfolioact_log_progress = ref('');
    const drive_link = ref('');
    console.log(apprenticeData);

    watch(apprenticeData, (newData) => {
      if (newData && newData.overall_rag) {
        rag.value = newData.overall_rag
        rag_colour.value = ragRatingColor(newData.overall_rag);
      }

      if (newData && newData.start_date) {
        start_date.value = newData.start_date
      }

      if (newData && newData.practical_end_date) {
        practical_end_date.value = newData.practical_end_date
        time_to_epa.value = getDifferenceFormatted(practical_end_date.value);
      }

      if (newData && newData.ksb_progress) {
        if(newData.ksb_progress.length > 1){
        const progressArray = newData.ksb_progress.split(',');
        ksb_progress.value = progressArray[progressArray.length - 1] + '%';
        } else {
          ksb_progress.value = newData.ksb_progress + '%';
        }
        
        
      }

      if (newData && newData.otjh_achieved) {
        otjh_achieved.value = newData.otjh_achieved
      }

      if (newData && newData.otjh_target_min) {
        otjh_target.value = newData.otjh_target_min
      }

      if( newData && newData.portfolioact_log_progress) {
        portfolioact_log_progress.value = newData.portfolioact_log_progress
      }

      if( newData && newData.g_drive) {
        drive_link.value = newData.g_drive
      }


    }, { immediate: true });

    return {
      apprenticeData,
      rag_colour,
      rag,
      start_date,
      practical_end_date,
      time_to_epa,
      ksb_progress,
      otjh_achieved,
      otjh_target,
      portfolioact_log_progress,
      drive_link
    };
  },
};
</script>
