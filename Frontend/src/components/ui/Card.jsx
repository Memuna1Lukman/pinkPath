export default function Card({ as: Component = 'section', children, className = '', interactive = false, ...props }) {
  return (
    <Component
      {...props}
      className={`rounded-2xl border border-surface-200 bg-white p-5 shadow-card ${interactive ? 'motion-safe:transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md' : ''} ${className}`}
    >
      {children}
    </Component>
  )
}
