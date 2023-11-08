

<template>
    <div class=" text-center q-pa-md flex flex-center">
      <div class="">
        <header>
          <h1>Category Profile: <b>{{ category.cat_name }}</b></h1>
  

  
          <q-form class="q-mt-lg max-w-xl"
          @submit="
             requestAction = 1;
             reverseInitConfirm()"
          >
          <div class="flex flex-row">
            <div class="form-group q-mt-xl">
  
              <q-btn type="button"  label="Back" id="fn" class="btn" dense @click="parentProps.backBtn"></q-btn>
  
  
 

              <q-btn v-if="category.cat_status === 'ACTIVE'" type="submit"   label="Update" id="approve" class="btn"
             dense ></q-btn>
            <q-btn v-if="category.cat_status === 'ACTIVE'" type="button"  
            label="Deactivate" id="reject" class="btn" dense @click="
            requestAction = 2;            
            reverseInitConfirm()"></q-btn>
            <q-btn v-if="category.cat_status === 'INACTIVE'" type="button"  
            label="Re-activate" id="approve" class="btn" dense @click="
            requestAction = 3;            
            reverseInitConfirm()"></q-btn>
            <q-btn v-if="category.cat_status === 'INACTIVE'" type="button"  
            label="Delete" id="reject" class="btn" dense @click="
            requestAction = 4;   
            reverseInitConfirm()"></q-btn>
  
            </div>
          </div>
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
           
                <q-input :readonly="category.cat_status == 'INACTIVE'" v-model="category.cat_name" dense required type="text"
                lazy-rules:rules="[ val => val && val.length > 0 || 'Please type something']"
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

  
              <!--Activity-->
  
              <div class="form-group q-mt-xl">
                
  
                <div class="cardholder">
                  <h6>Products in this category:</h6>
  
                  <div class="card">
                    <h3>{{ product_size }}</h3>
                    
                  </div>
                </div>

              </div>

            <!--Confirm Dialogue-->
            <q-dialog v-model="initConfirm">
            <q-card style="width: 960px; max-width: 80vw;">
              <q-card-actions align="right">
                <q-btn icon="close" size="md" flat @click="reverseInitConfirm()" class="q-ml-md q-mt-md" />
              </q-card-actions>

              <q-card-actions>
                
                <div>
                  <div class="row">
                    <h6>Confirm Action : {{ actionName[requestAction] }} </h6>

                  </div>
                  <div class="row q-gutter-md mb-4" >
                    <q-btn type="button"  
                    label="Confirm" class="btn" dense @click="commitChanges()"></q-btn>
                    <q-btn type="button"  
                    label="Cancel" class="btn" dense @click="reverseInitConfirm()"></q-btn>
                  </div>
                </div>

              </q-card-actions>  
            </q-card>
            </q-dialog>
  

            </div>
          </q-form>
        </header>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  //import AdminLineGraph from "../../components/Administrator/AdminLineGraph.vue";
  
  import { ref, onMounted, defineProps} from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { useQuasar } from "quasar";
  import { useStore } from './../../stores';

  const q = useQuasar();
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

  // Anything that you want to take from the parent
  const parentProps = defineProps({
  exampleProp: {
    type: String 
  },
  backBtn : {
    type: Function
  },
  parentFetchCategoryData : {
    type: Function
  },
  });

  //another function to invoke parent prop function


const actionName = ref(["","Update", "Deactivate","Reactivate","Delete"]);

//to identify req type 
const requestAction = ref(0);
const commitChanges = () => {
console.log(requestAction.value);

switch(requestAction.value) {
case 1:
  submitForm();
  break;
case 2:
  deactivateCategory();
  break;
case 3:
  reactivateForm();
  break;
case 4:
  deleteCategory();
  break;
default:
  console.warn('action not known');
}

q.notify({
      type: 'positive',
      message: 'Action commited sucessfully'
    });

//reset to 0
requestAction.value = 0;
reverseInitConfirm();


}

const initConfirm = ref(false);
const reverseInitConfirm = () => {
initConfirm.value = !initConfirm.value;
}
  
  
  const submitForm = async () => {
    // Handle form submission
    category.value.cat_status = 'ACTIVE';
    console.warn(category.value);
    
    await updateCatInfo(1);
    await fetchCategoryData();
    console.log(category.value.cat_status);
    //router.back();
    parentProps.parentFetchCategoryData();
    parentProps.backBtn();
  };
  
  const reactivateForm = async () => {
    // Handle form submission
    category.value.cat_status = 'ACTIVE';
    console.warn(category.value);
   
    await updateCatInfo(-1);
    await fetchCategoryData();
    console.log(category.value.cat_status);
    parentProps.parentFetchCategoryData();
    parentProps.backBtn();


    
  };
  
  
  const deactivateCategory = async () => {
    category.value.cat_status = 'INACTIVE';
    console.warn(category.value);
    await updateCatInfo(-1);
    await fetchCategoryData();
    console.log(category.value.cat_status);
    parentProps.parentFetchCategoryData();
    parentProps.backBtn();
  
  }
  
  const deleteCategory = async () => {
  
    await deleteCategoryData();
  
    parentProps.parentFetchCategoryData();
    parentProps.backBtn();
  
  }
  
  
  //API Fetch
  const fetchCategoryData = async () => {
    try {
      var param = {"cat_id" : parentProps.exampleProp}
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/category/getCatById`, param);
      
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
  
  //API Fetch
  const deleteCategoryData = async () => {
    try {
      var param = {"cat_id" : parentProps.exampleProp}

      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/category/deleteCategory`,param);
      
      if (response.statusText === "OK") {
        
        console.log(response);
   
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
      var param = {"cat_id" : parentProps.exampleProp}
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/product/getByCatId`, param);
      
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
  
  //updateCategory or deactivate
  const updateCatInfo = async (row: any) => {
    try {
      
      let link = row == 1 ? `${import.meta.env.VITE_API_URL}/api/category/updateCategory` : `${import.meta.env.VITE_API_URL}/api/category/deactivateCategory`;
  
      console.warn(link); 
      const response = await axios.put(link, category.value);
      
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
    console.log(parentProps.exampleProp);

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
  