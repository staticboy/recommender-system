<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, onBeforeMount } from "vue";
import { useMemberStore } from "../stores/member/index";
import LOGO from "../assets/logo.png";

const route = useRoute();
const router = useRouter();
const memberStore = useMemberStore();
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

const toHomePage = () => {
  if (navRoutes.value === "/user") {
    router.push({ name: "HomePage" });
  } else if (navRoutes.value === "/biz") {
    router.push({ name: "BizOwnerHome" });
  } else {
    router.push({ name: "AdminHome" });
  }
};

const logout = () => {
  localStorage.removeItem("userRole");
  localStorage.removeItem("userId");
  localStorage.removeItem("pref_count");
  router.push({ name: "LoginPage" });
};

onBeforeMount(async () => {
  const role = localStorage.getItem("userRole");
  const id = localStorage.getItem("userId");
  if (!role || !id) {
    router.push({ name: "LoginPage" });
  } else {
    await Promise.all([
      memberStore.getMemberProfileDetailsByID(id),
      memberStore.getMemberPreferencesByID(id),
    ]);
  }
});
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-img
          :src="LOGO"
          fit="contain"
          height="50px"
          width="150px"
          @click="toHomePage()"
        />

        <q-btn stretch flat :to="navRoutes + '/home'" label="Home" />
        <!-- USER -->
        <template v-if="navRoutes === '/user'">
          <q-btn stretch flat to="/user/business-search" label="Business" />
          <q-btn stretch flat to="/user/product-search" label="Product" />
          <q-btn stretch flat to="/user/enquiry" label="Contact Us" />
        </template>

        <!-- BUSINESS OWNER -->
        <template v-else-if="navRoutes === '/biz'">
          <!-- <q-btn stretch flat to="/biz/products-all" label="Add Products" /> -->
          <q-btn stretch flat to="/biz/products" label="Products" />
          <!-- <q-btn stretch flat to="/biz/prod-lists" label="View Product List" /> -->
          <q-btn stretch flat to="/biz/insights" label="Data Insights" />
          <q-btn
            stretch
            flat
            to="/biz/trans-hist"
            label="Transaction History"
          />
          <q-btn stretch flat to="/biz/submit-enq" label="Contact Us" />
        </template>

        <!-- ADMIN -->
        <template v-else-if="navRoutes === '/admin'">
          <q-btn stretch flat to="/admin/customer-list" label="Customers" />
          <q-btn stretch flat to="/admin/enquiry-list" label="Enquiries" />
          <q-btn stretch flat to="/admin/business-list" label="Businesses" />
          <q-btn stretch flat to="/admin/cat-list" label="Categories" />
          <q-btn
            stretch
            flat
            to="/admin/performance-dashboard"
            label="Performance"
          />
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
