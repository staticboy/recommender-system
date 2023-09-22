<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const next = ref(0);
const dialog = ref(false);
const selected = ref(0);
const openDialog = (index: number) => {
  selected.value = index;
  dialog.value = !dialog.value;
};
</script>
<template>
  <q-page>
    <template v-if="next === 0">
      <div class="flex flex-col items-center">
        <h1 style="margin: 0 auto">User 1, welcome to Sportify</h1>
        <span
          style="
            display: table;
            margin: 0 auto;
            width: 55%;
            text-align: justify;
            padding-top: 3%;
          "
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </span>
      </div>
      <div class="flex flex-row items-center" style="padding-top: 3%">
        <q-btn
          no-caps
          label="Get Recommendation"
          @click="next += 1"
          style="margin: 0 auto"
        />
      </div>
    </template>
    <template v-if="next === 1">
      <div class="flex flex-row items-center">
        <h1 style="margin: 0 auto">Recommendation</h1>
      </div>
      <q-btn outlined label="Back" @click="next -= 1" />
      <div class="flex flex-row items-center" style="padding-top: 5%">
        <h3 style="margin: 0 auto">Products</h3>
      </div>
      <div class="grid">
        <template v-for="p in 7" :key="p">
          <q-card dark bordered class="card" @click="openDialog(p)">
            <q-card-section>
              <div class="text-h6">Product {{ p }}</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>
          </q-card>
        </template>
      </div>
    </template>
    <q-dialog v-model="dialog">
      <div class="flex" style="height: 50%; width: 700px">
        <q-card dark bordered class="card" style="height: 100%; width: 45%">
          <q-card-section>
            <div class="text-h6">Product {{ selected }}</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </q-card-section>
        </q-card>
        <q-card dark bordered class="card" style="height: 100%; width: 55%">
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            <br /><br />
            Price: $100
            <br />
            Stock: 100
            <br />
            <q-btn
              flat
              outlined
              no-caps
              icon="save"
              label="Save to wishlist"
              @click="
                () =>
                  $q.notify({
                    message: 'Saved to wishlist',
                    color: 'positive',
                    icon: 'cloud_done',
                  })
              "
            />
            <q-btn
              flat
              outlined
              no-caps
              icon="add_shopping_cart"
              label="Add to cart"
              @click="
                () =>
                  $q.notify({
                    message: 'Added to cart',
                    color: 'positive',
                    icon: 'add_shopping_cart',
                  })
              "
            />
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>
  </q-page>
</template>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  padding-top: 5%;
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
  cursor: pointer;
}
</style>
