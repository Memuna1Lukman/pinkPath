import { useId } from 'react'

function FieldMessage({ error, hint, id }) {
  if (error) return <p id={`${id}-error`} className="text-sm font-medium text-red-800">{error}</p>
  if (hint) return <p id={`${id}-hint`} className="text-sm text-surface-600">{hint}</p>
  return null
}

export default function Input({
  className = '',
  error,
  hint,
  id: providedId,
  label,
  name,
  required = false,
  ...props
}) {
  const generatedId = useId()
  const id = providedId || `input-${generatedId}`
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-surface-800" htmlFor={id}>
        {label}{required && <span className="ml-1 text-brand-800" aria-hidden="true">*</span>}
      </label>
      <input
        {...props}
        id={id}
        name={name}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={descriptionId}
        className={`block min-h-12 w-full rounded-2xl border bg-white px-4 py-2.5 text-base text-surface-950 shadow-sm placeholder:text-surface-500 disabled:cursor-not-allowed disabled:bg-surface-100 ${error ? 'border-red-600' : 'border-surface-300 focus:border-brand-500'} ${className}`}
      />
      <FieldMessage error={error} hint={hint} id={id} />
    </div>
  )
}

export function Textarea({
  className = '',
  error,
  hint,
  id: providedId,
  label,
  name,
  required = false,
  ...props
}) {
  const generatedId = useId()
  const id = providedId || `textarea-${generatedId}`
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-surface-800" htmlFor={id}>
        {label}{required && <span className="ml-1 text-brand-800" aria-hidden="true">*</span>}
      </label>
      <textarea
        {...props}
        id={id}
        name={name}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={descriptionId}
        className={`block min-h-32 w-full rounded-2xl border bg-white px-4 py-3 text-base leading-7 text-surface-950 shadow-sm placeholder:text-surface-500 disabled:cursor-not-allowed disabled:bg-surface-100 ${error ? 'border-red-600' : 'border-surface-300 focus:border-brand-500'} ${className}`}
      />
      <FieldMessage error={error} hint={hint} id={id} />
    </div>
  )
}
