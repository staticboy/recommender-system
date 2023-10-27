<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useMemberStore } from "../../stores/member/index";
import { MemberDetails, MemberPreferences } from "../../stores/member/types";

const memberStore = useMemberStore();
const curMemberDetails = ref<MemberDetails>();
const curMemberPreferences = ref<MemberPreferences[]>();
const { memberDetails, memberPreferences } = useMemberStore();
const confirmPassword = ref();
const editMode = ref({
  profile: false,
  preferences: false,
});

const onCancelProfile = () => {
  curMemberDetails.value = memberDetails;
  editMode.value.preferences = !editMode.value.preferences;
};
const onSaveProfile = async () => {
  if (curMemberDetails.value) {
    await memberStore.updateMemberProfile(curMemberDetails.value);
    editMode.value.profile = !editMode.value.profile;
  }
};
const onCancelPreferences = () => {
  curMemberPreferences.value = memberPreferences;
  editMode.value.preferences = !editMode.value.preferences;
};
const onSavePreferences = async () => {
  if (curMemberPreferences.value && curMemberPreferences.value !== memberPreferences) {
    await memberStore.updateMemberPreferences(curMemberPreferences.value);
    editMode.value.preferences = !editMode.value.preferences;
  }
};
onBeforeMount(async () => {
  const userID = localStorage.getItem("userId");
  if (userID && !memberDetails && !memberPreferences) {
    await Promise.all([
      memberStore.getMemberProfileDetailsByID(userID),
      memberStore.getMemberPreferencesByID(userID),
    ]);
  }
  curMemberDetails.value = memberDetails;
  curMemberPreferences.value = memberPreferences;
});
</script>
<template>
  <q-page>
    <template v-if="curMemberDetails">
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
            @click="onCancelProfile"
          />
          <q-btn
            color="primary"
            :label="editMode.profile ? 'Save' : 'Edit'"
            @click="onSaveProfile"
          />
        </div>
      </div>
      <div class="flex justify-between">
        <div style="width: 48%">
          <q-input
            outlined
            v-model="curMemberDetails.user_name"
            label="Name"
            lazy-rules
            :rules="[(val) => !!val || 'Name is required']"
            :disable="!editMode.profile"
          />
          <q-input
            outlined
            v-model="curMemberDetails.user_phoneno"
            label="Phone Number"
            :disable="!editMode.profile"
            class="q-mb-md"
          />
          <q-input
            outlined
            v-model="curMemberDetails.user_email"
            label="Email"
            lazy-rules
            :rules="[(val) => !!val || 'Email is required']"
            :disable="!editMode.profile"
          />
          <q-input
            outlined
            v-model="curMemberDetails.user_dob"
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
              v-model="curMemberDetails.user_country"
              label="Location"
              :disable="!editMode.profile"
              style="width: 48%"
            />
            <q-select
              outlined
              map-options
              emit-value
              v-model="curMemberDetails.user_gender"
              :options="[
                {
                  label: 'Male',
                  value: 'M',
                },
                {
                  label: 'Female',
                  value: 'F',
                },
              ]"
              label="Gender"
              :disable="!editMode.profile"
              style="width: 48%"
              class="q-mb-md"
            />
          </div>
          <q-input
            outlined
            v-model="curMemberDetails.user_password"
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
            @click="onCancelPreferences"
          />
          <q-btn
            color="primary"
            :label="editMode.preferences ? 'Save' : 'Edit'"
            @click="onSavePreferences"
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
    </template>
  </q-page>
</template>
<style scoped lang="scss"></style>
