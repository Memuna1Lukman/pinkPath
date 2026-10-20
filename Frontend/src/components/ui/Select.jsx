import { useId } from 'react'

export default function Select({ children, className = '', error, hint, id: providedId, label, name, required = false, ...props }) {
  const generatedId = useId()
  const id = providedId || `select-${generatedId}`
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-surface-800" htmlFor={id}>
        {label}{required && <span className="ml-1 text-brand-800" aria-hidden="true">*</span>}
      </label>
      <select {...props} id={id} name={name} required={required} aria-invalid={Boolean(error) || undefined} aria-describedby={descriptionId} className={`block min-h-12 w-full rounded-2xl border bg-white px-4 py-2.5 text-base text-surface-950 shadow-sm disabled:cursor-not-allowed disabled:bg-surface-100 ${error ? 'border-red-600' : 'border-surface-300 focus:border-brand-500'} ${className}`}>
        {children}
      </select>
      {error ? <p id={`${id}-error`} className="text-sm font-medium text-red-800">{error}</p> : hint ? <p id={`${id}-hint`} className="text-sm text-surface-600">{hint}</p> : null}
    </div>
  )
}
