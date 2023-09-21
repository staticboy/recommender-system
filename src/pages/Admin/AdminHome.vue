<template>
  <div class="text-center q-pa-md flex flex-center">
    <div class="admin-hbody">
     
      <section class="admin_jobs">'
        <div>
          <h5>Welcome Sysadmin001</h5>
        </div>
        <ul class="flex fl-box">
          <li>
            <q-btn
              class="q-mt-xl"
              color="grey"
              text-color="black"
              unelevated
              to="/admin/customer-list"
              label="Customers"
              no-caps
            />
            <p  class="q-mt-md">
              Manage and view customers
            </p>
          </li>
          <li>
            <q-btn
              class="q-mt-xl"
              color="grey"
              text-color="black"
              unelevated
              to="/admin/enquiry-list"
              label="Enquiry"
              no-caps
            />
            <p  class="q-mt-md">
              Address users' queries
            </p>
          </li>
          <li>
            <q-btn
              class="q-mt-xl"
              color="grey"
              text-color="black"
              unelevated
              to="/admin/business-list"
              label="Businesses"
              no-caps
            />
            <p  class="q-mt-md">
              Manage and view businesses
            </p>
          </li>
          <li>
            <q-btn
              class="q-mt-xl"
              color="grey"
              text-color="black"
              unelevated
              to="/admin/cat-list"
              label="Categories"
              no-caps
            />
            <p  class="q-mt-md">
              Manage and view categories
            </p>
          </li>
          <li>
            <q-btn
              class="q-mt-xl"
              color="grey"
              text-color="black"
              unelevated
              to="/admin/performance-dashboard"
              label="Performance"
              no-caps
            />
            <p  class="q-mt-md">
              Deeper look into platform's lifecycle
            </p>
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
  justify-content: space-evenly;
}

.fl-box > *{
  box-sizing: border-box;
  padding: 25px;

}
</style>
