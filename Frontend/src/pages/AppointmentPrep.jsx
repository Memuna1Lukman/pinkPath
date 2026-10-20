import { useState } from 'react'
import MedicalDisclaimer from '../components/MedicalDisclaimer'
import PrintableSummary from '../components/PrintableSummary'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ErrorMessage from '../components/ui/ErrorMessage'
import Input from '../components/ui/Input'
import Spinner from '../components/ui/Spinner'
import { useAppointmentPrep } from '../hooks/useAppointmentPrep'
import { toDateInputValue } from '../utils/formatDate'

function defaultRange() {
  const dateTo = new Date()
  const dateFrom = new Date()
  dateFrom.setDate(dateFrom.getDate() - 90)
  return { date_from: toDateInputValue(dateFrom), date_to: toDateInputValue(dateTo), days: 30 }
}

export default function AppointmentPrep() {
  const [range, setRange] = useState(defaultRange)
  const [rangeError, setRangeError] = useState('')
  const summary = useAppointmentPrep(range)

  const handleRangeChange = (event) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const dateFrom = values.get('date_from')
    const dateTo = values.get('date_to')

    if (dateFrom > dateTo) {
      setRangeError('The start date must be on or before the end date.')
      return
    }

    setRangeError('')
    setRange({ date_from: dateFrom, date_to: dateTo, days: Number(values.get('days')) || 30 })
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
      <p className="text-sm font-bold text-brand-800">APPOINTMENT PREP</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-surface-950">Prepare for a more focused conversation</h1>
      <p className="mt-3 max-w-2xl leading-7 text-surface-700">Bring together reminders and notes you choose to discuss with a healthcare professional.</p>

      <Card className="no-print mt-8 border-lavender-300 bg-lavender-50/50">
        <h2 className="text-2xl font-bold text-surface-950">Choose what to include</h2>
        <p className="mt-2 text-sm leading-6 text-surface-700">Only the information you select will appear in this print-friendly summary.</p>
        <form className="mt-5 grid gap-4 md:grid-cols-3" onSubmit={handleRangeChange}>
          <Input label="Journal entries from" name="date_from" type="date" defaultValue={range.date_from} required />
          <Input label="Journal entries to" name="date_to" type="date" defaultValue={range.date_to} required />
          <Input label="Upcoming reminder window (days)" name="days" type="number" min="1" max="365" inputMode="numeric" defaultValue={range.days} required />
          <div className="md:col-span-3"><Button type="submit">Update summary</Button></div>
        </form>
        {rangeError && <ErrorMessage className="mt-4">{rangeError}</ErrorMessage>}
      </Card>

      <section className="mt-8" aria-live="polite">
        {summary.isLoading && <Spinner label="Preparing your summary…" />}
        {summary.isError && <ErrorMessage>{summary.error.message}</ErrorMessage>}
        {summary.data && <>
          <div className="no-print mb-4 flex justify-end"><Button variant="secondary" onClick={() => window.print()}>Print or save as PDF</Button></div>
          <PrintableSummary data={summary.data} dateFrom={range.date_from} dateTo={range.date_to} />
        </>}
      </section>
      <MedicalDisclaimer className="no-print mt-10" />
    </main>
  )
}
