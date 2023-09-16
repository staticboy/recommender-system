<script setup lang="ts">


</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>

        <q-toolbar-title>
          Sportify
        </q-toolbar-title>

        <q-btn flat round dense icon="whatshot" />
      </q-toolbar>
      
      <template>

        <div>
       test
          <TransactionList />
        </div>

      </template>
      <!-- <q-footer></q-footer> -->

    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
    <!-- <q-footer></q-footer> -->
  </q-layout>
</template>
<style scoped></style>