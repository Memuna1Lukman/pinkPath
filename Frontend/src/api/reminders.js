import { apiFetch } from './client'

function queryString(params = {}) {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') search.set(key, String(value))
  })
  const value = search.toString()
  return value ? `?${value}` : ''
}

export function getReminders(params) {
  return apiFetch(`/reminder${queryString(params)}`)
}

export function getUpcomingReminders(days = 30) {
  return apiFetch(`/reminder/upcoming${queryString({ days })}`)
}

export function createReminder(reminder) {
  return apiFetch('/reminder', { method: 'POST', body: JSON.stringify(reminder) })
}

export function updateReminder(id, update) {
  return apiFetch(`/reminder/${id}`, { method: 'PATCH', body: JSON.stringify(update) })
}

export function completeReminder(id) {
  return apiFetch(`/reminder/${id}/complete`, { method: 'POST' })
}

export function deleteReminder(id) {
  return apiFetch(`/reminder/${id}`, { method: 'DELETE' })
}
