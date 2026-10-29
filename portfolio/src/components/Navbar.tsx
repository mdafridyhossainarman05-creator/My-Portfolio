import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/portfolio'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    navLinks.forEach((l) => { const el = document.getElementById(l.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-ink/80 backdrop-blur-xl">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="font-display text-lg font-semibold">Arman<span className="text-blue">.</span></a>
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={'#' + l.id} aria-current={active === l.id ? 'true' : undefined}
                className={'rounded-lg px-3 py-2 text-sm transition-colors ' + (active === l.id ? 'bg-fg/10 text-fg' : 'text-muted hover:text-fg')}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button className="rounded-lg p-2 lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="border-t border-line bg-ink px-5 py-3 lg:hidden">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={'#' + l.id} onClick={() => setOpen(false)}
                className={'block rounded-lg px-3 py-3 ' + (active === l.id ? 'text-fg' : 'text-muted')}>{l.label}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
