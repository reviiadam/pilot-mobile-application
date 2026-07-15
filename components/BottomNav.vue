<script setup lang="ts">
import { Home, CalendarDays, BookOpen, MoreHorizontal } from "lucide-vue-next";

const route = useRoute();

const items = [
  { label: "Home", to: "/home", icon: Home },
  { label: "Schedule", to: "/schedule", icon: CalendarDays },
  { label: "Logbook", to: "/logbook", icon: BookOpen },
  { label: "More", to: "/more", icon: MoreHorizontal },
];
</script>

<template>
  <nav
    class="fixed bottom-6 left-1/2 z-50 flex w-[90%] max-w-sm -translate-x-1/2 rounded-full bg-slate-900/90 p-2 shadow-2xl backdrop-blur-xl"
  >
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="flex flex-1 flex-col items-center rounded-full py-3 transition-all duration-300"
      :class="
        route.path === item.to ? 'bg-red-600 text-white' : 'text-slate-400'
      "
    >
      <component :is="item.icon" :size="20" />

      <span class="mt-1 text-[10px]">
        {{ item.label }}
      </span>
    </NuxtLink>
  </nav>
</template>
