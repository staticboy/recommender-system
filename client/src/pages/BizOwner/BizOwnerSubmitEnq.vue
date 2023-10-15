<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-9">
          <h1 class="q-mb-md">Submit Enquiry</h1>
        </div>
      </div>
      <q-form @submit.prevent="submitEnquiry">
        <div class="row">
          <div class="col-6">
            <q-input outlined v-model="enquiry.enq_subject" label="Subject" dense required type="text"
              class="q-mr-md"></q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <q-input outlined v-model="enquiry.enq_message" label="Description" type="textarea" :rows=4 dense required
              class="q-mt-md width-100"></q-input>
          </div>
        </div>
      </q-form>


      <q-btn type="submit" color="primary" label="Submit" class="q-mt-md" dense @click="submitEnquiry"></q-btn>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router';

const router = useRouter();

const enquiry = ref({
  enq_subject: '',
  enq_message: '',
  enq_submitby : 'B0038'

});


const submitEnquiry = () => {
  //router.push('/biz/home');
  console.log(enquiry._rawValue);
  postRowEnquiry()
};

//API POST : New product row
//product/addNewProd
const postRowEnquiry = async () => {
  try {
    //change biz id value to the id of current login biz owner
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/enquiries/insertEnquiry`, enquiry._rawValue);
    console.log(response)
    if (response.statusText === "OK") {
      console.log("Enquiry sent");
      router.push('/biz/home');;

    } else {
      console.error('failed to send enquiry');
    }
  } catch (error) {
    console.error('Critical error:', error);
  }
};


</script>