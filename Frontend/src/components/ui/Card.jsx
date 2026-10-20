export default function Card({ as: Component = 'section', children, className = '', interactive = false, ...props }) {
  return (
    <Component
      {...props}
      className={`rounded-3xl border border-surface-200/80 bg-white p-5 shadow-card ${interactive ? 'motion-safe:transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-float' : ''} ${className}`}
    >
      {children}
    </Component>
  )
}
