import { useState, type FormEvent } from 'react'
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react'
import Section from '../components/Section'
import { profile, whatsappLink } from '../data/portfolio'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name') ?? '').trim()
    const email = String(f.get('email') ?? '').trim()
    const message = String(f.get('message') ?? '').trim()
    const next: Errors = {}
    if (name.length < 2) next.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address.'
    if (message.length < 10) next.message = 'Write at least 10 characters.'
    setErrors(next)
    if (Object.keys(next).length) { setStatus(null); return }
    if (!profile.email) {
      setStatus({ ok: false, text: 'This form is not connected to an email address yet, so nothing was sent.' })
      return
    }
    const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')
    window.location.href = 'mailto:' + profile.email + '?subject=' + encodeURIComponent('Portfolio message from ' + name) + '&body=' + body
    setStatus({ ok: true, text: 'Your email app should open with the message ready. It is sent only when you send it there.' })
  }

  const links = [
    { label: 'Email', icon: Mail, value: profile.email, href: 'mailto:' + profile.email },
    { label: 'WhatsApp', icon: MessageCircle, value: profile.whatsapp ? '+' + profile.whatsapp.replace(/\D/g, '') : '', href: whatsappLink() },
    { label: 'LinkedIn', icon: Linkedin, value: profile.linkedin, href: profile.linkedin },
    { label: 'GitHub', icon: Github, value: profile.github, href: profile.github },
  ]
  const field = 'mt-1.5 w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm'
  const labels = { name: 'Name', email: 'Email', message: 'Message' } as const

  return (
    <Section id="contact" title="Let’s connect" intro="Have a question or an opportunity in technology sales or web development? Send me a message.">
      <div className="grid gap-8 md:grid-cols-2">
        <ul className="space-y-4">
          {links.map(({ label, icon: Icon, value, href }) => (
            <li key={label} className="card flex items-center gap-4 !p-4">
              <Icon className="h-5 w-5 text-blue" aria-hidden />
              <div className="min-w-0">
                <p className="text-sm text-muted">{label}</p>
                {value ? <a href={href} target="_blank" rel="noreferrer" className="block truncate hover:underline">{value}</a> : <p className="placeholder text-sm">To be added later</p>}
              </div>
            </li>
          ))}
        </ul>

        <form onSubmit={onSubmit} noValidate className="card space-y-4">
          {(['name', 'email', 'message'] as const).map((k) => (
            <div key={k}>
              <label htmlFor={k} className="text-sm font-medium">{labels[k]}</label>
              {k === 'message'
                ? <textarea id={k} name={k} rows={5} className={field} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? k + '-err' : undefined} />
                : <input id={k} name={k} type={k === 'email' ? 'email' : 'text'} className={field} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? k + '-err' : undefined} />}
              {errors[k] && <p id={k + '-err'} className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[k]}</p>}
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-full">Send message</button>
          {status && <p role="status" className={'text-sm ' + (status.ok ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400')}>{status.text}</p>}
        </form>
      </div>
    </Section>
  )
}
