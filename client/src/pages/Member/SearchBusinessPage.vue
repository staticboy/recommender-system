<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useBizOwnerStore } from "../../stores/biz";

const bizStore = useBizOwnerStore();
const searchTerm = ref("");
const searchResults = computed(() => {
  return bizStore.businessList.filter((b) => {
    return b.biz_name.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});
onMounted(async () => {
  if (bizStore.businessList.length === 0) {
    await bizStore.getAllBusinesses();
  }
})
</script>
<template>
  <q-page>
    <div class="flex flex-row items-center q-pb-md">
      <h1>Our Business Partners</h1>
    </div>
    <q-input outlined v-model="searchTerm" label="Search Businesses" />
    <div class="grid grid-cols-3 gap-3 q-pt-md">
      <q-card
        dark
        bordered
        v-for="b in searchResults"
        :key="b.biz_id"
        class="flex flex-col justify-center items-center rounded-xl q-px-sm q-py-lg"
        style="height: 300px;"
      >
        <q-card-section>
          <div class="text-h6"> {{ b.biz_name }}</div>
        </q-card-section>
        <q-card-section>
          {{ b.biz_description }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<style scoped></style>
