import { defineStore } from 'pinia'
import docsFile from '~/data/mock-documents.json'

interface DocFileEntry {
  id: string
  label: string
  expiryDate: string
}

interface DocsFile {
  today: string
  thresholds: { warningDays: number; comment?: string }
  documents: DocFileEntry[]
}

const file = docsFile as DocsFile

export type DocStatus = 'good' | 'warn' | 'expired'

function daysBetween(fromIso: string, toIso: string) {
  const from = new Date(fromIso + 'T00:00:00')
  const to = new Date(toIso + 'T00:00:00')
  return Math.round((to.getTime() - from.getTime()) / 86400000)
}

export const useDocumentsStore = defineStore('documents', {
  state: () => ({
    today: file.today,
    warningDays: file.thresholds.warningDays,
    entries: file.documents
  }),

  getters: {
    documents(state) {
      return state.entries.map((doc) => {
        const daysRemaining = daysBetween(state.today, doc.expiryDate)
        let status: DocStatus = 'good'
        if (daysRemaining <= 0) status = 'expired'
        else if (daysRemaining <= state.warningDays) status = 'warn'
        return { ...doc, daysRemaining, status }
      })
    }
  }
})
