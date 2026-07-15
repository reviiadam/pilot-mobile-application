<script setup lang="ts">
import { ref } from "vue";
import { Plane, Eye, EyeOff } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const error = ref("");
const submitting = ref(false);

function handleSubmit() {
  error.value = "";
  if (!username.value.trim() || !password.value.trim()) {
    error.value = "Masukkan username dan password untuk melanjutkan.";
    return;
  }
  submitting.value = true;
  setTimeout(() => {
    auth.login(username.value.trim(), password.value);
    router.push("/home");
  }, 350);
}
</script>

<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-red-700 px-6"
  >
    <!-- Background Circle -->
    <div
      class="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-red-500/20 blur-3xl"
    />
    <div
      class="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-white/10 blur-3xl"
    />

    <div
      class="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
    >
      <!-- Logo -->
      <div class="mb-8 flex flex-col items-center">
        <div
          class="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl"
        >
          <img
            src="../assets/images/susiair-logo.png"
            class="h-16 w-16 object-contain"
          />
        </div>

        <h1 class="text-3xl font-bold text-white">Welcome Back</h1>

        <p class="mt-1 text-red-200">Pilot Companion</p>

        <p class="mt-2 text-center text-sm text-slate-200">
          Sign in to access your flights, schedules, and documents.
        </p>
      </div>

      <!-- Form -->
      <form class="space-y-5" @submit.prevent="handleSubmit">
        <div>
          <label class="mb-2 block text-sm text-slate-200"> Username </label>

          <div class="relative">
            <User
              class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              :size="18"
            />

            <input
              v-model="username"
              type="text"
              placeholder="Enter username"
              class="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-11 pr-4 text-white placeholder:text-slate-400 focus:border-red-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label class="mb-2 block text-sm text-slate-200"> Password </label>

          <div class="relative">
            <Lock
              class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              :size="18"
            />

            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter password"
              class="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-11 pr-12 text-white placeholder:text-slate-400 focus:border-red-400 focus:outline-none"
            />

            <button
              type="button"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              @click="showPassword = !showPassword"
            >
              <component :is="showPassword ? EyeOff : Eye" :size="18" />
            </button>
          </div>
        </div>

        <Transition name="fade">
          <p v-if="error" class="text-sm text-red-300">
            {{ error }}
          </p>
        </Transition>

        <button
          type="submit"
          :disabled="submitting"
          class="flex w-full items-center justify-center rounded-xl bg-red-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-xl disabled:opacity-50"
        >
          <Plane class="mr-2" :size="18" />

          {{ submitting ? "Signing In..." : "Sign In" }}
        </button>
      </form>

      <!-- Footer -->
      <div class="mt-8 border-t border-white/10 pt-5 text-center">
        <a href="#" class="text-sm text-slate-300 hover:text-white">
          Need help? Contact CRD
        </a>
      </div>
    </div>
  </div>
</template>
