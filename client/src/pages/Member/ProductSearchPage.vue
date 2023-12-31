<script setup lang="ts">
import { ref, onBeforeMount, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { useCategoryStore } from "../../stores/category";
import { useProductStore } from "../../stores/product";
import { useMemberStore } from "../../stores/member";
import { useBizOwnerStore } from "../../stores/biz";
import { CategoryDetails } from "../../stores/category/types";
import { BizProfileDetails } from "../../stores/biz/types";
import { ProductDetails } from "../../stores/product/types";
import ViewProductDetails from "../../components/Modals/ViewProductDetails.vue";

const route = useRoute();
const $q = useQuasar();
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const memberStore = useMemberStore();
const bizStore = useBizOwnerStore();
const wishlist = ref<string[]>([]);
const { memberDetails } = useMemberStore();
const dialog = ref(false);
const hasLoadedAll = ref(false);
const hasMounted = ref(false);
// Search and filter vaariables
const searchTerm = ref("");
const categoryFilter = ref<CategoryDetails[]>([]);
const businessFilter = ref<BizProfileDetails[]>([]);
const selected = ref(0);
const fullProductList = ref<ProductDetails[]>([]);
const priceFilter = ref({
  min: 0,
  max: Math.max(...productStore.productList.map((p) => p.prod_price)),
});
const filteredProductList = computed(() => {
  let resp = fullProductList.value;
  if (searchTerm.value.length > 0) {
    resp = resp.filter((prod) => {
      return prod.prod_name
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase());
    });
  }
  if (categoryFilter.value.length > 0) {
    resp = resp.filter((prod) => {
      return (
        categoryFilter.value.find((cf) => cf.cat_id === prod.cat_id) !==
        undefined
      );
    });
  }
  if (businessFilter.value.length > 0) {
    resp = resp.filter((prod) => {
      return (
        businessFilter.value.find((bf) => bf.biz_id === prod.biz_id) !==
        undefined
      );
    });
  }
  if (priceFilter.value.min > 0 || priceFilter.value.max > 0) {
    resp = resp.filter((prod) => {
      return (
        prod.prod_price >= priceFilter.value.min &&
        prod.prod_price <= priceFilter.value.max
      );
    });
  }
  return resp;
});
const addBusinessToFilter = async (biz_id: string) => {
  if (!businessFilter.value.find((bf) => bf.biz_id === biz_id)) {
    businessFilter.value.push(
      bizStore.businessList.find(
        (b) => b.biz_id === biz_id
      ) as BizProfileDetails
    );
  }
};

const openDialog = (index: number) => {
  selected.value = index;
  dialog.value = !dialog.value;
};
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
watch([searchTerm, categoryFilter, businessFilter, priceFilter], async () => {
  if (
    !hasLoadedAll.value && hasMounted.value &&
    (categoryFilter.value.length === 0 && businessFilter.value.length === 0)
  ) {
    fullProductList.value = await productStore.getAllProducts();
    hasLoadedAll.value = true;
  }
});
watch(dialog, () => {
  if (dialog.value) {
    setTimeout(async () => {
      await memberStore.memberLogViewProduct({
        user_id:
          localStorage.getItem("userId") || memberStore.memberDetails.user_id,
        prod_id: filteredProductList.value[selected.value].prod_id,
      });
    }, 2000);
  }
});
onBeforeMount(async () => {
  if (bizStore.getBizDetails.length === 0) await bizStore.getAllBusinesses();
  if (categoryStore.categoryList.length === 0)
    await categoryStore.getAllCategories();
  if (
    productStore.activityProductRecommendations.length === 0 ||
    productStore.preferenceProductRecommendations.length === 0
  ) {
    await productStore.getProductRecommendations(
      localStorage.getItem("userId") || memberDetails.user_id
    );
  }
  if (memberStore.memberWishlist.length === 0) {
    await memberStore.getMemberWishlist(
      localStorage.getItem("userId") || memberDetails.user_id
    );
    wishlist.value = memberStore.memberWishlist;
  }
  if (route.query.businessId) {
    // check if query is array or string
    if (Array.isArray(route.query.businessId)) {
      for (const biz_id of route.query.businessId) {
        await addBusinessToFilter(biz_id as string);
        fullProductList.value = fullProductList.value.concat(
          await productStore.getProductsByBusiness(biz_id as string)
        );
      }
    } else {
      await addBusinessToFilter(route.query.businessId);
      fullProductList.value = await productStore.getProductsByBusiness(
        route.query.businessId as string
      );
    }
  } else {
    await memberStore.getMemberPreferencesByID(
      localStorage.getItem("userId") || memberStore.memberDetails.user_id
    );
    categoryFilter.value = categoryStore.categoryList.filter((c) =>
      memberStore.memberPreferences.find((p) => p.cat_id === c.cat_id)
    );
    for (const cat of categoryFilter.value) {
      fullProductList.value = fullProductList.value.concat(
        await productStore.getProductsByCategory(cat.cat_id)
      );
    }
  }
  hasMounted.value = true;
});
</script>
<template>
  <q-page>
    <q-input clearable outlined v-model="searchTerm" label="Search Products" />
    <div class="grid grid-cols-6 w-full mt-6 gap-6">
      <div class="col-span-1">
        <h5>Filters</h5>
        <br /><br />
        <div>
          <h6>Category Search</h6>
          <q-select
            filled
            v-model="categoryFilter"
            use-input
            input-debounce="0"
            use-chips
            multiple
            :options="
              categoryStore.categoryList.filter(
                (c) => c.cat_status === 'ACTIVE'
              )
            "
            option-label="cat_name"
            option-value="cat_id"
          />
        </div>
        <br /><br />
        <h6>Business</h6>
        <q-select
          filled
          v-model="businessFilter"
          use-input
          input-debounce="0"
          use-chips
          multiple
          :options="bizStore.businessList"
          option-label="biz_name"
          option-value="biz_id"
        />
        <br /><br />
        <h6>Price Range</h6>
        <q-range
          v-model="priceFilter"
          label-always
          :min="0"
          :max="Math.max(...filteredProductList.map((p) => p.prod_price))"
          color="primary"
        />
      </div>
      <div
        class="col-span-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-1"
        v-if="filteredProductList.length > 0"
      >
        <template v-for="p in filteredProductList" :key="p.prod_id">
          <ViewProductDetails
            :product="p"
            :exists="
              !!wishlist.find(
                (wl) => wl === filteredProductList[selected].prod_id
              )
            "
            :flex="'column'"
            :hide="true"
            @save-to-wishlist="
              saveToWishlist(filteredProductList[selected].prod_id)
            "
            @add-to-cart="addToCart(filteredProductList[selected].prod_id)"
            @click="openDialog(filteredProductList.indexOf(p))"
            class="cursor-pointer"
            style="height: 400px;"
          />
        </template>
      </div>
      <div v-else class="col-span-5 flex justify-center items-center">
        <h5 class="text-center">No products found</h5>
      </div>
    </div>
  </q-page>
  <q-dialog v-model="dialog">
    <ViewProductDetails
      :product="filteredProductList[selected]"
      :exists="
        !!wishlist.find((wl) => wl === filteredProductList[selected].prod_id)
      "
      @save-to-wishlist="saveToWishlist(filteredProductList[selected].prod_id)"
      @add-to-cart="addToCart(filteredProductList[selected].prod_id)"
    />
  </q-dialog>
</template>
<style scoped></style>
