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
              <q-btn type="submit" color="primary" label="Save" class="q-mt-md q-mr-md" dense></q-btn>
            </div>
          </div>
        </div>
        <div v-if="selectedTab === 'tab2'">
          <div class="row">
            <div class="col-12 flex justify-center">
              <q-uploader label="Drag and drop files here or click to choose" accept=".csv" v-model="uploadedFiles"
                :url="uploadUrl" @added="onFileAdded" @removed="onFileRemoved" class="q-mt-md">
                <!-- <template v-slot:header="{ files }">
                <q-btn color="primary" v-if="!uploading && files.length > 0" @click="uploadFiles">
                  Upload Files
                </q-btn>
                <q-btn color="primary" v-else @click="cancelUpload">
                  Cancel Upload
                </q-btn>
              </template> -->
              </q-uploader>
              <!-- <div v-for="(file, index) in uploadedFiles" :key="index">
              {{ file.name }}
              <q-btn color="negative" dense @click="removeFile(index)">Remove</q-btn>
            </div> -->
            </div>
          </div>
        </div>

      </div>
      <!-- <ProductTable /> -->
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const selectedTab = ref('tab1');

const product = ref(
  {
    prod_id: 'P0PJ001',
    prod_name: 'Golf Club Set',
    prod_description: 'Complete set of golf clubs for all skill levels.',
    prod_stockqty: 15,
    prod_price: 499.99,
    prod_modelnum: 'GC-001',
    cat_id: 'Golf',
    sub_cat: 'Equipment',
    prod_status: 'Not Available',
  });

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
  'Available',
  'Not Available',
]);

const uploadUrl = ref('')
const uploadedFiles = ref([]);
const uploading = ref(false);

const onFileAdded = (files: any) => {
  // Handle file added event
  console.log('Files added:', files);
};

const onFileRemoved = (file: any) => {
  console.log('File removed:', file);
};

const uploadFiles = () => {
  // File upload logic here
  uploading.value = true;
};

const cancelUpload = () => {
  uploading.value = false;
};

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1);
};

onMounted(() => {

});
</script>

