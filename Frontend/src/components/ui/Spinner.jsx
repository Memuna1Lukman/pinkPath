export default function Spinner({ className = '', label = 'Loading…' }) {
  return (
    <span className={`inline-flex items-center gap-2 text-sm text-surface-700 ${className}`} role="status">
      <span className="size-5 animate-spin rounded-full border-2 border-brand-700 border-r-transparent motion-reduce:animate-none" aria-hidden="true" />
      <span>{label}</span>
    </span>
  )
}
