<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { ProductDetails } from "../../stores/product/types";
import { useProductStore } from "../../stores/product";

const props = defineProps({
  product: {
    type: Object as PropType<ProductDetails>,
    required: true,
  },
  exists: Boolean,
  flex: {
    type: String as PropType<"row" | "column">,
    default: "row",
  },
});
const link = ref("");
const productStore = useProductStore();
onBeforeMount(async () => {
  link.value = await productStore.getProductImageLink(props.product.prod_id);
});
const emits = defineEmits(["saveToWishlist", "addToCart"]);
</script>
<template>
  <div
    :style="
      flex === 'row'
        ? {
            display: 'flex',
            height: '55vh',
            width: '80vw',
          }
        : {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '200px',
          }
    "
  >
    <q-card
      dark
      bordered
      class="flex flex-col justify-center items-center rounded-xl q-px-sm q-py-lg"
      :style="{
        width: flex === 'row' ? '50%' : '100%',
        height: flex === 'row' ? '100%' : '65%',
      }"
    >
      <q-card-section class="flex justify-center items-center align-middle">
        <q-img v-if="link.length > 0" :src="link">
          <template v-slot:default>
            <div class="absolute flex flex-center text-h5">
              <q-spinner-hourglass color="white" size="50px" />
            </div>
          </template>
        </q-img>
        <q-icon v-else name="broken_image" size="100px" class="text-grey-8" />
      </q-card-section>
    </q-card>
    <q-card
      dark
      bordered
      class="flex"
      :class="
        flex === 'row'
          ? 'flex-col justify-center items-center rounded-xl q-px-sm q-py-lg'
          : 'justify-center items-center content-center rounded-xl'
      "
      :style="{
        width: flex === 'row' ? '50%' : '100%',
        height: flex === 'row' ? '100%' : '35%',
      }"
    >
      <q-card-section class="truncate-elipsis" :class="flex === 'column' ? 'text-left xpadding' : ''">
        <div :class="flex === 'row' ? 'text-h6' : 'text-bold'">
          {{ product.prod_name }}
          <q-tooltip>{{ product.prod_name }}</q-tooltip>
        </div>
        <template v-if="flex === 'row'"> <br /><br /> </template>
        <span v-if="flex === 'row'">{{ product.prod_description }}</span>
        <template v-if="flex === 'row'"> <br /><br /> </template>
        Price: ${{ product.prod_price }}
        <br />
        Stock: {{ product.prod_stockqty }}
      </q-card-section>
      <q-card-actions
        class="flex"
        :class="
          flex === 'row'
            ? 'flex-col items-baseline self-start'
            : 'flex-row xpadding'
        "
      >
        <q-btn
          flat
          outlined
          no-caps
          :color="exists ? 'red' : 'grey'"
          :disable="exists"
          icon="favorite"
          :label="
            flex === 'row' ? (exists ? 'In wishlist' : 'Save to wishlist') : ''
          "
          @click="emits('saveToWishlist')"
        >
          <q-tooltip>Add to wishlist</q-tooltip>
        </q-btn>
        <q-btn
          flat
          outlined
          no-caps
          icon="add_shopping_cart"
          :label="flex === 'row' ? 'Add to cart' : ''"
          @click="emits('addToCart')"
        >
          <q-tooltip>Add to cart</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
<style scoped>
:deep(.xpadding) {
  padding: 0 !important;
  margin: 0 16px !important;
}
.truncate-elipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>
