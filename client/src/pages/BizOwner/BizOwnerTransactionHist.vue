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
              <th class="px-4 py-2">Date</th>
              <th class="px-4 py-2">Customer</th>
              <th class="px-4 py-2">Amount</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in filteredTransactions" :key="transaction.id">
              <td class="border px-4 py-2">{{ transaction.date }}</td>
              <td class="border px-4 py-2">{{ transaction.customer }}</td>
              <td class="border px-4 py-2">{{ transaction.amount }}</td>
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
              <th class="px-4 py-2">Order ID</th>
              <th class="px-4 py-2">Order Date</th>
              <th class="px-4 py-2">Settlement Amount</th>
              <th class="px-4 py-2">Revenue</th>
              <th class="px-4 py-2">Fees</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in selectedTransaction.settlementBreakdown" :key="order.id">
              <td class="border px-4 py-2">{{ order.orderId }}</td>
              <td class="border px-4 py-2">{{ order.orderDate }}</td>
              <td class="border px-4 py-2">{{ order.settlementAmount }}</td>
              <td class="border px-4 py-2">{{ order.revenue }}</td>
              <td class="border px-4 py-2">{{ order.fees }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter(); // Create a router instance
const selectedTransaction = ref(null);
const fromDate = ref('');
const toDate = ref('');
const transactions = [
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
];

function resetSteps() {
  selectedTransaction.value = null;
};

const filteredTransactions = computed(() => {
  // Filter transactions based on fromDate and toDate
  return transactions.filter((transaction) => {
    return (
      (!fromDate.value || transaction.date >= fromDate.value) &&
      (!toDate.value || transaction.date <= toDate.value)
    );
  });
});

const updateFilteredTransactions = () => {
  // This function is called whenever fromDate or toDate changes
  // Fetch data from an API here
};

const viewItemsInTransaction = (transaction) => {
  selectedTransaction.value = {
    id: 1,
    statementDate: '2023-09-15',
    settlementBreakdown: [
      {
        id: 1,
        orderId: 'ABC123',
        orderDate: '2023-09-10',
        settlementAmount: 1000,
        revenue: 900,
        fees: 100,
      },
      {
        id: 2,
        orderId: 'DEF456',
        orderDate: '2023-09-12',
        settlementAmount: 1500,
        revenue: 1400,
        fees: 100,
      },
    ],
  }
  };

  watch([fromDate, toDate], updateFilteredTransactions);

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
  