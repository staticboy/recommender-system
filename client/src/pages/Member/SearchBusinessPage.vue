<script setup lang="ts">
import { ref, computed } from "vue";
import { DEMO_BUSINESS_LIST } from "../../constants.ts"

const searchTerm = ref("");
const searchResults = computed(() => {
  return DEMO_BUSINESS_LIST.filter((b) => {
    return b.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});
</script>
<template>
  <q-page>
    <div class="flex flex-row items-center q-pb-md">
      <h1>Our Business Partners</h1>
    </div>
    <q-input outlined v-model="searchTerm" label="Search Businesses" />
    <div class="grid grid-cols-3 gap-3 q-pt-md">
      <template v-for="b in searchResults" :key="b">
        <q-card
          dark
          bordered
          class="flex flex-col justify-center items-center rounded-xl q-px-sm q-py-lg"
        >
          <q-card-section>
            <div class="text-h6">Business {{ b }}</div>
          </q-card-section>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </q-card-section>
        </q-card>
      </template>
    </div>
  </q-page>
</template>
<style scoped></style>
