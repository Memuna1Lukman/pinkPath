import { useState } from 'react'
import Button from './ui/Button'
import Card from './ui/Card'
import { formatDate, formatReminderType } from '../utils/formatDate'

export default function ReminderCard({ reminder, onComplete, onDelete, isCompleting = false, isDeleting = false }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const isPastDue = new Date(`${reminder.next_due_date}T23:59:59`) < new Date()

  return (
    <Card className="flex flex-col gap-4" aria-label={`${formatReminderType(reminder.type)} due ${formatDate(reminder.next_due_date)}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-brand-800">{formatReminderType(reminder.type)}</p>
          <h2 className="mt-1 text-lg font-bold text-surface-950">{isPastDue ? 'Needs attention' : `Due ${formatDate(reminder.next_due_date)}`}</h2>
          <p className="mt-1 text-sm text-surface-700">{reminder.repeat_interval_days ? `Repeats every ${reminder.repeat_interval_days} days.` : 'One-time reminder.'}</p>
        </div>
        {isPastDue && <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-800">Past due</span>}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => onComplete(reminder.id)} isLoading={isCompleting}>Mark complete</Button>
        {confirmingDelete ? <><Button variant="danger" onClick={() => onDelete(reminder.id)} isLoading={isDeleting}>Confirm delete</Button><Button variant="ghost" onClick={() => setConfirmingDelete(false)}>Cancel</Button></> : <Button variant="ghost" onClick={() => setConfirmingDelete(true)}>Delete</Button>}
      </div>
    </Card>
  )
}
