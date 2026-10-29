import { Briefcase } from 'lucide-react'
import Section from '../components/Section'
import { experience } from '../data/portfolio'

export default function Experience() {
  return (
    <Section id="experience" title="Work experience">
      <ol className="relative space-y-6 border-l border-line pl-8">
        {experience.map((e) => (
          <li key={e.role + e.company} className="relative">
            <span className={'absolute -left-[2.65rem] top-6 flex h-9 w-9 items-center justify-center rounded-full border ' + (e.current ? 'border-blue bg-blue/20 text-blue' : 'border-line bg-panel text-muted')}>
              <Briefcase className="h-4 w-4" aria-hidden />
            </span>
            <article className="card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className={'font-display text-xl font-semibold ' + (e.current ? '' : 'text-muted')}>{e.role}</h3>
                {e.current && <span className="rounded-full bg-blue/15 px-3 py-1 text-xs font-medium text-blue">Current</span>}
              </div>
              <p className="mt-1 text-muted">{e.company}, {e.period}</p>
              {e.focus && <p className="mt-3 text-sm">Focus: {e.focus}</p>}
              <p className="placeholder mt-3 text-sm">{e.details}</p>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
