<template>
    <div
      class="relative flex flex-col min-w-0 break-words rounded mb-6 xl:mb-0 shadow-lg h-full bg-white items-center justify-center"
    >
      <div class="py-6">
        <div class="flex flex-wrap">
          <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
            <p class="text-black uppercase font-bold text-lg">
               {{ btnText }}
            </p>
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
      </div>
      <a v-if="link" :href="link" target="_blank" class="text-sm text-blue-200 underline mt-4 cursor-pointer absolute inset-0">
        </a>
    </div>
  </template>
  <script>
  export default {
    name: "card-stats",
    props: {
        btnText: {
            type: String,
            default: 'Contact Us'
        },
        link: {
            type: String,
            default: '#'
        },
    },
  };
  </script>
  