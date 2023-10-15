<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-9">
          <h1 class="q-mb-md">Add New Products</h1>
        </div>
        <q-tabs v-model="selectedTab">
          <q-tab name="tab1" label="Add New Product">
          </q-tab>
          <q-tab name="tab2" label="Import csv files">
          </q-tab>
        </q-tabs>
        
        <div v-if="selectedTab === 'tab1'">
          <div class="col-3">
            <q-uploader label="Product Image" accept=".jpg,.jpeg,.png" v-model="product.image" multiple:max-files="9"
              class="q-mt-md"></q-uploader>
          </div>
          <div class="row">
            <div class="col-6">
              <q-input outlined v-model="product.prod_name" label="Name" dense required type="text"
                class="q-mr-md q-mt-md"></q-input>
            </div>
            <div class="col-6">
              <q-input outlined v-model="product.prod_description" label="Description" dense required type="text"
                class="q-mr-md q-mt-md"></q-input>
            </div>
            <div class="col-4">
              <q-input outlined v-model="product.prod_stockqty" label="Stock Qty" dense required type="number"
                class="q-mr-md q-mt-md"></q-input>
            </div>
            <div class="col-4">
              <q-input outlined v-model="product.prod_price" label="Price" dense required type="number"
                class="q-mr-md q-mt-md"></q-input>
            </div>
            <div class="col-4">
              <q-input outlined v-model="product.prod_modelnum" label="Model Number" dense required type="text"
                class="q-mr-md q-mt-md"></q-input>
            </div>
            <div class="col-4">
              <q-select v-model="product.cat_id" :options="categoryOptions" label="Category" dense
                class="q-mr-md q-mt-md" />
            </div>
            <div class="col-4">
              <q-select v-model="product.sub_cat" :options="subCategoryOptions" label="Sub-category" dense
                class="q-mr-md q-mt-md" />
            </div>
            <div class="col-4">
              <q-select v-model="product.prod_status" :options="availabilityOptions" label="Available?" dense
                class="q-mr-md q-mt-md" />
            </div>
            <div class="col-4">
              <q-btn type="submit" color="primary" label="Save" class="q-mt-md q-mr-md" @click="addProduct" dense></q-btn>
            </div>
          </div>
        </div>
        <div v-if="selectedTab === 'tab2'" class="col-12">
            <div class="col">
              <q-uploader label="Drag and drop files here or click to choose" accept=".csv" v-model="uploadedFiles"
                :url="uploadUrl" @added="onFileAdded" @removed="onFileRemoved" class="q-mt-md">
              </q-uploader>
            </div>
            <div class="col-4">
              <q-btn type="submit" color="primary" label="Save" class="q-mt-md q-mr-md" @click="addProduct" dense></q-btn>
            </div>
        </div>


      </div>
      <!-- <ProductTable /> -->
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';


const router = useRouter();
const selectedTab = ref('tab1');
const categoryOptions = ref([]);

const product = ref(
  {
    prod_id: '',
    prod_name: '',
    prod_description: '.',
    prod_stockqty: 0,
    prod_price: 0,
    prod_modelnum: '',
    cat_id: '',
    sub_cat: '',
    prod_status: '',
    image: '',
    biz_id : ''
  });

// const categoryOptions = computed(() => [
//   'Golf',
//   'Tennis',
//   'Basketball',
//   'Soccer',
// ]);

const subCategoryOptions = computed(() => [
  'Equipment',
  'Apparel',
  'Accesories',
  'Footwear',
]);

const availabilityOptions = computed(() => [
  'Available',
  'Not Available',
]);

const uploadUrl = ref('')
const uploadedFiles = ref([]);
// const uploading = ref(false);

const onFileAdded = (files: any) => {
  // Handle file added event
  console.log('Files added:', files);
};

const onFileRemoved = (file: any) => {
  console.log('File removed:', file);
};

// const uploadFiles = () => {
//   // File upload logic here
//   uploading.value = true;
// };

// const cancelUpload = () => {
//   uploading.value = false;
// };

// const removeFile = (index) => {
//   uploadedFiles.value.splice(index, 1);
// };

const addProduct = () => {
  //add product to database
  product._rawValue.prod_price = Number(product._rawValue.prod_price);
  product._rawValue.prod_stockqty = Number(product._rawValue.prod_stockqty);
  product._rawValue.biz_id = "B0038";



  postRowProduct();
  router.push('/biz/home');

};


//API POST : New product row
//product/addNewProd
const postRowProduct = async () => {
  try {
    //change biz id value to the id of current login biz owner
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/addNewProd`, product._rawValue);
    console.log(response)
    if (response.statusText === "OK") {
      console.log("item added")
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

const getAllCategrories = async () => {
  try {
    //change biz id value to the id of current login biz owner
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/getCatAll`);
    console.log(response)
    if (response.statusText === "OK") {
      console.log(response.data);
      //populate Category droplist
      categoryOptions.value = response.data.map((category: { cat_name: any; }) => category.cat_name);
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

onMounted(() => {
  getAllCategrories()
});
</script>


