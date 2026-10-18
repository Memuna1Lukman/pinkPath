import { useState } from 'react'
import MedicalDisclaimer from '../components/MedicalDisclaimer'
import ReminderCard from '../components/ReminderCard'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ErrorMessage from '../components/ui/ErrorMessage'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Spinner from '../components/ui/Spinner'
import { useCompleteReminder, useCreateReminder, useDeleteReminder, useReminders } from '../hooks/useReminders'
import { toDateInputValue } from '../utils/formatDate'

export default function Reminders() {
  const [notice, setNotice] = useState('')
  const reminders = useReminders({ active: true })
  const createReminder = useCreateReminder()
  const completeReminder = useCompleteReminder()
  const deleteReminder = useDeleteReminder()

  const handleCreate = async (event) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const interval = values.get('repeat_interval_days')
    setNotice('')
    try {
      await createReminder.mutateAsync({ type: values.get('type'), next_due_date: values.get('next_due_date'), repeat_interval_days: interval ? Number(interval) : null })
      event.currentTarget.reset()
      setNotice('Reminder created.')
    } catch (error) {
      setNotice(error.message)
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
      <p className="text-sm font-semibold text-brand-800">REMINDERS</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-surface-950">Plan your next step</h1><p className="mt-3 max-w-2xl text-surface-700">Set personal prompts for breast self-awareness and clinician-recommended screening.</p>
      <Card className="mt-8"><h2 className="text-xl font-bold text-surface-950">Add a reminder</h2><form className="mt-5 grid gap-4 md:grid-cols-3" onSubmit={handleCreate}><Select label="Reminder type" name="type" defaultValue="self_exam" required><option value="self_exam">Breast self-awareness check</option><option value="mammogram">Mammogram</option></Select><Input label="Due date" name="next_due_date" type="date" defaultValue={toDateInputValue(new Date())} required /><Input label="Repeat every (days)" name="repeat_interval_days" type="number" min="1" max="3650" inputMode="numeric" hint="Leave blank for a one-time reminder." /><div className="md:col-span-3"><Button type="submit" isLoading={createReminder.isPending}>Save reminder</Button></div></form>{notice && <p className="mt-4 text-sm font-medium text-surface-800" role="status">{notice}</p>}</Card>
      <section className="mt-10" aria-labelledby="active-reminders"><h2 id="active-reminders" className="text-xl font-bold text-surface-950">Active reminders</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{reminders.isLoading && <Spinner label="Loading reminders" />}{reminders.isError && <ErrorMessage>{reminders.error.message}</ErrorMessage>}{reminders.data?.length === 0 && <Card><p className="font-semibold text-surface-950">No active reminders.</p><p className="mt-1 text-sm text-surface-700">Add one above whenever it feels helpful.</p></Card>}{reminders.data?.map((reminder) => <ReminderCard key={reminder.id} reminder={reminder} onComplete={(id) => completeReminder.mutate(id)} onDelete={(id) => deleteReminder.mutate(id)} isCompleting={completeReminder.isPending && completeReminder.variables === reminder.id} isDeleting={deleteReminder.isPending && deleteReminder.variables === reminder.id} />)}</div></section>
      <MedicalDisclaimer className="mt-10" />
    </main>
  )
}
