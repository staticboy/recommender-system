<template>
  <div>
    <SearchBar v-model="searchQuery" class="q-mb-md" />

    <q-table
      :rows="filteredTransactions"
      :rows-per-page-options="[5, 10, 20, 30]"
      :columns="columns"
      :row-key="(row) => row.purchase_id"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <template v-if="col.name === 'prod_qty'">
              <q-btn
                size="sm"
                color="primary"
                round
                dense
                @click="toggleRowExpansion(props.row)"
                :icon="props.row.expanded ? 'remove' : 'add'"
              />
              Expand to view purchased products
              <template v-for="item in props.row.prod_qty">
                <div>
                  {{ item.prod_name }} ({{ item.quantity }})
                  <!-- <q-btn size="sm" color="primary" @click="openRatingDialog(item)">
                    Rate Product
                  </q-btn> -->
                </div>
              </template>
            </template>
            <template v-else>
              {{ props.row[col.field] }}
            </template>
          </q-td>
        </q-tr>
        <q-tr v-show="props.row.expanded" :props="props">
          <q-td colspan="100%">
            <div class="text-left">Rate the following purchased products:</div>
            <template v-for="item in props.row.prod_quantity">
              <div>
                {{ item.prod_name }} ({{ item.quantity }})
                <q-btn
                  size="sm"
                  color="primary"
                  @click="openRatingDialog(item)"
                  class="q-ml-md"
                >
                  Rate
                </q-btn>
              </div>
            </template>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="ratingDialog" persistent>
      <q-card v-if="selectedProduct">
        <q-card-section>
          <h5>Rate: {{ selectedProduct.prod_name }}</h5>
          <div>
            <q-icon
              v-for="i in 5"
              :key="i"
              :name="getStarIcon(selectedProduct.rating || 0, i)"
              size="md"
              @click="setRating(i)"
            />
          </div>
          <div>
            <q-input
              v-model="selectedProduct.remarks"
              type="textarea"
              outlined
              rows="2"
              label="Remarks"
            />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Close" @click="closeRatingDialog" />
          <q-btn color="primary" label="Submit" @click="submitRating" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { useMemberStore } from "../stores/member";
import { useProductStore } from "../stores/product";
import SearchBar from "./SearchBar.vue";
import {
  MemberPastTransactions,
  ProductQuantity,
} from "../stores/member/types";
import { useQuasar } from "quasar";
import { QTableColumn } from "quasar";

const q = useQuasar();
const memberStore = useMemberStore();
const searchQuery = ref("");
const ratingDialog = ref(false);
const selectedProduct = ref<ProductQuantity>();
const transactions = ref<MemberPastTransactions[]>([]);

const columns = [
  {
    name: "purchase_id",
    required: true,
    label: "ID",
    align: "left",
    field: "purchase_id",
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
  {
    name: "purchase_date",
    label: "Date of Purchase",
    align: "right",
    field: "purchase_date",
    sortable: true,
  },
] as QTableColumn[];

const filteredTransactions = computed(() => {
  return transactions.value
    .filter((transaction) => {
      const searchString = searchQuery.value.toLowerCase();

      return Object.values(transaction)
        .map((value) =>
          typeof value === "string" ? value.toLowerCase() : value
        )
        .some((value) => value.toString().includes(searchString));
    })
    .slice();
});

const toggleRowExpansion = (row: any) => {
  row.expanded = !row.expanded;
};

const getStarIcon = (rating: number, index: number) => {
  return index <= rating ? "star" : "star_border";
};

const openRatingDialog = (product: ProductQuantity) => {
  selectedProduct.value = product;
  ratingDialog.value = true;
};

const closeRatingDialog = () => {
  ratingDialog.value = false;
};

const setRating = (rating: number) => {
  if (selectedProduct.value) {
    console.log(rating);
    selectedProduct.value.rating = rating;
  }
};
const submitRating = async () => {
  if (selectedProduct.value) {
    const resp = await memberStore.memberSubmitProductRating({
      user_id: memberStore.memberDetails.user_id,
      prod_id: selectedProduct.value.prod_id,
      rating: selectedProduct.value.rating || 0,
      remarks: selectedProduct.value.remarks || "",
    });
    if (resp) {
      q.notify({
        type: "positive",
        message: "Rating submitted successfully",
      });
      ratingDialog.value = false;
    } else {
      q.notify({
        type: "negative",
        message: "Error submitting rating",
      });
    }
  }
};

onBeforeMount(async () => {
  const productStore = useProductStore();
  transactions.value = await memberStore.getMemberPastTransactions(
    memberStore.memberDetails.user_id
  );
  for (const tran of transactions.value) {
    for (const prod of tran.prod_quantity) {
      const product = await productStore.getProductDetail(prod.prod_id);
      prod.prod_name = product.prod_name;
    }
  }
});
</script>
