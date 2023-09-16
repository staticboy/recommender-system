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
        <input
          type="checkbox"
          v-model="selectedProducts"
          :value="product"
          @change="updateCharts"
        />
        {{ product }}
      </label>
    </div>

    <!-- Display Report with Charts -->
    <div>
      <!-- Sales Chart -->
      <apexchart
        v-if="selectedProducts.length > 0 && salesChartOptions"
        :options="salesChartOptions"
        :series="salesChartSeries"
      ></apexchart>
    </div>

    <!-- Product Performance Chart -->
    <div>
      <apexchart
        v-if="selectedProducts.length > 0 && productPerformanceChartOptions"
        :options="productPerformanceChartOptions"
        :series="productPerformanceChartSeries"
      ></apexchart>
    </div>

    <!-- Customer Segmentation Chart -->
    <div>
      <apexchart
        v-if="selectedProducts.length > 0 && customerSegmentationChartOptions"
        :options="customerSegmentationChartOptions"
        :series="customerSegmentationChartSeries"
      ></apexchart>
    </div>

    <!-- Channel Performance Chart -->
    <div>
      <apexchart
        v-if="selectedProducts.length > 0 && channelPerformanceChartOptions"
        :options="channelPerformanceChartOptions"
        :series="channelPerformanceChartSeries"
      ></apexchart>
    </div>

    <!-- ROI Chart -->
    <div>
      <apexchart
        v-if="selectedProducts.length > 0 && roiChartOptions"
        :options="roiChartOptions"
        :series="roiChartSeries"
      ></apexchart>
    </div>

    <!-- Inventory Turnover Chart -->
    <div>
      <apexchart
        v-if="selectedProducts.length > 0 && inventoryTurnoverChartOptions"
        :options="inventoryTurnoverChartOptions"
        :series="inventoryTurnoverChartSeries"
      ></apexchart>
    </div>

    <!-- Customer Churn Chart -->
    <div>
      <apexchart
        v-if="selectedProducts.length > 0 && customerChurnChartOptions"
        :options="customerChurnChartOptions"
        :series="customerChurnChartSeries"
      ></apexchart>
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
          type: "pie",
          id: "customer-segmentation-chart",
        },
        labels: ["Segment 1", "Segment 2", "Segment 3"],
      },
      customerSegmentationChartSeries: [],

      // Dummy data for Channel Performance Chart (Replace with actual data)
      channelPerformanceChartOptions: {
        chart: {
          type: "column",
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

      // Dummy data for Customer Segmentation Chart
      this.customerSegmentationChartSeries = [40, 25, 35];

      // Dummy data for Channel Performance Chart
      this.channelPerformanceChartSeries = [60, 30, 50];

      // Dummy data for ROI Chart
      this.roiChartSeries = [0.1, 0.15, 0.12];

      // Dummy data for Inventory Turnover Chart
      this.inventoryTurnoverChartSeries = [4, 5, 3];

      // Dummy data for Customer Churn Chart
      this.customerChurnChartSeries = [10, 15, 12];
    },

    // Replace the following dummy data functions with your actual data retrieval logic
    getDummySalesData(product) {
      // Dummy sales data for a product
      return [100, 120, 150];
    },
    getDummyProductPerformanceData(product) {
      // Dummy product performance data for a product
      return [200, 250, 280];
    },
    // Define similar functions for other chart data
  },
};
</script>




