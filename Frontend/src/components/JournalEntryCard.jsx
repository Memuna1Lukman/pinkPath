import { Link } from 'react-router-dom'
import { useState } from 'react'
import Button from './ui/Button'
import Card from './ui/Card'
import { formatDate } from '../utils/formatDate'

export default function JournalEntryCard({ entry, onDelete, isDeleting = false }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  return (
    <Card className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-semibold text-brand-800">{formatDate(entry.entry_date)}</p>
        {entry.body_location && <p className="mt-1 text-sm font-medium text-surface-700">Area noted: {entry.body_location}</p>}
        <p className="mt-3 whitespace-pre-wrap text-surface-800">{entry.notes}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link className="inline-flex min-h-11 items-center justify-center rounded-xl border border-surface-300 bg-white px-4 text-sm font-semibold text-surface-900 hover:bg-surface-100" to={`/journal/${entry.id}/edit`}>Edit note</Link>
        {confirmingDelete ? <><Button variant="danger" onClick={() => onDelete(entry.id)} isLoading={isDeleting}>Confirm delete</Button><Button variant="ghost" onClick={() => setConfirmingDelete(false)}>Cancel</Button></> : <Button variant="ghost" onClick={() => setConfirmingDelete(true)}>Delete</Button>}
      </div>
    </Card>
  )
}
