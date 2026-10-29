import { useEffect, useRef } from 'react'

const HOT = 'a, button, input, textarea, label, .card'
interface Dot { x: number; y: number; life: number }

// Desktop-only (mouse) effects: soft light that follows the cursor, a trailing ring,
// glowing sparks, card spotlight and magnetic buttons. Disabled on touch and reduced-motion.
export default function CursorEffects() {
  const glow = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const g = glow.current, r = ring.current, c = canvas.current
    if (!fine || calm || !g || !r || !c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    let mx = window.innerWidth / 2, my = window.innerHeight / 2
    let rx = mx, ry = my, scale = 1, hot = false, raf = 0
    let magnet: HTMLElement | null = null
    const dots: Dot[] = []

    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight }
    resize()

    const move = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY
      g.style.opacity = '1'; r.style.opacity = '1'
      dots.push({ x: mx, y: my, life: 1 })
      if (dots.length > 36) dots.shift()

      const t = e.target instanceof Element ? e.target : null
      hot = !!t?.closest(HOT)
      r.style.backgroundColor = hot ? 'color-mix(in srgb, var(--blue) 14%, transparent)' : 'transparent'

      const card = t?.closest<HTMLElement>('.card')
      if (card) {
        const b = card.getBoundingClientRect()
        card.style.setProperty('--mx', mx - b.left + 'px')
        card.style.setProperty('--my', my - b.top + 'px')
      }

      const btn = t?.closest<HTMLElement>('.btn') ?? null
      if (magnet && magnet !== btn) magnet.style.translate = ''
      magnet = btn
      if (btn) {
        const b = btn.getBoundingClientRect()
        btn.style.translate = (mx - (b.left + b.width / 2)) * 0.2 + 'px ' + (my - (b.top + b.height / 2)) * 0.3 + 'px'
      }
    }

    const leave = () => { g.style.opacity = '0'; r.style.opacity = '0' }

    const tick = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      scale += ((hot ? 1.7 : 1) - scale) * 0.15
      g.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)'
      r.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%) scale(' + scale + ')'

      ctx.clearRect(0, 0, c.width, c.height)
      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i]
        d.life -= 0.035
        if (d.life <= 0) { dots.splice(i, 1); continue }
        ctx.beginPath()
        ctx.arc(d.x, d.y, 3.2 * d.life, 0, Math.PI * 2)
        ctx.fillStyle = 'hsla(' + (225 + (1 - d.life) * 45) + ',90%,65%,' + d.life * 0.55 + ')'
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', move)
    window.addEventListener('resize', resize)
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('resize', resize)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <>
      <div ref={glow} aria-hidden className="pointer-events-none fixed left-0 top-0 -ml-[17rem] -mt-[17rem] h-[34rem] w-[34rem] rounded-full opacity-0 transition-opacity duration-300"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--blue) 15%, transparent), transparent 65%)' }} />
      <canvas ref={canvas} aria-hidden className="pointer-events-none fixed inset-0 z-[70]" />
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[71] h-9 w-9 rounded-full border-[1.5px] border-blue opacity-0 transition-opacity duration-300" />
    </>
  )
}
