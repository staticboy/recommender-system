<!-- BizOwnerChart.vue 
Analytics charts that could create using Vue and Tailwind CSS:
Sales chart: This chart would show the sales of different products over time.
Product performance chart: This chart would show the performance of different products over time, such as sales, revenue, and conversion rate.
Customer segmentation chart: This chart would show how customers are segmented based on their demographics, behavior, and other factors.
Channel performance chart: This chart would show the performance of different sales channels, such as online, offline, and social media.
Return on investment (ROI) chart: This chart would show the ROI of different marketing campaigns and initiatives.
Inventory turnover chart: This chart would show how quickly inventory is turning over.
Customer churn chart: This chart would show the rate at which customers are churning, or leaving your business.
-->
<!--npm install vue-chart-3 chart.js
npm install vue3-VueApexChartss VueApexChartss-->

<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold">Product Data Report</h1>

    <!-- Home Button -->
    <button
      @click="goToHome"
      class="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      Home
    </button>

    <!-- Product Selection -->
    <div class="mb-4">
      <label v-for="product in availableProducts" :key="product">
        <input
          type="checkbox"
          v-model="selectedProducts"
          :value="product"
          @click="updateCharts(product)"
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
          >
          </VueApexCharts>
        </div>

        <!-- Customer Segmentation Chart -->
        <div
          v-if="selectedProducts.length > 0"
          class="w-full md:w-1/2 lg:w-1/3 p-4"
        >
          <p>Customer Segmentation Chart</p>
          <VueApexCharts
            :options="customerSegmentationChartOptions"
            :series="customerSegmentationChartSeries"
          >
          </VueApexCharts>
        </div>

        <!-- Channel Performance Chart -->
        <div
          v-if="selectedProducts.length > 0"
          class="w-full md:w-1/2 lg:w-1/3 p-4"
        >
          <p>Channel Performance Chart</p>
          <VueApexCharts
            :options="channelPerformanceChartOptions"
            :series="channelPerformanceChartSeries"
          >
          </VueApexCharts>
        </div>

        <!-- ROI Chart -->
        <div
          v-if="selectedProducts.length > 0"
          class="w-full md:w-1/2 lg:w-1/3 p-4"
        >
          <p>ROI Chart</p>
          <VueApexCharts
            :options="roiChartOptions"
            :series="roiChartSeries"
          ></VueApexCharts>
        </div>

        <!-- Inventory Turnover Chart -->
        <div
          v-if="selectedProducts.length > 0"
          class="w-full md:w-1/2 lg:w-1/3 p-4"
        >
          <p>Inventory Turnover Chart</p>
          <VueApexCharts
            :options="inventoryTurnoverChartOptions"
            :series="inventoryTurnoverChartSeries"
          ></VueApexCharts>
        </div>

        <!-- Customer Churn Chart -->
        <div
          v-if="selectedProducts.length > 0"
          class="w-full md:w-1/2 lg:w-1/3 p-4"
        >
          <p>Customer Churn Chart</p>
          <VueApexCharts
            :options="customerChurnChartOptions"
            :series="customerChurnChartSeries"
          ></VueApexCharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueApexCharts from "vue3-apexcharts";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

let availableProducts = ["Product 1", "Product 2", "Product 3", "Product 4"]; // Example product list
const selectedProducts = ref([]); // User-selected products to display in the chart

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

// Dummy data for Customer Segmentation Chart (Replace with actual data)
const customerSegmentationChartOptions = {
  chart: {
    type: "bar",
    id: "customer-segmentation-chart",
  },
  labels: ["Segment 1", "Segment 2", "Segment 3"],
};
let customerSegmentationChartSeries = [];

// Dummy data for Channel Performance Chart (Replace with actual data)
const channelPerformanceChartOptions = {
  chart: {
    type: "bar",
    id: "channel-performance-chart",
  },
  xaxis: {
    categories: ["Online", "Offline", "Social Media"],
  },
};
let channelPerformanceChartSeries = [];

// Dummy data for ROI Chart (Replace with actual data)
const roiChartOptions = {
  chart: {
    type: "line",
    id: "roi-chart",
  },
  xaxis: {
    categories: ["Campaign 1", "Campaign 2", "Campaign 3"],
  },
};
let roiChartSeries = [];

// Dummy data for Inventory Turnover Chart (Replace with actual data)
const inventoryTurnoverChartOptions = {
  chart: {
    type: "bar",
    id: "inventory-turnover-chart",
  },
  xaxis: {
    categories: ["Product 1", "Product 2", "Product 3"],
  },
};
let inventoryTurnoverChartSeries = [];

// Dummy data for Customer Churn Chart (Replace with actual data)
const customerChurnChartOptions = {
  chart: {
    type: "line",
    id: "customer-churn-chart",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar"],
  },
};
let customerChurnChartSeries = [];

function updateCharts(product) {
  if (selectedProducts.value.includes(product)) {
    selectedProducts.value.splice(selectedProducts.value.indexOf(product), 1);
  } else {
    selectedProducts.value.push(product);
  }
  // Filter selected products and update the charts' data
  salesChartSeries = selectedProducts.value.map((selectedProduct) => ({
    name: selectedProduct,
    data: getDummySalesData(selectedProduct), // Replace with actual data
  }));

  productPerformanceChartSeries = selectedProducts.value.map((selectedProduct) => ({
    name: selectedProduct,
    data: getDummyProductPerformanceData(selectedProduct), // Replace with actual data
  }));

  customerSegmentationChartSeries = selectedProducts.value.map((selectedProduct) => ({
    name: selectedProduct,
    data: getDummycustomerSegmentationData(selectedProduct), // Replace with actual data
  }));

  channelPerformanceChartSeries = selectedProducts.value.map((selectedProduct) => ({
    name: selectedProduct,
    data: getDummyChannelPerformanceData(selectedProduct), // Replace with actual data
  }));

  roiChartSeries = selectedProducts.value.map((selectedProduct) => ({
    name: selectedProduct,
    data: getDummyRoiData(selectedProduct), // Replace with actual data
  }));

  inventoryTurnoverChartSeries = selectedProducts.value.map((selectedProduct) => ({
    name: selectedProduct,
    data: getDummyInventoryTurnoverData(selectedProduct), // Replace with actual data
  }));

  customerChurnChartSeries = selectedProducts.value.map((selectedProduct) => ({
    name: selectedProduct,
    data: getDummyCustomerChurnData(selectedProduct), // Replace with actual data
  }));
}
// Replace the following dummy data functions with your actual data retrieval logic
function getDummySalesData(product) {
  // Dummy sales data for different products
  if (product === "Product 1") {
    return [100, 120, 150];
  } else if (product === "Product 2") {
    return [80, 110, 130];
  } else if (product === "Product 3") {
    return [120, 140, 160];
  } else if (product === "Product 4") {
    return [90, 105, 125];
  }
  // You can add more conditions for other products if needed
}
function getDummyProductPerformanceData(product) {
  // Dummy product performance data for a product
  if (product === "Product 1") {
    return [220, 260, 290];
  } else if (product === "Product 2") {
    return [180, 210, 240];
  } else if (product === "Product 3") {
    return [250, 280, 310];
  } else if (product === "Product 4") {
    return [190, 220, 250];
  }
  // Add more products as needed
}
function getDummycustomerSegmentationData(product) {
  //
  // Dummy customer Segmentation data for a product
  if (product === "Product 1") {
    return [220, 260, 290];
  } else if (product === "Product 2") {
    return [180, 210, 240];
  } else if (product === "Product 3") {
    return [250, 280, 310];
  } else if (product === "Product 4") {
    return [190, 220, 250];
  }
}
function getDummyChannelPerformanceData(product) {
  // Dummy channel performance data for a product
  if (product === "Product 1") {
    return [70, 40, 60];
  } else if (product === "Product 2") {
    return [50, 25, 45];
  } else if (product === "Product 3") {
    return [65, 35, 55];
  } else if (product === "Product 4") {
    return [75, 45, 65];
  }
  // Add more products as needed
}
function getDummyRoiData(product) {
  // Dummy ROI data for a product
  if (product === "Product 1") {
    return [0.12, 0.14, 0.1];
  } else if (product === "Product 2") {
    return [0.09, 0.11, 0.08];
  } else if (product === "Product 3") {
    return [0.14, 0.16, 0.12];
  } else if (product === "Product 4") {
    return [0.11, 0.13, 0.09];
  }
  // Add more products as needed
}
function getDummyInventoryTurnoverData(product) {
  // Dummy inventory turnover data for a product
  if (product === "Product 1") {
    return [5, 6, 4];
  } else if (product === "Product 2") {
    return [4, 5, 3];
  } else if (product === "Product 3") {
    return [6, 7, 5];
  } else if (product === "Product 4") {
    return [4, 5, 3];
  }
  // Add more products as needed
}
function getDummyCustomerChurnData(product) {
  // Dummy customer churn data for a product
  if (product === "Product 1") {
    return [12, 14, 10];
  } else if (product === "Product 2") {
    return [9, 11, 8];
  } else if (product === "Product 3") {
    return [15, 17, 12];
  } else if (product === "Product 4") {
    return [11, 13, 9];
  }
  // Add more products as needed
}
function goToHome() {
  router.push('/biz/home');
}
</script>

