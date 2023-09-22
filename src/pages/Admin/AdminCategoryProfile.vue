<script setup lang="ts">
import AdminLineGraph from "../../components/Administrator/AdminLineGraph.vue";
</script>

<template>
  <div class=" text-center q-pa-md flex flex-center">
    <div class="">
      <header>
        <h1>Category Profile: <b>Ball</b></h1>

        <div class="flex flex-row">
          <div class="form-group q-mt-xl">
            <router-link to="/admin/cat-list" class="btn" id="fn"
              >Go Back</router-link
            >

            <router-link to="/admin/cat-list" class="btn" id="approve"
              >Update</router-link
            >
            <router-link to="/admin/cat-list" class="btn" id="reject"
              >Delete</router-link
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
                Sports
              </label>
              <input
                class="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id=""
                type="text"
                value="Basketball"
              />
            </div>

            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Category
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id=""
                type="text"
                value="Ball"
              />
            </div>
            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Date Created
              </label>

              <p style="margin-left: 0; padding-left: 0;">
                09 August 2088 10:10:10 10:11
              </p>
            </div>

            <div class="form-group">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Popular Brands
              </label>

              <div class="flex flex-row cat-liked">
                <q-btn
                  class="q-mt-md"
                  color="black"
                  text-color="white"
                  unelevated
                  label="Wilson"
                  no-caps
                />
                <q-btn
                  class="q-mt-md"
                  color="black"
                  text-color="white"
                  unelevated
                  label="Decathlon"
                  no-caps
                />
                <q-btn
                  class="q-mt-md"
                  color="black"
                  text-color="white"
                  unelevated
                  label="Spalding"
                  no-caps
                />
                <q-btn
                  class="q-mt-md"
                  color="black"
                  text-color="white"
                  unelevated
                  label="Apple"
                  no-caps
                />
              </div>
            </div>

            <!--Activity-->

            <div class="form-group q-mt-xl">
              <h6><b>Activities</b></h6>
              <hr />

              <div class="cardholder">
                <h6>Products in this category:</h6>

                <div class="card">
                  <h3>125</h3>
                  <span> 15% lower than last year </span>
                </div>
              </div>
              <h6>Best Selling Products</h6>
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Quantities Sold</th>
                    <th>Age-group of Buyers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Soccer ball</td>
                    <td>100</td>
                    <td>10-20</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Basketball</td>
                    <td>99</td>
                    <td>20-40</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Football cleats</td>
                    <td>12</td>
                    <td>100+</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Tennis racket</td>
                    <td>14</td>
                    <td>10-20</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Ski goggles</td>
                    <td>13</td>
                    <td>20-40</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="form-group">
              <h6>Historical buyrate</h6>
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
h3,
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
  float: left;
  margin-left: 200px;
}

#reject {
  border-color: red;
  color: red;
  margin: 5px;
  float: left;
}

#fn {
  border-color: 646cff;
  color: 646cff;
  margin: 5px;
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
  
}

input,
p {
  width: 100%;
  //pointer-events: none; //disable interaction
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

.cardholder > .card {
  border: 1px solid black;
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
