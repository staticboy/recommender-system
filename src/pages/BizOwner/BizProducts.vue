<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-9">
          <h1 class="q-mb-md">Products</h1>
        </div>
        <div class="col-3">
          <q-btn
          type="submit"
          color="primary"
          label="Add Product"
          class="q-mt-md q-mr-md"
          dense
        ></q-btn>
        </div>
      </div>
      <ProductTable />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ProductTable from '../../components/BizProdTable.vue';
</script>


