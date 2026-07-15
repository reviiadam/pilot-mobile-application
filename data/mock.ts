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
    title: 'Fatigue Reporting Form (FRMS) Updated',
    tag: 'Ops Bulletin',
    date: 'May 28',
    excerpt: 'The new FRMS version replaces paper submissions starting June 1.'
  },
  {
    id: 'n2',
    title: 'Transitional Season Weather Warning — West Java',
    tag: 'Flight Ops',
    date: 'May 26',
    excerpt: 'Expect reroutes around convective activity areas until August.'
  },
  {
    id: 'n3',
    title: 'CRD Service Hours Moved to Hangar 2',
    tag: 'Crew Admin',
    date: 'May 22',
    excerpt: 'Walk-in services are now available next to the crew briefing room.'
  }
]
