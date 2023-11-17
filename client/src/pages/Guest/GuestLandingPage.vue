<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import { useCategoryStore } from "../../stores/category";
import { useProductStore } from "../../stores/product";
import { CategoryDetails } from "../../stores/category/types";
import { ProductDetails, RankedProdPerCat } from "../../stores/product/types";
import ViewProductDetails from "../../components/Modals/ViewProductDetails.vue";

const categoryStore = useCategoryStore();
const productStore = useProductStore();
const redirectDialog = ref(false);
const selectedCategory = ref<CategoryDetails>({
  cat_id: "",
  cat_name: "",
  cat_status: "",
});
const productListByCategory = ref<ProductDetails[]>([]);
const productListByPurchaseNumByCat = ref<RankedProdPerCat[]>([]);
const recommendByPurchaseNum = computed(() =>
  [...productListByPurchaseNumByCat.value]
    .sort((a, b) => b.buys - a.buys)
    .slice(0, 10)
);
const redirectToLogin = () => {
  redirectDialog.value = true;
};
onBeforeMount(async () => {
  await categoryStore.getAllCategories();
  selectedCategory.value =
    useCategoryStore().categoryList[
      Math.floor(Math.random() * useCategoryStore().categoryList.length)
    ];
  productListByCategory.value = await productStore.getProductsByCategory(
    selectedCategory.value.cat_id
  );
  productListByPurchaseNumByCat.value =
    await productStore.getProductsByCatAndPurchaseNum();
});
</script>
<template>
  <q-page>
    <div class="flex flex-col gap-5 items-center q-px-lg q-pb-lg">
      <div class="w-full mt-5">
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
            <div class="text-h6 text-center">
              {{ selectedCategory.cat_name }}
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-span-3">
        <q-scroll-area dark visible style="height: 350px">
          <div class="flex flex-row no-wrap" style="height: 350px">
            <ViewProductDetails
              v-for="product in productListByCategory"
              :key="product.prod_id"
              :product="product"
              :flex="'column'"
              :hide="true"
              @click="redirectToLogin()"
            />
          </div>
        </q-scroll-area>
      </div>
    </div>

    <!-- Recommendations based on most bought products -->
    <h5>Check out some of our most popular products!</h5>
    <div class="grid grid-cols-4 gap-3 q-py-lg h-max">
      <div class="flex col-span-1">
        <q-card
          dark
          bordered
          class="flex flex-col justify-center items-center rounded-xl q-px-sm q-py-lg"
        >
          <q-card-section>
            <div class="text-h6 text-center">
              Check out our many products for:
            </div>
          </q-card-section>
          <!-- <q-card-section>
            <div class="text-h6 text-center">Temp placeholder for image</div>
          </q-card-section> -->
        </q-card>
      </div>
      <div class="col-span-3">
        <q-scroll-area dark visible style="height: 350px">
          <div class="flex flex-row no-wrap" style="height: 350px">
            <ViewProductDetails
              v-for="product in recommendByPurchaseNum"
              :key="product.prod_id"
              :product="product"
              :flex="'column'"
              :hide="true"
              @click="redirectToLogin()"
            />
          </div>
        </q-scroll-area>
      </div>
    </div>

    <!-- Recommendations based on most popular products by category -->
    <h5>Here are some products that you might like</h5>
    <div class="grid grid-cols-4 gap-3 q-py-lg h-max">
      <div class="flex col-span-1">
        <q-card
          dark
          bordered
          class="flex flex-col justify-center items-center rounded-xl q-px-sm q-py-lg"
        >
          <q-card-section>
            <div class="text-h6 text-center">
              Check out our many products for:
            </div>
          </q-card-section>
          <!-- <q-card-section>
            <div class="text-h6 text-center">Temp placeholder for image</div>
          </q-card-section> -->
        </q-card>
      </div>
      <div class="col-span-3">
        <q-scroll-area dark visible style="height: 350px">
          <div class="flex flex-row no-wrap" style="height: 350px">
            <ViewProductDetails
              v-for="product in productStore.rankedProdPerCat.slice(0, 10)"
              :key="product.prod_id"
              :product="product"
              :flex="'column'"
              :hide="true"
              @click="redirectToLogin()"
            />
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
  <q-dialog v-model="redirectDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">
          Please login to view more!
        </div>
      </q-card-section>
      <q-card-actions class="flex justify-center">
        <q-btn
          label="Cancel"
          color="primary"
          class="q-ma-md"
          @click="redirectDialog = false"
        />
        <q-btn
          label="Login"
          color="primary"
          class="q-ma-md"
          @click="$router.push('/login')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped lang="scss"></style>
