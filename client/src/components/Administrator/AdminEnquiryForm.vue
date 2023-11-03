<template>

  <q-page>
    
    <div class="q-pa-md">
      <div class="heading"> 

      <h4>{{ enquiry.enq_id }} : <b>{{ enquiry.enq_subject }}</b></h4>
      </div>


      
      <q-form @submit.prevent="goToEnquiryList">
        <div class="row">
          <div class="col-8">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                User ID
            </label>
          </div>
        </div>
        <div class="form-group">

              <q-input readonly  v-model="enquiry.enq_submitby" dense required type="text"
              class="q-mr-md"></q-input>
        </div>

        <div class="row">
          <div class="col-8">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
               Description
            </label>
          </div>
        </div>
        <div class="form-group">

          <q-input readonly  v-model="enquiry.enq_message"  type="textarea" :rows=4 dense required
              class="q-mt-md width-100 ticket"></q-input>
        </div>

        <div class="row">
          <div class="col-8">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
               Enquiry Type
            </label>
          </div>
        </div>
        <div class="form-group">

          <q-input readonly  v-model="enquiry.enq_type"  type="text" :rows=4 dense required
              class="q-mt-md width-100 ticket"></q-input>
        </div>

        <div class="row">
          <div class="col-8">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
               Submitted Date
            </label>
          </div>
        </div>
        <div class="form-group">

          <q-input readonly  v-model="enquiry.enq_submitdate"  type="text" :rows=4 dense required
              class="q-mt-md width-100 ticket"></q-input>
        </div>


        <div class="row">
          <div class="col-8">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
               Priority
            </label>
          </div>
        </div>
        <div class="form-group">

          <q-select  v-model="enquiry.enq_priority" :options="levels" label="Priority" dense emit-value map-options
                  class="q-mr-md" />
       
        </div>

        <div class="row">
          <div class="col-8">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Status
            </label>

         
          </div>
        </div>
        <div class="form-group">

          <q-input readonly  v-model="enquiry.enq_status"  type="text" :rows=4 dense required
              class="q-mt-md width-100 ticket"></q-input>
        </div>

        <div class="row">
          <div class="col-8">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Response
            </label>
          </div>
        </div>

        <div class="row">
          <div class="col-8">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Responded By {{ enquiry.admin_id }}
            </label>
          </div>
        </div>
        <div class="form-group">

          <q-input outlined  v-model="enquiry.enq_response"  type="textarea" :rows=4 dense required
              class="q-mt-md width-100 ticket"></q-input>

    
        </div>




        
      </q-form>

      <div class=" q-gutter-md">
        <q-btn type="button" color="outline" label="Cancel" class="q-mt-md" dense @click="parentProps.backBtn"></q-btn>
        <q-btn v-bind:disable="enquiry.enq_status === 'RESPONDED'" type="submit" color="primary" 
        label="Submit" class="q-mt-md" dense @click="
        requestAction = 1;   
        reverseInitConfirm()"></q-btn>
        <q-btn v-if="enquiry.enq_status === 'OPEN'" type="button" color="secondary" 
        label="Update" class="q-mt-md" dense @click="requestAction = 2;   
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
                    <h6>Confirm Action : {{ actionName[requestAction]}} </h6>

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
  </q-page>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from './../../stores';
import axios from 'axios';
import { useQuasar } from "quasar";


 // Anything that you want to take from the parent
 const parentProps = defineProps({
  selectedEnq: {
    type: String 
  },
  backBtn : {
    type: Function
  },
  parentFetchEnqList : {
    type: Function
  },
  });

const store = useStore();
const { selectedEnqId } = store.adm;
const q = useQuasar();
const router = useRouter();

const enquiry = ref({
  enq_id: '',
  enq_submitby: '',
  enq_subject: '',
  enq_message: '',
  enq_submitdate: '',
  admin_id: '',
  enq_response: '',
  enq_responsedate: '',
  enq_status: '',
  enq_priority : '',
  enq_type : ''
});


const levels = Array.from({ length: 5 }, (_, index) => index + 1);
const actionName = ref(["","Respond and close.", "Change priority"]);

//to identify req type 
const requestAction = ref(0);
const commitChanges = () => {
console.log(requestAction.value);

switch(requestAction.value) {
case 1:
  updateEnquiryData();  
  break;
case 2:
  updateEnquiryPriorityData();
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


const goToEnquiryList = () => {
  router.push('/admin/enquiry-list');
};

//API Call to get the body
const fetchEnquiryData = async () => {
  try {
    var param = {"enq_id": parentProps.selectedEnq} 
    console.log(param);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/enquiry/getEnquiryById`, param);
    console.log(response)
    if (response.statusText === "OK") {
      console.log(response.data);
      enquiry.value = response.data;

    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};


//API Call to update the body
const updateEnquiryData = async () => {
  try {
    enquiry.value.admin_id = 'adminuser'
    

    var param = {"enq_id": enquiry.value.enq_id, 
                  "enq_response" : enquiry.value.enq_response, 
                  "admin_id" : localStorage.getItem("userId")} 
    console.log(param);
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/enquiry/updateEnqByAdm`, param);
    console.log(response)
    if (response.statusText === "OK") {
      console.log(response.data);
      parentProps.parentFetchEnqList();
      parentProps.backBtn(parentProps.selectedEnq);
      
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

//Update priority
const updateEnquiryPriorityData = async () => {
  try {
    enquiry.value.admin_id = 'adminuser'
    

    var param = {"enq_id": enquiry.value.enq_id, 
                  "enq_priority" : enquiry.value.enq_priority, 
                  "admin_id" : localStorage.getItem("userId")} 
    console.log(param);
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/enquiry/updateEnqPriorityByAdm`, param);
    console.log(response)
    if (response.statusText === "OK") {
      console.log(response.data);
      parentProps.parentFetchEnqList();
      parentProps.backBtn(parentProps.selectedEnq);
      
    } else {
      console.error('Failed to patch enquiry data');
    }
  } catch (error) {
    console.error('Error while patching enquiry data:', error);
  }
};

onMounted(() => {
  console.warn(parentProps.selectedEnq);

  fetchEnquiryData();
});

</script>

<style scoped lang="scss">
//Structure

.l-body {
  width: 960px;
}

.heading{

  margin-bottom: 30px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
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
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
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
.ticket{
  border: none;
}
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

#admin-response {
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 100%;

  height: 200px;
  max-height: 200px;
  min-height: 200px;
  border: #1a1a1a solid 1px;
}

.form-group h5 {
  margin-top: 16px;
  margin-bottom: 4;
}
</style>
