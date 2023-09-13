<script setup lang="ts"></script>
<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div>
      <header>
        <h1>
          Admin Business Approval List
        </h1>

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
          <td><button>Approve</button></td>
          <td><button>Reject</button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>NASA Enterprises</td>
          <td><button>Approve</button></td>
          <td><button>Reject</button></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Entity Framework Inc.</td>
          <td><button>Approve</button></td>
          <td><button>Reject</button></td>
        </tr>
        <tr>
          <td>4</td>
          <td>Helium Voice Company</td>
          <td><button>Approve</button></td>
          <td><button>Reject</button></td>
        </tr>
        <tr>
          <td>5</td>
          <td>Sportify Public Corporation</td>
          <td><button>Approve</button></td>
          <td><button>Reject</button></td>
        </tr>
      </table>



      <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/adm-home" label="Go Home" no-caps />
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
</style>
