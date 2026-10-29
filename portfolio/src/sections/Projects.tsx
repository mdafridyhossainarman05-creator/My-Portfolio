import { ExternalLink, FolderOpen, Github } from 'lucide-react'
import Section from '../components/Section'
import { projects } from '../data/portfolio'

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      {projects.length === 0 ? (
        <div className="card flex flex-col items-center py-14 text-center">
          <FolderOpen className="h-10 w-10 text-muted" aria-hidden />
          <p className="mt-4 font-display text-lg">Projects coming soon</p>
          <p className="mt-1 text-sm text-muted">New work will be showcased here.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.title} className="card flex flex-col overflow-hidden">
              {p.image && <img src={p.image} alt={'Screenshot of ' + p.title} loading="lazy" className="-mx-6 -mt-6 mb-5 aspect-video w-[calc(100%+3rem)] max-w-none object-cover" />}
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="rounded-full bg-fg/5 px-3 py-1 text-xs">{t}</li>)}</ul>
              <div className="mt-5 flex gap-4 text-sm">
                {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-blue hover:underline"><ExternalLink className="h-4 w-4" aria-hidden />Live demo</a>}
                {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-blue hover:underline"><Github className="h-4 w-4" aria-hidden />Code</a>}
              </div>
            </article>
          ))}
        </div>
      )}
    </Section>
  )
}
