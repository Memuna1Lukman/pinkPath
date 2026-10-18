import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Onboarding() {
  const { user } = useAuth()

  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col justify-center px-6 py-12">
      <p className="text-sm font-semibold text-brand-800">WELCOME TO PINKPATH</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-surface-950">Hello{user?.username ? `, ${user.username}` : ''}.</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-surface-700">Your space is ready. You can begin with a screening reminder, a private health note, or information to help you prepare for your next appointment.</p>
      <Link className="mt-8 inline-flex min-h-11 w-fit items-center rounded-xl bg-brand-700 px-5 font-semibold text-white hover:bg-brand-800" to="/dashboard">Go to your dashboard</Link>
    </main>
  )
}
