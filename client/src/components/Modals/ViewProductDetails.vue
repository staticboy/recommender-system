<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import { ProductDetails } from "../../stores/product/types";
import { useProductStore } from "../../stores/product";

const props = defineProps({
  product: {
    type: Object as PropType<ProductDetails>,
    required: true,
  },
  exists: Boolean,
  hide: {
    type: Boolean,
    default: false,
  },
  flex: {
    type: String as PropType<"row" | "column">,
    default: "row",
  },
});
const link = ref<string[]>([]);
const slide = ref(0);
const productStore = useProductStore();
const getImageLinks = computed(() => {
  return link.value;
});
onBeforeMount(async () => {
  const resp = await productStore.getProductImageLink(props.product.prod_id);
  link.value = resp;
});
const emits = defineEmits(["saveToWishlist", "addToCart"]);
</script>
<template>
  <div
    class="!max-w-none justify-center"
    :style="
      flex === 'row'
        ? {
            display: 'flex',
            height: '65vh',
            width: '70vw',
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
        width: flex === 'row' ? '40%' : '100%',
        height: flex === 'row' ? '100%' : '65%',
        maxWidth: '800px'
      }"
    >
      <q-card-section style="width: 100%">
        <q-carousel
          v-if="getImageLinks.length > 0"
          animated
          v-model="slide"
          arrows
          navigation
          infinite
          dark
          control-color="primary"
          navigation-icon="radio_button_unchecked"
          transition-prev="slide-right"
          transition-next="slide-left"
          style="width: 100%; height: 100%"
        >
          <q-carousel-slide
            v-for="(img, index) in getImageLinks"
            :key="index"
            :name="index"
            class="column no-wrap flex-center"
            style="height: 100%;"
          >
            <q-img
              :src="img"
              fit="contain"
              spinner-color="white"
              style="height: 100%;"
            />
          </q-carousel-slide>
        </q-carousel>
        <div v-else class="flex justify-center items-center align-middle">
          <q-icon name="broken_image" size="100px" class="text-grey-8" />
        </div>
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
        width: flex === 'row' ? '' : '100%',
        height: flex === 'row' ? '100%' : '35%',
        maxWidth: '500px'
      }"
    >
      <q-card-section
        class="truncate-elipsis"
        :class="flex === 'column' ? 'text-left xpadding' : ''"
      >
        <div :class="flex === 'row' ? 'text-h6' : 'text-bold'">
          {{ product.prod_name }} {{ product.prod_id }}
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
        v-if="!hide"
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
