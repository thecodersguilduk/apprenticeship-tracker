<template>
  <div
    class="relative flex flex-col min-w-0 break-words rounded mb-6 xl:mb-0 shadow-lg h-full"
    :class="[bgColour, colour]"
  >
  <a v-if="link" :href="link" class="absolute inset-0 cursor-pointer z-50" target="_blank"></a>
    <div class="flex-auto p-4">
      <div class="flex flex-wrap">
        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
          <h5 class="text-black uppercase font-bold text-xs">
            {{ statSubtitle }}
          </h5>
          <span class="font-semibold text-xl text-black">
            {{ statTitle }}  
          </span>
          <span class="font-semibold text-xl text-black" v-if="statTarget"> / {{ statTarget }} </span>
        </div>
        <div v-if="statIconName" class="relative w-auto pl-4 flex-initial">
          <div
            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full"
            :class="[statIconColor]"
          >
            <i :class="[statIconName]"></i>
          </div>
        </div>
      </div>
      <p v-if="statDescription" class="text-sm text-blueGray-400 mt-4">
        <span class="mr-2" :class="[statPercentColor]">
          <i
            :class="[
              statArrow === 'up' ? `fas fa-arrow-up` : `fas fa-arrow-down`,
            ]"
          ></i>
          {{ statPercent }}%
        </span>
        <span class="whitespace-nowrap">{{ statDescription }}</span>
      </p>
      <a v-if="driveLink" :href="driveLink" target="_blank" class="text-sm text-blue-200 underline mt-4 cursor-pointer">
        Click here to view your drive folder
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "card-stats",
  props: {
    link: {
      type: String,
      default: ''
    },
    bgColour: {
      type: String,
      default: 'bg-white'
    },
    colour: {
      type: String,
      default: 'text-black'
    },
    driveLink: {
      type: String,
      default: ''
    },
    statSubtitle: {
      type: String,
      default: "Traffic",
    },
    statTitle: {
      type: String,
      default: "0",
    },
    statArrow: {
      validator: function (value) {
        // The value must match one of these strings
        return ["up", "down"].indexOf(value) !== -1;
      },
    },
    statPercent: {
      type: String,
    },
    // can be any of the text color utilities
    // from tailwindcss
    statPercentColor: {
      type: String,
      default: "text-emerald-500",
    },
    statDescription: {
      type: String,
      default: "",
    },
    statIconName: {
      type: String,
      default: "",
    },
    statIconColor: {
      type: String,
      default: "",
    },
    statTarget: {
      type: String,
      default: "",
    },
  },
};
</script>
