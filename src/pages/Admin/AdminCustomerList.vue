<script setup >
import AdminBusinessProfileModal from '../../components/Administrator/AdminBusinessProfileModal.vue';
import { ref } from 'vue';
const showModal = ref(false);

function toggleModel() {
  showModal.value = !showModal.value; // Toggle the value (true to false, false to true)
}
</script>


<template>

  <q-page>
    <div class="text-center q-pa-md flex flex-center">
    <div class="">

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
          Customer List
        </h1>
        <div class="q-mt-xl">
            <router-link to="/admin/home" class="btn">Return Home</router-link>

          </div>
        <div class="btngrp flex flex-row">



        <div class="q-mt-xl form-group">
            <label for="name">Name:</label>
            <input id="name" type="text" placeholder="Enter your business name" />
        </div>
        <div class="q-mt-xl form-group">
            <label for="Status">Status:</label>
            <select id="Status">
                <option value="2">Approved</option>
                <option value="1">Pending</option>
                <option value="0">None</option>
            </select>
        </div>
        <div class="q-mt-xl date-pickers">
          <label for="startDate">From:</label>

            <input type="date" id="startDate" placeholder="Start Date" />
          <label for="startDate">To:</label>

            <input type="date" id="endDate" placeholder="End Date" />
        </div>

    


        </div>
      </header>

      <table class="q-mt-xl">
  <thead>
    <tr>
      <th>ID</th>
      <th>Customer Name</th>
      <th>Last Login Datetime</th>
      <th>Total Purchases</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Caeleb Dressel</td>
      <td>2023-09-16 18:38:10 PST</td>
      <td>10</td>
      <td><router-link to="/admin/customer-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Rafael Nadal</td>
      <td>2023-09-16 18:38:10 PST</td>
      <td>15</td>
      <td><router-link to="/admin/customer-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>3</td>
      <td>LeBron James</td>
      <td>2023-09-16 18:38:10 PST</td>
      <td>20</td>
      <td><router-link to="/admin/customer-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>4</td>
      <td>Tiger Woods</td>
      <td>2023-09-16 18:38:10 PST</td>
      <td>25</td>
      <td><router-link to="/admin/customer-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>5</td>
      <td>Rory McIlroy</td>
      <td>2023-09-16 18:38:10 PST</td>
      <td>30</td>
      <td><router-link to="/admin/customer-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>6</td>
      <td>Serena Williams</td>
      <td>2023-09-16 18:38:10 PST</td>
      <td>35</td>
      <td><router-link to="/admin/customer-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>7</td>
      <td>Simone Biles</td>
      <td>2023-09-16 18:38:10 PST</td>
      <td>40</td>
      <td><router-link to="/admin/customer-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>8</td>
      <td>Lionel Messi</td>
      <td>2023-09-16 18:38:10 PST</td>
      <td>45</td>
      <td><router-link to="/admin/customer-profile" class="btn">Open Profile</router-link></td>
    </tr>


  </tbody>
</table>




    </div>
  </div>
  </q-page>

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
  border: 1px solid black;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: white;
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

select, input{
  border: 1px solid black;

}

/***********
Structure start

.l-body {
    width: 960px;
    height: 90vh;
    overflow: scroll;
}
************/
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
