

<template>
  <div class=" text-center q-pa-md flex flex-center">
    <div class="">
      <header>
        <h1>Category Profile: <b>{{ category.cat_name }}</b></h1>

        <div class="flex flex-row">
          <div class="form-group q-mt-xl">

            <q-btn type="button"  label="Back" id="fn" class="btn" dense to="/admin/cat-list"></q-btn>


            <q-btn type="button"   label="Update" id="approve" class="btn" dense @click="submitForm()"></q-btn>


            <q-btn v-if="category.cat_status === 'ACTIVE'" type="button"  label="Deactivate" id="reject" class="btn" dense @click="deactivateCategory()"></q-btn>

          </div>
        </div>

        <form class="q-mt-lg max-w-lg">
          <div class="mb-10">
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Category ID 
              </label>
              <q-input readonly  v-model="category.cat_id" dense required type="text"
              class="q-mr-md"></q-input>
              
            </div>           

            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Category Name
              </label>
              <q-input   v-model="category.cat_name" dense required type="text"
              class="q-mr-md"></q-input>
              
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Category Status
              </label>
              <q-input readonly  v-model="category.cat_status" dense required type="text"
              class="q-mr-md"></q-input>
              
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Date Created
              </label>

              <q-input readonly  v-model="category.date_updated" dense required type="text"
              class="q-mr-md"></q-input>
            </div>
            <!--
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Popular Brands
              </label>
              <
              <div class="flex flex-row cat-liked">
                <q-btn
                  class="q-mt-md"
                  color="black"
                  text-color="white"
                  unelevated
                  label="Wilson"
                  no-caps
                />
                <q-btn
                  class="q-mt-md"
                  color="black"
                  text-color="white"
                  unelevated
                  label="Decathlon"
                  no-caps
                />
                <q-btn
                  class="q-mt-md"
                  color="black"
                  text-color="white"
                  unelevated
                  label="Spalding"
                  no-caps
                />
                <q-btn
                  class="q-mt-md"
                  color="black"
                  text-color="white"
                  unelevated
                  label="Apple"
                  no-caps
                />
              </div>
            </div>-->

            <!--Activity-->

            <div class="form-group q-mt-xl">
              

              <div class="cardholder">
                <h6>Products in this category:</h6>

                <div class="card">
                  <h3>{{ product_size }}</h3>
                  
                </div>
              </div>
              <!--
              <h6>Best Selling Products</h6>
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Quantities Sold</th>
                    <th>Age-group of Buyers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Soccer ball</td>
                    <td>100</td>
                    <td>10-20</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Basketball</td>
                    <td>99</td>
                    <td>20-40</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Football cleats</td>
                    <td>12</td>
                    <td>100+</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Tennis racket</td>
                    <td>14</td>
                    <td>10-20</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Ski goggles</td>
                    <td>13</td>
                    <td>20-40</td>
                  </tr>
                </tbody>
              </table>-->
            </div>

            <!--
            <div class="form-group">
              <h6>Historical buyrate</h6>
              <div class="adm-graph">
                <AdminLineGraph />
              </div>
            </div>
            -->
          </div>
        </form>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminLineGraph from "../../components/Administrator/AdminLineGraph.vue";

import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import { useStore } from './../../stores';
const store = useStore();
const { selectedCatId } = store.adm;


const router = useRouter();

const category = ref({
  cat_id: '',
  cat_name: '',
  cat_status: '',
  date_updated : ''


});

const products = ref([]);
const product_size = ref(0);


const submitForm = async () => {
  // Handle form submission
  category.value.cat_status = 'ACTIVE';
  console.warn(category.value);
  await updateCatInfo();
  await fetchCategoryData();
  console.log(category.value.cat_status);
  router.back();
};


const deactivateCategory = async () => {
  category.value.cat_status = 'INACTIVE';
  console.warn(category.value);
  await updateCatInfo();
  await fetchCategoryData();
  console.log(category.value.cat_status);
  router.back();

}


//API Fetch
const fetchCategoryData = async () => {
  try {
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/category/getCatById`, selectedCatId);
    
    if (response.statusText === "OK") {
      category.value = response.data;
      console.log(category.value);
 
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

//Fetch product of current category
const fetchProductsInCategory = async () => {
  try {
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/getByCatId`, selectedCatId);
    
    if (response.statusText === "OK") {
      products.value = response.data;
      console.log(products.value);
 
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

//updateCategory
const updateCatInfo = async () => {
  try {
    
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/category/updateCategory`, category.value);
    
    if (response.statusText === "OK") {
      
      console.log(response);
 
    } else {
      console.error('Failed to update');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

onMounted(async () => {
  console.log(selectedCatId);
  await fetchCategoryData();
  await fetchProductsInCategory();

  product_size.value =  products.value.length;

});









</script>

<style scoped lang="scss">
//Structure
h1,
h3,
h6 {
  margin: 0;
}

.l-body {
  width: 960px;
  height: 90vh;
  overflow: scroll;
}

* {
  text-align: left;
}

table * {
  padding: 8px;
}

.btn,
button {
  border-radius: 8px;
  border: 1px solid black;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.25s;
}

.btn:hover,
button:hover {
  border-color: #646cff;
}

#approve {
  border-color: green;
  color: green;
  margin: 5px;
  float: left;
  margin-left: 200px;
}

#reject {
  border-color: red;
  color: red;
  margin: 5px;
  float: left;
}

#fn {
  border-color: 646cff;
  color: 646cff;
  margin: 5px;
  float: left;
}

#back {
  float: left;
}

.btn:focus,
.btn:focus-visible,
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

/***********
  FORMS
  ************/
.form-group {
  margin-bottom: 15px;
  
}

input,
p {
  width: 100%;
  //pointer-events: none; //disable interaction
}

p {
  border: 1px solid white;
  box-sizing: border-box;
  padding: 5px;
}

label {
  margin-bottom: 5px;
}

.cat-liked * {
  margin: 5px;
}

.adm-graph {
  height: 200px;
  background-color: white;
  padding: 20px;
}

.cardholder > .card {
  border: 1px solid black;
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
