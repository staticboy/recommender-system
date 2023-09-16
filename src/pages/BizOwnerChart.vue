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
npm install vue3-apexcharts apexcharts-->

<template>
  <div class="p-4 space-y-4">
    <h1 class="text-2xl font-semibold">Product Data Report</h1>

    <!-- Product Selection -->
    <div>
      <label v-for="product in availableProducts" :key="product">
        <input type="checkbox" v-model="selectedProducts" :value="product" @change="updateCharts" />
        {{ product }}
      </label>
    </div>

    <!-- Display Report with Charts -->
    <div class="flex-container">
      <div>
        <!-- Sales Chart -->
        <div v-if="selectedProducts.length > 0">
          <h2>Sales Chart</h2>
          <apexchart :options="salesChartOptions" :series="salesChartSeries"></apexchart>
        </div>
      </div>

      <!-- Product Performance Chart -->
      <div>
        <div v-if="selectedProducts.length > 0">
          <h2>Product Performance Chart</h2>
          <apexchart :options="productPerformanceChartOptions" :series="productPerformanceChartSeries"></apexchart>
        </div>
      </div>

      <!-- Customer Segmentation Chart -->
      <div>
        <div v-if="selectedProducts.length > 0">
          <h2>Customer Segmentation Chart</h2>
          <apexchart :options="customerSegmentationChartOptions" :series="customerSegmentationChartSeries"></apexchart>
        </div>
      </div>

      <!-- Channel Performance Chart -->
      <div>
        <div v-if="selectedProducts.length > 0">
          <h2>Channel Performance Chart</h2>
          <apexchart :options="channelPerformanceChartOptions" :series="channelPerformanceChartSeries"></apexchart>
        </div>
      </div>

      <!-- ROI Chart -->
      <div>
        <div v-if="selectedProducts.length > 0">
          <h2>ROI Chart</h2>
          <apexchart :options="roiChartOptions" :series="roiChartSeries"></apexchart>
        </div>
      </div>

      <!-- Inventory Turnover Chart -->
      <div>
        <div v-if="selectedProducts.length > 0">
          <h2>Inventory Turnover Chart</h2>
          <apexchart :options="inventoryTurnoverChartOptions" :series="inventoryTurnoverChartSeries"></apexchart>
        </div>
      </div>

      <!-- Customer Churn Chart -->
      <div>
        <div v-if="selectedProducts.length > 0">
          <h2>Customer Churn Chart</h2>
          <apexchart :options="customerChurnChartOptions" :series="customerChurnChartSeries"></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      availableProducts: ["Product 1", "Product 2", "Product 3", "Product 4"], // Example product list
      selectedProducts: [], // User-selected products to display in the chart

      // Dummy data for Sales Chart (Replace with actual data)
      salesChartOptions: {
        chart: {
          type: "line",
          id: "sales-chart",
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar"],
        },
      },
      salesChartSeries: [],

      // Dummy data for Product Performance Chart (Replace with actual data)
      productPerformanceChartOptions: {
        chart: {
          type: "bar",
          id: "product-performance-chart",
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar"],
        },
      },
      productPerformanceChartSeries: [],

      // Dummy data for Customer Segmentation Chart (Replace with actual data)
      customerSegmentationChartOptions: {
        chart: {
          type: "bar",
          id: "customer-segmentation-chart",
        },
        labels: ["Segment 1", "Segment 2", "Segment 3"],
      },
      customerSegmentationChartSeries: [],

      // Dummy data for Channel Performance Chart (Replace with actual data)
      channelPerformanceChartOptions: {
        chart: {
          type: "bar",
          id: "channel-performance-chart",
        },
        xaxis: {
          categories: ["Online", "Offline", "Social Media"],
        },
      },
      channelPerformanceChartSeries: [],

      // Dummy data for ROI Chart (Replace with actual data)
      roiChartOptions: {
        chart: {
          type: "line",
          id: "roi-chart",
        },
        xaxis: {
          categories: ["Campaign 1", "Campaign 2", "Campaign 3"],
        },
      },
      roiChartSeries: [],

      // Dummy data for Inventory Turnover Chart (Replace with actual data)
      inventoryTurnoverChartOptions: {
        chart: {
          type: "bar",
          id: "inventory-turnover-chart",
        },
        xaxis: {
          categories: ["Product 1", "Product 2", "Product 3"],
        },
      },
      inventoryTurnoverChartSeries: [],

      // Dummy data for Customer Churn Chart (Replace with actual data)
      customerChurnChartOptions: {
        chart: {
          type: "line",
          id: "customer-churn-chart",
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar"],
        },
      },
      customerChurnChartSeries: [],
    };
  },
  methods: {
    updateCharts() {
      // Filter selected products and update the charts' data
      this.salesChartSeries = this.selectedProducts.map((selectedProduct) => ({
        name: selectedProduct,
        data: this.getDummySalesData(selectedProduct), // Replace with actual data
      }));

      this.productPerformanceChartSeries = this.selectedProducts.map((selectedProduct) => ({
        name: selectedProduct,
        data: this.getDummyProductPerformanceData(selectedProduct), // Replace with actual data
      }));

      this.customerSegmentationChartSeries = this.selectedProducts.map((selectedProduct) => ({
        name: selectedProduct,
        data: this.getDummycustomerSegmentationData(selectedProduct), // Replace with actual data
      }));

      this.channelPerformanceChartSeries = this.selectedProducts.map((selectedProduct) => ({
        name: selectedProduct,
        data: this.getDummyChannelPerformanceData(selectedProduct), // Replace with actual data
      }));

      this.roiChartSeries = this.selectedProducts.map((selectedProduct) => ({
        name: selectedProduct,
        data: this.getDummyRoiData(selectedProduct), // Replace with actual data
      }));

      this.inventoryTurnoverChartSeries = this.selectedProducts.map((selectedProduct) => ({
        name: selectedProduct,
        data: this.getDummyInventoryTurnoverData(selectedProduct), // Replace with actual data
      }));

      this.customerChurnChartSeries = this.selectedProducts.map((selectedProduct) => ({
        name: selectedProduct,
        data: this.getDummyCustomerChurnData(selectedProduct), // Replace with actual data
      }));
    },

    // Replace the following dummy data functions with your actual data retrieval logic
    getDummySalesData(product) {
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
    },
    getDummyProductPerformanceData(product) {
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
    },
    getDummycustomerSegmentationData(product) {//
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
    },
    getDummyChannelPerformanceData(product) {
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
    },
    getDummyRoiData(product) {
      // Dummy ROI data for a product
      if (product === "Product 1") {
        return [0.12, 0.14, 0.10];
      } else if (product === "Product 2") {
        return [0.09, 0.11, 0.08];
      } else if (product === "Product 3") {
        return [0.14, 0.16, 0.12];
      } else if (product === "Product 4") {
        return [0.11, 0.13, 0.09];
      }
      // Add more products as needed
    },
    getDummyInventoryTurnoverData(product) {
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
    },
    getDummyCustomerChurnData(product) {
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
    },
    // Define similar functions for other chart data
  },
};
</script>
