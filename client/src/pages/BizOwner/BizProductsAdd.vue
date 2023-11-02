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
              <q-select v-model="product.cat_id" :options="categoryOptions" label="Category" dense emit-value map-options
                class="q-mr-md q-mt-md" />
            </div>
            <div class="col-4">
              <q-select v-model="product.sub_cat" :options="subCategoryOptions" label="Sub-Category" dense emit-value
                map-options class="q-mr-md q-mt-md" />
            </div>
            <div class="col-4">
              <q-select v-model="product.prod_status" :options="availabilityOptions" label="Available?" dense emit-value
                map-options class="q-mr-md q-mt-md" />
            </div>
          </div>
          <div class="col-3">
            <label for="fileInput" class="mt-8">
              Select Image(s) (up to 5)
            </label>
            <input ref="fileInput" class="mt-8 mb-4" type="file" @change="handleFileChange" accept="image/*" multiple />
            <div class="image-preview">
              <img v-for="(file, index) in files" :key="index" :src="file.preview" alt="Selected Image" class="image-border">
            </div>
            <q-btn @click="clear_images" label="Clear Images" class="q-mt-md q-mr-md" dense/>
          </div>
          <div class="col-4 mt-8">
            <q-btn type="submit" color="primary" label="Save Product" class="q-mt-md q-mr-md" @click="addProduct" dense></q-btn>
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
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import axios from 'axios';
import { BizProductDetails } from "../../stores/biz/types";

const router = useRouter();
const q = useQuasar();
const selectedTab = ref('tab1');
const categoryOptions = ref();
const subCategoryOptions = ref();

const fileInput = ref(null);
const files = ref([]);

const handleFileChange = () => {
  files.value = Array.from(fileInput.value.files);

  if (files.value.length > 5) {
    files.value = [];
    q.notify({
      type: 'negative',
      message: 'Only up to 5 images allowed!'
    });
  } else {
    files.value.forEach((file, index) => {
      const url = URL.createObjectURL(file);
      files.value[index] = { file, preview: url };
    });
  }
};

const clear_images = () => {
  fileInput.value.value = ''; // Clear the input field
  files.value = [];
};

interface Category {
  cat_id: number;
  cat_name: string;
}

const product = ref<BizProductDetails>({
  prod_name: '',
  prod_description: '',
  prod_stockqty: 0,
  prod_price: 0,
  prod_modelnum: '',
  cat_id: '',
  sub_cat: '',
  prod_status: '',
  // image: '',
  biz_id: ''
});

const availabilityOptions = computed(() => [
  { value: 'AVAILABLE', label: 'Yes' },
  { value: 'UNAVAILABLE', label: 'No' },
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

const addProduct = () => {
  q.loading.show();
  // uploadImages("P0652", files.value)
  product._rawValue.biz_id = localStorage.getItem("userId");
  postRowProduct();
  q.loading.hide();
  router.push('/biz/products');
};

//API POST : New product row
//product/addNewProd
const postRowProduct = async () => {
  try {
    //change biz id value to the id of current login biz owner
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/addNewProd`, product._rawValue);
    console.log(response)
    if (response.data.result.result_code === 1) {
      uploadImages(response.data.result.prod_id, files.value)
      q.notify({
        type: 'positive',
        message: 'New product added successfully'
      })
    } else {
      console.error('Failed to fetch product data');
      q.notify({
        type: 'negative',
        message: 'Failed to add new product'
      })
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
    q.notify({
      type: 'negative',
      message: 'Something went wrong.'
    })
  }
};

const uploadImages = async (prod_id: any, imageFiles: any) => {
  const formData = new FormData();
  for (let i = 0; i < imageFiles.length; i++) {
    formData.append('images', imageFiles[i]);
  }
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/uploadImages/${prod_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data.message === 'Images uploaded successfully.') {
      console.log('Images uploaded successfully');
    } else {
      console.error('Failed to upload images');
    }
    return response
  } catch (error) {
    console.error('Error while uploading images:', error);
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
  getAllCategrories()
  getAllSubCategories()
});


</script>

<style>
.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-border {
  border: 1px solid rgb(151, 151, 151);
  max-width: 100px;
  max-height: 100px;
}
</style>


