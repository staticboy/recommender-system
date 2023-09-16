<template>
    <div class="bg-gray-200 min-h-screen p-4">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-semibold mb-4">Product List</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Loop through products and display them -->
          <div
            v-for="product in products"
            :key="product.id"
            class="bg-white p-4 rounded-lg shadow-md"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-32 object-cover rounded-md mb-2"
            />
            <h5 class="text-xl font-semibold">{{ product.name }}</h5>
            <p class="text-red-600">{{ product.description }}</p>
            <p class="text-green-600 text-lg font-semibold mt-2">
              ${{ product.price }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          {
            id: 1,
            name: "Product 1",
            description: "Dummy product 1, shoes that can make u fly.",
            price: 19.99,
            image: "product1.jpg",
          },
          {
            id: 2,
            name: "Product 2",
            description: "Product dummy2, Jersey which is as hard as a rock.",
            price: 29.99,
            image: "product2.jpg",
          },
          {
            id: 3,
            name: "Product 3",
            description: "Dummy product 3, Balls Protection.",
            price: 39.99,
            image: "product3.jpg",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here if needed */
  </style>
  