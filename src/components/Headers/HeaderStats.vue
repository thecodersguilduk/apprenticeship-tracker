<template>
  <!-- Header -->
  <div v-if="apprenticeData" class="relative bg-blue-200 md:pt-32 pb-32 pt-12">
    <div class=" md:px-10 mx-auto w-full">
      <div class="flex flex-col gap-4">
        <h1 class="text-white text-3xl lg:text-5xl font-bold "><a href="/">{{ apprenticeData?.name }}</a> - {{ apprenticeData?.cohort }} Cohort</h1>
        <p class="text-xl text-white">You are on the Apprenticeship Standard for: {{apprenticeData?.apprenticeship_standard}}, and your Technical Coach is: <span class="font-bold">{{ apprenticeData?.coach }}</span></p>
      </div>
      
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-4 gap-2">

          <!-- todo -amend these components to make them more graceful to manage -->
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
              colour="text-black"
              :link="epa_information" />
          </div>

          <div class="">
            <card-stats statSubtitle="KSB Progress" :statTitle="ksb_progress" isKSBComponent="true" ksbs="ksb_matrix" />
          </div>

          <div class="">
            <card-stats statSubtitle="PORTFOLIO/ACTIVITY LOG" :statTitle="portfolioact_log_progress" 
            :bottomLink="drive_link" bottomLinkText="Click here for your drive folder"
            />
          </div>

          <div class="">
            <card-stats statSubtitle="OTJ HOURS LOGGED" :statTitle="otjh_achieved" :statTarget="otjh_target" bottomLink="https://wkf.ms/3OeZTQh"
            bottomLinkText="Click here to enter OTJ Logs"  />
          </div>
          
          <div class="h-full w-full bg-white relative">
            <card-stats statSubtitle="End Date:" :statTitle="end_date" />
          </div>

          <div class="">
            <contact-component btnText="Contact Safeguarding" link="mailto:safeguarding@thecodersguild.org.uk" />
          </div>

          <div class="">
            <contact-component btnText="Report Absence" link="mailto:absences@thecodersguild.org.uk" />
          </div>

          <div class="">
            <contact-component btnText="Contact Apprenticeship Manager" link="mailto:shelley@thecodersguild.org.uk" />
          </div>

          <div class="">
            <contact-component btnText="Contact Coach" :link="`mailto:${coach_email}`" />
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
import ContactComponent from "../Cards/ContactComponent.vue";
import { useBoardStore } from "../../store/useBoardStore";
import { storeToRefs } from 'pinia';
import { ragRatingColor } from "../../helpers/ragRatingColors";
import { watch, ref } from 'vue';
import { getDifferenceFormatted } from "../../helpers/getDifferenceBetweenDates";

export default {
  components: {
    CardStats,
    ContactComponent
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
    const epa_information = ref('');
    const ksb_matrix = ref('');
    const end_date = ref('');
    const coach_email = ref('');
    console.log(apprenticeData);

    watch(apprenticeData, (newData) => {

      if(newData && newData.ksb_matrix) {
        ksb_matrix.value = newData.ksb_matrix
      }

      if(newData && newData.coach_email){
        coach_email.value = newData.coach_email
      }


      if (newData && newData.predicted_end_date) {
        end_date.value = newData.predicted_end_date
      }
      
      if (newData && newData.overall_rag) {
        rag.value = newData.overall_rag
        rag_colour.value = ragRatingColor(newData.overall_rag);
      }

      if (newData && newData.epa_information) {
        epa_information.value = newData.epa_information
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
      drive_link,
      epa_information,
      end_date,
      coach_email
    };
  },
};
</script>
