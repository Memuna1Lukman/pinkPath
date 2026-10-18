export default function ErrorMessage({ children, className = '' }) {
  if (!children) return null

  return <p className={`rounded-xl border border-red-300 bg-red-50 p-3 text-sm font-medium text-red-800 ${className}`} role="alert">{children}</p>
}
