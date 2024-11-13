import { defineStore } from "pinia";
import mondayService from "../../services/mondayService";
import { getDoc, doc, db } from "@/firebase";
import { transformLearnerData } from "@/helpers/transformLearnerData";

export const useBoardStore = defineStore("board", {
  state: () => ({
    apprenticeData: null,
  }),
  actions: {
    async fetchApprenticeData(userId) {
      try {
        // Fetch apprentice ID from Firestore
        const userDoc = await getDoc(doc(db, "users", userId));
        if (!userDoc.exists()) throw new Error("User document not found.");

        const apprenticeId = userDoc.data().apprenticeId;
        if (!apprenticeId) throw new Error("Apprentice ID missing.");

        // Fetch data from Monday.com
        const response = await mondayService.getBoardData(apprenticeId);
        const learnerData = transformLearnerData(response[0]);
        
        // Store transformed data in Pinia state
        this.apprenticeData = learnerData;
      } catch (error) {
        throw new Error(`Failed to fetch apprentice data: ${error.message}`);
      }
    },
    setApprenticeData(data) {
      this.apprenticeData = data;
    }
  },
});
