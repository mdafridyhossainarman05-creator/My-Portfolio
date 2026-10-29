import Section from '../components/Section'
import { about } from '../data/portfolio'

export default function About() {
  return (
    <Section id="about" title="About me">
      <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
        {about.map((p) => <p key={p}>{p}</p>)}
      </div>
    </Section>
  )
}
