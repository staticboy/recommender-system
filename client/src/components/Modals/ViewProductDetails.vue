<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useMemberStore } from "../../stores/member";
import { ProductDetails } from "../../stores/product/types";

defineProps({
  product: {
    type: Object as PropType<ProductDetails>,
    required: true,
  },
  wishlist: Boolean,
});
const emits = defineEmits(["saveToWishlist"]);
const $q = useQuasar();
const memberStore = useMemberStore();

const saveToWishlist = async (id: string) => {
  const success = await memberStore.addProductToWishlist({
    user_id:
      localStorage.getItem("userId") || memberStore.memberDetails.user_id,
    prod_id: id,
  });
  if (success) {
    $q.notify({
      message: "Saved to wishlist",
      color: "positive",
      icon: "cloud_done",
    });
  } else {
    $q.notify({
      message: "Failed to save to wishlist",
      color: "negative",
      icon: "cloud_off",
    });
  }
};
const addToCart = async (id: string) => {
  const resp = await memberStore.addProductToCart({
    user_id:
      localStorage.getItem("userId") || memberStore.memberDetails.user_id,
    prod_id: id,
  });
  if (resp === 1) {
    $q.notify({
      message: "Added to cart",
      color: "positive",
      icon: "add_shopping_cart",
    });
  } else if (resp === 0) {
    $q.notify({
      message: "Product already added to cart",
      color: "negative",
      icon: "add_shopping_cart",
    });
  } else {
    $q.notify({
      message: "Failed to add to cart",
      color: "negative",
      icon: "add_shopping_cart",
    });
  }
};
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
          :color="wishlist ? 'red' : 'primary'"
          :disable="wishlist"
          :icon="wishlist ? 'favorite' : 'save'"
          :label="wishlist ? 'In wishlist' : 'Save to wishlist'"
          @click="saveToWishlist(product.prod_id)"
        />
        <q-btn
          flat
          outlined
          no-caps
          icon="add_shopping_cart"
          label="Add to cart"
          @click="addToCart(product.prod_id)"
        />
      </q-card-section>
    </q-card>
  </div>
</template>
