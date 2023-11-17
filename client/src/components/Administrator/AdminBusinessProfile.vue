<template>
  <div class=" text-center q-pa-md flex flex-center">
    <div class="l-body">
      <header>
        <h1>{{ business.biz_id }} : <b>{{ business.biz_name }}</b></h1>
        <form class="q-mt-lg max-w-lg">
          <div class="mb-8">
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Status
              </label>
              <h6>{{ business.biz_status }}</h6>
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Year Est
              </label>
              <h6>{{ business.biz_yearest }}</h6>
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Phone No
              </label>
              <h6>{{ business.biz_phoneno }}</h6>

            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Address
              </label>
              <h6>{{ business.biz_address }}</h6>

            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Business Description
              </label>
              <p>
                {{ business.biz_description }}
              </p>
            </div>

            <div v-if="business.biz_status !== 'VERIFIED'" class="form-group q-gutter-md">
            
              <q-btn type="button" color="positive" label="Verify" class="q-mt-md" dense 
              
              @click="
              requestAction = 1;
              reverseInitConfirm()"></q-btn>

            </div>
            <div v-else class="form-group">
              <q-btn type="button" color="negative" label="Disable" class="q-mt-md" dense @click="
              requestAction = 2;
              reverseInitConfirm()"></q-btn>

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
                    label="Confirm" class="btn" dense 
                    @click="commitChanges()"></q-btn>
                    <q-btn type="button"  
                    label="Cancel" class="btn" dense 
                    @click="reverseInitConfirm()"></q-btn>
                  </div>
                </div>

              </q-card-actions>  
            </q-card>
            </q-dialog>
          </div>
        </form>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps ,ref,  onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from './../../stores';
import axios from 'axios';
import { useQuasar } from "quasar";

const q = useQuasar();

const store = useStore();
const { selectedBizId } = store.adm;

const router = useRouter();


const business = ref({
  biz_address: '',
  biz_country: '',
  biz_description: '',
  biz_email: '',
  biz_id: '',
  biz_name: '',
  biz_phoneno: '',
  biz_regdate: '',
  biz_status: '',
  biz_yearest: ''

});

const parentProps = defineProps({
  selectedBizId : {
    type : String
  },
  backBtn : {
    type: Function
  },
  parentFetchCategoryData : {
    type: Function
  },
});

const actionName = ref(["","Verify Account", "Disable Account"]);

//to identify req type 
const requestAction = ref(0);
const commitChanges = async () => {
  console.log(requestAction.value);

  switch(requestAction.value) {
  case 1:
    updateBusinessData(1)
    break;
  case 2:
    updateBusinessData(-1);
    
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
  parentProps.parentFetchCategoryData();
  console.log("i ran this");
  parentProps.backBtn();
  
}

const initConfirm = ref(false);
const reverseInitConfirm = () => {
  initConfirm.value = !initConfirm.value;
}

//API Call to get the body
const fetchBusinessData = async () => {
  try {
    var param = {"biz_id": parentProps.selectedBizId} 
    console.log(param);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/business/getById`, param);
    console.log(response)
    if (response.statusText === "OK") {
      console.log(response.data);
      business.value = response.data;
      
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

//API call to edit body : status
//business/verifyBiz
const updateBusinessData = async (row : any) => {
  try {
    var param = {"biz_id": parentProps.selectedBizId} 
    console.log(param);

    //call result depends on status
    var link = row == 1 ? `${import.meta.env.VITE_API_URL}/api/business/verifyBiz`  : `${import.meta.env.VITE_API_URL}/api/business/disableBiz`
   
    
    const response = await axios.put(link, param);
    console.log(response)
    if (response.statusText === "OK") {
      console.log(response.data);
      

      
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};


onMounted(() => {
  console.log("bz id" + parentProps.selectedBizId);

  fetchBusinessData();
});
</script>


<style scoped lang="scss">
//Structure
h1{
  margin-top: 15px;
}
.l-body {
  width: 960px;
  height: 90vh;
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
}

#reject {
  border-color: red;
  color: red;
  margin: 5px;
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
  pointer-events: none; //disable interaction
}
p {
  border: 1px solid white;
  box-sizing: border-box;
  padding: 5px;
}
label {
  margin-bottom: 5px;
}
</style>
