import { Link } from 'react-router-dom'
import JournalEntryCard from '../components/JournalEntryCard'
import Card from '../components/ui/Card'
import ErrorMessage from '../components/ui/ErrorMessage'
import Spinner from '../components/ui/Spinner'
import { useDeleteJournalEntry, useJournalEntries } from '../hooks/useJournal'

export default function Journal() {
  const journal = useJournalEntries({ limit: 50 })
  const deleteEntry = useDeleteJournalEntry()

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-brand-800">HEALTH JOURNAL</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-surface-950">Your private notes</h1>
          <p className="mt-3 max-w-2xl text-surface-700">Keep track of symptoms, changes, and questions to discuss with a healthcare professional.</p>
        </div>
        <Link className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-700 px-4 text-sm font-semibold text-white motion-safe:transition-colors hover:bg-brand-800" to="/journal/new">Add a note</Link>
      </div>

      <section className="mt-10" aria-labelledby="journal-entries-heading">
        <h2 id="journal-entries-heading" className="text-xl font-bold text-surface-950">Entries</h2>
        <div className="mt-4 space-y-4">
          {journal.isLoading && <Spinner label="Loading journal entries" />}
          {journal.isError && <ErrorMessage>{journal.error.message}</ErrorMessage>}
          {journal.data?.length === 0 && (
            <Card>
              <p className="font-semibold text-surface-950">Your journal is ready when you are.</p>
              <p className="mt-1 text-sm text-surface-700">A note can be a useful prompt for your next healthcare conversation.</p>
              <Link className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-700 px-4 text-sm font-semibold text-white motion-safe:transition-colors hover:bg-brand-800" to="/journal/new">Add a note</Link>
            </Card>
          )}
          {journal.data?.map((entry) => <JournalEntryCard key={entry.id} entry={entry} onDelete={(id) => deleteEntry.mutate(id)} isDeleting={deleteEntry.isPending && deleteEntry.variables === entry.id} />)}
        </div>
      </section>
    </main>
  )
}
