<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-mb-sm flex justify-between items-center">
        <h1>Performance Monitor</h1>
      </div>
      <div class="flex justify-between items-center">
        <q-btn icon="event" round color="primary">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="fromDate" range>
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancel" color="primary" flat v-close-popup />
                <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>
        <q-badge color="teal" class="ml-6" v-if="dateAvailable">
          Date range: {{ fromDate.from }} - {{ fromDate.to }}
        </q-badge>
        <q-btn size="md" submit class="ml-6 mb-2 mt-2" label="Generate" no-caps color="primary" unelevated
          @click="onGenerate" />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4 w-full">
      <div class="col-span-1 smol">
        <q-card class="fit" v-if="dataAvailable">
          <div class="mid-icon">
            <q-icon name="style" color="teal" size="175px" />
          </div>
          <h3>{{ totalRecos }}</h3>
          <h6>recommendations</h6>
          <h6>for <h3>{{ activeUsers }}</h3> Active Members</h6>
        </q-card>
      </div>
      <div class="col-span-1 smol">
        <q-card class="fit" v-if="dataAvailable">
          <RecViewedChart :data="viewedSeries" />
          <h3>{{ recoViewed }}</h3>
          <h6>views from recommendations</h6>
          <h3>{{ (recoViewed / totalViewed * 100).toFixed(1) }}%</h3>
          <h6>from all {{ totalViewed }} views</h6>
        </q-card>
      </div>
      <div class="col-span-1 smol">
        <q-card class="fit" v-if="dataAvailable">
          <RecPurchasedChart :data="purchaseSeries" />
          <h3>{{ recoPurchased }}</h3>
          <h6>purchases from recommendations</h6>
          <h3>{{ (recoPurchased / totalPurchases * 100).toFixed(1) }}%</h3>
          <h6>from all {{ totalPurchases }} purchases</h6>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { date, useQuasar } from "quasar";
import axios from 'axios';
import { useStore } from './../../stores';
import RecPurchasedChart from './../../components/Charts/RecPurchasedChart.vue';
import RecViewedChart from './../../components/Charts/RecViewedChart.vue';
import SalesLineChart from './../../components/Charts/SalesLineChart.vue';
import ProductSalesBarChart from './../../components/Charts/ProductSalesBarChart.vue';
import AvgReviewsChart from './../../components/Charts/AvgReviewsChart.vue';

const router = useRouter();
const q = useQuasar();
const activeUsers = ref(null);
const totalRecos = ref(null);
const totalPurchases = ref(null);
const recoPurchased = ref(null);
const purchaseSeries = ref([]);
const recoViewed = ref(null);
const totalViewed = ref(null);
const viewedSeries = ref([]);


const dataAvailable = ref(false);
const dateAvailable = ref(false);
const fromDate = ref('');

const columns = computed(() => [
  {
    name: 'prod_id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'prod_id',
    sortable: true,
  },
  {
    name: 'prod_name',
    required: true,
    label: 'Product Name',
    align: 'left',
    field: 'prod_name',
    sortable: true,
  },
  {
    name: 'rating',
    label: 'Rating',
    align: 'left',
    field: 'rating',
    sortable: true,
  },
  {
    name: 'remarks',
    label: 'Remarks',
    align: 'left',
    field: 'remarks',
    sortable: true,
  },
]);

const save = () => {
  dateAvailable.value = true;
  date.value = fromDate.value;
};

// Generate button click handler
const onGenerate = async () => {
  q.loading.show();
  await getInsight();
  q.loading.hide();
};

// Fetch
const getInsight = async () => {
  try {
    if (fromDate.value == "") {
      q.notify({
        icon: "report_problem",
        message: "No date range picked",
        color: "negative",
      });
      return
    }
    var param = { "start_date": fromDate.value.from, "end_date": fromDate.value.to };
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/business/getPerformance`, param);
    console.log(response);
    if (response.data[0].admin_performance.recommended_count[0].rec_count != null) {
      if (response.data[0].admin_performance.success == "true") {
        dataAvailable.value = true;
      }
      totalRecos.value = response.data[0].admin_performance.recommended_count[0].rec_count;
      activeUsers.value = response.data[0].admin_performance.active_user_count[0].user_count;
      recoPurchased.value = response.data[0].admin_performance.recommended_purchased_count[0].rec_p_count;
      totalPurchases.value = response.data[0].admin_performance.total_purchased[0].p_count;
      recoViewed.value = response.data[0].admin_performance.recommended_view_count[0].rec_v_count;
      totalViewed.value = response.data[0].admin_performance.total_viewed[0].v_count;

    }
    else {
      q.notify({
        icon: "report_problem",
        message: "No data found",
        color: "negative",
      });
    }
  } catch (error) {
    console.error('Error while retrieving insights data:', error);
  }
};

watch([recoPurchased, totalPurchases], () => {
  if (recoPurchased.value !== null && totalPurchases.value !== null) {
    purchaseSeries.value = [
      recoPurchased.value,
      totalPurchases.value - recoPurchased.value,
    ];
  }
  // console.log(purchaseSeries)
});

watch([recoViewed, totalViewed], () => {
  if (recoViewed.value !== null && totalViewed.value !== null) {
    viewedSeries.value = [
      recoViewed.value,
      totalViewed.value - recoViewed.value,
    ];
  }
  // console.log(purchaseSeries)
});
</script>

<style>
h6 {
  color: #6a6969;
  font-size: 15px;
  padding-left: 5px;
  text-align: center;
}

h3,
h5 {
  color: #1e1e1f;
  font-size: 40px;
  text-align: center;
}

.smol {
  height: 400px;
}

.mid-icon {
  padding: 10px;
  text-align: center;
}
</style>


  