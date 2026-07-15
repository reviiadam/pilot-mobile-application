// ---------------------------------------------
// Mock data. Tidak ada backend — semua di sini
// menggantikan apa yang normalnya datang dari API.
// ---------------------------------------------

export const mockPilot = {
  name: 'John Doe',
  rank: 'Captain',
  employeeId: 'SA-PLT-0472',
  base: 'MKW · Manokwari',
  totalFlightHours: 1444.5,
  avatarInitials: 'JD',
  unreadNotifications: 2
}

export const mockUpcomingFlight = {
  flightNumber: 'SI 118',
  date: '2026-06-01',
  reportTime: '06:00',
  departure: {
    time: '07:00',
    icao: 'WASM',
    iata: 'MKW',
    city: 'Manokwari'
  },
  arrival: {
    time: '08:10',
    icao: 'WASC',
    iata: 'CJN',
    city: 'Cijulang'
  },
  aircraft: 'Cessna Grand Caravan',
  tailNumber: 'PK-BVF'
}

export const mockNews = [
  {
    id: 'n1',
    title: 'Formulir pelaporan kelelahan (FRMS) diperbarui',
    tag: 'Ops Bulletin',
    date: '28 Mei',
    excerpt: 'Formulir FRMS versi baru menggantikan pengajuan kertas mulai 1 Juni.'
  },
  {
    id: 'n2',
    title: 'Peringatan cuaca musim pancaroba — Jawa Barat',
    tag: 'Flight Ops',
    date: '26 Mei',
    excerpt: 'Perkirakan reroute di sekitar aktivitas konvektif hingga Agustus.'
  },
  {
    id: 'n3',
    title: 'Jam layanan CRD pindah ke Hangar 2',
    tag: 'Crew Admin',
    date: '22 Mei',
    excerpt: 'Layanan walk-in kini berada di sebelah ruang briefing kru.'
  }
]
