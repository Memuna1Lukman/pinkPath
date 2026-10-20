import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import ErrorMessage from '../components/ui/ErrorMessage'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../hooks/useAuth'
import { useJournalEntries } from '../hooks/useJournal'
import { useUpcomingReminders } from '../hooks/useReminders'
import { formatDate, formatReminderType } from '../utils/formatDate'
import ribbonButterfly from '../assets/gdj-butterfly-8127622_1920.png'

export default function Dashboard() {
  const { user } = useAuth()
  const reminders = useUpcomingReminders(30)
  const journal = useJournalEntries({ limit: 3 })

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-100 via-peach-50 to-lavender-100 p-7 sm:p-9"><img src={ribbonButterfly} className="pointer-events-none absolute -right-20 -top-28 -z-10 h-80 w-auto rotate-[10deg] opacity-25 mix-blend-multiply sm:-right-8 sm:-top-36 sm:h-[27rem]" alt="" aria-hidden="true" />
      <p className="text-sm font-bold text-brand-800">YOUR DASHBOARD</p>
      <h1 className="mt-2 max-w-xl text-4xl font-bold tracking-tight text-surface-950">Good to see you{user?.username ? `, ${user.username}` : ''}.</h1>
      <p className="mt-3 max-w-xl leading-7 text-surface-700">There’s no perfect way to care for yourself. One small, supported step is enough.</p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-2 text-sm font-semibold text-brand-900 shadow-sm backdrop-blur"><span className="size-2 rounded-full bg-sage-500" /> Your private space is ready</div></div>

      <section className="mt-8 grid gap-4 md:grid-cols-3" aria-label="Quick actions">
        <Link className="rounded-3xl border border-peach-200 bg-peach-50 p-5 shadow-card motion-safe:transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-float" to="/reminders"><h2 className="text-xl font-bold text-surface-950">Plan a reminder</h2><p className="mt-2 text-sm leading-6 text-surface-700">Set a self-awareness or screening reminder.</p></Link>
        <Link className="rounded-3xl border border-lavender-300 bg-lavender-50 p-5 shadow-card motion-safe:transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-float" to="/journal/new"><h2 className="text-xl font-bold text-surface-950">Write a private note</h2><p className="mt-2 text-sm leading-6 text-surface-700">Record a change or question in private.</p></Link>
        <Link className="rounded-3xl border border-sage-200 bg-sage-50 p-5 shadow-card motion-safe:transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-float" to="/appointment-prep"><h2 className="text-xl font-bold text-surface-950">Prepare for a visit</h2><p className="mt-2 text-sm leading-6 text-surface-700">Bring your thoughts together for a focused conversation.</p></Link>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="upcoming-heading"><div className="flex items-center justify-between gap-4"><h2 id="upcoming-heading" className="text-2xl font-bold text-surface-950">Your next check-in</h2><Link className="text-sm font-bold text-brand-800 hover:text-brand-950" to="/reminders">View all</Link></div><div className="mt-4 space-y-3">{reminders.isLoading && <Spinner label="Loading reminders…" />}{reminders.isError && <ErrorMessage>{reminders.error.message}</ErrorMessage>}{reminders.data?.length === 0 && <Card className="bg-peach-50"><p className="font-bold text-surface-950">Nothing is due soon.</p><p className="mt-1 text-sm text-surface-700">Set a reminder whenever it feels helpful.</p></Card>}{reminders.data?.slice(0, 3).map((reminder) => <Card key={reminder.id} className="border-brand-100 p-5"><p className="font-bold text-surface-950">{formatReminderType(reminder.type)}</p><p className="mt-1 text-sm text-surface-700">Due {formatDate(reminder.next_due_date)}</p></Card>)}</div></section>
        <section aria-labelledby="journal-heading"><div className="flex items-center justify-between gap-4"><h2 id="journal-heading" className="text-2xl font-bold text-surface-950">Latest journal note</h2><Link className="text-sm font-bold text-brand-800 hover:text-brand-950" to="/journal">View journal</Link></div><div className="mt-4 space-y-3">{journal.isLoading && <Spinner label="Loading journal…" />}{journal.isError && <ErrorMessage>{journal.error.message}</ErrorMessage>}{journal.data?.length === 0 && <Card className="bg-lavender-50"><p className="font-bold text-surface-950">Your journal is ready when you are.</p><p className="mt-1 text-sm text-surface-700">A short note can help you remember what to discuss.</p></Card>}{journal.data?.map((entry) => <Card key={entry.id} className="border-lavender-200 p-5"><p className="text-sm font-bold text-brand-800">{formatDate(entry.entry_date)}</p><p className="mt-2 line-clamp-2 text-sm leading-6 text-surface-800">{entry.notes}</p></Card>)}</div></section>
      </div>
    </main>
  )
}
