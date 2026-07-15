<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  points: {
    date: string;
    value: number;
    isFuture: boolean;
    isToday: boolean;
  }[];
  limit: number;
  yMax: number;
}>();

const W = 328;
const H = 148;
const PAD_L = 8;
const PAD_R = 8;
const PAD_T = 10;
const PAD_B = 22;

const plotW = W - PAD_L - PAD_R;
const plotH = H - PAD_T - PAD_B;

function xFor(i: number) {
  return PAD_L + (i / (props.points.length - 1)) * plotW;
}
function yFor(value: number) {
  const ratio = Math.min(value / props.yMax, 1);
  return PAD_T + plotH * (1 - ratio);
}

const limitY = computed(() => yFor(props.limit));

const linePath = computed(() =>
  props.points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(1)} ${yFor(p.value).toFixed(1)}`,
    )
    .join(" "),
);

const areaPath = computed(() => {
  const line = props.points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(1)} ${yFor(p.value).toFixed(1)}`,
    )
    .join(" ");
  const lastX = xFor(props.points.length - 1);
  const firstX = xFor(0);
  return `${line} L ${lastX.toFixed(1)} ${(PAD_T + plotH).toFixed(1)} L ${firstX.toFixed(1)} ${(PAD_T + plotH).toFixed(1)} Z`;
});

function relLabel(offset: number) {
  if (offset === 0) return "Hari ini";
  return offset > 0 ? `+${offset}` : `${offset}`;
}
</script>

<template>
  <div>
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      class="w-full"
      role="img"
      aria-label="Grafik tren rolling sum jam terbang"
    >
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#22c5e8" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#22c5e8" stop-opacity="0" />
        </linearGradient>
      </defs>

      <line
        v-for="frac in [0, 0.25, 0.5, 0.75, 1]"
        :key="frac"
        :x1="PAD_L"
        :x2="W - PAD_R"
        :y1="PAD_T + plotH * (1 - frac)"
        :y2="PAD_T + plotH * (1 - frac)"
        stroke="#e6e9ee"
        stroke-width="1"
      />

      <line
        :x1="PAD_L"
        :x2="W - PAD_R"
        :y1="limitY"
        :y2="limitY"
        stroke="#e63757"
        stroke-width="1.5"
        stroke-dasharray="4 3"
      />
      <text
        :x="W - PAD_R"
        :y="limitY - 4"
        text-anchor="end"
        font-size="9"
        fill="#e63757"
        font-weight="600"
      >
        Batas {{ limit }} jam
      </text>

      <path :d="areaPath" fill="url(#trendFill)" />
      <path
        :d="linePath"
        fill="none"
        stroke="#0e2138"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
      />

      <g v-for="(p, i) in points" :key="p.date">
        <circle
          :cx="xFor(i)"
          :cy="yFor(p.value)"
          :r="p.isToday ? 4 : 2.5"
          :fill="p.isToday ? '#e63757' : p.isFuture ? '#ffffff' : '#0e2138'"
          :stroke="p.isFuture ? '#0e2138' : 'none'"
          stroke-width="1.3"
        />
      </g>

      <text
        v-for="(p, i) in points"
        :key="'lbl-' + p.date"
        v-show="i === 0 || i === 7 || i === 14"
        :x="xFor(i)"
        :y="H - 6"
        text-anchor="middle"
        font-size="9"
        :fill="p.isToday ? '#e63757' : '#98a3b3'"
        :font-weight="p.isToday ? 700 : 500"
      >
        {{ relLabel(i - 7) }}
      </text>
    </svg>
  </div>
</template>
