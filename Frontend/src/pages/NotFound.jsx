import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center overflow-hidden bg-surface-50 px-6 text-center">
      <div className="rounded-[2rem] border border-white bg-white p-10 shadow-float">
        <p className="font-display text-7xl font-bold text-brand-200">404</p>
        <h1 className="mt-2 text-4xl font-bold text-surface-950">Let’s find your way back.</h1>
        <p className="mx-auto mt-3 max-w-md leading-7 text-surface-700">This page may have moved, but your PinkPath space is still here when you need it.</p>
        <Link className="mt-7 inline-flex min-h-11 items-center rounded-2xl bg-brand-600 px-5 font-bold text-white hover:bg-brand-700" to="/">Return to PinkPath</Link>
      </div>
    </main>
  )
}
