export default function MedicalDisclaimer({ className = '' }) {
  return (
    <aside className={`rounded-3xl border border-lavender-300 bg-lavender-100/70 p-5 text-surface-900 ${className}`} aria-labelledby="medical-disclaimer-title">
      <h2 id="medical-disclaimer-title" className="font-display text-lg font-bold">A gentle reminder</h2>
      <p className="mt-1 text-sm leading-6 text-surface-800">
        PinkPath provides educational resources for general awareness. It does not provide medical diagnoses or official clinical screenings. Always consult a healthcare professional.
      </p>
    </aside>
  )
}
