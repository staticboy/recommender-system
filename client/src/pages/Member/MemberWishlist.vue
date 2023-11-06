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
        :row-key="prod_name"
        selection="multiple"
        v-model:selected="selected"
        grid
        hide-header
      >
        <template v-slot:item="props">
          <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          >
            <q-card bordered dense>
              <q-separator />
              <q-list dense>
                <q-item
                  v-for="col in props.cols.filter((col) => col.name !== 'desc')"
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
              />
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useMemberStore } from "../../stores/member";
import SearchBar from "../../components/SearchBar.vue";

const memberStore = useMemberStore();
const searchQuery = ref("");
const pagination = ref({
  sortBy: "prod_name",
  descending: false,
  page: 1,
  rowsPerPage: 5,
});

const products = ref([]);
const columns = computed(() => [
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
]);

const filteredProducts = computed(() => {
  return products.value
    .filter((product) => {
      const searchString = searchQuery.value.toLowerCase();

      return Object.values(product)
        .map((value) =>
          typeof value === "string" ? value.toLowerCase() : value
        )
        .some((value) => value.toString().includes(searchString));
    })
    .slice();
});
onBeforeMount(async () => {
  products.value = await memberStore.getMemberWishlist(
    memberStore.memberDetails.user_id
  );
});
</script>
