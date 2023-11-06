<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";
import { useCategoryStore } from "../../stores/category";
import { useProductStore } from "../../stores/product";
import { useMemberStore } from "../../stores/member";
import { useBizOwnerStore } from "../../stores/biz";
import ViewProductDetails from "../../components/Modals/ViewProductDetails.vue";
import { CategoryDetails } from "../../stores/category/types";
import { BizProfileDetails } from "../../stores/biz/types";
import { ProductDetails } from "../../stores/product/types";

const route = useRoute();
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const memberStore = useMemberStore();
const bizStore = useBizOwnerStore();
const wishlist = ref<string[]>([]);
const { memberDetails } = useMemberStore();
const dialog = ref(false);
// Search and filter vaariables
const searchTerm = ref("");
const categoryFilter = ref<CategoryDetails[]>([]);
const businessFilter = ref<BizProfileDetails[]>([]);
const selected = ref(0);
const filteredProductList = ref<ProductDetails[]>([]);

const addCategoryToFilter = async (cat_id: string) => {
  if (!categoryFilter.value.find((cf) => cf.cat_id === cat_id)) {
    filteredProductList.value = await productStore.getProductsByCategory(cat_id);
    categoryFilter.value.push(
      categoryStore.categoryList.find(
        (c) => c.cat_id === cat_id
      ) as CategoryDetails
    );
  }
};
const removeCategoryFromFilter = (cat_id: string) => {
  categoryFilter.value = categoryFilter.value.filter(
    (cf) => cf.cat_id !== cat_id
  );
};
const addBusinessToFilter = async (biz_id: string) => {
  if (!businessFilter.value.find((bf) => bf.biz_id === biz_id)) {
    filteredProductList.value = await productStore.getProductsByBusiness(biz_id);
    businessFilter.value.push(
      bizStore.businessList.find(
        (b) => b.biz_id === biz_id
      ) as BizProfileDetails
    );
  }
};
const removeBusinessFromFilter = (biz_id: string) => {
  businessFilter.value = businessFilter.value.filter(
    (bf) => bf.biz_id !== biz_id
  );
};
const openDialog = (index: number) => {
  selected.value = index;
  dialog.value = !dialog.value;
};
watch(
  () => [searchTerm, categoryFilter, businessFilter],
  () => {
    // search bar
    if (searchTerm.value.length > 0) {
      filteredProductList.value = productStore.productList.filter((prod) => {
        return prod.prod_name
          .toLowerCase()
          .includes(searchTerm.value.toLowerCase());
      });
    }
    // category selection
    if (categoryFilter.value.length > 0) {
      filteredProductList.value = productStore.productList.filter((prod) => {
        return (
          categoryFilter.value.find((cf) => cf.cat_id === prod.cat_id) !==
          undefined
        );
      });
    }
    // business selection
    if (businessFilter.value.length > 0) {
      filteredProductList.value = productStore.productList.filter((prod) => {
        return (
          businessFilter.value.find((bf) => bf.biz_id === prod.biz_id) !==
          undefined
        );
      });
    }
  },
  { deep: true, immediate: true }
);
onBeforeMount(async () => {
  if (categoryStore.categoryList.length === 0) {
    await categoryStore.getAllCategories();
  }
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
      }
    } else {
      await addBusinessToFilter(route.query.businessId);
    }
  }
});
</script>
<template>
  {{ filteredProductList.length }}
  <q-page>
    <q-input clearable outlined v-model="searchTerm" label="Search Products" />
    <div class="overflow-hidden pl-2" style="height: 1.5em">
      <span
        v-for="cat in categoryStore.categoryList.filter(
          (c) => c.cat_status === 'ACTIVE'
        )"
        :key="cat.cat_id"
        class="mr-2 cursor-pointer"
        @click="addCategoryToFilter(cat.cat_id)"
      >
        {{ cat.cat_name }}
      </span>
    </div>
    <div class="grid grid-cols-6 w-full">
      <div class="col-span-1">
        <h5>Filters</h5>
        <br /><br />
        <h6>Selected Category</h6>
        <template v-if="categoryFilter">
          <q-chip
            v-for="cat in categoryFilter"
            :key="cat.cat_id"
            removable
            @remove="removeCategoryFromFilter(cat.cat_id)"
          >
            {{ cat.cat_name }}
          </q-chip>
        </template>
        <br /><br />
        <h6>Business</h6>
        <template v-if="businessFilter">
          <q-chip
            v-for="biz in businessFilter"
            :key="biz.biz_id"
            removable
            @remove="removeBusinessFromFilter(biz.biz_id)"
          >
            {{ biz.biz_name }}
          </q-chip>
        </template>
        <br /><br />
        <h6>Product</h6>
      </div>
      <div
        class="col-span-5 grid grid-cols-3 gap-3"
        v-if="filteredProductList.length > 0"
      >
        <template v-for="p in filteredProductList" :key="p.prod_id">
          <q-card
            dark
            bordered
            class="flex flex-col justify-center items-center rounded-xl cursor-pointer q-px-sm q-py-lg"
            @click="openDialog(filteredProductList.indexOf(p))"
          >
            <q-card-section>
              <div class="text-h6">{{ p.prod_name }}</div>
              <div class="text-subtitle2">{{ p.prod_description }}</div>
            </q-card-section>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>
          </q-card>
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
      :wishlist="
        !!wishlist.find((wl) => wl === filteredProductList[selected].prod_id)
      "
      :save-to-wishlist="wishlist.push(filteredProductList[selected].prod_id)"
    />
  </q-dialog>
</template>
<style scoped></style>
