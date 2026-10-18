import { formatDate, formatReminderType } from '../utils/formatDate'

export default function PrintableSummary({ data, dateFrom, dateTo }) {
  const { journal_entries: journalEntries = [], profile, reminders = [] } = data

  return (
    <article className="print-summary rounded-2xl border border-surface-200 bg-white p-6 shadow-card" aria-labelledby="summary-title">
      <header className="border-b border-surface-200 pb-5">
        <p className="text-sm font-semibold text-brand-800">PINKPATH · APPOINTMENT SUMMARY</p>
        <h2 id="summary-title" className="mt-2 text-2xl font-bold text-surface-950">Breast-health discussion summary</h2>
        <p className="mt-2 text-sm text-surface-700">Journal entries from {formatDate(dateFrom)} to {formatDate(dateTo)}.</p>
      </header>
      <section className="mt-6" aria-labelledby="profile-heading">
        <h3 id="profile-heading" className="text-base font-bold text-surface-950">Profile details</h3>
        {profile ? <dl className="mt-2 grid gap-2 text-sm sm:grid-cols-2"><div><dt className="font-semibold text-surface-700">Age</dt><dd>{profile.age}</dd></div><div><dt className="font-semibold text-surface-700">Country</dt><dd>{profile.country}</dd></div>{profile.optional_risks && <div className="sm:col-span-2"><dt className="font-semibold text-surface-700">Information the patient chose to note</dt><dd className="whitespace-pre-wrap">{profile.optional_risks}</dd></div>}</dl> : <p className="mt-2 text-sm text-surface-700">No profile details were added.</p>}
      </section>
      <section className="mt-6" aria-labelledby="reminders-heading">
        <h3 id="reminders-heading" className="text-base font-bold text-surface-950">Upcoming reminders</h3>
        {reminders.length ? <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-surface-800">{reminders.map((reminder) => <li key={reminder.id}>{formatReminderType(reminder.type)} — due {formatDate(reminder.next_due_date)}</li>)}</ul> : <p className="mt-2 text-sm text-surface-700">No upcoming reminders in the selected period.</p>}
      </section>
      <section className="mt-6" aria-labelledby="journal-heading">
        <h3 id="journal-heading" className="text-base font-bold text-surface-950">Journal timeline</h3>
        {journalEntries.length ? <ol className="mt-3 space-y-4">{journalEntries.map((entry) => <li key={entry.id} className="border-l-2 border-brand-300 pl-4"><p className="text-sm font-semibold text-surface-950">{formatDate(entry.entry_date)}{entry.body_location ? ` · ${entry.body_location}` : ''}</p><p className="mt-1 whitespace-pre-wrap text-sm text-surface-800">{entry.notes}</p></li>)}</ol> : <p className="mt-2 text-sm text-surface-700">No journal entries in the selected date range.</p>}
      </section>
      <p className="mt-8 border-t border-surface-200 pt-4 text-xs leading-5 text-surface-600">This summary records patient-provided information. It is not a medical diagnosis or a substitute for clinical assessment.</p>
    </article>
  )
}
