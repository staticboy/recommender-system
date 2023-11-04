<template>
  <q-page>
    <div class="text-center q-pa-md flex flex-center">
      <div class="admin-hbody">
        <h1>Business Owner Home: {{ userId }}</h1>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from 'axios';
import { BizProfileDetails } from "../../stores/biz/types";
import { useQuasar } from 'quasar';

const q = useQuasar();
const userId = ref("");

const profile = ref<BizProfileDetails>({
  biz_id: '',
  biz_name: '',
  biz_email: '',
  biz_phoneno: 0,
  biz_yearest: 0,
  biz_address: '',
  biz_country: '',
  biz_description: ''
});

userId.value = profile.value.biz_name;

//APIget profile
const fetchBizProfile = async () => {
  try {
    //change biz id value to the id of current login biz owner
    var param = {"biz_id": localStorage.getItem("userId")} 
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/business/getById`, param);
    console.log(response)
    if (response.statusText === "OK") {
      profile.value = response.data;
      userId.value = profile.value.biz_name;
      // console.warn(response.data);
    } else {
      console.error('Failed to fetch biz profile data');
      q.notify({
          type: 'negative',
          message: 'Failed to fetch biz profile data'
        })
    }
  } catch (error) {
    console.error('Error while fetching profile data:', error);
    q.notify({
          type: 'negative',
          message: 'Something went wrong.'
        })
  }
};

onMounted(async () => {
    try {
      fetchBizProfile();
    } catch (error) {
      // Handle the error
    }
});
</script>

<style scoped lang="scss">
</style>