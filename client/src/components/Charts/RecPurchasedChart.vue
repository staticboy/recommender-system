<template>
  <div>
    <VueApexCharts
      type="donut"
      height="250"
      :options="chartOptions"
      :series="chartSeries"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, watchEffect } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

// Define props
const { data } = defineProps(['data']);

// Chart options and series
const chartOptions = ref({
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
      },
    },
  },
  colors: ['#FCA020', '#F5E3C7'],
});

const chartSeries = ref([
]);

// Function to update chart data
const updateChartData = () => {
  console.log(data)
  if (data) {
    chartSeries.value = data;
  }
};

// Watch for changes in data and update the chart
watch(data, updateChartData);

// Lifecycle hook to initially update the chart data
onMounted(() => {
  updateChartData();
});

watchEffect(() => {
  if (data) {
    // console.log(data)
    updateChartData();
  }
});

</script>

<script>
export default {
  components: {
    apexchart: VueApexCharts,
  },
};
</script>
