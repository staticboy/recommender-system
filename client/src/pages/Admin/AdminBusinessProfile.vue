<template>
  <div class=" text-center q-pa-md flex flex-center">
    <div class="l-body">
      <header>
        <q-btn type="submit" color="primary" label="Back" class="q-mt-md q-mr-md" dense
              @click="goToBusinessList()"></q-btn>
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
            
              <q-btn type="button" color="positive" label="Verify" class="q-mt-md" dense @click="updateBusinessData(1)"></q-btn>

            </div>
            <div v-else class="form-group">
              <q-btn type="button" color="negative" label="Disable" class="q-mt-md" dense @click="updateBusinessData(-1)"></q-btn>

            </div>
          </div>
        </form>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,  onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from './../../stores';
import axios from 'axios';

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

//API Call to get the body
const fetchBusinessData = async () => {
  try {
    var param = {"biz_id": selectedBizId.biz_id} 
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
    var param = {"biz_id": selectedBizId.biz_id} 
    console.log(param);

    //call result depends on status
    var link = row == 1 ? `${import.meta.env.VITE_API_URL}/api/business/verifyBiz`  : `${import.meta.env.VITE_API_URL}/api/business/disableBiz`
   
    
    const response = await axios.put(link, param);
    console.log(response)
    if (response.statusText === "OK") {
      console.log(response.data);
      goToBusinessList();

      
    } else {
      console.error('Failed to fetch product data');
    }
  } catch (error) {
    console.error('Error while fetching product data:', error);
  }
};

const goToBusinessList = () => {
  router.push('/admin/business-list');
};

onMounted(() => {
  console.log(selectedBizId.biz_id);

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
