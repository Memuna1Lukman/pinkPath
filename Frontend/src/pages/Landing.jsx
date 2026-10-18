import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Icon({ name, className = 'size-5' }) {
  const icons = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    check: <path d="m5 12 4.2 4L19 6" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></>,
    journal: <><path d="M6 3h11a2 2 0 0 1 2 2v16H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M8 8h7M8 12h7M8 16h4" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.9-8.6a5.5 5.5 0 0 0-.1-7.8Z" />,
    shield: <path d="M12 21s8-3.8 8-10V5l-8-3-8 3v6c0 6.2 8 10 8 10Zm-3.5-9 2.2 2.2 4.8-5" />,
    notes: <><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8l-5 0V5a2 2 0 0 1 2-2Z" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
  }

  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>
}

const features = [
  { icon: 'calendar', title: 'Plan with less mental load', description: 'Set gentle reminders that fit your own schedule and routine.' },
  { icon: 'journal', title: 'Notice what matters', description: 'Keep a private record of symptoms, questions, and changes over time.' },
  { icon: 'notes', title: 'Feel ready for appointments', description: 'Bring your notes together into a focused conversation with your care team.' },
]

export default function Landing() {
  const { isAuthenticated, isHydrating } = useAuth()

  if (!isHydrating && isAuthenticated) return <Navigate to="/dashboard" replace />

  return (
    <main className="min-h-svh overflow-hidden bg-[#fffafb] text-surface-900">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
        <Link className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-brand-900" to="/" aria-label="PinkPath home">
          <span className="grid size-8 place-items-center rounded-xl bg-brand-700 text-white"><Icon name="heart" className="size-4" /></span>
          PinkPath
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-surface-600 md:flex" aria-label="Landing navigation">
          <a className="transition-colors hover:text-brand-800" href="#how-it-works">How it works</a>
          <a className="transition-colors hover:text-brand-800" href="#features">Features</a>
          <a className="transition-colors hover:text-brand-800" href="#privacy">Privacy</a>
        </nav>
        <Link className="inline-flex min-h-10 items-center justify-center rounded-xl border border-brand-200 bg-white px-4 text-sm font-semibold text-brand-900 transition-colors hover:border-brand-300 hover:bg-brand-50" to="/login">Sign in</Link>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-12 sm:px-8 sm:pt-16 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="absolute right-[-7rem] top-8 -z-0 size-80 rounded-full bg-brand-100/60 blur-3xl" />
        <div className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-wide text-brand-800 shadow-sm">
              <span className="size-1.5 rounded-full bg-brand-500" /> Your breast health, on your terms
            </p>
            <h1 className="max-w-2xl text-5xl font-bold tracking-[-0.045em] text-surface-950 sm:text-6xl lg:text-7xl lg:leading-[1.02]">
              A steadier way to care for yourself.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-surface-600 sm:text-xl">
              PinkPath helps you keep track of what matters, prepare for appointments, and make breast health feel a little less overwhelming.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 text-sm font-semibold text-white shadow-[0_12px_24px_rgb(190_24_93/0.2)] transition-colors hover:bg-brand-800" to="/register">Start your private space <Icon name="arrow" className="size-4" /></Link>
              <a className="inline-flex min-h-12 items-center justify-center rounded-xl border border-surface-300 bg-white px-5 text-sm font-semibold text-surface-800 transition-colors hover:bg-surface-50" href="#how-it-works">See how it works</a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-surface-500"><Icon name="shield" className="size-4 text-brand-700" /> Private by design. No judgment, no pressure.</p>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none" aria-label="PinkPath app preview">
            <div className="absolute -inset-7 -z-10 rounded-[3rem] bg-brand-100/65" />
            <div className="rounded-[1.75rem] border border-white/80 bg-white p-3 shadow-[0_24px_60px_rgb(74_23_49/0.15)] sm:p-4">
              <div className="rounded-[1.25rem] bg-surface-50 p-5 sm:p-6">
                <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-surface-500">Good morning, Maya</p><h2 className="mt-1 text-xl font-bold tracking-tight text-surface-950">Your care, at a glance</h2></div><div className="grid size-10 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">M</div></div>
                <div className="mt-6 rounded-2xl bg-brand-700 p-5 text-white"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-medium text-brand-100">NEXT REMINDER</p><p className="mt-2 text-lg font-semibold">Monthly self-check</p><p className="mt-1 text-sm text-brand-100">Sunday, 9:00 AM</p></div><Icon name="calendar" className="size-6 text-brand-100" /></div><div className="mt-5 h-1.5 overflow-hidden rounded-full bg-brand-500"><div className="h-full w-3/5 rounded-full bg-white" /></div></div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-surface-200 bg-white p-4"><div className="flex items-center justify-between"><p className="text-sm font-semibold">Quick note</p><Icon name="journal" className="size-4 text-brand-700" /></div><p className="mt-3 text-sm leading-5 text-surface-500">Keep track of questions for your next visit.</p><span className="mt-4 inline-block text-xs font-semibold text-brand-800">Write a note →</span></div><div className="rounded-2xl border border-surface-200 bg-white p-4"><div className="flex items-center justify-between"><p className="text-sm font-semibold">Appointment prep</p><Icon name="check" className="size-4 text-brand-700" /></div><p className="mt-3 text-sm leading-5 text-surface-500">2 questions saved for your care team.</p><span className="mt-4 inline-block text-xs font-semibold text-brand-800">Review questions →</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-brand-100 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10"><div className="max-w-2xl"><p className="text-sm font-semibold text-brand-800">A supportive toolkit</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-surface-950 sm:text-4xl">Built for the moments between appointments.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-3">{features.map((feature) => <article className="rounded-2xl border border-surface-200 bg-[#fffafb] p-6 shadow-sm" key={feature.title}><span className="grid size-11 place-items-center rounded-xl bg-brand-100 text-brand-800"><Icon name={feature.icon} /></span><h3 className="mt-5 text-lg font-bold tracking-tight text-surface-950">{feature.title}</h3><p className="mt-2 leading-7 text-surface-600">{feature.description}</p></article>)}</div></div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div><p className="text-sm font-semibold text-brand-800">Simple from the start</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-surface-950 sm:text-4xl">Make space for your health, one small step at a time.</h2><p className="mt-5 max-w-md leading-7 text-surface-600">There is no perfect routine to follow. PinkPath gives you one calm place to return to whenever you need it.</p></div><ol className="grid gap-4">{[['01', 'Create your private space', 'Start with the details that feel useful to you.'], ['02', 'Set your own rhythm', 'Choose reminders and notes that work with your life.'], ['03', 'Walk into appointments prepared', 'Collect what you want to discuss before your next visit.']].map(([number, title, copy]) => <li className="flex gap-5 rounded-2xl border border-surface-200 bg-white p-5 sm:p-6" key={number}><span className="text-sm font-bold text-brand-700">{number}</span><div><h3 className="font-bold text-surface-950">{title}</h3><p className="mt-1 text-sm leading-6 text-surface-600">{copy}</p></div></li>)}</ol></div></section>

      <section id="privacy" className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 sm:pb-24 lg:px-10"><div className="rounded-3xl bg-surface-950 px-6 py-12 text-white sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12"><div className="max-w-2xl"><span className="grid size-11 place-items-center rounded-xl bg-white/10 text-brand-200"><Icon name="shield" /></span><h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Your health story belongs to you.</h2><p className="mt-4 leading-7 text-surface-300">PinkPath is an educational companion designed to help you organize personal information—not to diagnose or replace professional care.</p></div><Link className="mt-8 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-surface-950 transition-colors hover:bg-brand-100 lg:mt-0" to="/register">Create your account <Icon name="arrow" className="size-4" /></Link></div></section>

      <footer className="border-t border-brand-100 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-7 text-sm text-surface-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><p className="font-semibold text-surface-800">PinkPath</p><p>Educational support for your breast health journey.</p></div></footer>
    </main>
  )
}
