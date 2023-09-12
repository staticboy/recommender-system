<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="q-pl-none">
        <q-item class="q-pa-none">
          <q-img
            src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
            height="48px"
            width="91px"
            fit="contain"
          />
        </q-item>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">

</script>
<style scoped></style>