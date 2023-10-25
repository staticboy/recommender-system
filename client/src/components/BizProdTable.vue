<template>
  <div>
    <SearchBar v-model="searchQuery" class="q-mb-md" />

    <q-table :rows="filteredProducts" :rows-per-page-options="[10, 20, 30]" :columns="columns"
      :row-key="row => row.id">
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
            <template v-if="col.name === 'prod_status'">
              <q-badge :color="props.row.prod_status === 'AVAILABLE' ? 'green' : 'red'" :label="props.row.prod_status" />
            </template>
            <template v-else-if="col.name === 'prod_stockqty'">
              <span :style="stockQtyStyle(props.row.prod_stockqty)">
                {{ props.row.prod_stockqty }}
              </span>
            </template>
            <template v-else>
              {{ props.row[col.field] }}
            </template>
          </q-td>
        </q-tr>
        <q-tr v-if="props.row.expanded" :props="props">
          <q-td colspan="100%">
            <div class="row">
              <div class="col">
                <q-input outlined v-model="props.row.prod_name" label="Name" dense required type="text"
                  class="q-mr-md"></q-input>
              </div>
              <div class="col">
                <q-input outlined v-model="props.row.prod_description" label="Description" dense required type="text"
                  class="q-mr-md"></q-input>
              </div>
              <div class="col">
                <q-input outlined v-model="props.row.prod_stockqty" label="Stock Qty" dense required type="number"
                  class="q-mr-md"></q-input>
              </div>
              <div class="col">
                <q-input outlined v-model="props.row.prod_price" label="Price" dense required type="number"
                  class="q-mr-md"></q-input>
              </div>
              <div class="col">
                <q-input outlined v-model="props.row.prod_modelnum" label="Model Number" dense required type="text"
                  class="q-mr-md"></q-input>
              </div>
              <div class="col">
                <q-select v-model="props.row.cat_id" :options="categoryOptions" label="Category" dense class="q-mr-md" />
              </div>
              <div class="col">
                <q-select v-model="props.row.sub_cat" :options="subCategoryOptions" label="Sub-category" dense
                  class="q-mr-md" />
              </div>
              <div class="col">
                <q-select v-model="props.row.prod_status" :options="availabilityOptions" label="Available?" dense
                  class="q-mr-md" />
              </div>
              <div class="col">
                <q-btn type="submit" color="primary" label="Update" @click="updateRow(props.row)" class="q-mt-md q-mr-md" dense></q-btn>
                <q-btn type="submit" color="red" label="Delete" @click="deleteRow(props.row)" class="q-mt-md q-mr-md" dense></q-btn>
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>


<script setup>
import { ref, computed, watch, reactive, onMounted } from 'vue';
import SearchBar from './SearchBar.vue';
import axios from 'axios';
import { date, useQuasar } from "quasar";
// import { DEMO_PRODUCT_LIST } from '../constants.ts'

const q = useQuasar();
const filteredProductsRef = ref([]);
const searchQuery = ref('');
const pagination = ref({
  sortBy: 'prod_name',
  descending: false,
  page: 1,
  rowsPerPage: 10,
});

const updatedProfile = ref({
  prod_id: '',
  updated_name: '',
  updated_description: '',
  updated_price: 0,
  updated_stockqty: 0,
  updated_modelnum: '',
  updated_status: '',
});

const updateRow = (row) => {
  //jsonb in backend function accepts different key names
  //sorry :'(
  updatedProfile._rawValue.prod_id = row.prod_id;
  updatedProfile._rawValue.updated_name = row.prod_name;
  updatedProfile._rawValue.updated_description = row.prod_description;
  updatedProfile._rawValue.updated_price = row.prod_price;
  updatedProfile._rawValue.updated_modelnum = row.prod_modelnum;
  updatedProfile._rawValue.updated_stockqty = row.prod_stockqty;
  updatedProfile._rawValue.updated_status = row.prod_status;



  toggleRowExpansion(row);
  console.warn(updatedProfile._rawValue);
  updateRowProduct();
};

const deleteRow = (key) => {
  //remove item via api
  filteredProductsRef.value.splice(key, 1);
  q.notify({
    message: "Deleted from cart",
    icon: "delete",
    color: "positive",
  });
};

const categoryOptions = computed(() => [
  'Golf',
  'Tennis',
  'Basketball',
  'Soccer',
]);

const subCategoryOptions = computed(() => [
  'Equipment',
  'Apparel',
  'Accesories',
  'Footwear',
]);

const availabilityOptions = computed(() => [
  'AVAILABLE',
  'UNAVAILABLE',
]);

const columns = computed(() => [
  {
    name: 'prod_id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'prod_id',
    sortable: true,
  },
  {
    name: 'prod_name',
    required: true,
    label: 'Product Name',
    align: 'left',
    field: 'prod_name',
    sortable: true,
  },
  {
    name: 'prod_description',
    label: 'Description',
    align: 'left',
    field: 'prod_description',
    sortable: true,
  },
  {
    name: 'prod_stockqty',
    label: 'Stock Quantity',
    align: 'right',
    field: 'prod_stockqty',
    sortable: true,
  },
  {
    name: 'prod_price',
    label: 'Price',
    align: 'right',
    field: 'prod_price',
    sortable: true,
  },
  {
    name: 'prod_modelnum',
    label: 'SKU',
    align: 'left',
    field: 'prod_modelnum',
    sortable: true,
  },
  {
    name: 'cat_id',
    label: 'Category',
    align: 'left',
    field: 'cat_id',
    sortable: true,
  },
  {
    name: 'sub_cat',
    label: 'Sub Category',
    align: 'left',
    field: 'sub_cat',
    sortable: true,
  },
  {
    name: 'prod_status',
    label: 'Status',
    align: 'left',
    field: 'prod_status',
    sortable: true,
  },
]);

const filteredProducts = computed(() => {
  return filteredProductsRef.value.filter((product) => {
    const searchString = searchQuery.value.toLowerCase();
    return (
      Object.values(product)
        .map((value) => (typeof value === 'string' ? value.toLowerCase() : value))
        .some((value) => value.toString().includes(searchString))
    );
  }).slice(
  );
});

const stockQtyStyle = ref((stockQty) => {
  return {
    color: stockQty < 20 ? 'red' : 'inherit',
    'font-weight': stockQty < 20 ? 'bold' : 'normal',
  };
});

const toggleRowExpansion = (row) => {
  row.expanded = !row.expanded;
  console.log(row.prod_name);
};

const fetchProductData = async () => {
  try {
    //change biz id value to the id of current login biz owner
    var param = {"biz_id": localStorage.getItem("userId")} 
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/getByBizId`, param);
    console.log(response)
    if (response.statusText === "OK") {
      filteredProductsRef.value = response.data;
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};


const updateRowProduct = async () => {
  try {
    //change biz id value to the id of current login biz owner
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/product/editInfo`, updatedProfile._rawValue);
    console.log(response)
    if (response.statusText === "OK") {
      fetchProductData();
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

onMounted(() => {
  q.loading.show();
  fetchProductData();
  q.loading.hide();
});

</script>