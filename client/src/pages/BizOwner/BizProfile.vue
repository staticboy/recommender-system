<template>
  <q-page>
    <!-- {{ bizProfileDetails }} -->
    <div class="q-pa-md">
      <div class="row">
        <div class="col-9">
          <h1 class="q-mb-md">Edit Business Profile :  {{ profile.biz_id }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-6 pb-4">
          <div class="col-3">
            <q-uploader v-model="profileImage" label="Profile Image" accept=".jpg, .jpeg, .png"
              @click="uploadProfileImage">
            </q-uploader>
            <div class="text-h6 q-mb-md" v-if="profileImage">
              Selected File: {{ profileImage }}
            </div>
          </div>
        </div>
        <div class="flex col-6 justify-end items-center">
          <div> <!-- Create a flex container and align content to the end (right) -->
            <q-btn type="submit" color="primary" label="Edit" class="q-mt-md q-mr-md" dense v-show="isNotInEdit"
              @click="toggleDisabled"></q-btn>
            <q-btn type="submit" color="white" text-color="black" label="Cancel" class="q-mt-md" dense
              @click="toggleDisabled"></q-btn>
          </div>
        </div>
      </div>
      <q-form @submit.prevent="updateProfile">
        <div class="row">
          <div class="col-6">
            <q-input outlined v-model="profile.biz_email" label="Email" dense required type="email" class="q-mr-md"
              :disable="true"></q-input>
          </div>
          <div class="col-6">
            <q-input outlined v-model="profile.biz_name" label="Business Name" dense required type="text" class="q-mr-md"
              :disable="isDisabled"></q-input>
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-3">
            <q-input outlined v-model="profile.biz_yearest" label="Year Established" dense required type="number"
              class="q-mr-md" :maxlength="4" :readonly="isDisabled"></q-input>
          </div>
          <div class="col-3">
            <q-input outlined v-model="profile.biz_phoneno" label="Contact Number" dense required type="number"
              class="q-mr-md" :maxlength="8" :readonly="isDisabled"></q-input>
          </div>
          <div class="col-3">
            <q-input outlined v-model="profile.biz_address" label="Address" type="textarea" :rows=3 dense required
              class="q-mr-md" :readonly="isDisabled"></q-input>
          </div>
          <div class="col-3">
            <q-input outlined v-model="profile.biz_country" label="Country" dense required type="text" class="q-mr-md"
              :disable="isDisabled"></q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input outlined v-model="profile.biz_description" label="Description" type="textarea" :rows=3 dense required
              class="q-mt-md width-100" :readonly="isDisabled"></q-input>
          </div>
        </div>
      </q-form>

      <div class="flex justify-end">
        <q-btn type="submit" color="primary" label="Update Profile" class="q-mt-md" dense v-show="isInEdit"
        @click="updateProfile"></q-btn>
      </div>

      <div>

      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
//import { postDataToApi } from './biz-service';
import axios from 'axios';
import { useStore } from './../../stores';

const store = useStore();
const { bizProfileDetails } = store.bizOwner;





const router = useRouter();
const profileImage = ref(null);

const profile = ref({
  biz_id: 'Bxxxxx',
  biz_name: 'Reg account',
  biz_email: 'johndoe@example.com',
  biz_phoneno: 13,
  biz_yearest: '1911',
  biz_address: '3 Bukit Batok Crescent 628553',
  biz_country: 'Singapore',
  biz_description: 'Our business has been around for very long... we sell golf equipment at a good price'
});

const isDisabled = ref(true);
const isInEdit = ref(false);
const isNotInEdit = ref(true);

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value;
  isInEdit.value = !isInEdit.value;
  isNotInEdit.value = !isNotInEdit.value;
};

const goToHome = () => {

  router.push('/biz/home'); // Use router.push() to navigate to /biz/home


};

const updateProfile = () => {
//update profile and show notification update successful
  console.warn(profile._rawValue.biz_id) //check with anne/DH
  UpdateBizProfile();
  toggleDisabled();
  goToHome();
};

const uploadProfileImage = (file: any) => {
  if (file) {
    // Handle the file upload here
    // You can send it to your server, store it in a database, etc.
    // You can access the uploaded file data in the 'file' object
    console.log('Uploaded file:', file);
  }
};

//API call get profile
const fetchBizProfile = async () => {
  try {
    //change biz id value to the id of current login biz owner
    var param = {"biz_id": localStorage.getItem("userId")} 
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/business/getById`, param);
    console.log(response)
    if (response.statusText === "OK") {
      profile.value = response.data;
      console.warn(response.data);
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

//API update profile 
// Biz_ID taken from profile 
const UpdateBizProfile = async () => {
  try {
    //change biz id value to the id of current login biz owner
    var param = profile
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/business/editProfile`, param._rawValue);
    console.log(response)
    if (response.statusText === "OK") {
      fetchBizProfile(); //refresh values
      console.warn(response.data);
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};


onMounted(async () => {
    try {
      //await store.bizOwner.getBizOwnerProfileDetails("B0001");
      //postDataToApi();
      fetchBizProfile();
    } catch (error) {
      // Handle the error
    }
});




</script>

