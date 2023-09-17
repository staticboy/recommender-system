<script setup lang="ts">
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>

        <q-btn stretch flat to="/user/home" label="Home" />
        <q-btn stretch flat to="/user/search" label="Business" />
        <q-btn stretch flat to="/user/recommendation" label="Product" />
        <q-btn stretch flat to="/user/enquiry" label="Contact Us" />

        <q-btn flat round dense icon="shopping_cart" to="/user/cart" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>
<style scoped></style>
