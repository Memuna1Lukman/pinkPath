import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function SessionLoading() {
  return (
    <main className="grid min-h-svh place-items-center bg-surface-50 px-6" aria-live="polite">
      <p className="text-sm font-medium text-surface-700">Restoring your secure session…</p>
    </main>
  )
}

export default function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated, isHydrating } = useAuth()

  if (isHydrating) return <SessionLoading />

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ returnTo: location.pathname + location.search }} />
  }

  return <Outlet />
}
