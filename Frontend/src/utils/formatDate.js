const dateFormatter = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' })

export function formatDate(value) {
  if (!value) return 'Not set'
  return dateFormatter.format(new Date(`${value}T12:00:00`))
}

export function formatReminderType(type) {
  return type === 'mammogram' ? 'Mammogram' : 'Breast self-awareness check'
}

export function toDateInputValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
