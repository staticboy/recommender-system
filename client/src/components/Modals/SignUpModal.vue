<script lang="ts" setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { SignUpDetails } from "../../stores/guest/types";
import { DateTime } from "luxon";
import { useGuestStore } from "../../stores/guest";

const router = useRouter();
const q = useQuasar();
const guestStore = useGuestStore();
const confirmPassword = ref("");
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const signupType = ref("MEMBER");
const form = ref<SignUpDetails>({
  email: "",
  password: "",
  name: "",
  dob: DateTime.now().toFormat("yyyy-MM-dd"),
  dateEst: DateTime.now().year.toString(),
  address: "",
  country: "",
  gender: "M",
  status: "ACTIVE",
});
const rules = {
  name: [(val: string) => !!val || "Please enter your name."],
  description: [(val: string) => !!val || "Please enter your business description."],
  email: [
    (val: string) => !!val || "Please enter your email.",
    (val: string) => EMAIL_REGEX.test(val) || "Invalid email.",
  ],
  password: [(val: string) => !!val || "Password cannot be empty."],
  confirmPassword: [
    (val: string) => val === form.value.password || "Password mismatch.",
  ],
  dob: [
    (val: any) =>
      (!!val && DateTime.fromFormat(val, "yyyy-MM-dd") < DateTime.now()) ||
      "Invalid date.",
  ],
  dateEst: [
    (val: any) =>
      (!!val && DateTime.fromFormat(val, "yyyy") < DateTime.now()) ||
      "Invalid year.",
  ],
  phoneno: [(val: number) => !!val || "Please enter your phone number."],
  address: [(val: string) => !!val || "Please enter your address."],
  country: [(val: string) => !!val || "Please enter your country"],
  gender: [
    (val: string) => val === "M" || val === "F" || "Please select a gender",
  ],
};

const onSubmit = async () => {
  try {
    const resp =
      signupType.value === "MEMBER"
        ? await guestStore.memberSignUp(form.value)
        : await guestStore.businessSignUp(form.value);
    if (resp.user_id) {
      if (signupType.value === "MEMBER") {
        localStorage.setItem("userRole", "MEMBER");
        localStorage.setItem("userId", resp.user_id);
        // time wait 5s
        setTimeout(() => {
          q.notify({
            message: `Successfully registered. Redirecting to home page.`,
            color: "positive",
            timeout: 5000,
          });
        }, 5000);
        router.push({ name: "HomePage" });
      } else {
        q.notify({
          message: `Successfully registered. Please wait for admin approval.`,
          color: "positive",
          timeout: 5000,
        });
      }
    }
  } catch (err: any) {
    q.notify({
      message: `Failed to register: ${err.message}`,
      color: "negative",
    });
  }
};

onMounted(() => {});
</script>

<template>
  <q-card class="absolute-center" style="width: 35vw">
    <q-card-section>
      <h4 class="q-ma-none text-xl mb-4">Sign Up</h4>
    </q-card-section>
    <q-card-section class="px-7">
      <q-form @submit.prevent.stop="onSubmit">
        <div class="flex justify-around">
          <q-radio dense v-model="signupType" val="MEMBER" label="Member" />
          <q-radio
            dense
            v-model="signupType"
            val="BUSINESS"
            label="Business Owner"
          />
        </div>
        <q-input
          outlined
          clearable
          v-model="form.name"
          :label="signupType === 'MEMBER' ? 'Full Name' : 'Business Name'"
          lazy-rules
          :rules="rules.name"
        />
        <q-input
          v-if="signupType === 'BUSINESS'"
          outlined
          clearable
          v-model="form.description"
          label="Business Description"
          lazy-rules
          :rules="rules.description"
        />
        <q-input
          v-if="signupType === 'MEMBER'"
          outlined
          v-model="form.dob"
          label="Date of Birth"
          :rules="rules.dob"
          input-class="cursor-pointer"
          mask="####-##-##"
        >
          <q-popup-proxy ref="qDateProxy" :breakpoint="0" behavior="menu">
            <q-date
              v-model="form.dob"
              minimal
              no-unset
              mask="YYYY-MM-DD"
              @update:model-value="() => $refs.qDateProxy.hide()"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
              </div>
            </q-date>
          </q-popup-proxy>
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer"></q-icon>
          </template>
        </q-input>
        <q-input
          v-else
          outlined
          clearable
          v-model="form.dateEst"
          label="Year Established"
          lazy-rules
          :rules="rules.dateEst"
        />
        <q-input
          outlined
          clearable
          v-model="form.phoneno"
          label="Phone Number"
          lazy-rules
          :rules="rules.phoneno"
        />
        <q-input
          outlined
          clearable
          v-model="form.address"
          label="Address"
          lazy-rules
          :rules="rules.address"
        />
        <q-input
          outlined
          clearable
          v-model="form.country"
          label="Country"
          lazy-rules
          :rules="rules.country"
        />
        <q-select
          v-if="signupType === 'MEMBER'"
          outlined
          map-options
          emit-value
          v-model="form.gender"
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
          lazy-rules
          :rules="rules.gender"
        />
        <q-input
          outlined
          clearable
          v-model="form.email"
          label="Email"
          lazy-rules
          :rules="rules.email"
        >
          <template v-slot:prepend>
            <q-icon name="account_circle" />
          </template>
        </q-input>
        <q-input
          outlined
          clearable
          v-model="form.password"
          type="password"
          label="Password"
          lazy-rules
          :rules="rules.password"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
        <q-input
          outlined
          clearable
          v-model="confirmPassword"
          type="password"
          label="Confirm Password"
          lazy-rules
          :rules="rules.confirmPassword"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
        <div class="flex justify-between">
          <q-btn
            size="md"
            label="Back"
            no-caps
            unelevated
            @click="router.go(-1)"
            style="width: 45%"
          />
          <q-btn
            size="md"
            submit
            type="Submit"
            label="Sign Up"
            no-caps
            color="primary"
            unelevated
            style="width: 45%"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.q-card {
  display: inline-block;
}
</style>
