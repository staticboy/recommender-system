<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-mb-sm flex justify-between items-center">
        <h1>Data Insights</h1>
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
          <q-btn size="md" submit class="ml-6 mb-2 mt-2" label="Export" no-caps color="primary" unelevated v-if="dataAvailable"
          @click="exportToExcel" />
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4 w-full">
      <div class="col-span-1 smol">
        <q-card class="fit" v-if="dataAvailable">
          <h6>Total Sales</h6>
          <h3>$ {{ totalSales }}</h3>
        </q-card>
      </div>
      <div class="col-span-1 smol">
        <q-card class="fit" v-if="dataAvailable">
          <h6>Number of Transactions</h6>
          <h3>{{ cntTransaction }}</h3>
        </q-card>
      </div>
      <div class="col-span-1 smol">
        <q-card class="fit" v-if="dataAvailable">
          <h6>Avg Transaction Amount</h6>
          <h3>$ {{ avgTransactionAmt }}</h3>
        </q-card>
      </div>
      <div class="col-span-1 smol" v-if="dataAvailable">
        <q-card class="fit">
          <h6>Most Popular Product(s)</h6>
          <h5>{{ topProduct }}</h5>
        </q-card>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 w-full mt-4">
      <div class="col-span-1">
        <q-card class="fit" v-if="dataAvailable">
          <SalesLineChart :data="revenueByDateData" />
        </q-card>
      </div>
      <div class="col-span-1">
        <q-card class="fit" v-if="dataAvailable">
          <ProductSalesBarChart :data="revenueByProdData" />
        </q-card>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 w-full mt-4">
      <div class="col-span-1">
        <q-card class="fit" v-if="dataAvailable">
          <AvgReviewsChart :data="avgReviews" />
        </q-card>
      </div>
      <div class="col-span-1">
        <q-card class="fit" v-if="dataAvailable">
          <h6>Product Ratings (Raw)</h6>
          <q-table :rows="rawReviews" :rows-per-page-options="[5, 10, 20, 30]" :columns="columns">
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
          </q-table>
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
import SalesLineChart from './../../components/Charts/SalesLineChart.vue';
import ProductSalesBarChart from './../../components/Charts/ProductSalesBarChart.vue';
import AvgReviewsChart from './../../components/Charts/AvgReviewsChart.vue';
import ExcelJS from 'exceljs';

const router = useRouter();
const q = useQuasar();
const revenueByDateData = ref(null);
const revenueByProdData = ref(null);
const rawTransaction = ref(null);
const avgTransactionAmt = ref(null);
const cntTransaction = ref(null);
const totalSales = ref(null);
const topProduct = ref(null);
const avgReviews = ref(null);
const rawReviews = ref(null);
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

const exportToExcel = () => {
  const workbook = new ExcelJS.Workbook();

  if (revenueByDateData.value.length > 0) {
    const ws = workbook.addWorksheet('revenue_data');
    const hdr = Object.keys(revenueByDateData.value[0]);
    ws.addRow(hdr);
    revenueByDateData.value.forEach(item => {
      const values = hdr.map(hdr => item[hdr]);
      ws.addRow(values);
    });
  }

  if (revenueByProdData.value.length > 0) {
    const ws2 = workbook.addWorksheet('revenue_prod');
    const hdr2 = Object.keys(revenueByProdData.value[0]);
    ws2.addRow(hdr2);
    revenueByProdData.value.forEach(item => {
      const values = hdr2.map(hdr => item[hdr]);
      ws2.addRow(values);
    });
  }

  if (rawTransaction.value.length > 0) {
    const ws3 = workbook.addWorksheet('revenue_raw');
    const hdr3 = Object.keys(rawTransaction.value[0]);
    ws3.addRow(hdr3);
    rawTransaction.value.forEach(item => {
      const values = hdr3.map(hdr => item[hdr]);
      ws3.addRow(values);
    });
  }

  if (avgReviews.value.length > 0) {
    const ws4 = workbook.addWorksheet('reviews_avg');
    const hdr4 = Object.keys(avgReviews.value[0]);
    ws4.addRow(hdr4);
    avgReviews.value.forEach(item => {
      const values = hdr4.map(hdr => item[hdr]);
      ws4.addRow(values);
    });
  }

  if (rawReviews.value.length > 0) {
    const ws5 = workbook.addWorksheet('reviews_raw');
    const hdr5 = Object.keys(rawReviews.value[0]);
    ws5.addRow(hdr5);
    rawReviews.value.forEach(item => {
      const values = hdr5.map(hdr => item[hdr]);
      ws5.addRow(values);
    });
  }

  workbook.xlsx.writeBuffer()
    .then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "Insights_" + localStorage.getItem("userId") + "_" + fromDate.value.from + "_" + fromDate.value.to;

      link.click();
    })
    .catch(error => {
      q.notify({
        icon: "report_problem",
        message: 'Error exporting to Excel:', error,
        color: "negative",
      });
    });
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
    var param = { "biz_id": localStorage.getItem("userId"), "start_date": fromDate.value.from, "end_date": fromDate.value.to };
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/business/getBizInsight`, param);
    console.log(response);
    if (response.data[0].biz_get_insights.revenue_by_date != null) {
      if (response.data[0].biz_get_insights.success == "true") {
        dataAvailable.value = true;
      }
      revenueByDateData.value = response.data[0].biz_get_insights.revenue_by_date
      revenueByProdData.value = response.data[0].biz_get_insights.revenue_by_product
      avgTransactionAmt.value = response.data[0].biz_get_insights.total_sales[0].avg_transaction_amount;
      cntTransaction.value = response.data[0].biz_get_insights.total_sales[0].count_transaction;
      totalSales.value = response.data[0].biz_get_insights.total_sales[0].total_revenue;
      topProduct.value = response.data[0].biz_get_insights.top_product[0].prod_list;
      avgReviews.value = response.data[0].biz_get_insights.review_avg;
      rawReviews.value = response.data[0].biz_get_insights.raw_review;
      rawTransaction.value = response.data[0].biz_get_insights.raw_transaction;
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
</script>

<style>
h6 {
  color: #000000;
  font-size: 13px;
  padding-left: 5px;
  font-weight: bolder;
}

h3,
h5 {
  color: #bb5e00;
  font-size: 40px;
  text-align: center;
}

.smol {
  height: 125px;
}
</style>


  