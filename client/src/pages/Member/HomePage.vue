<script setup lang="ts">
import { onBeforeMount } from "vue";
import { DEMO_BUSINESS_LIST, DEMO_PRODUCT_LIST } from "../../constants.ts";
import { useQuasar } from "quasar";
import { useMemberStore } from "../../stores/member";

const q = useQuasar();
const memberStore = useMemberStore();

onBeforeMount(async () => {
  const userID = localStorage.getItem("userId");
  if (userID) {
    await Promise.all([
      memberStore.getMemberProfileDetailsByID(userID),
      memberStore.getMemberPreferencesByID(userID),
    ]);
  }
});
</script>
<template>
  <q-page>
    <div class="flex flex-col gap-5 items-center q-px-lg q-pb-xl">
      <div class="w-full mt-10">
        <h1>Welcome</h1>
      </div>
    </div>
    <!-- Products -->
    <h5>Check out some of these products!</h5>
    <div class="grid grid-cols-4 gap-3 q-py-lg h-max">
      <div class="flex col-span-1">
        <q-card
          dark
          bordered
          class="flex flex-col justify-center items-center rounded-xl q-px-sm q-py-lg"
        >
          <q-card-section>
            <div class="text-h6">Business {{ DEMO_BUSINESS_LIST[0] }}</div>
          </q-card-section>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </q-card-section>
        </q-card>
      </div>
      <div class="col-span-3">
        <q-scroll-area style="height: 300px">
          <div class="flex flex-row no-wrap" style="height: 300px">
            <q-card
              v-for="product in DEMO_PRODUCT_LIST"
              :key="product.prod_id"
              bordered
              class="rounded-xl q-px-sm q-py-lg"
              style="max-width: 50%; min-width: 20%"
            >
              <q-card-section>
                <q-chip> ${{ product.prod_price }} </q-chip>
              </q-card-section>
              <q-card-section>
                <div class="text-h6">{{ product.prod_name }}</div>
              </q-card-section>
              <q-card-section class="w-full">
                {{ product.prod_description }}
              </q-card-section>
              <q-card-section class="w-full">
                <span v-if="product.prod_status == 'Not Available'">
                  {{ product.prod_status }}
                </span>
                <q-btn
                  v-else
                  label="Add to cart"
                  icon="shopping_cart"
                  class="w-full"
                  @click="
                    () =>
                      q.notify({
                        message: 'Added to cart',
                        color: 'positive',
                        icon: 'add_shopping_cart',
                      })
                  "
                />
              </q-card-section>
            </q-card>
          </div>
        </q-scroll-area>
      </div>
    </div>

    <!-- Our Business Partners -->
    <h5>Our Business Collaborators</h5>
    <div class="grid grid-cols-4 gap-3 q-pt-md">
      <template v-for="b in DEMO_BUSINESS_LIST" :key="b">
        <q-card
          dark
          bordered
          class="flex flex-col justify-center items-center rounded-xl"
        >
          <q-card-section>
            <div class="text-h6 text-center">Business {{ b }}</div>
          </q-card-section>
        </q-card>
      </template>
    </div>
  </q-page>
</template>
<style scoped lang="scss"></style>
