<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-9">
          <h1 class="q-mb-md">Submit Enquiry</h1>
        </div>
      </div>
      <q-form @submit.prevent="submitEnquiry">
        <div class="row">
          <div class="col-6">
            <q-input
            outlined
            v-model="enquiry.enq_subject"
            label="Email"
            dense
            required
            type="email"
            class="q-mr-md"
          ></q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <q-input
            outlined
            v-model="enquiry.enq_message"
            label="Description"
            type="textarea"
            :rows=4
            dense
            required
            class="q-mt-md width-100"
          ></q-input>
          </div>
        </div>
      </q-form>

      <q-btn
        type="submit"
        color="primary"
        label="Submit"
        class="q-mt-md"
        dense
        @click="submitEnquiry"
      ></q-btn>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const enquiry = ref({
    enq_subject: 'Sample Member Enquiry Subject',
    enq_message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
  });


  const submitEnquiry = () => {
    
  };
</script>
