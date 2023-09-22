<script setup lang="ts">
import AdminLineGraph from "../../components/Administrator/AdminLineGraph.vue";
</script>

<template>
  <div class=" text-center q-pa-md flex flex-center">
    <div class="">
      <header>
        <h1>Member Profile: <b>Wheat Tea Witty</b></h1>

        <div class="flex flex-row btn-grp">
          <div class="form-group q-mt-xl">
            <router-link to="/admin/customer-list" class="btn" id="back"
              >Go Back</router-link
            >

            <router-link to="/admin/customer-list" class="btn" id="reject"
              >Delete Profile</router-link
            >
          </div>
        </div>

        <form class="q-mt-lg max-w-lg">
          <div class="mb-8">
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Customer Name
              </label>
              <input
                class="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id=""
                type="text"
                value="Wheat Tea Witty "
              />
            </div>

            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Phone No
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id=""
                type="text"
                value="1800 1234 0009"
              />
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Location
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id=""
                type="text"
                value="Jupiter, Solar System, Mily Way Galaxy"
              />
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Sex
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id=""
                type="text"
                value="Male"
              />
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Date of Birth
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id=""
                type="text"
                value="31 Feb 1289"
              />
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Preferences
              </label>

              <div class="flex flex-row cat-liked " style="width: 800px;">
                <q-btn
                  class="q-mt-md"
                  color="black"
                  text-color="white"
                  unelevated
                  label="Basketball"
                  no-caps
                />
                <q-btn
                  class="q-mt-md"
                  color="black"
                  text-color="white"
                  unelevated
                  label="Men"
                  no-caps
                />
                <q-btn
                  class="q-mt-md"
                  color="black"
                  text-color="white"
                  unelevated
                  label="Hard"
                  no-caps
                />
                <q-btn
                  class="q-mt-md"
                  color="black"
                  text-color="white"
                  unelevated
                  label="Gym"
                  no-caps
                />
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

<!--<script >





export default {
  name: 'VerticalForm',
  data() {
    return {
      name: '',
      address: '',
      businessSummary: '',
      yearFound: '',
    };
  },
};




</script>-->

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
