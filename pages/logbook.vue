<script setup lang="ts">
import { BookOpen } from "lucide-vue-next";
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 pb-24"
  >
    <!-- Header -->
    <header class="relative overflow-hidden px-6 pb-6 pt-10">
      <!-- Background Effect -->
      <div
        class="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-red-500/20 blur-3xl"
      />

      <div class="relative">
        <p
          class="text-sm font-semibold uppercase tracking-[0.2em] text-red-400"
        >
          Records
        </p>

        <h1 class="mt-2 text-3xl font-bold text-white">Flight Logbook</h1>

        <p class="mt-2 text-sm text-slate-300">
          Manage and review your flight records
        </p>
      </div>
    </header>

    <!-- Content -->
    <main class="flex flex-1 items-center justify-center px-6">
      <div
        class="w-full max-w-sm rounded-3xl border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl"
      >
        <!-- Icon -->
        <div
          class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-600 shadow-lg"
        >
          <BookOpen :size="34" class="text-white" :stroke-width="2" />
        </div>

        <!-- Title -->
        <h2 class="text-2xl font-bold text-white">Coming Soon</h2>

        <!-- Description -->
        <p class="mt-3 text-sm leading-relaxed text-slate-300">
          Flight logbook entries for every sortie will be available in an
          upcoming release.
        </p>

        <!-- Badge -->
        <div class="mt-6">
          <span
            class="rounded-full border border-red-500/30 bg-red-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-red-300"
          >
            Under Development
          </span>
        </div>
      </div>
    </main>

    <BottomNav />
  </div>
</template>
