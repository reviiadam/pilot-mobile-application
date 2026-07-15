<script setup lang="ts">
import { computed } from "vue";
import { ChevronLeft, ChevronRight, Check } from "lucide-vue-next";
import { useScheduleStore } from "~/stores/schedule";

const props = defineProps<{
  year: number;
  month: number;
}>();

const emit = defineEmits<{
  (e: "select-day", isoDate: string): void;
  (e: "change-month", direction: -1 | 1): void;
}>();

const schedule = useScheduleStore();

const monthLabel = computed(() =>
  new Date(props.year, props.month, 1).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  }),
);

const weekdayLabels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const cells = computed(() => {
  const first = new Date(props.year, props.month, 1);
  const daysInMonth = new Date(props.year, props.month + 1, 0).getDate();
  const offset = (first.getDay() + 6) % 7; // Monday-first

  const list: { day: number | null; iso: string | null }[] = [];
  for (let i = 0; i < offset; i++) list.push({ day: null, iso: null });
  for (let d = 1; d <= daysInMonth; d++) {
    list.push({
      day: d,
      iso: `${props.year}-${pad(props.month + 1)}-${pad(d)}`,
    });
  }
  return list;
});

function isDoneEntirely(entry: {
  count_schedules: number;
  count_logbooks: number;
}) {
  return (
    entry.count_schedules > 0 && entry.count_logbooks === entry.count_schedules
  );
}
</script>

<template>
  <div
    class="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
  >
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-red-600 hover:scale-105"
        @click="emit('change-month', -1)"
      >
        <ChevronLeft :size="18" />
      </button>

      <div class="text-center">
        <h2 class="text-xl font-bold text-white">
          {{ monthLabel }}
        </h2>
        <p class="text-xs text-slate-300">Flight Schedule</p>
      </div>

      <button
        class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-red-600 hover:scale-105"
        @click="emit('change-month', 1)"
      >
        <ChevronRight :size="18" />
      </button>
    </div>

    <!-- Week Days -->
    <div class="mb-3 grid grid-cols-7">
      <span
        v-for="w in weekdayLabels"
        :key="w"
        class="text-center text-xs font-semibold uppercase tracking-wider text-slate-400"
      >
        {{ w }}
      </span>
    </div>

    <!-- Calendar -->
    <div class="grid grid-cols-7 gap-y-3">
      <template v-for="(cell, i) in cells" :key="i">
        <div v-if="!cell.day" class="h-16" />

        <button
          v-else
          class="relative mx-auto flex h-16 w-12 flex-col items-center rounded-2xl transition-all duration-300 hover:bg-white/10"
          :class="[
            cell.iso === schedule.today
              ? 'bg-red-600 shadow-lg'
              : 'bg-transparent',
          ]"
          @click="emit('select-day', cell.iso as string)"
        >
          <!-- Day -->
          <span
            class="mt-1 text-sm font-bold"
            :class="
              cell.iso === schedule.today ? 'text-white' : 'text-slate-200'
            "
          >
            {{ cell.day }}
          </span>

          <!-- Duty -->
          <span
            v-if="schedule.dutyFor(cell.iso as string)"
            class="mt-1 text-[9px] font-semibold uppercase text-slate-300"
          >
            {{ schedule.dutyFor(cell.iso as string)!.base_name }}
          </span>

          <!-- Badge -->
          <span
            v-if="
              schedule.dutyFor(cell.iso as string) &&
              schedule.dutyFor(cell.iso as string)!.count_schedules > 0
            "
            class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full text-[9px] font-bold text-white shadow-lg"
            :style="{
              backgroundColor: isDoneEntirely(
                schedule.dutyFor(cell.iso as string)!,
              )
                ? '#10b981'
                : schedule.dutyFor(cell.iso as string)!.base_color,
            }"
          >
            <Check
              v-if="isDoneEntirely(schedule.dutyFor(cell.iso as string)!)"
              :size="10"
              :stroke-width="3"
            />

            <template v-else>
              {{ schedule.dutyFor(cell.iso as string)!.count_schedules }}
            </template>
          </span>

          <!-- Today indicator -->
          <span
            v-if="cell.iso === schedule.today"
            class="absolute bottom-1 h-1 w-6 rounded-full bg-white"
          />
        </button>
      </template>
    </div>
  </div>
</template>
