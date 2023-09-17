<script setup lang="ts"></script>
<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div class="l-body">
      <header>
        <h1>Admin Enquiries</h1>
        <div class="q-mt-xl">
          <router-link to="/admin/home" class="btn">Return Home</router-link>
        </div>
        <div class="btngrp flex flex-row">
          <div class="q-mt-xl form-group">
            <label for="name">User:</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your business name"
            />
          </div>
          <div class="q-mt-xl form-group">
            <label for="Status">Status:</label>
            <select id="Status">
              <option value="2">Responded</option>
              <option value="1">Submitted</option>
              <option value="0">None</option>
            </select>
          </div>
          <div class="q-mt-xl form-group">
            <label for="uType">User Type:</label>
            <select id="uType">
              <option value="2">Business Owner</option>
              <option value="1">Member</option>
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

      <table class="q-mt-lg">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>User Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Arctic Corporation</td>
            <td>Responded</td>
            <td>Business Owner</td>
            <td>
              <router-link to="/admin/enquiry" class="btn"
                >Open Profile</router-link
              >
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>NASA Enterprises</td>
            <td>Submitted</td>
            <td>Member</td>
            <td>
              <router-link to="/admin/enquiry" class="btn"
                >Open Profile</router-link
              >
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Entity Framework Inc.</td>
            <td>Responded</td>
            <td>Business Owner</td>
            <td>
              <router-link to="/admin/enquiry" class="btn"
                >Open Profile</router-link
              >
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Helium Voice Company</td>
            <td>Submitted</td>
            <td>Member</td>
            <td>
              <router-link to="/admin/enquiry" class="btn"
                >Open Profile</router-link
              >
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Sportify Public Corporation</td>
            <td>Responded</td>
            <td>Business Owner</td>
            <td>
              <router-link to="/admin/enquiry" class="btn"
                >Open Profile</router-link
              >
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>Tesla Inc.</td>
            <td>Submitted</td>
            <td>Member</td>
            <td>
              <router-link to="/admin/enquiry" class="btn"
                >Open Profile</router-link
              >
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>Microsoft Corporation</td>
            <td>Responded</td>
            <td>Business Owner</td>
            <td>
              <router-link to="/admin/enquiry" class="btn"
                >Open Profile</router-link
              >
            </td>
          </tr>
          <tr>
            <td>8</td>
            <td>Alphabet Inc.</td>
            <td>Submitted</td>
            <td>Member</td>
            <td>
              <router-link to="/admin/enquiry" class="btn"
                >Open Profile</router-link
              >
            </td>
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
.btn:focus,
.btn:focus-visible,
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

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
.l-body {
  width: 960px;
  height: 90vh;
}

/***********
Structure end
************/

/***********
Content Start
************/
input,
label,
select {
  min-height: 27px;
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
