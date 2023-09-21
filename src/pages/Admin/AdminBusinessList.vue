<script setup >
import AdminBusinessProfileModal from '../../components/Administrator/AdminBusinessProfileModal.vue';
import { ref } from 'vue';
const showModal = ref(false);

function toggleModel() {
  showModal.value = !showModal.value; // Toggle the value (true to false, false to true)
}
</script>


<template>


  <div class="text-center q-pa-md flex flex-center">
    <div class="l-body">

      <!-----
      <button id="toggler" @click="toggleModel()">Open Modal</button>

      
      <div v-if="showModal" class="modal">
        <button @click="toggleModel()">Open Modal</button>

        <div class="modal-content">
         
          <p><AdminBusinessProfileModal/></p>
        </div>
      </div>
      -->
      <header>

        <h1>
          Admin Business Approval List
        </h1>
        <div class="q-mt-xl fl">
          <router-link to="/admin/home" class="btn">Return Home</router-link>
 
        </div>
        <div class="btngrp flex flex-row">



        <div class="q-mt-md form-group">
            <label for="name">Name:</label>
            <input id="name" type="text" placeholder="i.e Legend Sports" />
        </div>
        <div class="q-mt-md form-group">
            <label for="Status">Status:</label>
            <select id="Status">
                <option value="2">Approved</option>
                <option value="1">Pending</option>
                <option value="0">None</option>
            </select>
        </div>
        <div class="q-mt-md date-pickers">
          <label for="startDate">From:</label>

            <input type="date" id="startDate" placeholder="Start Date" />
          <label for="startDate">To:</label>

            <input type="date" id="endDate" placeholder="End Date" />
        </div>

    


        </div>
      </header>

      <table class="q-mt-sm">
  <thead>
    <tr>
      <th>ID</th>
      <th>Business Name</th>
      <th>Year Established</th>
      <th>City</th>
      <th>Sales Growth</th>
      <th>Open Profile</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Arctic Corporation</td>
      <td>2012</td>
      <td>Outram Park</td>
      <td>10%</td>
      <td><router-link to="/admin/business-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>2</td>
      <td>NASA Enterprises</td>
      <td>2015</td>
      <td>Ang Mo Kio</td>
      <td>15%</td>
      <td><router-link to="/admin/business-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>3</td>
      <td>Entity Framework Inc.</td>
      <td>2017</td>
      <td>Raffles Place</td>
      <td>12%</td>
      <td><router-link to="/admin/business-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>4</td>
      <td>Helium Voice Company</td>
      <td>2018</td>
      <td>Jurong East</td>
      <td>19%</td>
      <td><router-link to="/admin/business-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>5</td>
      <td>Sportify Public Corporation</td>
      <td>2016</td>
      <td>Paya Lebar</td>
      <td>13%</td>
      <td><router-link to="/admin/business-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>6</td>
      <td>Acxiom Corporation</td>
      <td>2010</td>
      <td>Orchard</td>
      <td>16%</td>
      <td><router-link to="/admin/business-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>7</td>
      <td>Dun & Bradstreet Holdings</td>
      <td>2014</td>
      <td>Chinatown</td>
      <td>14%</td>
      <td><router-link to="/admin/business-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>8</td>
      <td>Experian</td>
      <td>2013</td>
      <td>Bugis</td>
      <td>17%</td>
      <td><router-link to="/admin/business-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>9</td>
      <td>TransUnion International</td>
      <td>2016</td>
      <td>HarbourFront</td>
      <td>18%</td>
      <td><router-link to="/admin/business-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>10</td>
      <td>Equifax</td>
      <td>2017</td>
      <td>Bayfront</td>
      <td>11%</td>
      <td><router-link to="/admin/business-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>11</td>
      <td>Nielsen Holdings</td>
      <td>2015</td>
      <td>Outram Park</td>
      <td>15%</td>
      <td><router-link to="/admin/business-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>12</td>
      <td>Kantar Group</td>
      <td>2014</td>
      <td>Ang Mo Kio</td>
      <td>12%</td>
      <td><router-link to="/admin/business-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>13</td>
      <td>Ipsos</td>
      <td>2013</td>
      <td>Raffles Place</td>
      <td>19%</td>
      <td><router-link to="/admin/business-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>14</td>
      <td>GfK</td>
      <td>2016</td>
      <td>Jurong</td>
      <td>19%</td>
      <td><router-link to="/admin/business-profile" class="btn">Open Profile</router-link></td>
    </tr>
  </tbody>
  </table>



    </div>
  </div>
</template>



<style scoped lang="scss">



* {
  text-align: left;
}

table * {
  padding: 8px;
}



.btn, button {
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
.btn:hover, button:hover {
  border-color: #646cff;
}
.btn:focus,
.btn:focus-visible,
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

* {
    text-align: left;
}
h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}
label{
  margin-left: 0;
}

/***********
Structure start
************/
.l-body {

}

/***********
Structure end
************/

/***********
Content Start
************/
input, label, select{
  min-height: 27px ;
  height: 27px;
  margin-left: 10px;
}

.btngrp > div {
 

}

#toggler{
  z-index: 10;
}
/***********
Content end
************/


</style>
