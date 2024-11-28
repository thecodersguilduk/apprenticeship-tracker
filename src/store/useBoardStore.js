import { defineStore } from "pinia";
import mondayService from "../../services/mondayService";
import { getDoc, doc, db } from "@/firebase";
import { transformLearnerData } from "@/helpers/transformLearnerData";
import { isWithinInterval, addDays, startOfDay, format } from 'date-fns';


export const useBoardStore = defineStore("board", {
  state: () => ({
    apprenticeId: null,
    apprenticeData: null,
  }),
  actions: {
    async fetchApprenticeData(userId) {
      try {
        // Fetch apprentice ID from Firestore
        const userDoc = await getDoc(doc(db, "users", userId));
        if (!userDoc.exists()) throw new Error("User document not found.");

        const apprenticeId = userDoc.data().apprenticeId;
        this.apprenticeId = apprenticeId;
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
  getters: {
    trainingPlan(state) {
      return state.apprenticeData?.training_plan
      .map(session => {
        return {
          ...session,
          date: format(new Date(session.date), 'dd/MM/yyyy')
        }
      }) || [];
    },
    nextSixWeeksTraining(state) {
      const today = startOfDay(new Date()); // Normalize to start of the day
      const sixWeeksLater = addDays(today, 42); // Add 42 days

      return state.apprenticeData?.training_plan
      .filter(session => {
          const sessionDate = startOfDay(new Date(session.date)); // Normalize session date

          return isWithinInterval(sessionDate, { start: today, end: sixWeeksLater });
        })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(session => {
        return {
          ...session,
          date: format(new Date(session.date), 'dd/MM/yyyy')
        }
      }) || [];
    }

    
    
    
  },
  persist: true,
});
