

<template>
  <div class=" text-center q-pa-md flex flex-center">
    <div class="">
      <header>
        <h1>Sub Category Profile: <b>{{ category.subcat_name }}</b></h1>

        <div class="flex flex-row">
          <div class="form-group q-mt-xl">

            <q-btn type="button"  label="Back" id="fn" class="btn" dense @click="invokeToggler"></q-btn>


            <q-btn v-if="category.subcat_status === 'Y'"  type="button"   label="Update" id="approve" class="btn"
             dense @click="submitForm()"></q-btn>




            <q-btn v-if="category.subcat_status === 'Y'" type="button"  
            label="Deactivate" id="reject" class="btn" dense @click="deactivateCategory()"></q-btn>

            <q-btn v-if="category.subcat_status === 'N'" type="button"  
            label="Re-activate" id="approve" class="btn" dense @click="reactivateForm()"></q-btn>
            <q-btn v-if="category.subcat_status === 'N'" type="button"  
            label="Delete" id="reject" class="btn" dense @click="deleteCategory()"></q-btn>

          </div>
        </div>

        <form class="q-mt-lg max-w-lg">
          <div class="mb-10">
         

            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
               Sub Category Name
              </label>
         
              <q-input :readonly="category.subcat_status !== 'Y'" v-model="category.subcat_name" dense required type="text"
              class="q-mr-md"></q-input>
              
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Category Status
              </label>

              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
              <u>
                {{ category.subcat_status === 'Y' ? 'ACTIVE' : 'INACTIVE' }}

              </u>
              </label>

              
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Date Created
              </label>

   
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
              <u>
                {{ category.date_updated }}

              </u>
            </label>

            </div>




          </div>
        </form>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
//import AdminLineGraph from "../../components/Administrator/AdminLineGraph.vue";

import { ref, onMounted, defineProps} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import { useStore } from './../../stores';
const store = useStore();
const { selectedCatId } = store.adm;


const router = useRouter();

 // Anything that you want to take from the parent
const parentProps = defineProps({
  selectedSubCatName : {
    type : String
  },
  backBtn : {
    type: Function
  },
  parentFetchCategoryData : {
    type: Function
  },
});

//another function to invoke parent prop function
const invokeToggler = () =>{

  parentProps.backBtn(parentProps.selectedSubCatName);
}

const category = ref({
  subcat_name: '',
  subcat_status: '',
  date_updated: '',
});

const products = ref([]);
const product_size = ref(0);


const submitForm = async () => {
  // Handle form submission
  category.value.subcat_name = category.value.subcat_name.toUpperCase();
  console.warn(category.value);  
  await updateCatInfo();
  await fetchCategoryData();
  parentProps.parentFetchCategoryData();
  invokeToggler();  
};

const reactivateForm = async () => {
  // Handle form submission
  category.value.subcat_status = 'Y';
  console.warn(category.value);
 
  await updateCatInfo();
  await fetchCategoryData();
  parentProps.parentFetchCategoryData();
  invokeToggler();  
  
};


const deactivateCategory = async () => {
  category.value.subcat_status = 'N';
  
  await updateCatInfo();
  await fetchCategoryData();

  parentProps.parentFetchCategoryData();
  invokeToggler();  

}

const deleteCategory = async () => {

  await deleteCategoryData();

  //router.back();
  parentProps.parentFetchCategoryData();
  invokeToggler();  

}


//API Fetch
const fetchCategoryData = async () => {
  try {
    var param = {"subcat_name" : parentProps.selectedSubCatName};
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/category/getOneSubCategoryByName`, param);
    
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

//API delete
const deleteCategoryData = async () => {
  try {
    let param = {"subcat_name" : parentProps.selectedSubCatName}
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/category/deleteSubCat`,param);
    
    if (response.statusText === "OK") {
      
      console.log(response);
 
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};



//updateCategory or deactivate
const updateCatInfo = async () => {
  try {
    
    let link = `${import.meta.env.VITE_API_URL}/api/category/upsertSubcat`;    
    const response = await axios.post(link, category.value);    
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
  console.log(parentProps.selectedSubCatName);
  
  await fetchCategoryData();


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
