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
            <q-btn size="sm" color="primary" round dense @click="viewRow(props.row)"
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
        
      </template>
    </q-table>
    
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SearchBar from './SearchBar.vue';
import axios from 'axios';
import { useQuasar } from "quasar";
import { useRouter } from 'vue-router';
import { useStore } from '../stores';
// import { EditProductDetails } from "./../stores/biz/types";

const store = useStore();
const { selectedProdId } = store.bizOwner;

const q = useQuasar();
const filteredProductsRef = ref([]);
const searchQuery = ref('');
const categoryOptions = ref();
const subCategoryOptions = ref();
const router = useRouter();

const updatedProducts = ref({});

const availabilityOptions = computed(() => [
  {value: 'AVAILABLE', label: 'Yes'},
  {value: 'UNAVAILABLE', label: 'No'},
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

interface Category {
  cat_id: number;
  cat_name: string;
}

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

const viewRow = (row) => {
  router.push({path : '/biz/products-form'});
  
  selectedProdId.prod_id = row.prod_id;
  // console.log(selectedProdId.prod_id);
};

//APIs
const fetchProductData = async () => {
  try {
    //change biz id value to the id of current login biz owner
    var param = {"biz_id": localStorage.getItem("userId")} 
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/getByBizId`, param);
    // console.log(response)
    if (response.statusText === "OK") {
      filteredProductsRef.value = response.data;
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

const getAllCategrories = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/category/getCatAll`);
    // console.log(response)
    if (response.statusText === "OK") {
      // console.log(response.data);
      //populate Category droplist
      const mappedCategories = response.data.map((category: Category) => ({
        value: category.cat_id,
        label: category.cat_name
      }));
      categoryOptions.value = [ 
        ...mappedCategories
      ];
    } else {
      console.error('Failed to fetch category data');
    }
  } catch (error) {
    console.error('Error while fetching category data:', error);
  }
};

const getAllSubCategories = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/category/getSubCatActive`);
    // console.log(response)
    if (response.statusText === "OK") {
      // console.log(response.data);
      //populate sub category droplist
      subCategoryOptions.value = response.data.map((subcategory: { subcat_name: any; }) => subcategory.subcat_name);
    } else {
      console.error('Failed to fetch sub category data');
    }
  } catch (error) {
    console.error('Error while fetching sub category data:', error);
  }
};


onMounted(() => {
  q.loading.show();
  fetchProductData();
  getAllCategrories()
  getAllSubCategories()
  q.loading.hide();
});

</script>