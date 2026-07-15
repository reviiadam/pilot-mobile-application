import { defineStore } from 'pinia'
import scheduleFile from '~/data/mock-schedules.json'

export interface DutyLegendEntry {
  code: string
  label: string
  color: string
}

export interface ScheduleEntry {
  id: string
  duty_date: string
  status: number
  base_name: string
  base_color: string
  duty_type: string
  count_schedules: number
  count_logbooks: number
}

interface ScheduleFile {
  today: string
  legend: DutyLegendEntry[]
  schedules: ScheduleEntry[]
}

const file = scheduleFile as ScheduleFile

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    today: file.today,
    legend: file.legend,
    entries: file.schedules
  }),

  getters: {
    byDate(state): Record<string, ScheduleEntry> {
      const map: Record<string, ScheduleEntry> = {}
      for (const entry of state.entries) map[entry.duty_date] = entry
      return map
    },
    dutyFor() {
      return (isoDate: string) => this.byDate[isoDate]
    },
    legendFor() {
      return (code: string) => this.legend.find((l) => l.code === code)
    }
  }
})
