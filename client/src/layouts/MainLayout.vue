<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const fullPath = route.fullPath;

// TODO: uncomment once user table and user accounts has been set up
// const router = useRouter();
// const userRole = ref("");

// onBeforeMount(() => {
//   userRole.value = localStorage.getItem('userRole') || "";
//   if (!userRole.value || userRole.value == "") router.push('/login');
//   else {
//     switch (userRole.value) {
//       case "user":
//         router.push('/user');
//         break;
//       case "biz":
//         router.push('/biz');
//         break;
//       case "admin":
//         router.push('/admin');
//         break;
//     }
//   }
// });
const navRoutes = computed(() => {
  if (fullPath.includes("biz")) {
    return "/biz";
  } else if (fullPath.includes("admin")) {
    return "/admin";
  } else {
    return "/user";
  }
});
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>

        <q-btn stretch flat :to="navRoutes + '/home'" label="Home" />
        <!-- USER -->
        <template v-if="navRoutes === '/user'">
          <q-btn stretch flat to="/user/search" label="Business" />
          <q-btn stretch flat to="/user/recommendation" label="Product" />
          <q-btn stretch flat to="/user/enquiry" label="Contact Us" />
        </template>

        <!-- BUSINESS OWNER -->
        <template v-else-if="navRoutes === '/biz'">
          <q-btn stretch flat to="/biz/products-all" label="Add Products" />
          <q-btn stretch flat to="/biz/products" label="View All Products" />
          <q-btn stretch flat to="/biz/prod-lists" label="View Product List" />
          <q-btn stretch flat to="/biz/chart" label="View Charts" />
          <q-btn stretch flat to="/biz/trans-hist" label="View Transaction History" />
          <q-btn stretch flat to="/biz/submit-enq" label="Submit Enquiry" />
        </template>

        <!-- ADMIN -->
        <template v-else-if="navRoutes === '/admin'">
          <q-btn stretch flat to="/admin/customer-list" label="Manage Customers" />
          <q-btn stretch flat to="/admin/enquiry-list" label="Manage Enquiries" />
          <q-btn stretch flat to="/admin/business-list" label="Manage Businesses" />
          <q-btn stretch flat to="/admin/cat-list" label="Manage Categories" />
          <q-btn stretch flat to="/admin/performance-dashboard" label="View Performance" />
        </template>

        <q-space />
        <div class="q-ml-xs">
          <!-- USER -->
          <template v-if="navRoutes === '/user'">
            <q-btn flat round dense icon="shopping_cart" to="/user/cart">
              <q-tooltip>View Cart</q-tooltip>
            </q-btn>
            &nbsp;&nbsp;
            <q-btn flat round dense icon="favorite" to="/user/wishlist">
              <q-tooltip>View Wishlist</q-tooltip>
            </q-btn>
            &nbsp;&nbsp;
            <q-btn flat round dense icon="history" to="/user/transactions">
              <q-tooltip>View Past Transactions</q-tooltip>
            </q-btn>
            &nbsp;&nbsp;
            <q-btn flat round dense icon="account_circle" to="/user/profile">
              <q-tooltip>View Profile</q-tooltip>
            </q-btn>
            &nbsp;&nbsp;
          </template>

          <!-- BUSINESS OWNER -->
          <template v-else-if="navRoutes === '/biz'">
            <q-btn flat round dense icon="account_circle" to="/biz/profile">
              <q-tooltip>View Profile</q-tooltip>
            </q-btn>
            &nbsp;&nbsp;
          </template>

          <q-btn flat round dense label="Log Out" to="/login" />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>
<style scoped></style>
