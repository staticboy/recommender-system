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
  labels: [],
  title: {
    text: "Average Ratings per Product",
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
  yaxis: [
    {
      title: {
        text: "Average Rating",
      },
    },
    {
      opposite: true,
      title: {
        text: "Rating Count",
      },
    },
  ],
});

const chartSeries = ref([
  {
    name: 'Average Rating',
    data: [],
  },
  {
    name: 'Rating Count',
    data: [],
    yAxisIndex: 1,
  },
]);

// Function to update chart data
const updateChartData = () => {
  // console.log(data)
  if (data && data.length > 0) {
    chartSeries.value[0].data = data.map((item) => item.avg_rating);
    chartSeries.value[1].data = data.map((item) => item.rating_cnt);
    chartOptions.value.xaxis.categories = data.map((item) => item.prod_name);
    // chartOptions.value.labels = data.map((item) => item.prod_id);
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
