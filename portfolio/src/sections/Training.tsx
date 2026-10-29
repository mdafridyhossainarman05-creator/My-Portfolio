import { Laptop, Code2 } from 'lucide-react'
import Section from '../components/Section'
import { training } from '../data/portfolio'

export default function Training() {
  const i = training.internship
  const rows: [string, string][] = [
    ['Field', i.field], ['Organization', i.organization], ['Duration', i.duration],
    ['Responsibilities and projects', i.responsibilities], ['Certificate', i.certificate],
  ]
  return (
    <Section id="training" title="Additional skills and training">
      <div className="grid gap-5 md:grid-cols-2">
        <article className="card">
          <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue/15 text-blue"><Laptop aria-hidden /></span>
          <h3 className="font-display text-lg font-semibold">{training.office.title}</h3>
          <p className="mt-1 text-sm text-muted">{training.office.category}</p>
        </article>
        <article className="card">
          <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet/15 text-violet"><Code2 aria-hidden /></span>
          <h3 className="font-display text-lg font-semibold">{i.title}</h3>
          <dl className="mt-4 space-y-2 text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="flex flex-col sm:flex-row sm:gap-3">
                <dt className="text-muted sm:w-52 sm:shrink-0">{k}</dt>
                <dd className={v.startsWith('To be') ? 'placeholder' : ''}>{v}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </Section>
  )
}
