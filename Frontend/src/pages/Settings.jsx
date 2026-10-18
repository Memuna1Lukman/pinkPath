import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Settings() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
      <p className="text-sm font-semibold text-brand-800">SETTINGS</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-surface-950">Account settings</h1>
      <p className="mt-3 text-surface-700">Signed in as {user?.email}.</p>
      <button className="mt-8 rounded-xl border border-surface-300 px-5 font-semibold text-surface-900 hover:bg-surface-100 disabled:cursor-not-allowed" type="button" onClick={handleSignOut} disabled={isSigningOut}>{isSigningOut ? 'Signing out…' : 'Sign out'}</button>
    </main>
  )
}
