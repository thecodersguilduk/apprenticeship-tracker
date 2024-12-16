<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0 w-full">
      <div class="flex w-full">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-blueGray-700 w-full">
            Apprenticeship Progress
          </h3>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table v-if="metrics?.elapsedTimePercentage !== undefined && metrics?.ksbProgressPercentage !== undefined && metrics?.otjProgressPercentage !== undefined" class="items-center w-full bg-transparent border-collapse">
        <thead class="thead-light">

        </thead>
        <tbody>
          <tr v-if="metrics?.elapsedTimePercentage !== undefined">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
            >
             Apprenticeship Completion
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                <span class="mr-2">{{metrics.elapsedTimePercentage}}%</span>
                <div class="relative w-full">
                  <div
                    class="overflow-hidden h-2 text-xs flex rounded bg-red-200"
                  >
                    <div
                      :style="{width: metrics.elapsedTimePercentage + '%'}"
                      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                    ></div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="metrics?.otjProgressPercentage !== null">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
            >
             OTJ Logs
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                <span class="mr-2">{{ metrics.otjProgressPercentage }}%</span>
                <div class="relative w-full">
                  <div
                    class="overflow-hidden h-2 text-xs flex rounded bg-red-200"
                  >
                    <div
                    v-if="metrics?.otjProgressPercentage !== null"
                      :style="{ width:  metrics.otjProgressPercentage +'%' }"
                      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                    ></div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="metrics?.ksbProgressPercentage !== null">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
            >
             Portfolio/KSB's
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                <span class="mr-2">{{metrics.ksbProgressPercentage}}%</span>
                <div class="relative w-full">
                  <div
                    class="overflow-hidden h-2 text-xs flex rounded bg-red-200"
                  >
                    <div
                      :style="{ width: metrics.ksbProgressPercentage + '%'}"
                      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                    ></div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="p-6 flex flex-col items-center justify-center font-bold text-md">
        <p>No current progress data available</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBoardStore } from '../../store/useBoardStore';
import { computed } from 'vue';


const boardStore = useBoardStore();

const metrics = computed(() => boardStore.getProgress);

</script>
