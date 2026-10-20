const styles = {
  primary: 'bg-brand-600 text-white shadow-[0_8px_18px_rgb(184_50_102/0.2)] hover:bg-brand-700 active:bg-brand-800 disabled:bg-brand-400',
  secondary: 'border border-brand-200 bg-white text-brand-800 hover:bg-brand-50 hover:border-brand-300 active:bg-brand-100 disabled:bg-surface-100',
  ghost: 'text-surface-800 hover:bg-lavender-100 active:bg-lavender-200 disabled:text-surface-400',
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
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold motion-safe:transition-[background-color,border-color,box-shadow,transform] hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-70 ${styles[variant]} ${className}`}
    >
      {isLoading && <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" aria-hidden="true" />}
      {children}
    </button>
  )
}
