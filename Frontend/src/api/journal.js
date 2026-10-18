import { apiFetch } from './client'

function queryString(params = {}) {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') search.set(key, String(value))
  })
  const value = search.toString()
  return value ? `?${value}` : ''
}

export function getJournalEntries(params) {
  return apiFetch(`/journal${queryString(params)}`)
}

export function getJournalEntry(id) {
  return apiFetch(`/journal/${id}`)
}

export function createJournalEntry(entry) {
  return apiFetch('/journal/', { method: 'POST', body: JSON.stringify(entry) })
}

export function updateJournalEntry(id, entry) {
  return apiFetch(`/journal/${id}`, { method: 'PATCH', body: JSON.stringify(entry) })
}

export function deleteJournalEntry(id) {
  return apiFetch(`/journal/${id}`, { method: 'DELETE' })
}
