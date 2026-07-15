<script setup lang="ts">
import {
  ChevronRight,
  User,
  Settings,
  Bell,
  FileText,
  Headphones,
  LogOut,
} from "lucide-vue-next";
import { usePilotStore } from "~/stores/pilot";

const auth = usePilotStore();
const router = useRouter();

function signOut() {
  auth.logout();
  router.push("/");
}

const menus = [
  {
    label: "Profile",
    icon: User,
  },
  {
    label: "Settings",
    icon: Settings,
  },
  {
    label: "Notifications",
    icon: Bell,
  },
  {
    label: "Documents",
    icon: FileText,
  },
  {
    label: "Contact CRD",
    icon: Headphones,
  },
];
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 pb-24"
  >
    <!-- Header -->
    <header class="relative overflow-hidden px-6 pb-8 pt-10">
      <div
        class="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-red-500/20 blur-3xl"
      />

      <div class="relative">
        <p
          class="text-sm font-semibold uppercase tracking-[0.2em] text-red-400"
        >
          Account
        </p>

        <h1 class="mt-2 text-3xl font-bold text-white">More</h1>

        <p class="mt-2 text-sm text-slate-300">
          Manage your account and preferences
        </p>
      </div>
    </header>

    <main class="px-6">
      <!-- Profile Card -->
      <div
        class="mb-6 flex items-center gap-4 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"
      >
        <div
          class="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white"
        >
          {{ auth.profile.name.charAt(0) ?? "P" }}
        </div>

        <div class="flex-1">
          <h2 class="text-lg font-bold text-white">
            {{ auth.profile.name ?? "Pilot" }}
          </h2>

          <p class="text-sm text-slate-300">Susi Air Pilot</p>
        </div>
      </div>

      <!-- Menu -->
      <div class="space-y-3">
        <button
          v-for="menu in menus"
          :key="menu.label"
          class="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-left transition hover:bg-white/15"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10"
            >
              <component :is="menu.icon" :size="20" class="text-red-400" />
            </div>

            <span class="font-medium text-white">
              {{ menu.label }}
            </span>
          </div>

          <ChevronRight :size="18" class="text-slate-400" />
        </button>
      </div>

      <!-- Logout -->
      <button
        class="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-4 font-semibold text-white transition hover:bg-red-700"
        @click="signOut"
      >
        <LogOut :size="18" />
        Sign Out
      </button>
    </main>

    <BottomNav />
  </div>
</template>
