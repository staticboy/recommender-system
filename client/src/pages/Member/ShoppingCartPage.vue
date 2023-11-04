<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { QTableColumn, useQuasar } from "quasar";
import { useMemberStore } from "../../stores/member";
import { useProductStore } from "../../stores/product";

const columns = [
  {
    name: "prod_name",
    required: true,
    label: "Product Name",
    align: "left",
    field: "prod_name",
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
    label: "Quantity",
    align: "left",
    field: "prod_qty",
    sortable: true,
  },
  {
    name: "total_amount",
    label: "Total",
    align: "left",
    field: "total_amount",
    sortable: true,
  },
] as QTableColumn[];

const q = useQuasar();
const memberStore = useMemberStore();
const productStore = useProductStore();
const cartItems = ref<
  {
    prod_id: string;
    prod_name: string;
    prod_desc: string;
    prod_qty: number;
    prod_price: number;
  }[]
>([]);
const deleteItem = async (key: number) => {
  const resp = await memberStore.deleteFromCart({
    user_id:
      localStorage.getItem("userId") || memberStore.memberDetails.user_id,
    prod_id: cartItems.value[key].prod_id,
  });

  if (resp) {
    cartItems.value.splice(key, 1);
    q.notify({
      message: "Deleted from cart",
      icon: "delete",
      color: "positive",
    });
  } else {
    q.notify({
      message: "Failed to delete from cart",
      icon: "delete",
      color: "negative",
    });
  }
};

onBeforeMount(async () => {
  const cartProducts = await memberStore.getMemberCart(
    localStorage.getItem("userId") || memberStore.memberDetails.user_id
  );
  if (cartProducts.length > 0) {
    for (const prod of cartProducts) {
      const prodDetails = await productStore.getProductDetail(prod);
      cartItems.value.push({
        prod_id: prod,
        prod_name: prodDetails.prod_name,
        prod_desc: prodDetails.prod_description,
        prod_price: prodDetails.prod_price,
        prod_qty: 1,
      });
    }
  }
});
</script>
<template>
  {{ cartItems }}
  <q-table
    :rows="cartItems"
    :rows-per-page-options="[10, 20, 30, 40]"
    :columns="columns"
    :row-key="(row) => row.prod_id"
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
            @click="deleteItem(cartItems.indexOf(props.row))"
          />
        </q-td>
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="overflow-hidden"
          :style="
            col.name === 'prod_desc'
              ? 'max-width: 400px'
              : col.name === 'prod_name'
              ? 'max-width: 250px'
              : 'max-width: 50px'
          "
        >
          <template v-if="col.name === 'prod_name'">
            {{ props.row.prod_name }}
          </template>
          <template v-else-if="col.name === 'prod_desc'">
            {{ props.row.prod_desc }}
          </template>
          <template v-else-if="col.name === 'prod_qty'">
            {{ props.row.prod_qty }}
          </template>
          <template v-else-if="col.name === 'total_amount'">
            ${{ props.row.prod_price * props.row.prod_qty }}
          </template>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<style scoped></style>
