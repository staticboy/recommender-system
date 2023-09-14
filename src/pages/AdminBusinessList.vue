<script setup lang="ts">


</script>
<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div>
      <header>
        <h1>
          Admin Business Approval List
        </h1>
        <div class="btngrp">
          <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/adm-home" label="Go Home" no-caps />

        </div>
      </header>

      <table>
        <tr>
          <th>ID</th>
          <th>Business Name</th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td>1</td>
          <td>Arctic Corporation</td>
          <td><router-link to="/adm-business-profile" class="btn">About</router-link></td>

        </tr>
        <tr>
          <td>2</td>
          <td>NASA Enterprises</td>
          <td><button>Open Profile</button></td>

        </tr>
        <tr>
          <td>3</td>
          <td>Entity Framework Inc.</td>
          <td><button>Open Profile</button></td>
        </tr>
        <tr>
          <td>4</td>
          <td>Helium Voice Company</td>
          <td><button>Open Profile</button></td>
        </tr>
        <tr>
          <td>5</td>
          <td>Sportify Public Corporation</td>
          <td><button>Open Profile</button></td>
        </tr>
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


</style>
