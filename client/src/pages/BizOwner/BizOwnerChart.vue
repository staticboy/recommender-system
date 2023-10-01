<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold">Business Insights</h1>

    <div class="row">
      <div class="col-4 mb-4 mr-4">
        <label for="fromDate">From Date:</label>
        <input
          type="date"
          id="fromDate"
          v-model="fromDate"
          class="w-full px-3 py-2 rounded-md border border-gray-300"
          @input="updateCharts()"
        />
      </div>
      <div class="col-4 mb-4 ml-4">
        <label for="toDate">To Date:</label>
        <input
          type="date"
          id="toDate"
          v-model="toDate"
          class="w-full px-3 py-2 rounded-md border border-gray-300"
          @input="updateCharts()"
        />
      </div>
    </div>

    <!-- Product Selection -->
    <div class="mb-4">
      <label v-for="product in availableProducts" :key="product">
        <input
          type="checkbox"
          v-model="selectedProducts"
          :value="product"
          @click="updateCharts()"
        />
        {{ product }}
      </label>
    </div>

    <!-- Scrollable Container for Charts -->
    <div class="overflow-x-auto max-w-full">
      <div class="flex flex-row">
        <!-- Sales Chart -->
        <div
          v-if="selectedProducts.length > 0"
          class="w-full md:w-1/2 lg:w-1/3 p-4"
        >
          <p>Sales Chart</p>
          <VueApexCharts
            :options="salesChartOptions"
            :series="salesChartSeries"
          ></VueApexCharts>
        </div>

        <!-- Product Performance Chart -->
        <div
          v-if="selectedProducts.length > 0"
          class="w-full md:w-1/2 lg:w-1/3 p-4"
        >
          <p>Product Performance Chart</p>
          <VueApexCharts
            :options="productPerformanceChartOptions"
            :series="productPerformanceChartSeries"
          ></VueApexCharts>
        </div>

        <!-- Conversion Rate Chart -->
        <div
          v-if="selectedProducts.length > 0"
          class="w-full md:w-1/2 lg:w-1/3 p-4"
        >
          <p>Conversion Rate Chart</p>
          <VueApexCharts
            :options="conversionRateChartOptions"
            :series="conversionRateChartSeries"
          ></VueApexCharts>
        </div>

        <!-- Visitors Chart -->
        <div
          v-if="selectedProducts.length > 0"
          class="w-full md:w-1/2 lg:w-1/3 p-4"
        >
          <p>Visitors Chart</p>
          <VueApexCharts
            :options="visitorsChartOptions"
            :series="visitorsChartSeries"
          ></VueApexCharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueApexCharts from "vue3-apexcharts";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";

const router = useRouter();

let availableProducts = ["Product 1", "Product 2", "Product 3", "Product 4"]; // Example product list
const selectedProducts = ref([]); // User-selected products to display in the chart
const fromDate = ref("");
const toDate = ref("");

// Dummy data for Sales Chart (Replace with actual data)
const salesChartOptions = {
  chart: {
    type: "line",
    id: "sales-chart",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar"],
  },
};
let salesChartSeries = [];

// Dummy data for Product Performance Chart (Replace with actual data)
const productPerformanceChartOptions = {
  chart: {
    type: "bar",
    id: "product-performance-chart",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar"],
  },
};
let productPerformanceChartSeries = [];

// Dummy data for Conversion Rate Chart (Replace with actual data)
const conversionRateChartOptions = {
  chart: {
    type: "line",
    id: "conversion-rate-chart",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar"],
  },
};
let conversionRateChartSeries = [];

// Dummy data for Visitors Chart (Replace with actual data)
const visitorsChartOptions = {
  chart: {
    type: "area",
    id: "visitors-chart",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar"],
  },
};
let visitorsChartSeries = [];

// Function to update charts based on selected products and dates
function updateCharts() {
  // Implement your logic to update the charts here based on selectedProducts, fromDate, and toDate
  // Example:
  // Fetch data from your backend API or update the dummy data based on selectedProducts, fromDate, and toDate
  // Update the chart series accordingly
}

// Dummy data for Sales Chart
const salesChartData = [
  {
    name: "Product 1",
    data: [100, 120, 150],
  },
  {
    name: "Product 2",
    data: [80, 110, 130],
  },
  {
    name: "Product 3",
    data: [120, 140, 160],
  },
  {
    name: "Product 4",
    data: [90, 105, 125],
  },
];

// Dummy data for Product Performance Chart
const productPerformanceChartData = [
  {
    name: "Product 1",
    data: [220, 260, 290],
  },
  {
    name: "Product 2",
    data: [180, 210, 240],
  },
  {
    name: "Product 3",
    data: [250, 280, 310],
  },
  {
    name: "Product 4",
    data: [190, 220, 250],
  },
];

// Dummy data for Conversion Rate Chart
const conversionRateChartData = [
  {
    name: "Product 1",
    data: [0.12, 0.14, 0.1],
  },
  {
    name: "Product 2",
    data: [0.09, 0.11, 0.08],
  },
  {
    name: "Product 3",
    data: [0.14, 0.16, 0.12],
  },
  {
    name: "Product 4",
    data: [0.11, 0.13, 0.09],
  },
];

// Dummy data for Visitors Chart
const visitorsChartData = [
  {
    name: "Product 1",
    data: [500, 600, 700],
  },
  {
    name: "Product 2",
    data: [400, 450, 550],
  },
  {
    name: "Product 3",
    data: [600, 700, 800],
  },
  {
    name: "Product 4",
    data: [450, 550, 650],
  },
];

// Update chart series with dummy data
salesChartSeries = salesChartData;
productPerformanceChartSeries = productPerformanceChartData;
conversionRateChartSeries = conversionRateChartData;
visitorsChartSeries = visitorsChartData;

// Watch for changes in selectedProducts, fromDate, and toDate and update the charts accordingly
watch([selectedProducts, fromDate, toDate], () => {
  updateCharts();
});

// Initial chart update
updateCharts();
</script>

