<script setup lang="ts">
import { useRouter } from "vue-router";
import { BizProfileDetails } from "../../stores/biz/types";

defineProps({
  business: {
    type: Object as PropType<BizProfileDetails>,
    required: true,
  },
  disable: {
    type: Boolean,
    default: false,
  },
});
const router = useRouter();
</script>
<template>
  <div class="flex" style="height: 50%; width: 700px">
    <q-card
      dark
      bordered
      class="flex flex-col justify-center items-center rounded-xl q-px-sm q-py-lg"
      style="height: 100%; width: 45%"
    >
      <q-card-section>
        <div class="text-h6">{{ business.biz_name }}</div>
      </q-card-section>
      <q-card-section class="text-center">
        {{ business.biz_description }}
      </q-card-section>
    </q-card>
    <q-card
      dark
      bordered
      class="flex flex-col justify-center items-center rounded-xl q-px-sm q-py-lg"
      style="height: 100%; width: 55%"
    >
      <q-card-section>
        Address: {{ business.biz_address }} <br /><br />
        Zip Code: {{ business.biz_zipcode }} <br /><br />
        Country: {{ business.biz_country }} <br /><br />
        Phone Number: {{ business.biz_phoneno }} <br /><br />
        Email: {{ business.biz_email }} <br /><br />
        <q-btn
          v-if="!disable"
          flat
          outlined
          no-caps
          icon="search"
          label="View Business Products"
          @click="
            router.push({
              name: 'ProductSearchPage',
              query: { businessId: business.biz_id },
            })
          "
        />
      </q-card-section>
    </q-card>
  </div>
</template>
