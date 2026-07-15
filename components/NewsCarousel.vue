<script setup lang="ts">
import { usePilotStore } from "~/stores/pilot";
import { Newspaper, Calendar, ArrowRight } from "lucide-vue-next";

const pilot = usePilotStore();
</script>

<template>
  <section>
    <div class="mb-3 flex items-center justify-between">
      <h2 class="font-display text-[15px] font-semibold text-white">
        Latest News
      </h2>
      <span class="eyebrow">{{ pilot.news.length }} update</span>
    </div>

    <div class="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pb-2">
      <article
        v-for="item in pilot.news"
        :key="item.id"
        class="w-72 shrink-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        <div
          class="flex h-36 items-center justify-center bg-gradient-to-br from-slate-800 to-red-600"
        >
          <Newspaper class="text-white/70" :size="40" />
        </div>

        <!-- Content -->
        <div class="p-5">
          <div class="mb-3 flex items-center justify-between">
            <span
              class="rounded-full bg-red-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-red-600"
            >
              {{ item.tag }}
            </span>

            <div class="flex items-center gap-1 text-xs text-slate-500">
              <Calendar :size="14" />
              {{ item.date }}
            </div>
          </div>

          <h3
            class="line-clamp-2 text-lg font-bold leading-snug text-slate-900"
          >
            {{ item.title }}
          </h3>

          <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
            {{ item.excerpt }}
          </p>

          <button
            class="mt-5 flex items-center gap-2 font-medium text-red-600 transition hover:gap-3"
          >
            Read More
            <ArrowRight :size="16" />
          </button>
        </div>
      </article>
    </div>
  </section>
</template>
