<script setup lang="ts">
import AdminBarGraph from "../../components/Administrator/AdminBarGraph.vue";
import AdminLineGraph from "../../components/Administrator/AdminLineGraph.vue";
</script>

<template>
  <div class="db-body">
    <header>
      <h1>Performance Dashboard</h1>
      <q-btn
        class=""
        color="white"
        text-color="blue"
        unelevated
        to="/admin/home"
        label="Go Home"
        no-caps
      />
    </header>
    <div class="db-content">
      <div class="date-box flex flex-row">
        <div>
          <label for="birthday">From :</label>
          <input type="date" id="birthday" name="birthday" />
        </div>

        <div>
          <label for="birthday">To :</label>
          <input type="date" id="birthday" name="birthday" />
        </div>
      </div>
      <div class="" id="first-child">
        <div class="first-child-internal">
          <h5>Top Rager</h5>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Rage Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Pavav</td>
                <td>20%</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Rohan</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Enkat</td>
                <td>10%</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Mahesh</td>
                <td>5%</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Priya</td>
                <td>5%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="first-child-internal">
          <h5>Top Brands</h5>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Nike</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Adidas</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Puma</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Under Armour</td>
              </tr>
              <tr>
                <td>5</td>
                <td>New Balance</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="first-child-internal">
          <h5>Data Count Monitor</h5>
          <h1 id="data-count">255</h1>
        </div>
      </div>
      <div class="" id="second-child">
        <div class="second-child-internal">
          <h6>Historical Performance</h6>
          <div>
            <AdminLineGraph />
          </div>
        </div>
        <div class="second-child-internal">
          <h6>Recommended Brands</h6>
          <AdminBarGraph />
        </div>
      </div>

      <div class="performance-audit">
        <h6><i>Last Updated : 08 12 2023 12:13:14</i></h6>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  text-align: left;
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

/***********
Structure start
************/
.db-body {
  width: 960px;
  height: 90vh;
}

img {
  height: auto;
  width: 100%;
}

#first-child {
  display: grid;
  grid-template-areas: "rager rager query ccount";
  gap: 10px;

  padding: 10px;
}

#second-child {
  display: grid;
  grid-template-areas: "_line _line _line _line _bar _bar ";
  gap: 10px;

  padding: 10px;
}

#first-child > div,
#second-child > div {
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid white;
}

#first-child > div td,
#first-child > div th {
  padding: 0;
}

/*****
GRID CONTENT TAGGING
*/
.first-child-internal:first-child {
  grid-area: rager;
}
.first-child-internal:nth-child(2) {
  grid-area: query;
}
.first-child-internal:last-child {
  grid-area: ccount;
}

.second-child-internal:first-child {
  grid-area: _line;
}
.second-child-internal:last-child {
  grid-area: _bar;
}

/***********
Structure end
************/

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
.form-group {
  margin: 10px;
}

/***
specific
*/

#data-count {
  scale: 2;
  margin-left: 100px;
  margin-top: 40px;
}
</style>
