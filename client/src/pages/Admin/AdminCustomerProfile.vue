

<template>
  <div class=" text-center q-pa-md flex flex-center">
    <div class="">
      <header>
        <h1>Member Profile: <b>Wheat Tea Witty</b></h1>

        <div class="flex flex-row btn-grp">
          <div class="form-group q-mt-xl">
            <q-btn to="/admin/customer-list" class="btn" id="back" color="primary" @click="goBack()" label="Go Back" />

            <q-btn to="/admin/customer-list" class="btn" id="reject" color="negative" @click="deleteProfile()"
              label="Delete Profile" />
          </div>
        </div>

        <q-form class="q-mt-lg max-w-lg">
          <div class="mb-8">
            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Customer Name
              </label>
              <q-input outlined dense v-model="profile.name" readonly />
            </div>

            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Phone No
              </label>
              <q-input outlined dense v-model="profile.phoneNo" readonly />
            </div>

            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email
              </label>
              <q-input outlined dense v-model="profile.email" readonly />
            </div>

            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Address
              </label>
              <q-input outlined dense v-model="profile.address" readonly />
            </div>

            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Gender
              </label>
              <q-input outlined dense v-model="profile.gender" readonly />
            </div>

            <div class="form-group">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Date Of Birth
              </label>
              <q-input outlined dense v-model="profile.dob" readonly />
            </div>

          </div>
        </q-form>

        <form class="q-mt-lg max-w-lg">
          <div class="mb-8">
            <div class="form-group">
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
              </div>
            </div>

            <!--Activity-->

            <div class="form-group q-mt-xl">
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
            </div>
          </div>
        </form>
      </header>
    </div>
  </div>
</template>


<script setup lang="ts">
import AdminLineGraph from "../../components/Administrator/AdminLineGraph.vue";
import { ref } from 'vue';
// import { DEMO_CUSTOMER_LIST } from '../../constants.ts'
import { useRouter } from 'vue-router';

const router = useRouter();
// const filteredCustomerRef = ref([...DEMO_CUSTOMER_LIST]);
// const searchQuery = ref('');

const profile = ref({
  name: 'john_doe',
  phoneNo: 96969696,
  address: '3 Bukit Batok Crescent 628553',
  email: 'johndoe@example.com',
  gender: 'Binary',
  dob: '03-04-1996',
  country: 'Singapore',
});

const goBack = () => {
  router.push({ path: '../admin/customer-list' });
}

const deleteProfile = () => {
  //remove profile via api
  router.push({ path: '../admin/customer-list' });
};
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
