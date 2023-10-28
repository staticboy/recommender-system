<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useCategoryStore } from "../../stores/category";
import { useProductStore } from "../../stores/product";
import { DEMO_BUSINESS_LIST, DEMO_PRODUCT_LIST } from "../../constants.ts";
import { CategoryDetails } from "../../stores/category/types";
import { ProductDetails } from "../../stores/product/types";

const q = useQuasar();
const router = useRouter();
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const selectedCategory = ref<CategoryDetails>({
  cat_id: "",
  cat_name: "",
  cat_status: "",
});
const productList = ref<ProductDetails[]>([]);

onBeforeMount(async () => {
  await categoryStore.getAllCategories();
  selectedCategory.value =
    useCategoryStore().categoryList[
      Math.floor(Math.random() * useCategoryStore().categoryList.length)
    ];
  productList.value = await productStore.getProductsByCategory(
    selectedCategory.value.cat_id
  );
});
</script>
<template>
  <q-page>
    <div class="flex flex-col gap-5 items-center q-px-lg q-pb-xl">
      <div class="w-full mt-10">
        <h1>Welcome to Sportify!</h1>
      </div>
    </div>
    <!-- Products -->
    <h5>Check out some of these products!</h5>
    <div class="grid grid-cols-4 gap-3 q-py-lg h-max">
      <div class="flex col-span-1">
        <q-card
          dark
          bordered
          class="flex flex-col justify-center items-center rounded-xl q-px-sm q-py-lg"
        >
          <q-card-section>
            <div class="text-h6 text-center">Check out our many deals for:</div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-center">{{ selectedCategory.cat_name }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-span-3">
        <q-scroll-area style="height: 300px">
          <div class="flex flex-row no-wrap" style="height: 300px">
            <q-card
              v-for="product in productList"
              :key="product.prod_id"
              bordered
              class="rounded-xl q-px-sm q-py-lg"
              style="max-width: 50%; min-width: 20%"
            >
              <q-card-section>
                <q-chip> ${{ product.prod_price }} </q-chip>
              </q-card-section>
              <q-card-section>
                <div class="text-h6">{{ product.prod_name }}</div>
              </q-card-section>
              <q-card-section class="w-full">
                {{ product.prod_description }}
              </q-card-section>
              <q-card-section class="w-full">
                <span v-if="product.prod_status == 'Not Available'">
                  {{ product.prod_status }}
                </span>
                <q-btn
                  v-else
                  label="Add to cart"
                  icon="shopping_cart"
                  class="w-full"
                  @click="
                    () =>
                      q.notify({
                        message: 'Added to cart',
                        color: 'positive',
                        icon: 'add_shopping_cart',
                      })
                  "
                />
              </q-card-section>
            </q-card>
          </div>
        </q-scroll-area>
      </div>
    </div>

    <!-- Our Business Partners -->
    <h5>Our Business Collaborators</h5>
    <div class="grid grid-cols-4 gap-3 q-pt-md">
      <template v-for="b in DEMO_BUSINESS_LIST" :key="b">
        <q-card
          dark
          bordered
          class="flex flex-col justify-center items-center rounded-xl"
        >
          <q-card-section>
            <div class="text-h6 text-center">Business {{ b }}</div>
          </q-card-section>
        </q-card>
      </template>
    </div>
  </q-page>
</template>
<style scoped lang="scss"></style>
