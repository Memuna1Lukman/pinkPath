import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import ErrorMessage from '../components/ui/ErrorMessage'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../hooks/useAuth'
import { useJournalEntries } from '../hooks/useJournal'
import { useUpcomingReminders } from '../hooks/useReminders'
import { formatDate, formatReminderType } from '../utils/formatDate'

export default function Dashboard() {
  const { user } = useAuth()
  const reminders = useUpcomingReminders(30)
  const journal = useJournalEntries({ limit: 3 })

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <p className="text-sm font-semibold text-brand-800">YOUR DASHBOARD</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-surface-950">Good to see you{user?.username ? `, ${user.username}` : ''}.</h1>
      <p className="mt-3 max-w-2xl text-surface-700">Keep your next breast-health step clear and manageable.</p>

      <section className="mt-8 grid gap-4 md:grid-cols-3" aria-label="Quick actions">
        <Link className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card motion-safe:transition hover:border-brand-300 hover:shadow-md" to="/reminders"><h2 className="font-semibold text-surface-950">Plan a reminder</h2><p className="mt-2 text-sm text-surface-700">Set a self-awareness or screening reminder.</p></Link>
        <Link className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card motion-safe:transition hover:border-brand-300 hover:shadow-md" to="/journal/new"><h2 className="font-semibold text-surface-950">Add a health note</h2><p className="mt-2 text-sm text-surface-700">Record a change or question in private.</p></Link>
        <Link className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card motion-safe:transition hover:border-brand-300 hover:shadow-md" to="/appointment-prep"><h2 className="font-semibold text-surface-950">Prepare for a visit</h2><p className="mt-2 text-sm text-surface-700">Create a concise clinician summary.</p></Link>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="upcoming-heading"><div className="flex items-center justify-between gap-4"><h2 id="upcoming-heading" className="text-xl font-bold text-surface-950">Next 30 days</h2><Link className="text-sm font-semibold text-brand-800 hover:text-brand-950" to="/reminders">View all reminders</Link></div><div className="mt-4 space-y-3">{reminders.isLoading && <Spinner label="Loading reminders" />}{reminders.isError && <ErrorMessage>{reminders.error.message}</ErrorMessage>}{reminders.data?.length === 0 && <Card><p className="font-semibold text-surface-950">No reminders due soon.</p><p className="mt-1 text-sm text-surface-700">Create one when you are ready.</p></Card>}{reminders.data?.slice(0, 3).map((reminder) => <Card key={reminder.id} className="p-4"><p className="font-semibold text-surface-950">{formatReminderType(reminder.type)}</p><p className="mt-1 text-sm text-surface-700">Due {formatDate(reminder.next_due_date)}</p></Card>)}</div></section>
        <section aria-labelledby="journal-heading"><div className="flex items-center justify-between gap-4"><h2 id="journal-heading" className="text-xl font-bold text-surface-950">Recent journal notes</h2><Link className="text-sm font-semibold text-brand-800 hover:text-brand-950" to="/journal">View journal</Link></div><div className="mt-4 space-y-3">{journal.isLoading && <Spinner label="Loading journal" />}{journal.isError && <ErrorMessage>{journal.error.message}</ErrorMessage>}{journal.data?.length === 0 && <Card><p className="font-semibold text-surface-950">No notes yet.</p><p className="mt-1 text-sm text-surface-700">A short note can help you remember what to discuss.</p></Card>}{journal.data?.map((entry) => <Card key={entry.id} className="p-4"><p className="text-sm font-semibold text-brand-800">{formatDate(entry.entry_date)}</p><p className="mt-2 line-clamp-2 text-sm text-surface-800">{entry.notes}</p></Card>)}</div></section>
      </div>
    </main>
  )
}
