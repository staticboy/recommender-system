

<template>
  <div class=" text-center q-pa-md flex flex-center">
    <div class="">
      <header>
        <h1>New Category </h1>

        <div class="flex flex-row">
          <div class="form-group q-mt-xl">

            <q-btn type="button"  label="Back" id="fn" class="btn" dense to="/admin/cat-list"></q-btn>


            <q-btn type="button"   label="Create Category" id="approve" class="btn" dense @click="submitForm()"></q-btn>


            
          </div>
        </div>

        <form class="q-mt-lg max-w-lg">
          <div class="mb-10">
          

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

          </div>
        </form>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">


import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import { useStore } from './../../stores';
const store = useStore();
const { selectedCatId } = store.adm;


const router = useRouter();

const category = ref({
  
  cat_name: '',
  cat_status: 'ACTIVE',


});




const submitForm = async () => {
  // Handle form submission
  console.warn(category.value);
  await insertNewCatInfo();
};



//updateCategory
const insertNewCatInfo = async () => {
  try {
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/category/registerCategory`, category.value);
    
    if (response.statusText === "OK") {
      
      console.log(response);
      router.back();

 
    } else {
      console.error('Failed to update');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
    

  }
};

onMounted(async () => {
  console.log(selectedCatId);


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
