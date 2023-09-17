<script setup lang="ts">
import { ref } from "vue";

const editMode = ref({
  profile: false,
  preferences: false,
});
const date = new Date();
const form = ref({
  name: "User 1",
  phoneNum: "98765432",
  email: "userabc@abc.com",
  dob: `${new Date(
    date.getFullYear() - 25,
    date.getMonth(),
    date.getDate()
  ).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })}`,
  zipCode: "290385",
  location: "Singapore",
  password: "********",
  confirmPassword: "",
});
const category = ref({
  sports: [
    "Basketball",
    "Soccer",
    "Tennis",
    "Badminton",
    "Swimming",
    "Running",
  ],
  item: ["Shoes", "Clothes", "Bags", "Accessories"],
});
</script>
<template>
  <q-page>
    <div
      class="flex flex-row items-center justify-between w-full"
      style="margin: 0px 15px"
    >
      <h1>Profile</h1>
      <div>
        <q-btn
          v-if="editMode.profile"
          label="Cancel"
          class="q-pr-sm"
          @click="editMode.profile = !editMode.profile"
        />
        <q-btn
          color="primary"
          :label="editMode.profile ? 'Save' : 'Edit'"
          @click="editMode.profile = !editMode.profile"
        />
      </div>
    </div>
    <div class="flex justify-between">
      <div style="width: 48%">
        <q-input
          outlined
          v-model="form.name"
          label="Name"
          lazy-rules
          :rules="[(val) => !!val || 'Name is required']"
          :disable="!editMode.profile"
        />
        <q-input
          outlined
          v-model="form.phoneNum"
          label="Phone Number"
          :disable="!editMode.profile"
        />
        <q-input
          outlined
          v-model="form.email"
          label="Email"
          lazy-rules
          :rules="[(val) => !!val || 'Email is required']"
          :disable="!editMode.profile"
        />
        <q-input
          outlined
          v-model="form.dob"
          label="Date of Birth"
          lazy-rules
          :rules="[(val) => !!val || 'DOB is required']"
          :disable="!editMode.profile"
        />
      </div>
      <div style="width: 48%">
        <div class="flex flex-row justify-between">
          <q-input
            outlined
            v-model="form.zipCode"
            label="Zipcode"
            lazy-rules
            :rules="[(val) => !!val || 'Zipcode is required']"
            :disable="!editMode.profile"
            style="width: 48%"
          />
          <q-input
            outlined
            v-model="form.location"
            label="Location"
            :disable="!editMode.profile"
            style="width: 48%"
          />
        </div>
        <q-input
          outlined
          v-model="form.password"
          label="Password"
          lazy-rules
          :rules="[(val) => !!val || 'Password is required']"
          :disable="!editMode.profile"
        />
        <q-input
          outlined
          v-model="form.confirmPassword"
          label="Confirm Password"
          lazy-rules
          :rules="[(val) => !!val || 'Password is required']"
          :disable="!editMode.profile"
        />
      </div>
    </div>

    <div
      class="flex flex-row items-center justify-between w-full"
      style="margin: 0px 15px"
    >
      <h1>Preferences</h1>
      <div>
        <q-btn
          v-if="editMode.preferences"
          label="Cancel"
          class="q-pr-sm"
          @click="editMode.preferences = !editMode.preferences"
        />
        <q-btn
          color="primary"
          :label="editMode.preferences ? 'Save' : 'Edit'"
          @click="editMode.preferences = !editMode.preferences"
        />
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <q-select
        outlined
        multiple
        use-chips
        v-model="category.sports"
        label="Sport Categories"
        :disable="!editMode.preferences"
        style="width: 48%"
      >
      </q-select>
      <q-select
        outlined
        multiple
        use-chips
        v-model="category.item"
        label="Item Categories"
        :disable="!editMode.preferences"
        style="width: 48%"
      />
    </div>
  </q-page>
</template>
<style scoped lang="scss"></style>
