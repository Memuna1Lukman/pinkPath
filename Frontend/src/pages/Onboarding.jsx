import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Onboarding() {
  const { user } = useAuth()

  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col justify-center px-6 py-12">
      <div className="rounded-[2rem] border border-surface-200 bg-white p-7 shadow-float sm:p-10">
      <div className="flex items-center justify-between"><p className="text-sm font-bold text-brand-800">WELCOME TO PINKPATH</p><span className="text-sm font-bold text-surface-600">Step 1 of 1</span></div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-lavender-100"><div className="h-full w-full rounded-full bg-brand-600" /></div>
      <h1 className="mt-8 text-4xl font-bold tracking-tight text-surface-950">Hello{user?.username ? `, ${user.username}` : ''}.</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-surface-700">Your space is ready. You can start with a reminder, a private note, or appointment prep—whatever feels useful today.</p>
      <p className="mt-5 rounded-2xl bg-lavender-100 p-4 text-sm leading-6 text-surface-700">You can skip anything you’d rather not share. PinkPath is here to support your own rhythm.</p>
      <Link className="mt-8 inline-flex min-h-11 w-fit items-center rounded-2xl bg-brand-600 px-5 font-bold text-white shadow-[0_8px_18px_rgb(184_50_102/0.2)] hover:bg-brand-700" to="/dashboard">Take me to my dashboard</Link>
      </div>
    </main>
  )
}
