import { navLinks, profile, whatsappLink } from '../data/portfolio'

export default function Footer() {
  const socials = [
    { label: 'GitHub', href: profile.github },
    { label: 'LinkedIn', href: profile.linkedin },
    { label: 'WhatsApp', href: whatsappLink() },
    { label: 'Email', href: profile.email ? 'mailto:' + profile.email : '' },
  ].filter((s) => s.href)

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-muted sm:px-8 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {navLinks.map((l) => <a key={l.id} href={'#' + l.id} className="hover:text-fg">{l.label}</a>)}
          {socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-fg">{s.label}</a>)}
        </nav>
      </div>
    </footer>
  )
}
