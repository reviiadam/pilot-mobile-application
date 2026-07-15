<script setup lang="ts">
import { computed } from "vue";
import { useFlightHoursStore } from "~/stores/flightHours";
import type { TrendToggle } from "~/composables/useRollingSum";

const store = useFlightHoursStore();

const statusColor: Record<string, string> = {
  good: "#1fbf8f",
  warn: "#f59e0b",
  danger: "#e63757",
};

const toggles: { id: TrendToggle; label: string }[] = [
  { id: "1w", label: "1M" },
  { id: "1m", label: "1B" },
  { id: "3m", label: "3B" },
  { id: "6m", label: "6B" },
  { id: "1y", label: "1T" },
];

const trend = computed(() => store.trend);
</script>

<template>
  <section>
    <div class="mb-3 flex items-center justify-between">
      <h2 class="font-display text-[15px] font-semibold text-white">
        Hours to Limit
      </h2>
      <span class="eyebrow">FTL</span>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div
        v-for="s in store.summary"
        :key="s.id"
        class="rounded-card border border-surface-line bg-surface-card p-3.5 shadow-card"
      >
        <div class="mb-2 flex items-center justify-between">
          <span class="text-xs font-medium text-ink-muted">{{ s.label }}</span>
          <span
            class="h-1.5 w-1.5 rounded-full"
            :style="{ backgroundColor: statusColor[s.status] }"
          ></span>
        </div>
        <p class="text-lg font-semibold leading-none tracking-tight">
          {{ s.used.toFixed(1) }}
          <span class="text-xs font-normal text-ink-faint"
            >/ {{ s.limit }} Hours</span
          >
        </p>
        <div
          class="mt-2.5 h-1.5 w-full overflow-hidden rounded-pill bg-surface-line"
        >
          <div
            class="h-full rounded-pill transition-all duration-500"
            :style="{
              width: Math.min(s.ratio * 100, 100) + '%',
              backgroundColor: statusColor[s.status],
            }"
          ></div>
        </div>
      </div>
    </div>

    <div
      class="mt-4 rounded-card border border-surface-line bg-surface-card p-4 shadow-card"
    >
      <div class="mb-3 flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-ink-muted">Tren Rolling Sum</p>
          <p class="text-[11px] text-ink-faint">H-7 s.d. H+7</p>
        </div>
        <div class="flex gap-1 rounded-pill bg-navy-soft p-1">
          <button
            v-for="t in toggles"
            :key="t.id"
            class="rounded-pill px-2.5 py-1 text-[11px] font-semibold transition-colors"
            :class="
              store.activeToggle === t.id
                ? 'bg-navy text-white'
                : 'text-ink-muted'
            "
            @click="store.setToggle(t.id)"
          >
            {{ t.label }}
          </button>
        </div>
      </div>

      <TrendChart
        :points="trend.points"
        :limit="trend.limit"
        :y-max="trend.yMax"
      />
    </div>
  </section>
</template>
