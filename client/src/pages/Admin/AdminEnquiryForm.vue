<template>
<!----
  <div class="text-center q-pa-md flex flex-center">
    <div class="l-body">
      <header>
        <q-btn type="submit" color="primary" label="Back" class="q-mt-md q-mr-md" dense
              @click="goToEnquiryList()"></q-btn>
        <h4>INC100021 : <b>Unable to buy item</b></h4>
        
        <form class="q-mt-lg max-w-lg">
          <div class="mb-8">
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                User ID
              </label>
              <input
                class="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="" type="text" value="MEM-1001" />
            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                User Name
              </label>
              <input
                class="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="" type="text" value="Little Drummer Boy" />
            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Submitted on
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="" type="text" value="01 January 2023 10:09:33" />
            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                User Type
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="" type="text" value="Member" />
            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Address
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="" type="text" value="1234 Chuckle Avenue Laughington, Haha 56789 Funnyland" />
            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Case Description
              </label>
              <p>
                User Unable to purchase item. Wallet is empty. Please advice to
                enable Purchase
              </p>
            </div>

            <div class="form-group q-mt-lg">
              <hr />
              <h5 class="">Administrator's Response</h5>
              <textarea name="" id="admin-response" cols="60" rows="5">
                Customer is broke. Admin advised to go get a job and use the money to buy ball.
              </textarea>
            </div>

            <div class="form-group">
              <router-link to="/admin/enquiry-list" class="btn" id="approve">Send Feedback</router-link>
            </div>
          </div>
        </form>
      

      </header>
    </div>
  </div>-->
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
        <div class="form-group">

          <q-input outlined  v-model="enquiry.enq_response"  type="textarea" :rows=4 dense required
              class="q-mt-md width-100 ticket"></q-input>

    
        </div>




        
      </q-form>

      <div class=" q-gutter-md">
        <q-btn type="button" color="outline" label="Cancel" class="q-mt-md" dense @click="goToEnquiryList"></q-btn>
        <q-btn v-bind:disable="enquiry.enq_status === 'RESPONDED'" type="submit" color="primary" label="Submit" class="q-mt-md" dense @click="updateEnquiryData"></q-btn>
      </div>




    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref,  onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from './../../stores';
import axios from 'axios';


const store = useStore();
const { selectedEnqId } = store.adm;

const router = useRouter();

const enquiry = ref({
  enq_id: '',
  enq_submitby: '',
  enq_subject: '',
  enq_message: '',
  enq_submitdate: '',
  admin_id: 'admin.data',
  enq_response: '',
  enq_responsedate: '',
  enq_status: ''


});


const goToEnquiryList = () => {
  router.push('/admin/enquiry-list');
};

//API Call to get the body
const fetchEnquiryData = async () => {
  try {
    var param = {"enq_id": selectedEnqId.enq_id} 
    console.log(param);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/enquiries/getEnquiryById`, param);
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
                  "admin_id" : enquiry.value.admin_id} 
    console.log(param);
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/enquiries/updateEnqByAdm`, param);
    console.log(response)
    if (response.statusText === "OK") {
      console.log(response.data);
      goToEnquiryList();
      
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

onMounted(() => {
  console.log(selectedEnqId.enq_id);

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
