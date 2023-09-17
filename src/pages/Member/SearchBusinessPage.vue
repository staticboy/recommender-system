<script setup lang="ts">
import { ref } from "vue";
const searchTerm = ref("");
const businesses = ref([
  "test",
  "test2",
  "test3",
  "test4",
  "test5",
  "test6",
  "test7",
]);
</script>
<template>
  <q-page>
    <div class="flex flex-row items-center">
      <h1>Our Business Partners</h1>
    </div>
    <q-input outlined v-model="searchTerm" label="Search Businesses" />
    <div class="grid">
      <template v-for="b in businesses" :key="b">
        <q-card dark bordered class="card">
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
<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}
.card {
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>
