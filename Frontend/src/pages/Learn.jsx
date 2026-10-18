import MedicalDisclaimer from '../components/MedicalDisclaimer'

export default function Learn() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
      <p className="text-sm font-semibold text-brand-800">LEARN</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-surface-950">Trusted breast-health information</h1>
      <p className="mt-3 max-w-2xl text-surface-700">Use clear educational resources to help you have informed conversations with your healthcare team.</p>
      <MedicalDisclaimer className="mt-8 max-w-2xl" />
    </main>
  )
}
