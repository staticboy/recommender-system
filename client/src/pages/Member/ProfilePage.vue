<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import { useQuasar } from "quasar";
import { useMemberStore } from "../../stores/member/index";
import { useCategoryStore } from "../../stores/category";
import { MemberDetails, MemberPreferences } from "../../stores/member/types";
import EditPreferenceModal from "../../components/Modals/EditPreferenceModal.vue";

const q = useQuasar();
const memberStore = useMemberStore();
const categoryStore = useCategoryStore();
const { categoryList } = useCategoryStore();
const curMemberDetails = computed({
  get: () => memberStore.memberDetails,
  set: (val: MemberDetails) => {
    memberDetails.value = val;
  },
});
const curMemberPreferences = computed({
  get: () => memberStore.memberPreferences,
  set: (val: MemberPreferences[]) => {
    memberPreferences.value = val;
  },
});
const memberDetails = ref();
const memberPreferences = ref<MemberPreferences[]>([]);
const confirmPassword = ref();
const editMode = ref({
  profile: false,
  preferences: false,
});

const onCancelProfile = () => {
  curMemberDetails.value = memberDetails.value;
  editMode.value.profile = !editMode.value.profile;
};
const onSaveProfile = async () => {
  if (editMode.value.profile) {
    if (curMemberDetails.value) {
      const success = await memberStore.updateMemberProfile(
        curMemberDetails.value
      );
      if (success) {
        q.notify({
          type: "positive",
          message: "Profile updated successfully",
        });
      } else {
        q.notify({
          type: "negative",
          message: "Profile update failed",
        });
      }
    }
  }
  editMode.value.profile = !editMode.value.profile;
};
onBeforeMount(async () => {
  if (categoryList.length === 0) {
    await categoryStore.getAllCategories();
  }
  const userID = localStorage.getItem("userId");
  if (userID && !memberDetails && !memberPreferences) {
    await Promise.all([
      memberStore.getMemberProfileDetailsByID(userID),
      memberStore.getMemberPreferencesByID(userID),
    ]);
  }
  memberDetails.value = memberStore.memberDetails;
  memberPreferences.value = memberStore.memberPreferences;
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
        <h1 class="mb-4">Preferences</h1>
      </div>
      <EditPreferenceModal :preferences="curMemberPreferences" />
    </template>
  </q-page>
</template>
<style scoped lang="scss"></style>
