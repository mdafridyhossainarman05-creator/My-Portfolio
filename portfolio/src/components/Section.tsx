import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props { id: string; title: string; intro?: string; children: ReactNode }

export default function Section({ id, title, intro, children }: Props) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
        <div className="mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-blue to-violet" />
        {intro && <p className="mt-4 max-w-xl text-muted">{intro}</p>}
        <div className="mt-10">{children}</div>
      </motion.div>
    </section>
  )
}
