<template>
  <q-page>
    <div>
      <h1 class="text-2xl font-semibold mb-4">Transaction History</h1>

      <div>
        <div class="flex justify-between items-center mb-4">
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
        </div>

        <q-table :rows="updateFilteredTransactions" :rows-per-page-options="[10, 20, 30]" :columns="columns">
          <!-- Add a custom column for the button -->
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="purchase_id" :props="props">{{ props.row.purchase_id }}</q-td>
              <q-td key="user_id" :props="props">{{ props.row.user_id }}</q-td>
              <q-td key="user_name" :props="props">{{ props.row.user_name }}</q-td>
              <q-td key="total_quantity" :props="props">{{ calculateTotalQuantity(props.row.prod_quantity) }}</q-td>
              <q-td key="total_amount" :props="props">{{ props.row.total_amount }}</q-td>
              <q-td key="purchase_date" :props="props">{{ props.row.purchase_date }}</q-td>
              <q-td auto-width key="action" :props="props">
                <q-btn type="button" color="primary" label="View" @click="viewItemsInTransaction(props.row)" dense />
              </q-td>
            </q-tr>
          </template>

        </q-table>
      </div>

      <!-- Modal for Transaction Details -->
      <div class="fixed inset-0 flex items-center justify-center z-50" v-if="selectedTransaction">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="bg-white p-4 rounded-md shadow-lg z-10">
          <div class="flex flex-container">
            <div class="col flex-start">
              <h2 class="text-xl font-semibold mb-2">Transaction Details</h2>
              <p>Transaction ID: {{ selectedTransaction.id }}</p>
              <h3 class="text-lg font-semibold mb-2">Statement Date: {{ selectedTransaction.statementDate }}</h3>
            </div>
            <div>
              <q-btn class="mb-4" type="button" color="primary" label="Close" @click="resetSteps" dense />
            </div>
          </div>
          <q-table :rows="selectedTransaction.settlementBreakdown" :rows-per-page-options="[10, 20, 30]">
            <!-- Add a custom column for the button -->
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="biz_id" :props="props">{{ props.row.biz_id }}</q-td>
                <q-td key="prod_id" :props="props">{{ prodNameMapper(props.row.prod_id) }}</q-td>
                <q-td key="quantity" :props="props">{{ props.row.quantity }}</q-td>
                <q-td key="prod_price" :props="props"> ${{ props.row.prod_price }}</q-td>

              </q-tr>
            </template>

          </q-table>
          <h3 class="text-lg font-semibold mt-4 mb-2" style="text-align: right;">Total Price: {{
            selectedTransaction.totalAmount }}</h3>
        </div>
      </div>

    </div>
  </q-page>
</template>
  
<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useStore } from './../../stores';


const store = useStore();
const { selectedBizId } = store.adm;
const router = useRouter(); // Create a router instance
const selectedTransaction = ref(null);
const fromDate = ref('');
const toDate = ref('');
const products = ref([]);


const transactions = ref([]);

function resetSteps() {
  selectedTransaction.value = null;
};

//filters prodid then map result to retrieve the values
const prodNameMapper = (product_id) => {

  let k = products.value.filter(x => x.prod_id === product_id);
  let product_name = k.map(item => item.prod_name);
  console.log(product_name[0]);
  return product_name[0];
};

const columns = computed(() => [
  {
    name: 'purchase_id',
    required: true,
    label: 'Purchase ID',
    align: 'left',
    field: 'purchase_id',
    sortable: true,
  },
  {
    name: 'user_id',
    label: 'User ID',
    align: 'left',
    field: 'user_id',
    sortable: true,
  },
  {
    name: 'user_name',
    label: 'User Name',
    align: 'left',
    field: 'user_name',
    sortable: true,
  },
  {
    name: 'total_quantity',
    label: 'Total Quantity',
    align: 'left',
    field: 'total_quantity',
    sortable: true,
  },
  {
    name: 'total_amount',
    label: 'Total Amount',
    align: 'left',
    field: 'total_amount',
    sortable: true,
  },
  {
    name: 'purchase_date',
    label: 'Purchase Date',
    align: 'left',
    field: 'purchase_date',
    sortable: true,
  },
  {
    name: 'action',
    label: '',
    align: 'right',
    field: '',
    sortable: false,
  },
]);

const updateFilteredTransactions = computed(() => {
  return transactions.value.filter((t) => {
    return (
      // (!transactions.value || t.prod_name.toLowerCase().includes(transactions.value.toLowerCase() ))
      transactions.value
    );
  });
});

function calculateTotalQuantity(prodQuantity) {
  return prodQuantity.reduce((total, item) => total + item.quantity, 0);
}

const viewItemsInTransaction = (transaction) => {
  console.log("run View Items")
  console.log(transaction.total_amount)
  selectedTransaction.value = {
    id: transaction.purchase_id,
    statementDate: transaction.purchase_date,
    settlementBreakdown: transaction.prod_quantity,
    totalAmount: transaction.total_amount
  }

  // selectedTransaction.value.settlementBreakdown.price[0] = 100

  console.log(selectedTransaction.value);
};

watch(updateFilteredTransactions);

//API Fetch transaction list
const fetchBizData = async () => {
  try {
    var param = { "biz_id": localStorage.getItem("userId") };
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/business/bizGetTxn`, param);
    console.log(response);
    if (response.statusText === "OK") {
      transactions.value = response.data;
      console.log(transactions.value);
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

//API Fetch product list
const fetchProdData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/getAll`);
    console.log(response);
    if (response.statusText === "OK") {
      console.log(response.data);
      products.value = response.data;
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

onMounted(async () => {
  console.log(store.adm);
  console.log(localStorage.getItem("userId"))
  await fetchProdData();
  await fetchBizData();
});

</script>
  
<style scoped>
/* Add your component-specific styles here */
.bg-blue-500 {
  background-color: #3490dc;
}

.text-white {
  color: #fff;
}

.hover\:bg-blue-600:hover {
  background-color: #2779bd;
}

.border {
  border: 1px solid #e5e7eb;
}
</style>
  