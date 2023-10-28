<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <q-avatar class="cursor-pointer" @click="router.push({ name: 'GuestLandingPage' })">
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        <q-space />
        <div class="q-ml-xs">
          <q-btn flat round dense label="Log In" @click="login" />
          &nbsp;&nbsp;
          <q-btn flat round dense label="Sign Up" @click="signup" />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const login = () => {
  router.push({ name: "LoginPage" });
};
const signup = () => {
  router.push({ name: "SignUpPage" });
};
</script>
<style scoped></style>
