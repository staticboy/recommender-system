<template>
    <div>
      <h1 class="text-2xl font-semibold mb-4">Transaction History</h1>
  
      <!-- Step 1: Filter by User Account -->
      <div v-if="step === 1" class="mb-4">
        <!-- Display user account filter options -->
        <button @click="proceedToStep(2)" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Next
        </button>
      </div>
  
      <!-- Step 2: Filter by Date Range -->
      <div v-else-if="step === 2" class="mb-4">
        <label for="fromDate">From Date:</label>
        <input type="date" id="fromDate" v-model="fromDate" class="w-full px-3 py-2 rounded-md border border-gray-300" />

        <label for="toDate">To Date:</label>
        <input type="date" id="toDate" v-model="toDate" class="w-full px-3 py-2 rounded-md border border-gray-300" />
        <button @click="proceedToStep(3)" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Next
        </button>
      </div>

  
      <!-- Step 3: Display Filtered Transaction History -->
      <div v-else-if="step === 3" class="mb-4">
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
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td class="border px-4 py-2">{{ transaction.date }}</td>
              <td class="border px-4 py-2">{{ transaction.customer }}</td>
              <td class="border px-4 py-2">{{ transaction.amount }}</td>
              <td class="border px-4 py-2">
                <button @click="viewItemsInTransaction(transaction)" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  View Items
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="resetSteps" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Back to Step 1
        </button>
      </div>
  
      <!-- Step 4: View Items in Transaction (LINEITEM) -->
      <div v-else-if="step === 4" class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Items in Transaction</h2>
        <p v-if="selectedTransaction">
          Transaction ID: {{ selectedTransaction.id }}
        </p>
        <button @click="resetSteps" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Back to Step 1
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        step: 1,
        fromDate: null,
        toDate: null,
        transactions: [], // Dummy transaction data
        selectedTransaction: null, // To store the selected transaction for Step 4
      };
    },
    methods: {
      proceedToStep(nextStep) {
        this.step = nextStep;
        // For this example, let's generate some dummy transaction data when moving to Step 3.
        if (nextStep === 3) {
          this.transactions = this.generateDummyTransactions();
        }
      },
      generateDummyTransactions() {
        // Generate and return an array of dummy transactions
        const dummyTransactions = [];
        for (let i = 1; i <= 10; i++) {
          dummyTransactions.push({
            id: i,
            date: `2023-09-${i < 10 ? '0' + i : i}`,
            customer: `Customer ${i}`,
            amount: Math.floor(Math.random() * 500) + 50,
          });
        }
        return dummyTransactions;
      },
      viewItemsInTransaction(transaction) {
        this.selectedTransaction = transaction;
        this.proceedToStep(4);
      },
      resetSteps() {
        this.step = 1;
        this.fromDate = null;
        this.toDate = null;
        this.transactions = [];
        this.selectedTransaction = null;
      },
    },
  };
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
  