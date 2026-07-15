<script setup lang="ts">
import { computed } from "vue";
import { PlaneTakeoff, PlaneLanding } from "lucide-vue-next";
import { usePilotStore } from "~/stores/pilot";

const pilot = usePilotStore();
const flight = computed(() => pilot.upcomingFlight);

const formattedDate = computed(() => {
  const d = new Date(flight.value.date + "T00:00:00");
  return d.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
});
</script>

<template>
  <section>
    <div class="mb-4 flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-white">Upcoming Flight</h2>
        <p class="text-xs text-slate-400">Your next assigned flight</p>
      </div>

      <span
        class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300 backdrop-blur"
      >
        {{ formattedDate }}
      </span>
    </div>

    <div
      class="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-xl"
    >
      <!-- Top Section -->
      <div class="border-b border-white/10 p-5">
        <div class="flex items-center justify-between">
          <span
            class="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-300"
          >
            {{ flight.flightNumber }}
          </span>

          <span class="text-xs text-slate-300">
            {{ flight.aircraft }} • {{ flight.tailNumber }}
          </span>
        </div>
      </div>

      <!-- Route -->
      <div class="p-5">
        <div class="flex items-center">
          <!-- Departure -->
          <div class="flex-1">
            <p class="text-3xl font-bold text-white">
              {{ flight.departure.time }}
            </p>

            <p class="mt-2 text-lg font-semibold text-white">
              {{ flight.departure.icao }}
            </p>

            <p class="text-sm text-slate-400">
              {{ flight.departure.city }}
            </p>
          </div>

          <!-- Flight Path -->
          <div class="flex flex-1 flex-col items-center px-4">
            <span class="mb-2 text-xs text-slate-400">
              Report {{ flight.reportTime }}
            </span>

            <div class="flex w-full items-center">
              <div class="h-2 w-2 rounded-full bg-green-400"></div>

              <div
                class="mx-2 flex-1 border-t border-dashed border-slate-400"
              ></div>

              <PlaneTakeoff class="text-white" :size="18" />

              <div
                class="mx-2 flex-1 border-t border-dashed border-slate-400"
              ></div>

              <div class="h-2 w-2 rounded-full bg-red-400"></div>
            </div>
          </div>

          <!-- Arrival -->
          <div class="flex-1 text-right">
            <p class="text-3xl font-bold text-white">
              {{ flight.arrival.time }}
            </p>

            <p class="mt-2 text-lg font-semibold text-white">
              {{ flight.arrival.icao }}
            </p>

            <p class="text-sm text-slate-400">
              {{ flight.arrival.city }}
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="flex items-center justify-between border-t border-white/10 bg-black/10 px-5 py-3"
      >
        <div>
          <p class="text-[11px] uppercase tracking-wider text-white">
            Aircraft
          </p>

          <p class="text-sm font-medium text-white">
            {{ flight.aircraft }}
          </p>
        </div>

        <div class="text-right">
          <p class="text-[11px] uppercase tracking-wider text-white">
            Tail Number
          </p>

          <p class="text-sm font-medium text-white">
            {{ flight.tailNumber }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
