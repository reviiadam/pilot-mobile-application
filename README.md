# Susi Air — Pilot Companion (FlightDeck)

Aplikasi pendamping harian untuk pilot: sign in, dashboard, dan jadwal duty.
Dibangun mobile-first, tanpa backend — semua data berasal dari file JSON mock.

## Stack

- **Nuxt 3** — Composition API + `<script setup>`
- **Pinia** — state management (`stores/`)
- **Tailwind CSS** — utility-first styling, token warna/tipografi di `tailwind.config.ts`
- **SCSS** — base styles global di `assets/scss/main.scss`
- **lucide-vue-next** — ikon
- **@vite-pwa/nuxt** — PWA (installable, offline shell)

## Struktur proyek

```
components/     Komponen UI reusable (FlightCard, HoursToLimit, TrendChart,
                 CalendarMonth, DutyLegend, DocumentsList, BottomNav, ...)
composables/     useRollingSum.ts — logika rolling-sum murni (bisa diuji terpisah dari UI)
stores/          Pinia stores: auth, pilot, flightHours, documents, schedule
data/            Sumber data mock (termasuk 3 file JSON resmi yang diberikan)
pages/           index (sign in), home, schedule, logbook, more
layouts/         Layout default
```

## Sumber data

Tiga file JSON yang diberikan dipakai langsung sebagai sumber kebenaran, tanpa
diubah nilainya:

- `data/mock-flight-hours.json` — 521 hari histori jam terbang, plus `limits`
  dan `chartBounds` per toggle (1w/1m/3m/6m/1y). "Hari ini" diambil dari
  tanggal terakhir pada array `flightHours` (2026-05-31).
- `data/mock-documents.json` — daftar dokumen dengan `today` dan
  `thresholds.warningDays` sendiri (2026-05-31, 30 hari).
- `data/mock-schedules.json` — legend duty code + entri jadwal per tanggal,
  dengan `today` sendiri (2026-05-15).

**Catatan:** ketiga file punya field `today` yang berbeda-beda. Ini
diperlakukan apa adanya (masing-masing store memakai `today` miliknya
sendiri) alih-alih dipaksa seragam, supaya setiap dataset tetap konsisten
secara internal terhadap dirinya sendiri.

## Logika Hours to Limit (`composables/useRollingSum.ts`)

- Rolling sum pada tanggal D untuk jendela N hari = total jam terbang dari
  (D − N + 1) sampai D — bukan jam pada satu hari saja.
- Grafik tren selalu menampilkan `displayRangeDays` hari sebelum "hari ini",
  hari ini, dan `displayRangeDays` hari sesudahnya (nilai ini juga diambil
  dari `chartBounds` pada file JSON, bukan di-hardcode).
- Tanggal setelah "hari ini" tidak punya data jam terbang (dataset berhenti
  di hari ini), sehingga dihitung sebagai 0 jam tambahan. Ini tetap
  menghasilkan kurva yang bermakna: saat jendela bergeser maju, hari duty
  lama keluar dari jendela dan tidak digantikan apa pun, sehingga garis
  menunjukkan seberapa cepat "buffer" pilot pulih **jika tidak ada
  penerbangan tambahan** — berguna untuk perencanaan.

## Menjalankan secara lokal

```bash
npm install
npm run dev      # http://localhost:3000
```

Build produksi:

```bash
npm run build
node .output/server/index.mjs
```

## Catatan pengembangan lanjutan

- Halaman **Logbook** dan detail duty per tanggal masih placeholder sesuai
  cakupan tes ini — siap dikembangkan lebih lanjut begitu ada spesifikasi
  dan/atau backend.
- Tidak ada autentikasi sungguhan; form sign in langsung mengarah ke Home.
- Ikon PWA di `public/icons/` adalah mark generik dengan palet warna Susi
  Air (navy/merah), bukan logo resmi perusahaan — ganti dengan aset resmi
  sebelum dipakai di luar konteks tes ini.
