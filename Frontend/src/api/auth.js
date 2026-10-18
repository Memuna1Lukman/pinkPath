import { apiFetch, setAccessToken } from './client'

export function getCurrentUser() {
  return apiFetch('/me', { redirectOnUnauthorized: false })
}

export async function login(credentials) {
  const body = new URLSearchParams({
    username: credentials.email.trim(),
    password: credentials.password,
  })

  const response = await apiFetch('/auth/login', {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    redirectOnUnauthorized: false,
  })

  const token = response?.access_token ?? response?.token
  if (token) setAccessToken(token)

  return response
}

export function register(user) {
  return apiFetch('/users', {
    method: 'POST',
    body: JSON.stringify({
      username: user.username.trim(),
      email: user.email.trim(),
      password: user.password,
    }),
    redirectOnUnauthorized: false,
  })
}

export async function logout() {
  try {
    return await apiFetch('/auth/', {
      method: 'POST',
      redirectOnUnauthorized: false,
    })
  } finally {
    setAccessToken(null)
  }
}
