

<template>
  <div class=" text-center q-pa-md flex flex-center">
    <div class="">
      <header>



        <q-form class="q-mt-lg max-w-lg" @submit="submitForm()">
          <div class="mb-10">
            <div class="flex flex-row">
        <h1>New Sub Category </h1>

          <div class="form-group q-mt-xl">
            

            <q-btn type="button"  label="Back" id="fn" class="btn" dense @click="parentProps.backBtn"></q-btn>


            <q-btn type="submit"   label="Create Category" id="approve" class="btn" dense ></q-btn>


            
          </div>
        </div>

            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Sub Category Name
              </label>
              <q-input   v-model="category.subcat_name" dense required type="text"
              lazy-rules:rules="[ val => val && val.length > 0 || 'Please type something']"

              class="q-mr-md"></q-input>
              
            </div>
            
          </div>
        </q-form>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">


import { ref, onMounted, defineProps} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useQuasar } from "quasar";
import { useStore } from './../../stores';

const q = useQuasar();

const store = useStore();
const { selectedCatId } = store.adm;

 // Anything that you want to take from the parent
 const parentProps = defineProps({
  backBtn : {
    type: Function
  },
  parentFetchCategoryData : {
    type: Function
  },
  });


const router = useRouter();

const category = ref({
  subcat_name: '',
  subcat_status: 'Y',
});




const submitForm = async () => {
  // Handle form submission
  console.warn(category.value);
  await insertNewCatInfo();
  q.notify({
        type: 'positive',
        message: 'New Subcat Created'
      });
  
  parentProps.parentFetchCategoryData();
  parentProps.backBtn();    

};



//upsertSubcat
const insertNewCatInfo = async () => {
  try {
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/category/upsertSubcat`, category.value);
    
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
