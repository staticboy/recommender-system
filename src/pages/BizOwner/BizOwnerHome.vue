<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div class="admin-hbody">
      <h1>Business Owner Home</h1>
      <section class="admin_jobs">
        <ul class="flex">
          <li>
            <q-btn
              class="q-mt-xl"
              color="white"
              text-color="blue"
              unelevated
              to="/biz/profile"
              label="View Profile"
              no-caps
            />
          </li>
          <li>
            <q-btn
              class="q-mt-xl"
              color="white"
              text-color="blue"
              unelevated
              to="/biz/submit-enq"
              label="Submit Enquiry"
              no-caps
            />
          </li>
          <li>
            <q-btn
              class="q-mt-xl"
              color="white"
              text-color="blue"
              unelevated
              to="/biz/trans-hist"
              label="View Transaction History"
              no-caps
            />
          </li>
          <li>
            <q-btn
              class="q-mt-xl"
              color="white"
              text-color="blue"
              unelevated
              to="/biz/prod-lists"
              label="View Product List"
              no-caps
            />
          </li>
          <li>
            <q-btn
              class="q-mt-xl"
              color="white"
              text-color="blue"
              unelevated
              to="/biz/chart"
              label="View Chart"
              no-caps
            />
          </li>
          <li>
            <q-btn
              class="q-mt-xl"
              color="white"
              text-color="blue"
              unelevated
              to="/biz/products-all"
              label="Add Product"
              no-caps
            />
          </li>
          <li>
            <q-btn
              class="q-mt-xl"
              color="white"
              text-color="blue"
              unelevated
              to="/biz/products"
              label="View All Products"
              no-caps
            />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: space-between;
}
.admin_jobs {
  margin: 0 auto;

  width: 960px;
}
</style>
