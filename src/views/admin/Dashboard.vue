<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-line-chart />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-bar-chart />
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-page-visits />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-social-traffic />
      </div>
    </div>
  </div>
</template>
<script>
import mondayService from '@/../services/mondayService';
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardBarChart from "@/components/Cards/CardBarChart.vue";
import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default {
  name: "dashboard-page",
  components: {
    CardLineChart,
    CardBarChart,
    CardPageVisits,
    CardSocialTraffic,
  },
  data() {
    return {
      boardItems: [],
      apprenticeId: null,
      userEmail: null
    };
  },
  mounted() {
    this.fetchApprenticeId();
  },
  methods: {
    async fetchApprenticeId() {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const apprenticeId = await mondayService.getApprenticeIdByEmail(user.email);
            if (apprenticeId) {
              this.apprenticeId = apprenticeId;
              this.loadBoardData();
            } else {
              console.error("Apprentice ID not found for the logged-in user.");
            }
          } catch (error) {
            console.error("Error fetching apprentice ID:", error);
          }
        } else {
          console.log("User not logged in");
        }
      });
    },
    transformItemData(item) {
      return {
        id: item.id,
        name: item.name,
        ...(Array.isArray(item.column_values) ? item.column_values.reduce((acc, column) => {
          if (column && column.column && column.column.title) {
            const title = column.column.title;
            let value = "";
            if (column.values && column.values.length > 0) {
              value = column.values[0].label;
            } else if (column.date) {
              value = column.date;
            } else if (column.text) {
              value = column.text;
            }

            acc[title] = value;
          }
          return acc;
        }, {}) : {})
      };
    },
    loadBoardData() {
      if (!this.apprenticeId) return;

      mondayService.getBoardData(this.apprenticeId)
        .then(response => {
          console.log(response);
          this.boardItems = this.transformItemData(response[0]);
        })
        .catch(err => {
          console.error('Error loading board data:', err);
        });
    },
  },

};
</script>
