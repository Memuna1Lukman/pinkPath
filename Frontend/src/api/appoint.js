import { apiFetch } from './client'

export function getAppointmentPrep(params = {}) {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.set(key, String(value))
  })
  const query = search.toString()
  return apiFetch(`/appointment-prep${query ? `?${query}` : ''}`)
}
