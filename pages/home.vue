<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Bell } from "lucide-vue-next";
import { usePilotStore } from "~/stores/pilot";

const pilot = usePilotStore();

const isLoading = ref(true);
onMounted(() => {
  setTimeout(() => (isLoading.value = false), 500);
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 pb-24"
  >
    <!-- Header -->
    <header class="relative overflow-hidden px-6 pb-8 pt-10">
      <!-- Background Blur -->
      <div
        class="absolute -top-24 -right-20 h-60 w-60 rounded-full bg-red-500/20 blur-3xl"
      />
      <div
        class="absolute -left-20 top-20 h-48 w-48 rounded-full bg-white/10 blur-3xl"
      />

      <div class="relative flex items-start justify-between">
        <div>
          <p class="text-sm text-white/60">Welcome Back Captain</p>

          <h1 class="mt-1 text-3xl font-bold tracking-tight text-white">
            {{ pilot.profile.name }}
          </h1>

          <p class="mt-2 text-sm text-slate-300">
            {{ pilot.profile.rank }}
            •
            {{ pilot.profile.base }}
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button
            class="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur"
          >
            <Bell color="white" :size="18" />

            <span
              v-if="pilot.profile.unreadNotifications"
              class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white"
            >
              {{ pilot.profile.unreadNotifications }}
            </span>
          </button>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 font-semibold text-white shadow-lg"
          >
            {{ pilot.profile.avatarInitials }}
          </div>
        </div>
      </div>

      <!-- Flight Hours -->
      <div
        class="relative mt-8 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl"
      >
        <p class="text-sm text-slate-300">Total Flight Hours</p>

        <div class="mt-2 flex items-end gap-2">
          <span class="text-4xl font-bold text-white">
            {{
              pilot.profile.totalFlightHours.toLocaleString("id-ID", {
                minimumFractionDigits: 1,
              })
            }}
          </span>

          <span class="pb-1 text-slate-300"> hrs </span>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="space-y-6 px-6">
      <template v-if="isLoading">
        <div class="h-36 animate-pulse rounded-3xl bg-white/10"></div>
        <div class="h-32 animate-pulse rounded-3xl bg-white/10"></div>
        <div class="h-72 animate-pulse rounded-3xl bg-white/10"></div>
        <div class="h-48 animate-pulse rounded-3xl bg-white/10"></div>
      </template>

      <template v-else>
        <div
          class="rounded-3xl rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl px-6 py-6"
        >
          <FlightCard />
        </div>

        <div
          class="rounded-3xl rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl"
        >
          <NewsCarousel />
        </div>

        <div
          class="rounded-3xl rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl"
        >
          <HoursToLimit />
        </div>

        <div
          class="rounded-3xl rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl"
        >
          <DocumentsList />
        </div>
      </template>
    </main>

    <BottomNav />
  </div>
</template>
