<template>
  <div class="bg-gray-200 min-h-screen p-4">
    <q-page>
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-semibold mb-4">Product List</h1>

        <!-- Tabs for Active and Inactive Products -->
        <div class="mb-4">
          <button @click="activeTab = 'active'"
            :class="['mr-4', activeTab === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-300']"
            class="px-4 py-2 rounded-md focus:outline-none">
            Active Products
          </button>
          <button @click="activeTab = 'inactive'"
            :class="['mr-4', activeTab === 'inactive' ? 'bg-blue-500 text-white' : 'bg-gray-300']"
            class="px-4 py-2 rounded-md focus:outline-none">
            Inactive Products
          </button>
        </div>

        <!-- Display Products Based on Active/Inactive Tab -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="product in getProductsByTab" :key="product.id" class="bg-white p-4 rounded-lg shadow-md">
            <!-- Your product display content here -->
            <img :src="product.image" :alt="product.name" class="w-full h-32 object-cover rounded-md mb-2" />
            <h5 class="text-xl font-semibold">{{ product.name }}</h5>
            <p class="text-red-600">{{ product.description }}</p>
            <p class="text-green-600 text-lg font-semibold mt-2">
              ${{ product.price }}
            </p>

            <!-- Display additional information based on the tab -->
            <template v-if="activeTab === 'active'">
              <p>Product ID: {{ product.id }}</p>
              <p>Stock: {{ product.stock }}</p>
            </template>
            <template v-else-if="activeTab === 'inactive'">
              <p>Product ID: {{ product.id }}</p>
              <p>Stock: {{ product.stock }}</p>
            </template>
          </div>
        </div>
      </div>
    </q-page>
  </div>
</template>
  
<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

//For Update/Delete Cat
/******************/
const subcatForEnq = ref('');

const viewExistingEnq = ref(false);
const toggleExistingEnq = (row) => {

  subcatForEnq.value = row.enq_id;
  viewExistingEnq.value = !viewExistingEnq.value;
};

/**********/

const activeTab = ref('active');

const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 100,
    stock: 10,
    // image: 'product1.jpg',
    isActive: true,
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description 2',
    price: 150,
    stock: 5,
    // image: 'product2.jpg',
    isActive: false,
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Description 3',
    price: 80,
    stock: 8,
    // image: 'product3.jpg',
    isActive: true,
  },
];

// Filter products based on activeTab
const getProductsByTab = computed(() => {
  if (activeTab.value === 'active') {
    return products.filter((product) => product.isActive);
  } else if (activeTab.value === 'inactive') {
    return products.filter((product) => !product.isActive);
  } else {
    return [];
  }
});
</script>
  
<style scoped>
/* Add any custom styles here if needed */
</style>
  