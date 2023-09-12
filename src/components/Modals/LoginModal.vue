<script lang="ts" setup>
// import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
// import { useAuthStore } from "src/stores/auth";

const rules = {
  username: [(val: string) => !!val || "Please enter your username."],
  password: [(val: string) => !!val || "Password cannot be empty."],
};
const router = useRouter();
// const authStore = useAuthStore();
// const q = useQuasar();

const form = ref({
  username: "",
  password: "",
  loginRole: "admin",
  loginType: "username_pw",
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
  router.push({ name: "HomePage" });
};

// const login = async () => {
//   try {
//     await authStore.login(form.value);
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       if (error.response?.status == 401) {
//         errorMessage.value = error.response?.data.error?.includes("disabled")
//           ? "Your account has been deactivated"
//           : "Invalid username or password";
//       } else if (error.response?.status == 400) {
//         errorMessage.value = "Invalid role";
//       }
//     } else {
//       errorMessage.value = error as string;
//     }
//   }
// };

onMounted(() => {
  // if (authStore.isAuthenticated && authStore.user?.login_role === "admin") {
  //   router.push({ name: "HomePage" });
  // }
});
</script>

<template>
  <q-card class="absolute-center">
    <q-card-section class="bg-primary text-white q-mb-sm">
      <h5 class="q-ma-none">Sign In</h5>
    </q-card-section>
    <q-card-section class="tw-px-7">
      <q-form @submit.prevent.stop="onSubmit">
        <BaseInput
          outlined
          clearable
          v-model="form.username"
          label="Username"
          lazy-rules
          :rules="rules.username"
          class="tw-mt-4 tw-mb-2"
        >
          <template v-slot:prepend>
            <q-icon name="account_circle" />
          </template>
        </BaseInput>
        <BaseInput
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
        </BaseInput>
        <BaseBtn
          size="md"
          submit
          class="full-width q-mt-sm tw-mt-6"
          label="Sign In"
          no-caps
          color="primary"
          unelevated
        />
        <div class="text-bold text-center text-negative">
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
