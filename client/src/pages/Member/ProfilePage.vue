<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useMemberStore } from "../../stores/member/index";

const memberStore = useMemberStore();
const { memberDetails, memberPreferences } = useMemberStore();
const confirmPassword = ref();
const editMode = ref({
  profile: false,
  preferences: false,
});

onBeforeMount(async () => {
  const userID = localStorage.getItem("userId");
  if (userID) {
    await Promise.all([
      memberStore.getMemberProfileDetailsByID(userID),
      memberStore.getMemberPreferencesByID(userID),
    ]);
  }
  console.log(memberPreferences)
});
</script>
<template>
  <q-page v-if="memberDetails">
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
          v-model="memberDetails.user_name"
          label="Name"
          lazy-rules
          :rules="[(val) => !!val || 'Name is required']"
          :disable="!editMode.profile"
        />
        <q-input
          outlined
          v-model="memberDetails.user_phoneno"
          label="Phone Number"
          :disable="!editMode.profile"
          class="q-mb-md"
        />
        <q-input
          outlined
          v-model="memberDetails.user_email"
          label="Email"
          lazy-rules
          :rules="[(val) => !!val || 'Email is required']"
          :disable="!editMode.profile"
        />
        <q-input
          outlined
          v-model="memberDetails.user_dob"
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
            v-model="memberDetails.user_country"
            label="Location"
            :disable="!editMode.profile"
            style="width: 48%"
          />
        </div>
          <q-select
          outlined
          use-chips
          v-model="memberDetails.user_gender"
          label="Gender"
          :disable="!editMode.profile"
          style="width: 48%"
          class="q-mb-md"
        />
        <q-input
          outlined
          v-model="memberDetails.user_password"
          label="Password"
          lazy-rules
          :rules="[(val) => !!val || 'Password is required']"
          :disable="!editMode.profile"
        />
        <q-input
          outlined
          v-model="confirmPassword"
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
      <!-- <q-select
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
      /> -->
    </div>
  </q-page>
</template>
<style scoped lang="scss"></style>
