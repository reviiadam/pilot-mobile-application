<script setup lang="ts">
import { ref, computed } from "vue";
import { X } from "lucide-vue-next";
import { useScheduleStore } from "~/stores/schedule";

const schedule = useScheduleStore();

const viewYear = ref(2026);
const viewMonth = ref(4);

const selectedDate = ref<string | null>(null);
const sheetOpen = ref(false);

const selectedEntry = computed(() =>
  selectedDate.value ? schedule.dutyFor(selectedDate.value) : undefined,
);
const selectedLegend = computed(() =>
  selectedEntry.value
    ? schedule.legendFor(selectedEntry.value.duty_type)
    : undefined,
);

function changeMonth(direction: -1 | 1) {
  let m = viewMonth.value + direction;
  let y = viewYear.value;
  if (m < 0) {
    m = 11;
    y -= 1;
  } else if (m > 11) {
    m = 0;
    y += 1;
  }
  viewMonth.value = m;
  viewYear.value = y;
}

function onSelectDay(iso: string) {
  if (!iso) return;
  selectedDate.value = iso;
  sheetOpen.value = true;
}

function closeSheet() {
  sheetOpen.value = false;
}
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
          Roster
        </p>

        <h1 class="mt-2 text-3xl font-bold text-white">Flight Schedule</h1>

        <p class="mt-2 text-sm text-slate-300">
          View and manage your monthly flight roster
        </p>
      </div>
    </header>

    <!-- Content -->
    <main class="flex flex-col gap-6 px-6">
      <!-- Calendar -->
      <div
        class="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
      >
        <CalendarMonth
          :year="viewYear"
          :month="viewMonth"
          @change-month="changeMonth"
          @select-day="onSelectDay"
        />
      </div>

      <!-- Legend -->
      <div
        class="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
      >
        <DutyLegend />
      </div>
    </main>

    <BottomNav />

    <!-- Bottom Sheet -->
    <Transition name="fade">
      <div
        v-if="sheetOpen"
        class="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
        @click.self="closeSheet"
      >
        <Transition name="sheet" appear>
          <div
            v-if="sheetOpen"
            class="w-full max-w-md rounded-t-[32px] border border-white/10 bg-slate-900/95 p-6 pb-10 shadow-2xl backdrop-blur-xl"
          >
            <!-- Handle -->
            <div class="mx-auto mb-5 h-1.5 w-16 rounded-full bg-white/20" />

            <!-- Header -->
            <div class="mb-5 flex items-center justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-red-400">
                  {{ selectedDate }}
                </p>

                <h2 class="mt-2 text-2xl font-bold text-white">
                  Duty Information
                </h2>
              </div>

              <button
                class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-red-600"
                @click="closeSheet"
              >
                <X :size="18" />
              </button>
            </div>

            <!-- Duty Badge -->
            <div
              v-if="selectedEntry"
              class="mb-6 flex flex-wrap items-center gap-3"
            >
              <span
                class="rounded-full px-3 py-1 text-xs font-semibold"
                :style="{
                  backgroundColor: selectedEntry.base_color + '33',
                  color: selectedEntry.base_color,
                }"
              >
                {{ selectedLegend?.label ?? selectedEntry.duty_type }}
              </span>

              <span class="text-sm text-slate-300">
                {{ selectedEntry.base_name }}
              </span>

              <span class="text-slate-500"> • </span>

              <span class="text-sm text-slate-300">
                {{ selectedEntry.count_logbooks }} /
                {{ selectedEntry.count_schedules }}
                Logged
              </span>
            </div>

            <!-- Description -->
            <p class="mb-8 text-sm leading-relaxed text-slate-300">
              Detailed flight duty information for this date will be available
              in a future update.
            </p>

            <!-- Button -->
            <button
              class="w-full rounded-2xl bg-red-600 py-3 font-semibold text-white transition duration-300 hover:bg-red-700"
              @click="closeSheet"
            >
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.sheet-enter-active,
.sheet-leave-active {
  transition:
    transform 380ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 380ms ease;
}

.sheet-enter-from,
.sheet-leave-to {
  transform: translateY(110%) scale(0.98);
  opacity: 0;
}

.sheet-enter-to,
.sheet-leave-from {
  transform: translateY(0) scale(1);
  opacity: 1;
}
</style>
