<script setup lang="ts">
import { ProductDetails } from "../../stores/product/types";

defineProps({
  product: {
    type: Object as PropType<ProductDetails>,
    required: true,
  },
  exists: Boolean,
});
const emits = defineEmits(["saveToWishlist", "addToCart"]);
</script>
<template>
  <div class="flex" style="height: 50%; width: 700px">
    <q-card
      dark
      bordered
      class="flex flex-col justify-center items-center rounded-xl q-px-sm q-py-lg"
      style="height: 100%; width: 45%"
    >
      <q-card-section>
        <div class="text-h6">{{ product.prod_name }}</div>
      </q-card-section>
      <q-card-section class="text-center">
        {{ product.prod_description }}
      </q-card-section>
    </q-card>
    <q-card
      dark
      bordered
      class="flex flex-col justify-center items-center rounded-xl q-px-sm q-py-lg"
      style="height: 100%; width: 55%"
    >
      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
        <br /><br />
        Price: ${{ product.prod_price }}
        <br />
        Stock: 100
        <br />
        <q-btn
          flat
          outlined
          no-caps
          :color="exists ? 'red' : 'primary'"
          :disable="exists"
          :icon="exists ? 'favorite' : 'save'"
          :label="exists ? 'In wishlist' : 'Save to wishlist'"
          @click="emits('saveToWishlist')"
        />
        <q-btn
          flat
          outlined
          no-caps
          icon="add_shopping_cart"
          label="Add to cart"
          @click="emits('addToCart')"
        />
      </q-card-section>
    </q-card>
  </div>
</template>
