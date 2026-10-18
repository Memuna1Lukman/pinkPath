import { apiFetch } from './client'

export function getProfile() {
  return apiFetch('/profile', { redirectOnUnauthorized: false })
}

export function createProfile(profile) {
  return apiFetch('/profile', { method: 'POST', body: JSON.stringify(profile) })
}

export function updateProfile(profile) {
  return apiFetch('/profile', { method: 'PUT', body: JSON.stringify(profile) })
}
