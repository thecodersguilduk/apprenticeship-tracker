// src/stores/useBoardStore.js
import { defineStore } from "pinia";
import mondayService from "@/../services/mondayService";
import { reactive, ref } from "vue";
// import { start } from "@popperjs/core";

export const useBoardStore = defineStore("board", {
  state: () =>  reactive({
    apprenticeId: null,
    boardItems: {},
    coachName: null,
    cohort: null,
    startDate: null,
    standard: null,
    employer: null,
    endDate: null,
 }),

 loading: ref(false),
 error: ref(null),
  
  actions: {
    setCoachTitle(title) {
        this.coachTitle = title;
      },
    async fetchApprenticeId(email) {
        this.loading = true;
      this.error = null;
      try {
        const apprenticeId = await mondayService.getApprenticeIdByEmail(email);
        if (apprenticeId) {
          this.apprenticeId = apprenticeId;
          await this.loadBoardData();
        } else {
            this.error = "Apprentice ID not found for the given email.";
            
        }
      } catch (error) {
        this.error = "Error fetching apprentice ID.";
        console.error(error);
      }
      finally {
        this.loading = false;
      }
    },
    async loadBoardData() {
      if (!this.apprenticeId) return;
        this.loading = true;
        this.error = null;
      try {
        const data = await mondayService.getBoardData(this.apprenticeId);
        if (data && data.length > 0) {
            this.transformItemData(data[0]);
          } else {
            this.error = "No board data found.";
          }
      } catch (err) {
        this.error = "Error loading board data.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    transformItemData(item) {
      this.boardItems = {
        id: item.id,
        name: item.name,
      };
      if (Array.isArray(item.column_values)) {
        item.column_values.forEach((column) => {
          const title = column.column?.title;
          const value = column.values?.[0]?.label || column.text || column.date || null;

          if (title === "OTJH - Achieved") this.boardItems.OTJH_Achieved = value;
          if (title === "Start Date") this.startDate = value;
          if (title === "Predicted End Date") this.endDate = value;
          if (title === "Standard") this.standard = value;
          if (title === "Employer") this.employer = value;
          if (title === "Coach") this.coachName = value;
          if (title === "Cohort") this.cohort = value;
        });
      }
    },
    // transformItemData(item) {
    //   return {
    //     id: item.id,
    //     name: item.name,
    //     ...(Array.isArray(item.column_values) ? item.column_values.reduce((acc, column) => {
    //       if (column && column.column && column.column.title) {
    //         const title = column.column.title;
    //         let value = "";
    //         if (column.values && column.values.length > 0) {
    //           value = column.values[0].label;
    //         } else if (column.date) {
    //           value = column.date;
    //         } else if (column.text) {
    //           value = column.text;
    //         }
    //         acc[title] = value;
    //       }
    //       return acc;
    //     }, {}) : {})
    //   };
    // }
  },
});
