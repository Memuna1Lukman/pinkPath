import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import ErrorMessage from '../components/ui/ErrorMessage'
import Input, { Textarea } from '../components/ui/Input'
import Spinner from '../components/ui/Spinner'
import { useCreateJournalEntry, useJournalEntry, useUpdateJournalEntry } from '../hooks/useJournal'
import { toDateInputValue } from '../utils/formatDate'

export default function JournalEntryForm() {
  const { entryId } = useParams()
  const navigate = useNavigate()
  const existingEntry = useJournalEntry(entryId)
  const createEntry = useCreateJournalEntry()
  const updateEntry = useUpdateJournalEntry()
  const isEditing = Boolean(entryId)
  const entry = existingEntry.data
  const mutation = isEditing ? updateEntry : createEntry

  const handleSubmit = async (event) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const payload = { entry_date: values.get('entry_date'), notes: values.get('notes').trim(), body_location: values.get('body_location').trim() || null }
    try {
      if (isEditing) await updateEntry.mutateAsync({ id: entryId, entry: payload })
      else await createEntry.mutateAsync(payload)
      navigate('/journal', { replace: true })
    } catch {
      // The mutation error is rendered below without losing the user's form values.
    }
  }

  if (isEditing && existingEntry.isLoading) return <main className="mx-auto max-w-2xl px-6 py-10 sm:px-10"><Spinner label="Loading journal entry" /></main>
  if (isEditing && existingEntry.isError) return <main className="mx-auto max-w-2xl px-6 py-10 sm:px-10"><ErrorMessage>{existingEntry.error.message}</ErrorMessage></main>

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 sm:px-10"><Link className="text-sm font-semibold text-brand-800 hover:text-brand-950" to="/journal">Back to journal</Link><h1 className="mt-5 text-3xl font-bold tracking-tight text-surface-950">{isEditing ? 'Edit health note' : 'Add a health note'}</h1><p className="mt-3 text-surface-700">Describe what you noticed in your own words. This journal is not a diagnostic tool.</p><form className="mt-8 space-y-5" onSubmit={handleSubmit}><Input label="Date" name="entry_date" type="date" defaultValue={entry?.entry_date || toDateInputValue(new Date())} required /><Input label="Area noted (optional)" name="body_location" defaultValue={entry?.body_location || ''} maxLength="255" hint="For example, breast, underarm, skin, or general question." /><Textarea label="Your note" name="notes" defaultValue={entry?.notes || ''} rows="7" maxLength="10000" required hint="Include anything you would like to remember or discuss." />{mutation.isError && <ErrorMessage>{mutation.error.message}</ErrorMessage>}<div className="flex flex-wrap gap-3"><Button type="submit" isLoading={mutation.isPending}>{isEditing ? 'Save changes' : 'Save note'}</Button><Link className="inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold text-surface-800 hover:bg-surface-100" to="/journal">Cancel</Link></div></form></main>
  )
}
