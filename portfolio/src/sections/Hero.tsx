import { motion } from 'framer-motion'
import ParticlePortrait from '../components/ParticlePortrait'
import { experience, profile, skills } from '../data/portfolio'
import './hero.css'

const words = profile.name.split(' ')
const outline = words.slice(0, 2).join(' ')
const solid = words.slice(2).join(' ')

const ticker = ['Sales Executive', 'SM Technology', 'Tech Sales', ...skills.current, 'Diploma in CSE', 'Web Development']
const hud: [string, string][] = [
  ['Role', experience[0].role.split(' — ')[0]],
  ['Company', experience[0].company],
  ['Stack', skills.current.join(' / ')],
  ['Education', 'Diploma in CSE'],
  ['English', 'B2'],
]
const fade = 'linear-gradient(to right, transparent, #0f0e0e 30%)'

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <ParticlePortrait
        src="/portrait.png"
        label={'Portrait of ' + profile.name}
        className="absolute inset-y-0 right-0 w-full opacity-40 md:w-[64%] md:opacity-100"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(to right, var(--ink) 0%, transparent 45%)', maskImage: fade }} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-32 pt-28 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="font-hero uppercase leading-[0.88]" style={{ fontSize: 'clamp(3.2rem, 9vw, 8rem)' }}>
            <span className="outline-text block">{outline}</span>
            <span className="block">{solid}</span>
          </h1>

          <p className="mt-8 flex items-center gap-4 text-xs tracking-[0.25em] text-muted">
            <span aria-hidden className="h-px w-12 bg-line" />[ TECH SALES · WEB DEVELOPMENT ]
          </p>
          <p className="mt-4 max-w-md border-l border-line pl-5 text-sm leading-relaxed text-muted">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <motion.a whileHover={{ y: -2 }} href="#projects" className="btn btn-primary">View my work</motion.a>
            <motion.a whileHover={{ y: -2 }} href="#contact" className="btn btn-ghost">Contact me</motion.a>
          </div>
        </motion.div>
      </div>

      <aside aria-label="Profile summary" className="hud absolute bottom-32 right-8 hidden w-72 p-5 text-xs xl:block">
        <p className="mb-3 tracking-[0.25em] text-muted">PROFILE</p>
        <dl className="space-y-2.5">
          {hud.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-2">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </aside>

      <div aria-hidden className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-line bg-ink/60 py-4 backdrop-blur">
        <div className="marquee flex w-max whitespace-nowrap text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-10 pr-10">{t}<span className="text-blue">◆</span></span>
          ))}
        </div>
      </div>
    </section>
  )
}
