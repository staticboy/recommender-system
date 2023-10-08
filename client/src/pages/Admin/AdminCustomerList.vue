<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-9">
          <h1 class="q-mb-md">Customer List</h1>
        </div>
      </div>
      <CustomerTable />
    </div>
  </q-page>
</template>


<script setup lang="ts">
import CustomerTable from '../../components/Administrator/AdminCustTable.vue';
// import { useRouter } from 'vue-router';

// const router = useRouter();

</script>

<style scoped lang="scss"></style>
