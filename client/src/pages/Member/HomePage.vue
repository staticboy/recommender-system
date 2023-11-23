<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { useCategoryStore } from "../../stores/category";
import { useProductStore } from "../../stores/product";
import { useMemberStore } from "../../stores/member";
import { CategoryDetails } from "../../stores/category/types";
import { ProductDetails } from "../../stores/product/types";
import { MemberPreferences } from "../../stores/member/types";
import EditPreferenceModal from "../../components/Modals/EditPreferenceModal.vue";
import ViewProductDetails from "../../components/Modals/ViewProductDetails.vue";

const $q = useQuasar();
const preferenceDialog = ref(false);
const preferences = ref<MemberPreferences[]>([]);
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const memberStore = useMemberStore();
const selectedCategory = ref<CategoryDetails>({
  cat_id: "",
  cat_name: "",
  cat_status: "",
});
const productList = ref<ProductDetails[]>([]);
const wishlist = ref<string[]>([]);
const saveToWishlist = async (id: string) => {
  const success = await memberStore.addProductToWishlist({
    user_id:
      localStorage.getItem("userId") || memberStore.memberDetails.user_id,
    prod_id: id,
  });
  if (success) {
    wishlist.value.push(id);
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
onBeforeMount(async () => {
  await categoryStore.getAllCategories();
  selectedCategory.value =
    useCategoryStore().categoryList.filter(cat => cat.cat_status == "ACTIVE")[
      Math.floor(Math.random() * useCategoryStore().categoryList.length)
    ];
  productList.value = await productStore.getProductsByCategory(
    selectedCategory.value.cat_id
  );
  preferenceDialog.value = localStorage.getItem("pref_count")
    ? localStorage.getItem("pref_count") === "0"
      ? true
      : false
    : true;
  if (
    !preferenceDialog.value &&
    productStore.activityProductRecommendations.length === 0 &&
    productStore.preferenceProductRecommendations.length === 0
  ) {
    await productStore.getProductRecommendations(
      localStorage.getItem("userId")!
    );
  }
  if (memberStore.memberWishlist.length === 0) {
    await memberStore.getMemberWishlist(
      localStorage.getItem("userId") || memberStore.memberDetails.user_id
    );
    wishlist.value = memberStore.memberWishlist;
  }
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
              v-for="product in productList"
              :key="product.prod_id"
              :product="product"
              :flex="'column'"
              :exists="!!wishlist.find((wl) => wl === product.prod_id)"
              @save-to-wishlist="saveToWishlist(product.prod_id)"
              @add-to-cart="addToCart(product.prod_id)"
            />
          </div>
        </q-scroll-area>
      </div>
    </div>

    <!-- Recommendations based on preference -->
    <h5>You might be interested in some of these products!</h5>
    <div class="grid grid-cols-4 gap-3 q-py-lg h-max">
      <div class="col-span-4">
        <q-scroll-area dark visible style="height: 350px">
          <div class="flex flex-row no-wrap" style="height: 350px">
            <ViewProductDetails
              v-for="product in productStore.preferenceProductRecommendations"
              :key="product.prod_id"
              :product="product"
              :flex="'column'"
              :exists="!!wishlist.find((wl) => wl === product.prod_id)"
              @save-to-wishlist="saveToWishlist(product.prod_id)"
              @add-to-cart="addToCart(product.prod_id)"
            />
          </div>
        </q-scroll-area>
      </div>
    </div>

    <!-- Recommendations based on activity -->
    <h5>Here are some products that you might like</h5>
    <div class="grid grid-cols-4 gap-3 q-py-lg h-max">
      <div class="col-span-4">
        <q-scroll-area dark visible style="height: 350px">
          <div class="flex flex-row no-wrap" style="height: 350px">
            <ViewProductDetails
              v-for="product in productStore.activityProductRecommendations"
              :key="product.prod_id"
              :product="product"
              :flex="'column'"
              :exists="!!wishlist.find((wl) => wl === product.prod_id)"
              @save-to-wishlist="saveToWishlist(product.prod_id)"
              @add-to-cart="addToCart(product.prod_id)"
            />
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
  <q-dialog persistent v-model="preferenceDialog">
    <q-card class="px-4 pt-6 pb-2" style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h4 text-center">Welcome to Sportify!</div>
        <div class="text-h6 text-center">
          Before we continue, please indicate your preferences below!
        </div>
      </q-card-section>
      <q-card-section>
        <EditPreferenceModal :preferences="preferences" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          v-if="preferences.length > 0 && preferences[0].draft === false"
          flat
          label="Close"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped lang="scss"></style>
