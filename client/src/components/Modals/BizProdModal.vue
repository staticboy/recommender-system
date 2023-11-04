<template>
  <div class="q-pt-lg q-pl-md q-pb-sm q-pr-xs">
    <div class="q-pa-md">
      <h4>{{ product.prod_id }} : <b>{{ product.prod_name }}</b></h4>
      <!-- insert images -->
    </div>
    <!-- show editable form of values from product -->
    <q-form class="q-gutter-md">
      <q-input
        v-model="product.prod_name"
        label="Product Name"
        dense
        outlined
        class="q-mb-md"
      />
      <q-input
        v-model="product.prod_description"
        label="Description"
        dense
        outlined
        class="q-mb-md"
      />
      <q-input
        v-model="product.prod_stockqty"
        label="Stock Quantity"
        dense
        outlined
        class="q-mb-md"
      />
      <q-input
        v-model="product.prod_price"
        label="Price"
        dense
        outlined
        class="q-mb-md"
      />
      <q-input
        v-model="product.prod_modelnum"
        label="SKU"
        dense
        outlined
        class="q-mb-md"
      />
      <q-select
        v-model="product.cat_id"
        :options="categoryOptions"
        label="Category"
        dense
        outlined
        class="q-mb-md"
      />
      <q-select
        v-model="product.sub_cat"
        :options="subCategoryOptions"
        label="Sub Category"
        dense
        outlined
        class="q-mb-md"
      />
      <q-select
        v-model="product.prod_status"
        :options="availabilityOptions"
        label="Status"
        dense
        outlined
        class="q-mb-md"
      />
      <q-btn
        label="Update"
        color="primary"
        class="q-mt-md"
        @click="requestAction = 1; reverseInitConfirm()"
      />
      <q-btn
        label="Delete"
        color="negative"
        class="q-mt-md"
        @click="requestAction = 2; reverseInitConfirm()"
      />
    </q-form>
</div>
    <q-dialog v-model="initConfirm">
      <q-card style="width: 960px; max-width: 80vw;">
        <q-card-actions align="right">
          <q-btn icon="close" size="md" flat @click="reverseInitConfirm()" class="q-ml-md q-mt-md" />
        </q-card-actions>
        <div class="q-gutter-md pb-4">
        <h6>Confirm Action : {{ actionName[requestAction] }} </h6>
        <div class="q-gutter-md">
          <q-btn
          label="Confirm"
          color="primary"
          class="q-mt-md"
          @click="commitChanges()"
          />
          <q-btn
          label="Cancel"
          color="primary"
          class="q-mt-md"
          @click="reverseInitConfirm()"
          />
        </div>
      </div>
      </q-card>
    </q-dialog>

</template>
  
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useQuasar } from "quasar";
import { useRouter } from 'vue-router';
import { useStore } from './../../stores';

const router = useRouter();
const q = useQuasar();
const store = useStore();
const { selectedProdId } = store.bizOwner;
const categoryOptions = ref();
const subCategoryOptions = ref();
const requestAction = ref(0);

const actionName = ref(["","Update", "Delete"]);

interface Category {
  cat_id: number;
  cat_name: string;
}

const product = ref({
  biz_id: '',
  cat_id: '',
  prod_dateadded: '',
  prod_description: '',
  prod_id: '',
  prod_modelnum: '',
  prod_name: '',
  prod_price: 0,
  prod_status: '',
  prod_stockqty : 0,
  sub_cat : ''
});

const availabilityOptions = computed(() => [
  {value: 'AVAILABLE', label: 'Yes'},
  {value: 'UNAVAILABLE', label: 'No'},
]);

const updateProduct = () => {
  //update item via api
  // console.log(product.value)
  updateRowProduct()
  // router.go(-1)
};

const deleteRow = (param) => {
  //remove item via api
  // console.log(param)
  deleteRowProduct(param)
  // router.go(-1)
};

const currentProdID = ref();

 // Anything that you want to take from the parent
 const parentProps = defineProps({
  selectedProdId : {
    type : String
  },
  backBtn : {
    type: Function
  },
  parentFetchProdData : {
    type: Function
  },
});

const commitChanges = () => {
  console.log(requestAction.value);
  switch(requestAction.value) {
  case 1:
    updateProduct();
    break;
  case 2:
    deleteRow(product.value.prod_id);
    break;
  default:
    console.warn('action not known');
  }
  //reset to 0
  requestAction.value = 0;
  reverseInitConfirm();
  parentProps.parentFetchProdData();
  parentProps.backBtn(product.value.prod_id);
}

//another function to invoke parent prop function
const invokeToggler = () =>{
  parentProps.backBtn(parentProps.selectedProdId);
};

const initConfirm = ref(false);
const reverseInitConfirm = () => {
  initConfirm.value = !initConfirm.value;
}

// API fetch
const getProdById = async () => {
  try {
    var param = {"prod_id": parentProps.selectedProdId} 
    console.log(param);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/getById`, param);
    console.log(response)
    if (response.statusText === "OK") {
      console.log(response.data);
      product.value = response.data;
      
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

// API update
const updateRowProduct = async () => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/product/editInfo`, product._rawValue);
    console.log(response)
    if (response.statusText === "OK") {
      q.notify({
        type: 'positive',
        message: product._rawValue.prod_name + ': updated successfully'
      })
    } else {
      console.error('Failed to update product data');
      q.notify({
        type: 'negative',
        message: product._rawValue.prod_name + ': update failed'
      })
    }
  } catch (error) {
    console.error('Error while update product data:', error);
    q.notify({
        type: 'negative',
        message: 'Something went wrong.'
      })
  }
};

// API delete
const deleteRowProduct = async (param) => {
  try {
    var prod_id = {"prod_id": param }
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/deleteProd`, prod_id);
    // console.log(response)
    if (response.statusText === "OK") {
      q.notify({
        type: 'positive',
        message: param.prod_name + ': ' + response.data.message
      })
    } else {
      console.error('Failed to delete product data');
      q.notify({
        type: 'negative',
        message: param.prod_name + ': ' + response.data.message
      })
    }
  } catch (error) {
    console.error('Error while deleting product data:', error);
    q.notify({
        type: 'negative',
        message: 'Something went wrong.'
      })
  }
};

const getAllCategrories = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/category/getCatAll`);
    // console.log(response)
    if (response.statusText === "OK") {
      // console.log(response.data);
      //populate Category droplist
      const mappedCategories = response.data
        .filter((x: Category) => x.cat_status === 'ACTIVE')
        .map((category: Category) => ({
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
  console.log(selectedProdId.prod_id);
  getProdById();
  getAllCategrories()
  getAllSubCategories()
});
</script>