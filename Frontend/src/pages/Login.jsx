import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/ui/Button'
import ErrorMessage from '../components/ui/ErrorMessage'
import Input from '../components/ui/Input'

export default function Login() {
  const { isAuthenticated, isHydrating, login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isHydrating && isAuthenticated) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (event) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    setError('')
    setIsSubmitting(true)

    try {
      await login({ email: values.get('email'), password: values.get('password') })
      navigate(location.state?.returnTo || '/dashboard', { replace: true })
    } catch (requestError) {
      setError(requestError.message || 'We could not sign you in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center px-6 py-12">
      <Link className="mb-8 w-fit text-sm font-semibold text-brand-800 hover:text-brand-950" to="/">PinkPath</Link>
      <h1 className="text-3xl font-bold tracking-tight text-surface-950">Welcome back</h1>
      <p className="mt-2 text-surface-700">Sign in to continue to your private health companion.</p>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        <Input id="email" label="Email address" name="email" type="email" autoComplete="email" required />
        <Input id="password" label="Password" name="password" type="password" autoComplete="current-password" required />
        <ErrorMessage>{error}</ErrorMessage>
        <Button className="w-full" type="submit" isLoading={isSubmitting}>Sign in</Button>
      </form>
      <p className="mt-6 text-sm text-surface-700">New to PinkPath? <Link className="font-semibold text-brand-800 hover:text-brand-950" to="/register">Create an account</Link>.</p>
    </main>
  )
}
