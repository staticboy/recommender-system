<template>
  <div>
    <SearchBar v-model="searchQuery" class="q-mb-md" />

    <q-table :rows="filteredTransactions" :rows-per-page-options="[5, 10, 20, 30]" :columns="columns"
      :row-key="row => row.purchase_id">
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
            <q-btn size="sm" color="primary" round dense @click="toggleRowExpansion(props.row)"
              :icon="props.row.expanded ? 'remove' : 'add'" />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <template v-if="col.name === 'prod_qty'">
              <div>
                <template v-for="item in props.row.prod_qty">
                  <div>
                    {{ item.prod_name }} ({{ item.quantity }})
                    <!-- <q-btn size="sm" color="primary" @click="openRatingDialog(item)">
                      Rate Product
                    </q-btn> -->
                  </div>
                </template>
              </div>
            </template>
            <template v-else>
              {{ props.row[col.field] }}
            </template>
          </q-td>
        </q-tr>
        <q-tr v-show="props.row.expanded" :props="props">
          <q-td colspan="100%">
            <div class="text-left">Rate the following purchased products:</div>
            <template v-for="item in props.row.prod_qty">
              <div>
                {{ item.prod_name }} ({{ item.quantity }})
                <q-btn size="sm" color="primary" @click="openRatingDialog(item)" class="q-ml-md">
                  Rate
                </q-btn>
              </div>
            </template>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="ratingDialog" persistent>
      <q-card>
        <q-card-section>
          <h5>Rate: {{ selectedProduct.prod_name }}</h5>
          <div>
            <q-icon v-for="i in 5" :key="i" :name="getStarIcon(rating)" @click="setRating(i)" />
          </div>
          <div>
            <q-input type="textarea" outlined rows="2" label="Remarks"/>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="Submit" @click="closeRatingDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import SearchBar from './SearchBar.vue';

const searchQuery = ref('');
const pagination = ref({
  sortBy: 'prod_name',
  descending: false,
  page: 1,
  rowsPerPage: 5,
});
const ratingDialog = ref(false);
const selectedProduct = ref(null);

const transactions = ref([
  {
    purchase_id: 'M0PJ001',
    prod_qty: [
      {
        prod_id: 'P0PJ001',
        prod_name: 'Golf Club Set',
        quantity: 1,
        prod_price: 499.99,
      },
      {
          prod_id: 'P0PJ002',
          prod_name: 'Golf Ball Pack',
          quantity: 1,
          prod_price: 29.99,
      },
    ],
    total_amount: 529.98,
    purchase_date: '2023/09/13',
  },
  {
    purchase_id: 'M0PJ002',
    prod_qty: [
      {
        prod_id: 'P0PJ003',
        prod_name: 'Golf Glove',
        quantity: 3,
        prod_price: 19.99,
      },
    ],
    total_amount: 59.97,
    purchase_date: '2023/09/14',
  },
  {
    purchase_id: 'M0PJ003',
    prod_qty: [
      {
        prod_id: 'P0PJ004',
        prod_name: 'Golf Cart Bag',
        quantity: 1,
        prod_price: 129.99,
      },
    ],
    total_amount: 129.99,
    purchase_date: '2023/09/15',
  },
]);

const columns = computed(() => [
  {
    name: 'purchase_id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'purchase_id',
    sortable: true,
  },
  {
    name: 'prod_qty',
    required: true,
    label: 'Items Bought (Quantity)',
    align: 'left',
    field: 'prod_qty',
    sortable: true,
  },
  {
    name: 'total_amount',
    label: 'Total Amount (in $)',
    align: 'left',
    field: 'total_amount',
    sortable: true,
  },
  {
    name: 'purchase_date',
    label: 'Date of Purchase',
    align: 'right',
    field: 'purchase_date',
    sortable: true,
  },
]);

const filteredTransactions = computed(() => {
  return transactions.value.filter((transaction) => {
    const searchString = searchQuery.value.toLowerCase();

    return (
      Object.values(transaction)
        .map((value) => (typeof value === 'string' ? value.toLowerCase() : value))
        .some((value) => value.toString().includes(searchString))
    );
  }).slice(
  );
});

const toggleRowExpansion = (row) => {
  row.expanded = !row.expanded;
};

const getStarIcon = (rating, index) => {
  return index <= rating ? 'star' : 'star_border';
};

const rateProduct = (item, rating) => {
  item.rating = rating;
};

const openRatingDialog = (product) => {
  selectedProduct.value = product;
  ratingDialog.value = true;
};

const closeRatingDialog = () => {
  ratingDialog.value = false;
};

const setRating = (rating) => {
  if (selectedProduct.value) {
    selectedProduct.value.rating = rating;
  }
  // closeRatingDialog();
};

</script>
