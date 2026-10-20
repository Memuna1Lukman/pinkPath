import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/ui/Button'
import ErrorMessage from '../components/ui/ErrorMessage'
import Input from '../components/ui/Input'

export default function Register() {
  const { isAuthenticated, isHydrating, register } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isHydrating && isAuthenticated) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (event) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const password = values.get('password')
    const confirmPassword = values.get('confirmPassword')

    if (password !== confirmPassword) {
      setError('The passwords do not match.')
      return
    }

    setError('')
    setIsSubmitting(true)
    try {
      await register({ username: values.get('username'), email: values.get('email'), password })
      navigate('/onboarding', { replace: true })
    } catch (requestError) {
      setError(requestError.message || 'We could not create your account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden bg-surface-50 px-6 py-12">
      <div className="absolute -left-24 top-8 size-80 rounded-full bg-peach-200/55 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-20 bottom-4 size-72 rounded-full bg-lavender-200/70 blur-3xl" aria-hidden="true" />
      <section className="relative w-full max-w-md rounded-[2rem] border border-white bg-white/90 p-7 shadow-float backdrop-blur sm:p-9">
      <Link className="mb-8 inline-flex w-fit items-center gap-2 font-display text-2xl font-bold text-brand-900 hover:text-brand-700" to="/"><span className="grid size-8 place-items-center rounded-xl bg-brand-600 font-sans text-sm text-white">P</span>PinkPath</Link>
      <p className="text-sm font-bold text-brand-800">A PRIVATE SPACE, MADE FOR YOU</p><h1 className="mt-2 text-4xl font-bold tracking-tight text-surface-950">Start gently.</h1>
      <p className="mt-3 leading-7 text-surface-700">Create a secure home for your reminders, notes, and appointment preparation.</p>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        <Input id="username" label="Name" name="username" autoComplete="name" minLength="2" required />
        <Input id="email" label="Email address" name="email" type="email" autoComplete="email" required />
        <Input id="password" label="Password" name="password" type="password" autoComplete="new-password" minLength="8" hint="Use at least 8 characters." required />
        <Input id="confirmPassword" label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" minLength="8" required />
        <ErrorMessage>{error}</ErrorMessage>
        <Button className="w-full" type="submit" isLoading={isSubmitting}>Create account</Button>
      </form>
      <p className="mt-6 text-sm text-surface-700">Already have an account? <Link className="font-bold text-brand-800 hover:text-brand-950" to="/login">Sign in</Link>.</p>
      </section>
    </main>
  )
}
