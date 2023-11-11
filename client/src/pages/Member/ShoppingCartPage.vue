<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { QTableColumn, useQuasar } from "quasar";
import { useMemberStore } from "../../stores/member";
import { useProductStore } from "../../stores/product";
import { ProductQuantity } from "../../stores/member/types";

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
    name: "prod_description",
    required: true,
    label: "Product Description",
    align: "left",
    field: "prod_description",
    sortable: true,
  },
  {
    name: "quantity",
    required: true,
    label: "Quantity",
    align: "left",
    field: "quantity",
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
const pagination = ref({
  rowsPerPage: 0,
});

const q = useQuasar();
const memberStore = useMemberStore();
const productStore = useProductStore();
const cartItems = ref<ProductQuantity[]>([]);
const pendingItem = ref<ProductQuantity>();
const deleteItemByQtyDialog = ref(false);
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
  if (pendingItem.value && pendingItem.value.prod_id !== "") {
    pendingItem.value = {
      biz_id: "",
      prod_id: "",
      prod_name: "",
      prod_description: "",
      quantity: 0,
      prod_price: 0,
    };
  } else {
    const item = cartItems.value.find(
      (item) => item.prod_id === pendingItem.value?.prod_id
    );
    if (item) item.quantity = 1;
  }
  deleteItemByQtyDialog.value = false;
};
const cancelDeleteByQty = () => {
  const item = cartItems.value.find(
    (item) => item.prod_id === pendingItem.value?.prod_id
  );
  if (item) item.quantity = 1;
  pendingItem.value = {
    biz_id: "",
    prod_id: "",
    prod_name: "",
    prod_description: "",
    quantity: 0,
    prod_price: 0,
  };
  deleteItemByQtyDialog.value = false;
};
const getCartTotalPrice = () => {
  let totalPrice = 0;
  for (const item of cartItems.value) {
    totalPrice += item.quantity * item.prod_price;
  }
  return totalPrice;
};
const checkQty = (item: ProductQuantity) => {
  if (item.quantity < 1) {
    pendingItem.value = item;
    deleteItemByQtyDialog.value = true;
  }
};
const checkoutCart = async () => {
  const resp = await memberStore.memberSendTransaction({
    user_id:
      localStorage.getItem("userId") || memberStore.memberDetails.user_id,
    total_amount: getCartTotalPrice(),
    prod_quantity: cartItems.value,
  });
  if (resp) {
    cartItems.value = [];
    memberStore.getMemberCart(
      localStorage.getItem("userId") || memberStore.memberDetails.user_id
    );
    q.notify({
      message: "Purchase successful",
      icon: "check",
      color: "positive",
    });
  } else {
    q.notify({
      message: "Purchase failed",
      icon: "close",
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
        biz_id: prodDetails.biz_id,
        prod_id: prod,
        prod_name: prodDetails.prod_name,
        prod_description: prodDetails.prod_description,
        prod_price: prodDetails.prod_price,
        quantity: 1,
      });
    }
  }
});
</script>
<template>
  <q-page>
    <div class="grid grid-cols-6 gap-4">
      <div class="col-span-4">
        <q-table
          hide-bottom
          virtual-scroll
          :pagination="pagination"
          :rows="cartItems"
          :columns="columns"
          :row-key="(row) => row.prod_id"
          :rows-per-page-options="[0]"
          :virtual-scroll-sticky-size-start="48"
          class="sticky-virtscroll-table"
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
                  col.name === 'prod_description'
                    ? 'max-width: 400px'
                    : col.name === 'prod_name'
                    ? 'max-width: 250px'
                    : 'max-width: 50px'
                "
              >
                <template v-if="col.name === 'prod_name'">
                  {{ props.row.prod_name }}
                </template>
                <template v-else-if="col.name === 'prod_description'">
                  {{ props.row.prod_description }}
                </template>
                <template v-else-if="col.name === 'quantity'">
                  <q-input
                    filled
                    dense
                    type="number"
                    v-model.number="props.row.quantity"
                    @update:model-value="checkQty(props.row)"
                  />
                </template>
                <template v-else-if="col.name === 'total_amount'">
                  ${{ props.row.prod_price * props.row.quantity }}
                </template>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <q-card class="col-span-2 py-1">
        <q-card-section>
          <h5>Order Summary</h5>
        </q-card-section>
        <q-card-section class="row justify-between items-center">
          <div>Subtotal ({{ cartItems.length }} items)</div>
          <b>${{ getCartTotalPrice().toFixed(2) }}</b>
        </q-card-section>
        <q-card-section class="row justify-between items-center">
          <div>Shipping</div>
          <div>Free</div>
        </q-card-section>
        <q-card-section class="row justify-between items-center">
          <div>Promotion</div>
          <div>None</div>
        </q-card-section>
        <q-card-section class="row justify-between items-center">
          <h6>Total</h6>
          <b>${{ getCartTotalPrice().toFixed(2) }}</b>
        </q-card-section>
        <q-card-actions>
          <q-btn
            color="primary"
            label="Checkout"
            class="mx-2 mb-2"
            style="width: 100%"
            @click="checkoutCart()"
          />
        </q-card-actions>
      </q-card>
    </div>
    <div class="mt-4">
      <h6>Check out some of these products!</h6>
    </div>
  </q-page>

  <q-dialog v-model="deleteItemByQtyDialog">
    <q-card v-if="pendingItem">
      <q-card-section>
        Are you sure you want to delete this item from your cart?
      </q-card-section>
      <q-card-actions class="row justify-between items-center">
        <q-btn
          label="No"
          color="negative"
          @click="cancelDeleteByQty"
          style="width: 45%"
        />
        <q-btn
          label="Yes"
          color="positive"
          @click="deleteItem(cartItems.indexOf(pendingItem))"
          style="width: 45%"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped lang="scss">
.sticky-virtscroll-table {
  height: 355px;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: #fff;
  }
  thead tr th {
    position: sticky;
    z-index: 1;
  }
  thead tr:last-child th {
    top: 48px;
  }
  thead tr:first-child th {
    top: 0;
  }
  tbody {
    scroll-margin-top: 48px;
  }
}
</style>
