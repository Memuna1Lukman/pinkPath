const styles = {
  primary: 'bg-brand-700 text-white shadow-sm hover:bg-brand-800 active:bg-brand-900 disabled:bg-brand-400',
  secondary: 'border border-surface-300 bg-white text-surface-900 hover:bg-surface-100 active:bg-surface-200 disabled:bg-surface-100',
  ghost: 'text-surface-800 hover:bg-surface-100 active:bg-surface-200 disabled:text-surface-400',
  danger: 'bg-red-700 text-white hover:bg-red-800 active:bg-red-900 disabled:bg-red-400',
}

export default function Button({
  children,
  className = '',
  isLoading = false,
  type = 'button',
  variant = 'primary',
  disabled,
  ...props
}) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold motion-safe:transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${styles[variant]} ${className}`}
    >
      {isLoading && <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" aria-hidden="true" />}
      {children}
    </button>
  )
}
