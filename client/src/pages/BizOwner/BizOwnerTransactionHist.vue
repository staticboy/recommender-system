<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Transaction History</h1>

    <div>
      <div class="">
        <div class="mb-4">
          <label for="fromDate">From Date:</label>
          <input type="date" id="fromDate" v-model="fromDate"
            class="w-full px-3 py-2 rounded-md border border-gray-300" />
        </div>
        <div class="mb-4">
          <label for="toDate">To Date:</label>
          <input type="date" id="toDate" v-model="toDate" class="w-full px-3 py-2 rounded-md border border-gray-300" />
        </div>
      </div>

      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Filtered Transaction History</h2>
        <table class="min-w-full table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2">Purchase ID</th>
              <th class="px-4 py-2">Customer ID</th>
              <th class="px-4 py-2">Customer Name</th>
              <th class="px-4 py-2">Customer Name</th>
              <th class="px-4 py-2">Purchase Date</th>

              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in filteredTransactions" :key="transaction.purchase_id">
              <td class="border px-4 py-2">{{ transaction.purchase_id }}</td>
              <td class="border px-4 py-2">{{ transaction.user_id }}</td>
              <td class="border px-4 py-2">{{ transaction.user_name }}</td>
              <td class="border px-4 py-2">{{ transaction.total_amount }}</td>
              <td class="border px-4 py-2">{{ transaction.purchase_date }}</td>

              <td class="border px-4 py-2">
                <button @click="viewItemsInTransaction(transaction)"
                  class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  View Items
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for Transaction Details -->
    <div class="fixed inset-0 flex items-center justify-center z-50" v-if="selectedTransaction">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="bg-white p-4 rounded-md shadow-lg z-10">
        <h2 class="text-xl font-semibold mb-2">Transaction Details</h2>
        <p>Transaction ID: {{ selectedTransaction.id }}</p>
        <button @click="resetSteps" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Close
        </button>
        <table class="w-full mt-4">
          <thead>
            <tr>
              <th class="px-4 py-2">Statement Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">{{ selectedTransaction.statementDate }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Settlement Breakdown Table -->
        <table class="w-full mt-4">
          <thead>
            <tr>
              
              <th class="px-4 py-2">Product ID</th>
              <th class="px-4 py-2">Product Name</th>
              <th class="px-4 py-2">Quantity</th>
             
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in selectedTransaction.settlementBreakdown" :key="order.id">
              
              <td class="border px-4 py-2">{{ order.prod_id }}</td>
              <td class="border px-4 py-2">{{  prodNameMapper(order.prod_id) }}</td>
              <td class="border px-4 py-2">{{ order.quantity }}</td>
             
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
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


const transactions = ref([
  {
    id: 1,
    date: '2023-09-01',
    customer: 'John Doe',
    amount: 100.0,
  },
  {
    id: 2,
    date: '2023-09-02',
    customer: 'Jane Smith',
    amount: 75.5,
  },
  {
    id: 3,
    date: '2023-09-03',
    customer: 'Bob Johnson',
    amount: 50.0,
  }
]);

function resetSteps() {
  selectedTransaction.value = null;
};

const filteredTransactions = computed(() => {
  // Filter transactions based on fromDate and toDate
  return transactions.value.filter((transaction) => {
    return (
      (!fromDate.value || transaction.date >= fromDate.value) &&
      (!toDate.value || transaction.date <= toDate.value)
    );
  });
});

//filters prodid then map result to retrieve the values
const prodNameMapper = (product_id) => {
  
  let k = products.value.filter(x => x.prod_id === product_id);
  let product_name = k.map(item => item.prod_name);
  console.log(product_name[0]);
  return product_name[0];
};

const updateFilteredTransactions = () => {
  // This function is called whenever fromDate or toDate changes
  // Fetch data from an API here
};

const viewItemsInTransaction = (transaction) => {
  selectedTransaction.value = {
    id: transaction.purchase_id,
    statementDate: transaction.purchase_date,
    settlementBreakdown: transaction.prod_quantity,
  }
  };

  watch([fromDate, toDate], updateFilteredTransactions);



//API Fetch transaction list
const fetchBizData = async () => {
  try {
    var param = {"biz_id" : localStorage.getItem("userId")};
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
  