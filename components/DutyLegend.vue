<script setup lang="ts">
import { useScheduleStore } from "~/stores/schedule";

const schedule = useScheduleStore();
</script>

<template>
  <section>
    <!-- Header -->
    <div class="mb-5 flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-white">Duty Legend</h2>

        <p class="text-sm text-slate-300">Flight duty abbreviations</p>
      </div>

      <span
        class="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200 backdrop-blur"
      >
        {{ schedule.legend.length }} Types
      </span>
    </div>

    <!-- Legend List -->
    <div
      class="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"
    >
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="item in schedule.legend"
          :key="item.code"
          class="flex items-center gap-3 rounded-2xl bg-white/5 p-3 transition hover:bg-white/10"
        >
          <!-- Color Indicator -->
          <div
            class="h-4 w-4 rounded-full shadow"
            :style="{ backgroundColor: item.color }"
          />

          <!-- Text -->
          <div class="min-w-0">
            <p class="text-sm font-bold text-white">
              {{ item.code }}
            </p>

            <p class="truncate text-xs text-slate-300">
              {{ item.label }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
