<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-9">
          <h1 class="q-mb-md">Past Transactions</h1>
        </div>
      </div>
      <TransactionTable />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TransactionTable from '../components/MemberTransTable.vue';
</script>


