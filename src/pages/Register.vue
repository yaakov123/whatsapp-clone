<template>
  <section class="w-full h-full flex flex-col items-center justify-center">
    <div class="w-80 flex flex-col items-center">
      <img />

      <h1 class="text-3xl mt-2 font-bold">Create your account</h1>
      <p>
        Or
        <span class="text-green-500"
          ><router-link to="/login">login to your account</router-link></span
        >
      </p>

      <Input
        type="text"
        label="Email"
        placeholder="someone@somewhere.com"
        class="w-full mt-10"
        v-model="email"
      />
      <Input
        type="password"
        label="Password"
        placeholder="Password..."
        class="w-full mt-5"
        v-model="password"
      />

      <Button text="Register" class="mt-10 w-full" @click="register"></Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { account } from "../api";
import { useRouter } from "vue-router";

const email = ref();
const password = ref();
const router = useRouter();
async function register() {
  if (!email.value || !password.value) return;

  await account.create("unique()", email.value, password.value);
  await account.createEmailSession(email.value, password.value);
  router.push({ name: "application" });
}
</script>
