<script lang="ts" setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// import { useAuthStore } from "src/stores/auth";

const rules = {
  email: [(val: string) => !!val || "Please enter your email."],
  password: [(val: string) => !!val || "Password cannot be empty."],
};
const router = useRouter();
// const authStore = useAuthStore();
const q = useQuasar();

const form = ref({
  email: "",
  password: "",
  confirmPassword: "",
  loginRole: "admin",
});

const errorMessage = ref("");

const onSubmit = async () => {
  // q.loading.show();
  // await login();
  // q.loading.hide();
  // if (authStore.user) {
  //   router.push({ name: "HomePage" });
  // } else {
  //   q.notify({
  //     icon: "report_problem",
  //     message: `Login failed, ${errorMessage.value}`,
  //     color: "negative",
  //   });
  // }
  q.notify({
    message: `Successfully registered! Please check your email for the verification link.`,
    color: "positive",
  });
};

// const login = async () => {
// try {
//   await authStore.login(form.value);
// } catch (error) {
//   if (axios.isAxiosError(error)) {
//     if (error.response?.status == 401) {
//       errorMessage.value = error.response?.data.error?.includes("disabled")
//         ? "Your account has been deactivated"
//         : "Invalid username or password";
//     } else if (error.response?.status == 400) {
//       errorMessage.value = "Invalid role";
//     }
//   } else {
//     errorMessage.value = error as string;
//   }
// }
// };

onMounted(() => {
  // if (authStore.isAuthenticated && authStore.user?.login_role === "admin") {
  //   router.push({ name: "HomePage" });
  // }
});
</script>

<template>
  <q-card class="absolute-center" style="width: 35vw">
    <q-card-section>
      <h4 class="q-ma-none text-xl">Sign Up</h4>
    </q-card-section>
    <q-card-section class="px-7">
      <q-form @submit.prevent.stop="onSubmit">
        <q-input
          outlined
          clearable
          v-model="form.email"
          label="Email"
          lazy-rules
          :rules="rules.email"
          class="mt-4 mb-2"
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
          v-model="form.confirmPassword"
          type="password"
          label="Confirm Password"
          lazy-rules
          :rules="rules.password"
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
            style="width: 45%;"
          />
          <q-btn
            size="md"
            submit
            label="Sign Up"
            no-caps
            color="primary"
            unelevated
            style="width: 45%;"
            @click="onSubmit"
          />
        </div>
        <div class="text-bold text-center text-white">
          {{ errorMessage }}
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
