<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-black"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
            Overview
          </h6>
          <h2 class="text-white text-xl font-semibold">
            Target Curve, KSB and Portfolio
          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <!-- Chart -->
      <div class="relative h-350-px">
        <canvas id="line-chart"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "pinia";
import Chart from "chart.js";
import { useBoardStore } from "../../store/useBoardStore";

function calculateMonthsBetween(startDate, endDate) {
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  return months + 1;
}

function generateProgressCurve(totalMonths) {
  const data = [];
  const phase1Months = 3; // Ramp-up phase
  const plateauEnd = Math.floor(totalMonths * 0.6); // End of gentle incline

  const plateauDuration = plateauEnd - phase1Months; // Duration of gentle incline
  const steepPhaseDuration = totalMonths - plateauEnd; // Duration of final steep incline

  const rampUpRate = 30 / phase1Months; // Increment rate for Phase 1
  const gentleInclineRate = 20 / plateauDuration; // Increment rate for Phase 2
  const steepInclineRate = 50 / steepPhaseDuration; // Increment rate for Phase 3

  for (let month = 0; month <= totalMonths; month++) {
    if (month < phase1Months) {
      // Phase 1: Ramp-up
      data.push(rampUpRate * month);
    } else if (month < plateauEnd) {
      // Phase 2: Gentle incline
      const progressInPlateau = 30 + gentleInclineRate * (month - phase1Months);
      data.push(progressInPlateau);
    } else {
      // Phase 3: Steeper incline
      const progressInSteepPhase =
        50 + steepInclineRate * (month - plateauEnd);
      data.push(progressInSteepPhase);
    }
  }

  // Final adjustment to hit exactly 100%
  const adjustmentFactor = 100 / data[data.length - 1];
  for (let i = 0; i < data.length; i++) {
    data[i] *= adjustmentFactor;
  }

  return data;
}

function generateActualProgressCurve(progressData, totalMonths, elapsedMonths) {
  const data = Array(totalMonths).fill(null); // Initialize all months with null
  if (progressData.length === 1) {
    data[elapsedMonths - 1] = progressData[0]; // Place the single progress point in the current month
  } else {
    progressData.forEach((value, index) => {
      if (index < totalMonths) {
        data[index] = value; // Populate the array with the given progress points
      }
    });
  }

  return data;


}





export default {
  data() {
    return {
      chart: null, // Holds the Chart.js instance
    };
  },
  computed: {
    ...mapState(useBoardStore, ["apprenticeId", "apprenticeData"]),
    start_date() {
      return this.apprenticeData?.start_date || null;
    },
    practical_end_date() {
      return this.apprenticeData?.practical_end_date || null;
    },
    ksb_progress() {
      const ksbProgress = this.apprenticeData?.ksb_progress;
      return ksbProgress && ksbProgress.length > 1 ? ksbProgress.split(',') : null;
    },
    isDataReady() {
      return this.start_date && this.practical_end_date && this.ksb_progress;
    },
  },
  watch: {
    isDataReady(newVal) {
      if (newVal) {
        this.updateChart();
      }
    },
    apprenticeData() {
      if (this.isDataReady) {
        this.updateChart();
      }
    },
  },
  methods: {
    updateChart() {
      if (!this.start_date || !this.practical_end_date) return;

      const startDate = new Date(this.start_date);
      const endDate = new Date(this.practical_end_date);
      const totalMonths = calculateMonthsBetween(startDate, endDate);
      const currentDate = new Date();
      const elapsedMonths = calculateMonthsBetween(startDate, currentDate);

      const labels = Array.from({ length: totalMonths }, (_, i) => {
        const date = new Date(startDate);
        date.setMonth(startDate.getMonth() + i);
        return date.toLocaleString("default", { month: "short", year: "numeric" });
      });

      const expectedProgressData = generateProgressCurve(totalMonths);

      const actualProgressData = generateActualProgressCurve(this.ksb_progress, totalMonths, elapsedMonths);




      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = document.getElementById("line-chart").getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Expected Progress",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderColor: "#fff",
              data: expectedProgressData,
              borderWidth: 2,
              pointBackgroundColor: "#fff",
              fill: false,
              tension: 0.6,
            },
            {
              label: "Portfolio Progress",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              data: actualProgressData, // Plot actual progress for elapsed months

              borderWidth: 2,
              pointBackgroundColor: "rgba(54, 162, 235, 1)",
              fill: false,
              tension: 0.6,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              ticks: { color: "#ccc" },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
            y: {
              ticks: { color: "#ccc" },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
          },
          plugins: {
            tooltip: {
              mode: "index",
              intersect: false,
              callbacks: {
                label(context) {
                  return `${context.dataset.label}: ${context.raw.toFixed(2)}%`;
                },
              },
            },
            legend: {
              display: true,
              labels: { color: "#fff" },
            },
          },
        },
      });
    },
  },
  mounted() {
    if (this.isDataReady) {
      this.updateChart();
    }
  },
};
</script>

