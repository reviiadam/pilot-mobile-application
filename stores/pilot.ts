import { defineStore } from 'pinia'
import { mockPilot, mockUpcomingFlight, mockNews } from '~/data/mock'

export const usePilotStore = defineStore('pilot', {
  state: () => ({
    profile: mockPilot,
    upcomingFlight: mockUpcomingFlight,
    news: mockNews
  })
})
