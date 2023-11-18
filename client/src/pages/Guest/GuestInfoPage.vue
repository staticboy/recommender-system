<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import { useCategoryStore } from "../../stores/category";
import { useProductStore } from "../../stores/product";
import { CategoryDetails } from "../../stores/category/types";
import { ProductDetails, RankedProdPerCat } from "../../stores/product/types";
import ViewProductDetails from "../../components/Modals/ViewProductDetails.vue";
import { useBizOwnerStore } from "../../stores/biz";
import { useMemberStore } from "../../stores/member";

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
const bizStore = useBizOwnerStore();
const searchTerm = ref("");
const searchResults = computed(() => {
  return bizStore.businessList.filter((b) => {
    return b.biz_name.toLowerCase().includes(searchTerm.value.toLowerCase())
  });
});
const memberStore = useMemberStore();
const activeUsers = ref(0);

const goToSite = () => {
  window.location.href = "https://fyp23s311.wixsite.com/my-site";
}

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

  if (bizStore.businessList.length === 0) {
    await bizStore.getAllBusinesses();
    console.log(bizStore.getAllBusinesses())
  }
  activeUsers.value = await memberStore.getMemberRegisteredCount()
});
</script>
<template>
  <q-page class="q-pa-md">
    <q-container>
      <div class="q-mt-md text-left ml-2 mt-4">
        <h1 class="text-5xl font-bold text-primary">Welcome to Sportify!</h1>
        <p class="text-lg text-secondary">
          Your one-stop sports e-commerce platform
        </p>
      </div>

      <div class="q-mb-lg text-center">
        <q-btn color="primary" label="Be A Member Now" @click="$router.push('/signup')" class="text-lg font-semibold" />
      </div>
      <div class="grid grid-cols-3 gap-4 w-full">
        <q-card>
          <div class="text-center">
            <q-icon name="shopping_cart" size="2em" class="text-primary mt-2" />
            <h3 class="text-lg font-semibold mt-2">Wide Range of Products</h3>
            <p class="text-secondary">Browse through our extensive catalog</p>
          </div>
        </q-card>
        <q-card>
          <div class="text-center">
            <q-icon name="account_circle" size="2em" class="text-primary mt-2" />
            <h3 class="text-lg font-semibold mt-2">Current Registered Members: {{ activeUsers }}</h3>
            <p class="text-secondary">Join our community of sports enthusiasts</p>
          </div>
        </q-card>
        <q-card>
          <div class="text-center">
            <q-icon name="star" size="2em" class="text-primary mt-2" />
            <h3 class="text-lg font-semibold mt-2">Recommender System</h3>
            <p class="text-secondary">Personalized recommendations for you</p>
          </div>
        </q-card>
      </div>
      <br />
      <h5>Check out some of these products!</h5>
      <div class="grid grid-cols-4 gap-3 q-py-lg h-max">
        <div class="flex col-span-1">
          <q-card dark bordered class="flex flex-col justify-center items-center rounded-xl q-px-sm q-py-lg">
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
              <ViewProductDetails v-for="product in productListByCategory" :key="product.prod_id" :product="product"
                :flex="'column'" :hide="true" @click="redirectToLogin()" class="cursor-pointer" />
            </div>
          </q-scroll-area>
        </div>
      </div>

      <!-- Recommendations based on most bought products -->
      <h5>Check out some of our most popular products!</h5>
      <div class="grid grid-cols-4 gap-3 q-py-lg h-max">
        <div class="col-span-4">
          <q-scroll-area dark visible style="height: 350px">
            <div class="flex flex-row no-wrap" style="height: 350px">
              <ViewProductDetails v-for="product in recommendByPurchaseNum" :key="product.prod_id" :product="product"
                :flex="'column'" :hide="true" @click="redirectToLogin()" class="cursor-pointer" />
            </div>
          </q-scroll-area>
        </div>
      </div>
      <!-- Recommendations based on most popular products by category -->
      <h5>Here are some products that you might like</h5>
      <div class="grid grid-cols-4 gap-3 q-py-lg h-max">
        <div class="col-span-4">
          <q-scroll-area dark visible style="height: 350px">
            <div class="flex flex-row no-wrap" style="height: 350px">
              <ViewProductDetails v-for="product in productStore.rankedProdPerCat.slice(0, 10)" :key="product.prod_id"
                :product="product" :flex="'column'" :hide="true" @click="redirectToLogin()" class="cursor-pointer" />
            </div>
          </q-scroll-area>
        </div>
      </div>
      <!-- Business Partners -->
      <div class="grid grid-cols-4 gap-3 q-py-lg h-max">
        <div class="flex col-span-1">
          <q-card dark bordered class="flex flex-col justify-center items-center rounded-xl q-px-sm q-py-lg">
            <q-card-section>
              <div class="text-h6 text-center">Our Business Collaborators</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-span-3">
          <q-scroll-area dark visible style="height: 350px">
            <div class="flex flex-row no-wrap" style="height: 350px">
              <q-card dark bordered v-for="b in searchResults" :key="b.biz_id"
                class="flex flex-col justify-center items-center rounded-xl cursor-pointer q-px-sm q-py-lg"
                style="height: 350px; width: 200px;">
                <q-card-section>
                  <div class="text-h6"> {{ b.biz_name }}</div>
                </q-card-section>
                <q-card-section>
                  {{ b.cats ? b.cats : 'None yet' }}
                </q-card-section>
              </q-card>
            </div>
          </q-scroll-area>
        </div>
      </div>
      <div>
          <q-btn
            label="About us"
            color="primary"
            class="q-ma-md"
            @click="goToSite()"
          />
      </div>
    </q-container>
  </q-page>
  <q-dialog v-model="redirectDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">
          Please login to view more!
        </div>
      </q-card-section>
      <q-card-actions class="flex justify-center">
        <q-btn label="Cancel" color="primary" class="q-ma-md" @click="redirectDialog = false" />
        <q-btn label="Login" color="primary" class="q-ma-md" @click="$router.push('/login')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped lang="scss"></style>
