export default function MedicalDisclaimer({ className = '' }) {
  return (
    <aside className={`rounded-2xl border-l-4 border-brand-700 bg-brand-50 p-4 text-surface-900 ${className}`} aria-labelledby="medical-disclaimer-title">
      <h2 id="medical-disclaimer-title" className="text-sm font-bold">Important medical information</h2>
      <p className="mt-1 text-sm leading-6 text-surface-800">
        PinkPath provides educational resources for general awareness. It does not provide medical diagnoses or official clinical screenings. Always consult a healthcare professional.
      </p>
    </aside>
  )
}
