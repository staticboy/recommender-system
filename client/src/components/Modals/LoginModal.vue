<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useUserStore } from "../../stores/user";
import { LoginCredentials } from "../../stores/user/types";

const router = useRouter();
const q = useQuasar();
const userStore = useUserStore();

const rules = {
  email: [(val: string) => !!val || "Please enter your email."],
  password: [(val: string) => !!val || "Password cannot be empty."],
};

const form = ref<LoginCredentials>({
  email: "",
  password: "",
});

const onSubmit = async () => {
  q.loading.show();
  await login();
  q.loading.hide();
};

const login = async () => {
  try {
    const resp = await userStore.login(form.value);
    if (resp) {
      localStorage.setItem("userRole", resp.role);
      localStorage.setItem("userId", resp.id);
      localStorage.setItem("pref_count", `${resp.pref_count}`);
      redirect(resp.role);
    }
  } catch (error) {
    console.log(error);
    q.notify({
      icon: "report_problem",
      message: "Invalid email or password",
      color: "negative",
    });
    // if (axios.isAxiosError(error)) {
    //   if (error.response?.status == 401) {
    //     errorMessage.value = error.response?.data.error?.includes("disabled")
    //       ? "Your account has been deactivated"
    //       : "Invalid username or password";
    //   } else if (error.response?.status == 400) {
    //     errorMessage.value = "Invalid role";
    //   }
    // } else {
    //   errorMessage.value = error as string;
    // }
  }
};

const redirect = (role: string) => {
  if (role.toLowerCase() === "admin") {
    router.push({ name: "AdminHome" });
  } else if (role.toLowerCase() === "member") {
    router.push({ name: "HomePage" });
  } else {
    router.push({ name: "BizOwnerHome" });
  }
};

onBeforeMount(() => {
  const role = localStorage.getItem("userRole");
  if (role && localStorage.getItem("userId")) {
    q.loading.show();
    q.notify({
      icon: "info",
      message: "You are already logged in. Redirecting...",
      color: "positive",
      timeout: 2000,
    });
    setTimeout(() => {
      redirect(role);
      q.loading.hide();
    }, 2000);
    q.loading.hide();
  }
});
</script>

<template>
  <q-card class="absolute-center" style="width: 35vw">
    <q-card-section class="text-center mt-6">
      <h5 class="q-ma-none text-xl">Log In</h5>
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
        <q-btn
          size="md"
          submit
          class="full-width mt-6"
          label="Sign In"
          no-caps
          color="primary"
          unelevated
          @click="onSubmit"
        />
      </q-form>
    </q-card-section>
    <q-card-section>
      Don't have an account? Sign up
      <u class="cursor-pointer" @click="router.push({ name: 'SignUpPage' })">
        here
      </u>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.q-card {
  display: inline-block;
}
</style>
