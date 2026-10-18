import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6 text-center">
      <div>
        <p className="text-sm font-semibold text-brand-800">404</p>
        <h1 className="mt-2 text-3xl font-bold text-surface-950">That page could not be found.</h1>
        <Link className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-brand-700 px-5 font-semibold text-white hover:bg-brand-800" to="/">Return to PinkPath</Link>
      </div>
    </main>
  )
}
