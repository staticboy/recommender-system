<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, onBeforeMount } from "vue";

const route = useRoute();
const router = useRouter();
const fullPath = route.fullPath;

const navRoutes = computed(() => {
  if (fullPath.includes("biz")) {
    return "/biz";
  } else if (fullPath.includes("admin")) {
    return "/admin";
  } else {
    return "/user";
  }
});

const logout = () => {
  localStorage.removeItem("userRole");
  localStorage.removeItem("userId");
  router.push({ name: "LoginPage" });
};

onBeforeMount(() => {
  const role = localStorage.getItem("userRole");
  if (!role) {
    router.push({ name: "LoginPage" });
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
          <!-- <q-btn stretch flat to="/biz/products-all" label="Add Products" /> -->
          <q-btn stretch flat to="/biz/products" label="Products" />
          <q-btn stretch flat to="/biz/prod-lists" label="View Product List" />
          <q-btn stretch flat to="/biz/insights" label="Data Insights" />
          <q-btn stretch flat to="/biz/trans-hist" label="Transaction History" />
          <q-btn stretch flat to="/biz/submit-enq" label="Enquiry" />
        </template>

        <!-- ADMIN -->
        <template v-else-if="navRoutes === '/admin'">
          <q-btn stretch flat to="/admin/customer-list" label="Customers" />
          <q-btn stretch flat to="/admin/enquiry-list" label="Enquiries" />
          <q-btn stretch flat to="/admin/business-list" label="Businesses" />
          <q-btn stretch flat to="/admin/cat-list" label="Categories" />
          <q-btn stretch flat to="/admin/performance-dashboard" label="Performance" />
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

          <q-btn flat round dense label="Log Out" @click="logout()" />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>
<style scoped></style>
