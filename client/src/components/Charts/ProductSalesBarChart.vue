<template>
  <div>
    <VueApexCharts
      type="bar"
      height="300"
      :options="chartOptions"
      :series="chartSeries"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

// Define props
const { data } = defineProps(['data']);

// Chart options and series
const chartOptions = ref({
  xaxis: {
    categories: [],
  },
  title: {
    text: "Sales per Product",
  },
  responsive: [
    {
      breakpoint: 1000,
      options: {
        chart: {
          width: '100%',
        },
      },
    },
  ],
});

const chartSeries = ref([
  {
    name: 'Total Revenue',
    data: [],
  },
]);

// Function to update chart data
const updateChartData = () => {
  // console.log(data)
  if (data && data.length > 0) {
    chartSeries.value[0].data = data.map((item) => item.total_revenue);
    chartOptions.value.xaxis.categories = data.map((item) => item.prod_info);
  }
};

// Watch for changes in data and update the chart
watch(data, updateChartData);

// Lifecycle hook to initially update the chart data
onMounted(() => {
  updateChartData();
});
</script>

<script>
export default {
  components: {
    apexchart: VueApexCharts,
  },
};
</script>
