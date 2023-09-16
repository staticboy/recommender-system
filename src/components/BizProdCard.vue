<template>
    <q-card>
      <q-card-section>
        <img :src="product.image" alt="Product Image" class="q-mb-md" />
        <h2 class="text-h6">{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <p class="text-weight-bold justify-center">{{ product.price }} SGD</p>
        <p class="text-weight-bold justify-center">{{ product.stockqty }} pcs</p>
      </q-card-section>
    </q-card>
  </template>
  
  <script setup lang="ts">
  import { PropType } from 'vue';

  const props = defineProps({
    product: {
      type: Object as PropType<{ // Specify the prop type
        title: string;
        description: string;
        price: number;
        image: string;
        stockqty: number;
      }>,
      required: true, // Add this if the prop is required
    },
  });

  const { product } = props; // Destructure the product prop directly
  </script>
  
  <style scoped>
  /* Add your custom CSS styling here */
  .q-card {
    max-width: 300px;
    margin: 0 auto;
  }
  </style>
  
  