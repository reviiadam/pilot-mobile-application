export interface FlightHourRecord {
  date: string
  hours: number
}

export type TrendToggle = '1w' | '1m' | '3m' | '6m' | '1y'

export interface ChartBound {
  limit: number
  max: number
  windowDays: number
  displayRangeDays: number
}

function toDate(iso: string) {
  return new Date(iso + 'T00:00:00')
}

function isoOf(d: Date) {
  return d.toISOString().slice(0, 10)
}

function addDays(iso: string, n: number) {
  const d = toDate(iso)
  d.setDate(d.getDate() + n)
  return isoOf(d)
}

function buildIndex(records: FlightHourRecord[]) {
  const map = new Map<string, number>()
  for (const r of records) map.set(r.date, r.hours)
  return map
}

export function rollingSumEndingOn(
  records: FlightHourRecord[],
  endDateIso: string,
  windowDays: number
): number {
  const map = buildIndex(records)
  let total = 0
  for (let i = 0; i < windowDays; i++) {
    const day = addDays(endDateIso, -i)
    total += map.get(day) ?? 0
  }
  return Math.round(total * 10) / 10
}

export function buildTrendSeries(
  records: FlightHourRecord[],
  todayIso: string,
  windowDays: number,
  displayRangeDays = 7
) {
  const map = buildIndex(records)
  const points: { date: string; value: number; isFuture: boolean; isToday: boolean }[] = []

  for (let offset = -displayRangeDays; offset <= displayRangeDays; offset++) {
    const date = addDays(todayIso, offset)
    let total = 0
    for (let i = 0; i < windowDays; i++) {
      const day = addDays(date, -i)
      total += map.get(day) ?? 0
    }
    points.push({
      date,
      value: Math.round(total * 10) / 10,
      isFuture: offset > 0,
      isToday: offset === 0
    })
  }
  return points
}

export function statusForRatio(ratio: number): 'good' | 'warn' | 'danger' {
  if (ratio >= 1) return 'danger'
  if (ratio >= 0.75) return 'warn'
  return 'good'
}
