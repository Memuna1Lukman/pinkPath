const DEFAULT_API_BASE_URL = 'http://localhost:8000'

export const TOKEN_STORAGE_KEY = 'pinkpath.access_token'
export const AUTH_EXPIRED_EVENT = 'pinkpath:auth-expired'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export function getAccessToken() {
  if (typeof window === 'undefined') return null

  return window.localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function setAccessToken(token) {
  if (typeof window === 'undefined') return

  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
    return
  }

  window.localStorage.removeItem(TOKEN_STORAGE_KEY)
}

function buildUrl(path) {
  if (/^https?:\/\//i.test(path)) return path
  return `${apiBaseUrl}/${path.replace(/^\//, '')}`
}

function authorizationValue(token) {
  return /^Bearer\s/i.test(token) ? token : `Bearer ${token}`
}

async function parseResponse(response) {
  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') || ''
  const text = await response.text()
  if (!text) return null

  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  }

  return text
}

function messageFromResponse(data, fallback) {
  if (typeof data === 'string' && data.trim()) return data
  if (data && typeof data === 'object') {
    if (typeof data.detail === 'string') return data.detail
    if (typeof data.message === 'string') return data.message
  }

  return fallback
}

function redirectToLogin() {
  if (typeof window === 'undefined') return

  window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT))

  if (window.location.pathname === '/login') return

  const returnTo = `${window.location.pathname}${window.location.search}${window.location.hash}`
  window.location.assign(`/login?returnTo=${encodeURIComponent(returnTo)}`)
}

/**
 * Sends a request to the PinkPath API.
 *
 * Cookie sessions remain enabled for the current FastAPI service, while a JWT
 * stored by AuthContext is attached when available. Non-2xx responses reject
 * with ApiError so React Query and form handlers can show useful feedback.
 */
export async function apiFetch(path, options = {}) {
  const {
    headers: providedHeaders,
    body,
    redirectOnUnauthorized = true,
    ...requestOptions
  } = options
  const headers = new Headers(providedHeaders)
  const token = getAccessToken()

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', authorizationValue(token))
  }

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData
  if (body !== undefined && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  let response
  try {
    response = await fetch(buildUrl(path), {
      credentials: 'include',
      ...requestOptions,
      headers,
      body,
    })
  } catch (error) {
    throw new ApiError('Unable to connect to PinkPath. Please check your connection and try again.', {
      data: error,
    })
  }

  const data = await parseResponse(response)

  if (!response.ok) {
    const error = new ApiError(messageFromResponse(data, `Request failed (${response.status}).`), {
      status: response.status,
      data,
    })

    if (response.status === 401 && redirectOnUnauthorized) {
      setAccessToken(null)
      redirectToLogin()
    }

    throw error
  }

  return data
}

export const apiClient = apiFetch
