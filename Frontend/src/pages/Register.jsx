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
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center px-6 py-12">
      <Link className="mb-8 w-fit text-sm font-semibold text-brand-800 hover:text-brand-950" to="/">PinkPath</Link>
      <h1 className="text-3xl font-bold tracking-tight text-surface-950">Create your account</h1>
      <p className="mt-2 text-surface-700">Start with a secure space for your screening plan and health notes.</p>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        <Input id="username" label="Name" name="username" autoComplete="name" minLength="2" required />
        <Input id="email" label="Email address" name="email" type="email" autoComplete="email" required />
        <Input id="password" label="Password" name="password" type="password" autoComplete="new-password" minLength="8" hint="Use at least 8 characters." required />
        <Input id="confirmPassword" label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" minLength="8" required />
        <ErrorMessage>{error}</ErrorMessage>
        <Button className="w-full" type="submit" isLoading={isSubmitting}>Create account</Button>
      </form>
      <p className="mt-6 text-sm text-surface-700">Already have an account? <Link className="font-semibold text-brand-800 hover:text-brand-950" to="/login">Sign in</Link>.</p>
    </main>
  )
}
