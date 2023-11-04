

<template>
  <div class=" text-center q-pa-md flex flex-center">
    <div class="">
      <header>
        <h1>Customer Profile: <b>{{ profile.user_id }}</b></h1>

        <div class="flex flex-row btn-grp">
          <div class="form-group q-mt-xl">
            <q-btn to="/admin/customer-list" class="btn" id="back" color="primary" @click="goBack()" label="Go Back" />

            <q-btn v-if="profile.user_status === 'ACTIVE'" class="btn" id="reject" color="negative" @click="deleteProfile()" label="Deactivate Profile" />
            <q-btn v-else class="btn" id="reject" color="positive" @click="activateProfile()" label="Activate Profile" />

 
          </div>
        </div>

        <q-form class="q-mt-lg max-w-lg">
          <div class="mb-8">
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Customer Name
              </label>
              <q-input outlined dense v-model="profile.user_name" readonly />
            </div>

            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Phone No
              </label>
              <q-input outlined dense v-model="profile.user_phoneno" readonly />
            </div>

            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email
              </label>
              <q-input outlined dense v-model="profile.user_email" readonly />
            </div>

            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Address
              </label>
              <q-input outlined dense v-model="profile.user_address" readonly />
            </div>

            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Gender
              </label>
              <q-input outlined dense v-model="profile.user_gender" readonly />
            </div>

            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Date Of Birth
              </label>
              <q-input outlined dense v-model="profile.user_dob" readonly />
            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Address
              </label>
              <q-input outlined dense v-model="profile.user_address" readonly />
            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Country
              </label>
              <q-input outlined dense v-model="profile.user_country" readonly />
            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Registration Date
              </label>
              <q-input outlined dense v-model="profile.user_regdate" readonly />
            </div>
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Status
              </label>
              <q-input outlined dense v-model="profile.user_status" readonly />
            </div>

          </div>
        </q-form>

        <form class="q-mt-lg max-w-lg">
          <div class="mb-8">
            <div class="form-group">
              <!--
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Preferences
              </label>

               <div class="flex flex-row cat-liked " style="width: 800px;">
                <q-item class="q-mt-md" clickable style="background-color: black; color: white; border-radius: 16px;">
                  <q-item-section>
                    <q-item-label color="white">Basketball</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="q-mt-md" clickable style="background-color: black; color: white; border-radius: 16px;">
                  <q-item-section>
                    <q-item-label color="white">Men</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="q-mt-md" clickable style="background-color: black; color: white; border-radius: 16px;">
                  <q-item-section>
                    <q-item-label color="white">Hard</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="q-mt-md" clickable style="background-color: black; color: white; border-radius: 16px;">
                  <q-item-section>
                    <q-item-label color="white">Gym</q-item-label>
                  </q-item-section>
                </q-item>
              </div> -->
            </div>

            <!--Activity-->

            <!-- <div class="form-group q-mt-xl">
              <h6><b>Activities</b></h6>
              <hr />
              <h6>Recent Purchase</h6>
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Soccer ball</td>
                    <td>1</td>
                    <td>$20.00</td>
                    <td>$20.00</td>
                  </tr>
                  <tr>
                    <td>Basketball</td>
                    <td>1</td>
                    <td>$15.00</td>
                    <td>$15.00</td>
                  </tr>
                  <tr>
                    <td>Football cleats</td>
                    <td>1</td>
                    <td>$30.00</td>
                    <td>$30.00</td>
                  </tr>
                  <tr>
                    <td>Tennis racket</td>
                    <td>1</td>
                    <td>$50.00</td>
                    <td>$50.00</td>
                  </tr>
                  <tr>
                    <td>Ski goggles</td>
                    <td>1</td>
                    <td>$25.00</td>
                    <td>$25.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="form-group">
              <h6>Frequency of Interaction</h6>
              <div class="adm-graph">
                <AdminLineGraph />
              </div>
            </div> -->
          </div>
        </form>
      </header>
    </div>
  </div>
</template>


<script setup lang="ts">
//import AdminLineGraph from "../../components/Administrator/AdminLineGraph.vue";
import  { ref, onMounted }  from 'vue';
import axios from 'axios';

// import { DEMO_CUSTOMER_LIST } from '../../constants.ts'
import { useRouter } from 'vue-router';

const router = useRouter();
// const filteredCustomerRef = ref([...DEMO_CUSTOMER_LIST]);
// const searchQuery = ref('');

const currentUserID = ref();

const profile = ref({
  
    user_id: "-",
    user_email: "-",
    user_password: "-",
    user_name: "",
    user_dob: "",
    user_phoneno: 0,
    user_address: "",
    user_country: "",
    user_gender: "",
    user_status: "INACTIVE",
    user_regdate: ""

});

const goBack = () => {
  router.push({ path: '../admin/customer-list' });
}

const deleteProfile = async () => {
  //removal isnt actually invoke deletion, its just deactivating a profile

  profile.value.user_status = 'INACTIVE';
  console.log('inactive');
  await setInactiveMember();
  console.log(profile.value);

  router.push({ path: '../admin/customer-list' });
};

const activateProfile = async () => {
  //removal isnt actually invoke deletion, its just deactivating a profile

  profile.value.user_status = 'ACTIVE';
  console.log('inactive');
  await setInactiveMember();
  console.log(profile.value);

  router.push({ path: '../admin/customer-list' });
};

//GET MEMBER PROFILE API
const fetchMemberData = async () => {
  try {
    var param = {"user_id" : currentUserID.value}
    console.log("invoke");
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/member/getById`, param);
    
    console.log(response);
    if (response.statusText === "OK") {
      console.log(response.data);
      profile.value = response.data;
    } else {
      console.error('Failed to fetch profile data');
    }
  } catch (error) {
    console.error('Error while fetching profile data:', error);
  }
};


//EDIT(DEACTIVATE) MEMBER PROFILE API
const setInactiveMember = async () => {
  try {
    
    console.log(profile._rawValue);
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/member/editProfile`, profile._rawValue);
    
    console.log(response);
    if (response.statusText === "OK") {
      console.log(response.data);
      profile.value = response.data;
    } else {
      console.error('Failed to fetch profile data');
    }
  } catch (error) {
    console.error('Error while fetching profile data:', error);
  }
};



onMounted(async () => {
  //console.log(this.$route.query);
  currentUserID.value = router.currentRoute.value.query.id;
  console.log(currentUserID.value);

  fetchMemberData();
});

</script>


<style scoped lang="scss">
//Structure
h1,
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
  float: right;
}

#reject {
  border-color: red;
  color: red;
  margin-left: 700px;
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
  //width: 50%;
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

.cat-liked * {
  margin: 5px;
}

.adm-graph {
  height: 200px;
  background-color: white;
  padding: 20px;
}
</style>
