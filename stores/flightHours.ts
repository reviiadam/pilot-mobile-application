import { defineStore } from 'pinia'
import flightHoursFile from '~/data/mock-flight-hours.json'
import {
  rollingSumEndingOn,
  buildTrendSeries,
  statusForRatio,
  type FlightHourRecord,
  type ChartBound,
  type TrendToggle
} from '~/composables/useRollingSum'

interface FlightHoursFile {
  pilot: { name: string; totalFlightHours: number }
  limits: { daily: number; weekly: number; monthly: number; annual: number }
  chartBounds: Record<TrendToggle, ChartBound>
  flightHours: FlightHourRecord[]
}

const file = flightHoursFile as FlightHoursFile

interface SummaryWindow {
  id: 'daily' | 'weekly' | 'monthly' | 'annual'
  label: string
  windowDays: number
  limit: number
  used: number
  ratio: number
  status: 'good' | 'warn' | 'danger'
}

export const useFlightHoursStore = defineStore('flightHours', {
  state: () => ({
    today: file.flightHours[file.flightHours.length - 1].date,
    records: file.flightHours,
    limits: file.limits,
    chartBounds: file.chartBounds,
    pilotFromFile: file.pilot,
    activeToggle: '1m' as TrendToggle
  }),

  getters: {
    summary(state): SummaryWindow[] {
      const defs: { id: SummaryWindow['id']; label: string; windowDays: number; limit: number }[] = [
        { id: 'daily', label: 'Harian', windowDays: 1, limit: state.limits.daily },
        { id: 'weekly', label: 'Mingguan', windowDays: 7, limit: state.limits.weekly },
        { id: 'monthly', label: 'Bulanan', windowDays: 30, limit: state.limits.monthly },
        { id: 'annual', label: 'Tahunan', windowDays: 365, limit: state.limits.annual }
      ]
      return defs.map((d) => {
        const used = rollingSumEndingOn(state.records, state.today, d.windowDays)
        const ratio = used / d.limit
        return { ...d, used, ratio, status: statusForRatio(ratio) }
      })
    },

    trend(state) {
      const bound = state.chartBounds[state.activeToggle]
      const points = buildTrendSeries(state.records, state.today, bound.windowDays, bound.displayRangeDays)
      return { points, limit: bound.limit, yMax: bound.max, windowDays: bound.windowDays }
    }
  },

  actions: {
    setToggle(toggle: TrendToggle) {
      this.activeToggle = toggle
    }
  }
})
