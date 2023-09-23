<script setup lang="ts">
import { DEMO_PRODUCT_LIST } from "../../constants.ts";
import { ref } from "vue";
import { useQuasar } from "quasar";

const columns = [
  {
    name: "prod_title",
    required: true,
    label: "Product Title",
    align: "left",
    field: "prod_title",
    sortable: true,
  },
  {
    name: "prod_desc",
    required: true,
    label: "Product Description",
    align: "left",
    field: "prod_desc",
    sortable: true,
  },
  {
    name: "prod_qty",
    required: true,
    label: "Items Bought (Quantity)",
    align: "left",
    field: "prod_qty",
    sortable: true,
  },
  {
    name: "total_amount",
    label: "Total Amount (in $)",
    align: "left",
    field: "total_amount",
    sortable: true,
  },
];

const q = useQuasar();
const prodClone = ref([...DEMO_PRODUCT_LIST]);
const productQuantites = prodClone.value.map(() =>
  Math.round(Math.random() * 10 + 1)
);
const deleteItem = (key: number) => {
  prodClone.value.splice(key, 1);
  productQuantites.splice(key, 1);
  q.notify({
    message: "Deleted from cart",
    icon: "delete",
    color: "positive",
  });
};
</script>
<template>
  <q-table
    :rows="prodClone"
    :rows-per-page-options="[10, 20, 30, 40]"
    :columns="columns"
    :row-key="(row) => row.purchase_id"
  >
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th auto-width />
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-btn
            size="sm"
            color="primary"
            round
            dense
            icon="delete"
            @click="deleteItem(prodClone.indexOf(props.row))"
          />
        </q-td>
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <template v-if="col.name === 'prod_title'">
            {{ props.row.prod_name }}
          </template>
          <template v-else-if="col.name === 'prod_desc'">
            {{ props.row.prod_description }}
          </template>
          <template v-else-if="col.name === 'prod_qty'">
            {{ productQuantites[prodClone.indexOf(props.row)] }}
          </template>
          <template v-else-if="col.name === 'total_amount'">
            ${{
              (
                props.row.prod_price *
                productQuantites[prodClone.indexOf(props.row)]
              ).toFixed(2)
            }}
          </template>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<style scoped></style>
