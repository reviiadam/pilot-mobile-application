<script setup lang="ts">
import { useDocumentsStore, type DocStatus } from "~/stores/documents";

const store = useDocumentsStore();

const badgeClasses: Record<DocStatus, string> = {
  good: "bg-status-good/10 text-status-good border-status-good/25",
  warn: "bg-status-warn/10 text-status-warn border-status-warn/25",
  expired: "bg-status-danger/10 text-status-danger border-status-danger/25",
};

function badgeText(doc: { status: DocStatus; daysRemaining: number }) {
  if (doc.status === "expired")
    return `Expired ${Math.abs(doc.daysRemaining)}d ago`;
  return `${doc.daysRemaining} days left`;
}
</script>

<template>
  <section>
    <!-- Header -->
    <div class="mb-5 flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-white">My Documents</h2>

        <p class="text-sm text-slate-300">
          Certificates and required documents
        </p>
      </div>

      <span
        class="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200 backdrop-blur"
      >
        {{ store.documents.length }} Documents
      </span>
    </div>

    <!-- List -->
    <div class="flex flex-col gap-4">
      <div
        v-for="doc in store.documents"
        :key="doc.id"
        class="flex items-center justify-between rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:bg-white/15"
      >
        <!-- Left -->
        <div class="flex min-w-0 items-center gap-4">
          <div class="min-w-0">
            <p class="truncate text-base font-semibold text-white">
              {{ doc.label }}
            </p>

            <p class="mt-1 text-sm text-slate-300">
              Valid until {{ doc.expiryDate }}
            </p>
          </div>
        </div>

        <!-- Right -->
        <div class="flex items-center gap-3">
          <span
            class="rounded-full px-3 py-1 text-xs font-semibold"
            :class="badgeClasses[doc.status]"
          >
            {{ badgeText(doc) }}
          </span>

          <ChevronRight :size="18" class="text-slate-400" />
        </div>
      </div>
    </div>
  </section>
</template>
