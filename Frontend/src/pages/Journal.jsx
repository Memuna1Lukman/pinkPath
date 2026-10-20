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
          <p className="text-sm font-bold text-brand-800">HEALTH JOURNAL</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-surface-950">Your private notes</h1>
          <p className="mt-3 max-w-2xl leading-7 text-surface-700">A quiet place for symptoms, changes, and questions you may want to discuss with a healthcare professional.</p>
          <p className="mt-5 inline-flex rounded-2xl bg-lavender-100 px-4 py-2 text-sm font-medium text-lavender-700">Your notes are private to your PinkPath account.</p>
        </div>
        <Link className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-brand-600 px-5 text-sm font-bold text-white shadow-[0_8px_18px_rgb(184_50_102/0.2)] motion-safe:transition-colors hover:bg-brand-700" to="/journal/new">Write a note</Link>
      </div>

      <section className="mt-10" aria-labelledby="journal-entries-heading">
        <h2 id="journal-entries-heading" className="text-2xl font-bold text-surface-950">Your timeline</h2>
        <div className="mt-5 space-y-4 border-l-2 border-lavender-200 pl-4 sm:pl-6">
          {journal.isLoading && <Spinner label="Loading journal entries" />}
          {journal.isError && <ErrorMessage>{journal.error.message}</ErrorMessage>}
          {journal.data?.length === 0 && (
            <Card className="bg-lavender-50">
              <p className="text-lg font-bold text-surface-950">Your journal is ready when you are.</p>
              <p className="mt-1 text-sm text-surface-700">A note can be a useful prompt for your next healthcare conversation.</p>
              <Link className="mt-4 inline-flex min-h-11 items-center justify-center rounded-2xl bg-brand-600 px-4 text-sm font-bold text-white motion-safe:transition-colors hover:bg-brand-700" to="/journal/new">Write your first note</Link>
            </Card>
          )}
          {journal.data?.map((entry) => <JournalEntryCard key={entry.id} entry={entry} onDelete={(id) => deleteEntry.mutate(id)} isDeleting={deleteEntry.isPending && deleteEntry.variables === entry.id} />)}
        </div>
      </section>
    </main>
  )
}
