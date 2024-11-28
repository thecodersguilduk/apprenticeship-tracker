<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-blueGray-700">
            Next 6 weeks schedule
          </h3>
        </div>
        <div
          class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
        >
          <a href="/admin/training-plan"
            class="bg-blue-200 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            See all
          </a>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table v-if="trainingPlan && trainingPlan.length" class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 py-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Session name
            </th>
            <th
              class="px-6 py-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Duration (hrs)
            </th>
            <th
              class="px-6 py-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Date
            </th>
            <th
              class="px-6 py-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Type
            </th>
            <th
              class="px-6 py-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Trainer
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="session in trainingPlan" :key="session.id" class="odd:bg-white even:bg-gray-100">
            <td class="border-t-0 px-6 py-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
              {{ session.session_name }}
            </td>
            <td class="border-t-0 px-6 py-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ session.duration }}
            </td>
            <td class="border-t-0 px-6 py-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ session.date }}
            </td>
            <td class="border-t-0 px-6 py-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ session.type }}
            </td>
            <td class="border-t-0 px-6 py-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ session.trainer }}
            </td>
          </tr>        
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup>
import { useBoardStore } from "@/store/useBoardStore";
import { computed, onMounted, watch } from 'vue';

const boardStore = useBoardStore();

const trainingPlan = computed(() => boardStore.nextSixWeeksTraining);
console.log('Card Schedule Component: ', trainingPlan.value)

onMounted(() => {
   watch(trainingPlan, (newVal) => {
    console.log("Training Plan updated:", newVal);
  });
})


</script>
