<template>
  <q-page>
    <div class="q-pa-md">
      <div class="col-9">
        <h1 class="q-mb-md">Wishlist</h1>
      </div>
      <SearchBar v-model="searchQuery" class="q-mb-md" />

      <q-table
        :rows="filteredProducts"
        :rows-per-page-options="[10, 20, 30]"
        :columns="columns"
        :row-key="(row) => row.prod_id"
        selection="multiple"
        grid
        hide-header
        :pagination="pagination"
      >
        <template v-slot:item="props">
          <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          >
            <q-card bordered dense>
              <q-separator />
              <q-list dense>
                <q-item
                  v-for="col in props.cols.filter((c: any) => c.name !== 'desc')"
                  :key="col.prod_name"
                >
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ col.value }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-separator />
              <q-btn
                color="primary"
                rounded
                glossy
                icon="shopping_cart"
                class="btn-fixed-width"
                @click="addToCart(props.row.prod_id)"
              />
              <q-btn
                color="primary"
                rounded
                label="remove from wishlist"
                @click="removeFromWishlist(props.row.prod_id)"
              />
              <q-icon name="heart" color="red" />
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { useMemberStore } from "../../stores/member";
import SearchBar from "../../components/SearchBar.vue";
import { QTableColumn, useQuasar } from "quasar";

const q = useQuasar();
const memberStore = useMemberStore();
const searchQuery = ref("");
const pagination = ref({
  sortBy: "prod_name",
  descending: false,
  page: 1,
  rowsPerPage: 6,
});

const products = ref<{ user_id: string; prod_id: string }[]>([]);
const columns = [
  {
    name: "prod_id",
    required: true,
    label: "ID",
    align: "left",
    field: "prod_id",
    sortable: true,
  },
  {
    name: "prod_name",
    required: true,
    label: "Product Name",
    align: "left",
    field: (row) => row.prod_name + " (" + row.prod_modelnum + ")",
    sortable: true,
  },
  {
    name: "prod_stockqty",
    label: "Stock Quantity",
    align: "right",
    field: "prod_stockqty",
    sortable: true,
  },
  {
    name: "prod_price",
    label: "Price",
    align: "right",
    field: (row) => "$" + row.prod_price,
    sortable: true,
  },
  {
    name: "cat_id",
    label: "Category",
    align: "left",
    field: (row) => row.cat_id + " - " + row.sub_cat,
    sortable: true,
  },
  {
    name: "biz_name",
    label: "Seller",
    align: "left",
    field: "biz_name",
    sortable: true,
  },
] as QTableColumn[];

const filteredProducts = computed(() => {
  return products.value
    .filter((product) => {
      const searchString = searchQuery.value.toLowerCase();

      return Object.values(product)
        .map((val) => (typeof val === "string" ? val.toLowerCase() : val))
        .some((val) => val.toString().includes(searchString));
    })
    .slice();
});
const addToCart = async (id: string) => {
  await memberStore.addProductToCart({
    user_id: memberStore.memberDetails.user_id,
    prod_id: id,
  });
};
const removeFromWishlist = async (id: string) => {
  const resp = await memberStore.deleteProductFromWishlist({
    user_id: memberStore.memberDetails.user_id,
    prod_id: id,
  });
  if (resp) {
    products.value = products.value.filter((p) => p.prod_id !== id);
    q.notify({
      type: "positive",
      message: "Product removed from wishlist",
    });
  } else {
    q.notify({
      type: "negative",
      message: "Failed to remove product from wishlist",
    });
  }
};
onBeforeMount(async () => {
  products.value = await memberStore.getMemberWishlist(
    memberStore.memberDetails.user_id || localStorage.getItem("user_id")!
  );
});
</script>
