<script setup lang="ts">
import { DEMO_PRODUCT_LIST } from "../../constants.ts";

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

const productQuantites = DEMO_PRODUCT_LIST.map(() =>
  Math.round(Math.random() * 10 + 1)
);
</script>
<template>
  <q-table
    :rows="DEMO_PRODUCT_LIST"
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
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <template v-if="col.name === 'prod_title'">
            {{ props.row.prod_name }}
          </template>
          <template v-else-if="col.name === 'prod_desc'">
            {{ props.row.prod_description }}
          </template>
          <template v-else-if="col.name === 'prod_qty'">
            {{ productQuantites[DEMO_PRODUCT_LIST.indexOf(props.row)] }}
          </template>
          <template v-else-if="col.name === 'total_amount'">
            ${{
              (
                props.row.prod_price *
                productQuantites[DEMO_PRODUCT_LIST.indexOf(props.row)]
              ).toFixed(2)
            }}
          </template>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<style scoped></style>
