import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

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
      <p className="text-sm font-bold text-brand-800">SETTINGS</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-surface-950">Your account</h1>
      <p className="mt-3 leading-7 text-surface-700">Manage your PinkPath access and take care of your privacy.</p>
      <Card className="mt-8"><h2 className="text-2xl font-bold text-surface-950">Sign-in details</h2><dl className="mt-5 rounded-2xl bg-surface-50 p-4"><dt className="text-sm font-bold text-surface-600">Email address</dt><dd className="mt-1 break-all text-surface-900">{user?.email}</dd></dl></Card>
      <Card className="mt-5 border-lavender-300 bg-lavender-50/50"><h2 className="text-2xl font-bold text-surface-950">Your privacy</h2><p className="mt-2 max-w-xl text-sm leading-6 text-surface-700">Your journal and reminders are for you. Sign out when you’re using a shared device.</p><Button className="mt-5" variant="secondary" type="button" onClick={handleSignOut} isLoading={isSigningOut}>Sign out securely</Button></Card>
    </main>
  )
}
