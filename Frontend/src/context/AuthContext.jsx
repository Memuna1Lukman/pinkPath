import { useCallback, useEffect, useMemo, useState } from 'react'
import { getCurrentUser, login as loginRequest, logout as logoutRequest, register as registerRequest } from '../api/auth'
import { AUTH_EXPIRED_EVENT, setAccessToken } from '../api/client'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isHydrating, setIsHydrating] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const nextUser = await getCurrentUser()
      setUser(nextUser)
      return nextUser
    } catch (error) {
      if (error.status !== 401) throw error

      setAccessToken(null)
      setUser(null)
      return null
    }
  }, [])

  useEffect(() => {
    let active = true

    const hydrate = async () => {
      try {
        const nextUser = await getCurrentUser()
        if (active) setUser(nextUser)
      } catch (error) {
        if (error.status !== 401) {
          console.error('Unable to restore PinkPath session.', error)
        }
        if (active) setUser(null)
      } finally {
        if (active) setIsHydrating(false)
      }
    }

    const handleAuthExpired = () => {
      setAccessToken(null)
      setUser(null)
    }

    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired)
    hydrate()

    return () => {
      active = false
      window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired)
    }
  }, [])

  const login = useCallback(async (credentials) => {
    await loginRequest(credentials)
    return refreshUser()
  }, [refreshUser])

  const register = useCallback(async (userDetails) => {
    const createdUser = await registerRequest(userDetails)
    await login({ email: userDetails.email, password: userDetails.password })
    return createdUser
  }, [login])

  const logout = useCallback(async () => {
    try {
      await logoutRequest()
    } finally {
      setAccessToken(null)
      setUser(null)
    }
  }, [])

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isHydrating,
    login,
    logout,
    refreshUser,
    register,
  }), [isHydrating, login, logout, refreshUser, register, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
