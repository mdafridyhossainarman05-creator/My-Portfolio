import { GraduationCap, Languages, School } from 'lucide-react'
import Section from '../components/Section'
import { education } from '../data/portfolio'

export default function Education() {
  return (
    <Section id="education" title="Education and qualifications">
      <div className="grid gap-5 md:grid-cols-3">
        {education.map((e) => {
          const isLanguage = e.title === 'English Proficiency'

          return (
            <article key={e.title} className="card flex flex-col">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet/15 text-violet">
                {isLanguage ? <Languages aria-hidden /> : <GraduationCap aria-hidden />}
              </span>
              <h3 className="font-display text-lg font-semibold">{e.title}</h3>
              {e.institution && (
                <p className="mt-2 flex items-start gap-2 text-sm">
                  <School className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
                  <span>{e.institution}</span>
                </p>
              )}
              <dl className="mt-5 space-y-4 border-t border-line pt-4 text-sm">
                <div>
                  <dt className="text-muted">{e.subjectLabel}</dt>
                  <dd className="mt-0.5 font-semibold">{e.subject}</dd>
                </div>

                {isLanguage ? (
                  <>
                    <div>
                      <dt className="text-muted">{e.resultLabel}</dt>
                      <dd className="mt-0.5 font-semibold">{e.result}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">Test</dt>
                      <dd className="mt-0.5 font-semibold">IELTS (B2)</dd>
                    </div>
                  </>
                ) : (
                  e.year && (
                    <div>
                      <dt className="text-muted">Year</dt>
                      <dd className="mt-0.5 font-semibold">{e.year}</dd>
                    </div>
                  )
                )}
              </dl>
            </article>
          )
        })}
      </div>
    </Section>
  )
}