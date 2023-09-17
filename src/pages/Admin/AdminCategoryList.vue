<script setup lang="ts">


</script>
<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div class="l-body">
      <header>
        <h1>
          Admin : Categories List
        </h1>
        <div class="q-mt-xl fl">
            <router-link to="/admin/home" class="btn">Return Home</router-link>
            <router-link to="/admin/cat-new" class="btn">New Category</router-link>


          </div>
        <div class="btngrp flex flex-row">



        <div class="q-mt-xl form-group">
            <label for="name">Category Name :</label>
            <input id="name" type="text" placeholder="Enter category" />
        </div>


        <div class="q-mt-xl date-pickers">
          <label for="startDate">From:</label>

            <input type="date" id="startDate" placeholder="Start Date" />
          <label for="startDate">To:</label>

            <input type="date" id="endDate" placeholder="End Date" />
        </div>

    


        </div>
      </header>

      <table class="q-mt-lg">
  <thead>
    <tr>
      <th>ID</th>
      <th>Sports </th>
      <th>Category Name</th>
      <th>Products Registered</th>
      <th>Date Created</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Basketball</td>
      <td>Basketball Mouthpiece</td>
      <td>50</td>
      <td>2023-09-12</td>
      <td><router-link to="/admin/cat-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Football</td>
      <td>Football Helmet</td>
      <td>60</td>
      <td>2023-09-13</td>
      <td><router-link to="/admin/cat-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>3</td>
      <td>Running</td>
      <td>Running Shoes</td>
      <td>70</td>
      <td>2023-09-14</td>
      <td><router-link to="/admin/cat-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>4</td>
      <td>Hockey</td>
      <td>Hockey Stick</td>
      <td>80</td>
      <td>2023-09-15</td>
      <td><router-link to="/admin/cat-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>5</td>
      <td>Tennis</td>
      <td>Tennis Racket</td>
      <td>90</td>
      <td>2023-09-16</td>
      <td><router-link to="/admin/cat-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>6</td>
      <td>Basketball</td>
      <td>Basketball Jersey</td>
      <td>100</td>
      <td>2023-09-17</td>
      <td><router-link to="/admin/cat-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>7</td>
      <td>Football</td>
      <td>Football Shoulder Pads</td>
      <td>110</td>
      <td>2023-09-18</td>
      <td><router-link to="/admin/cat-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>8</td>
      <td>Running</td>
      <td>Running Shorts</td>
      <td>120</td>
      <td>2023-09-19</td>
      <td><router-link to="/admin/cat-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>9</td>
      <td>Hockey</td>
      <td>Hockey Gloves</td>
      <td>125</td>
      <td>2023-09-20</td>
      <td><router-link to="/admin/cat-profile" class="btn">Open Profile</router-link></td>
    </tr>
    <tr>
      <td>10</td>
      <td>Tennis</td>
      <td>Tennis Balls</td>
      <td>130</td>
      <td>2023-09-21</td>
      <td><router-link to="/admin/cat-profile" class="btn">Open Profile</router-link></td>
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

/***********
Structure start
************/
.l-body {
    width: 960px;
    height: 90vh;
}

.fl > *:nth-child(2){
    margin-left :420px;

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
  margin-left: 10px;

}
/***********
Content end
************/


</style>
