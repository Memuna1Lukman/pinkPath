import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

const focusableSelector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Modal({ children, isOpen, onClose, title }) {
  const dialogRef = useRef(null)
  const previousFocus = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) return undefined

    previousFocus.current = document.activeElement
    const applicationRoot = document.getElementById('root')
    if (applicationRoot) applicationRoot.inert = true
    const dialog = dialogRef.current
    const firstFocusable = dialog?.querySelector(focusableSelector)
    ;(firstFocusable || dialog)?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialog) return
      const focusable = [...dialog.querySelectorAll(focusableSelector)]
      if (!focusable.length) {
        event.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (applicationRoot) applicationRoot.inert = false
      previousFocus.current?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center overscroll-contain p-4" role="presentation">
      <button className="absolute inset-0 cursor-default bg-surface-950/35 backdrop-blur-sm" type="button" aria-label="Close dialog" onClick={onClose} />
      <section ref={dialogRef} className="relative z-10 w-full max-w-lg rounded-[2rem] border border-surface-200 bg-white p-6 shadow-float" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex="-1">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl font-bold text-surface-950">{title}</h2>
          <button className="-mr-2 -mt-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-surface-700 hover:bg-surface-100" type="button" aria-label="Close dialog" onClick={onClose}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </section>
    </div>,
    document.body,
  )
}
