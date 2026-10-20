import MedicalDisclaimer from '../components/MedicalDisclaimer'
import learnArticles from '../contents/learnArticles'

export default function Learn() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
      <p className="text-sm font-bold text-brand-800">LEARN</p>
      <h1 className="mt-2 max-w-2xl text-4xl font-bold tracking-tight text-surface-950">Clear information for your own conversation.</h1>
      <p className="mt-3 max-w-2xl leading-7 text-surface-700">Explore trusted educational resources at your own pace, then bring the questions that matter to your healthcare team.</p>
      <section className="mt-10 grid gap-5 md:grid-cols-3" aria-label="Educational resources">
        {learnArticles.map((article) => <article key={article.title} className={`flex min-h-64 flex-col rounded-3xl border p-6 shadow-card ${article.tone === 'lavender' ? 'border-lavender-300 bg-lavender-50' : article.tone === 'peach' ? 'border-peach-200 bg-peach-50' : 'border-sage-200 bg-sage-50'}`}>
          <span className="text-sm font-bold text-brand-800">Educational resource</span><h2 className="mt-4 text-2xl font-bold text-surface-950">{article.title}</h2><p className="mt-3 flex-1 leading-7 text-surface-700">{article.description}</p>
          <a className="mt-6 inline-flex min-h-11 items-center font-bold text-brand-800 underline decoration-brand-300 hover:text-brand-950" href={article.href} target="_blank" rel="noreferrer">Read from {article.source} <span className="ml-1" aria-hidden="true">↗</span></a>
        </article>)}
      </section>
      <MedicalDisclaimer className="mt-10 max-w-3xl" />
    </main>
  )
}
