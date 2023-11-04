<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { DEMO_PRODUCT_LIST } from "../../constants.ts";
import { useCategoryStore } from "../../stores/category";
import { useProductStore } from "../../stores/product";
import { useMemberStore } from "../../stores/member";
import { useBizOwnerStore } from "../../stores/biz";
import ViewProductDetails from "../../components/Modals/ViewProductDetails.vue";
import { CategoryDetails } from "../../stores/category/types";
import { BizProfileDetails } from "../../stores/biz/types";

const $q = useQuasar();
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
const categoryFilter = ref<CategoryDetails>();
const businessFilter = ref<BizProfileDetails>();
const selected = ref(0);

const openDialog = (index: number) => {
  selected.value = index;
  dialog.value = !dialog.value;
};
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
    console.log(route.query.businessId)
    businessFilter.value = await bizStore.getBizDetails(
      route.query.businessId as string
    );
  }
});
</script>
<template>
  <q-page>
    <q-input clearable outlined v-model="searchTerm" label="Search Products" />
    <div class="overflow-hidden pl-2" style="height: 1.5em">
      <span
        v-for="cat in categoryStore.categoryList.filter(
          (c) => c.cat_status === 'ACTIVE'
        )"
        :key="cat.cat_id"
        class="mr-2 cursor-pointer"
        @click="categoryFilter = cat"
      >
        {{ cat.cat_name }}
      </span>
    </div>
    <div class="grid grid-cols-6 w-full">
      <div class="col-span-1">
        <h5>Filters</h5>
        <br /><br />
        <h6>Selected Category</h6>
        {{ categoryFilter?.cat_name }}
        <br /><br />
        <h6>Business</h6>
        {{ businessFilter?.biz_name }}
        <br /><br />
        <h6>Product</h6>
      </div>
      <div class="col-span-5 grid grid-cols-3 gap-3">
        <template v-for="p in DEMO_PRODUCT_LIST" :key="p.prod_id">
          <q-card
            dark
            bordered
            class="flex flex-col justify-center items-center rounded-xl cursor-pointer q-px-sm q-py-lg"
            @click="openDialog(DEMO_PRODUCT_LIST.indexOf(p))"
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
    </div>
  </q-page>
  <q-dialog v-model="dialog">
    <ViewProductDetails
      :product="DEMO_PRODUCT_LIST[selected]"
      :wishlist="
        !!wishlist.find(
          (wl) => wl === DEMO_PRODUCT_LIST[selected].prod_id
        )
      "
      :save-to-wishlist="
        wishlist.push(DEMO_PRODUCT_LIST[selected].prod_id)
      "
    />
  </q-dialog>
</template>
<style scoped></style>
