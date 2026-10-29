import type { ReactNode } from 'react'
import { Code2, GraduationCap } from 'lucide-react'
import Section from '../components/Section'
import { skills } from '../data/portfolio'

function Group({ title, items, icon }: { title: string; items: string[]; icon: ReactNode }) {
  return (
    <div className="card">
      <div className="mb-5 flex items-center gap-3 text-blue">{icon}<h3 className="font-display text-lg font-semibold text-fg">{title}</h3></div>
      <ul className="flex flex-wrap gap-2.5">
        {items.map((s) => (
          <li key={s} className="rounded-full border border-line bg-fg/5 px-4 py-2 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue hover:bg-blue/10">{s}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
  return (
    <Section id="skills" title="Technical skills">
      <div className="grid gap-5 md:grid-cols-2">
        <Group title="Current technical skills" items={skills.current} icon={<Code2 aria-hidden />} />
        <Group title="Additional training" items={skills.training} icon={<GraduationCap aria-hidden />} />
      </div>
    </Section>
  )
}
