import { useEffect, useRef } from 'react'

interface Sample { sx: number; sy: number; lum: number }
interface Particle { hx: number; hy: number; x: number; y: number; vx: number; vy: number; b: number }

const STRIDE = 3
const BUCKETS = 5
const RADIUS = 100

// Draws a photo as thousands of dots. Dots scatter away from the mouse and spring back.
// src must be a same-origin RGBA image: R=G=B brightness, alpha = person mask.
export default function ParticlePortrait({ src, label, className }: { src: string; label: string; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const box = wrap.current, cv = canvas.current
    if (!box || !cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let samples: Sample[] = []
    let parts: Particle[] = []
    let srcW = 1, srcH = 1, W = 0, H = 0, size = 1.5, raf = 0
    let visible = true, running = false
    const mouse = { x: -9999, y: -9999 }

    const build = () => {
      const r = box.getBoundingClientRect()
      W = r.width; H = r.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = W * dpr; cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const s = (H * 0.93) / srcH
      const ox = (W - srcW * s) * 0.55
      const oy = H - srcH * s
      size = Math.max(1.1, s * STRIDE * 0.5)
      parts = samples.map((p) => {
        const hx = ox + p.sx * s, hy = oy + p.sy * s
        return { hx, hy, x: hx, y: hy, vx: 0, vy: 0, b: Math.min(BUCKETS - 1, Math.floor(p.lum * BUCKETS)) }
      })
      parts.sort((a, b) => a.b - b.b)
    }

    const frame = () => {
      raf = 0
      if (!visible) { running = false; return }
      const fg = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || '#fff'
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = fg
      let cur = -1
      for (const p of parts) {
        if (!calm) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy
          if (d2 < RADIUS * RADIUS) {
            const d = Math.sqrt(d2) || 1, f = 1 - d / RADIUS
            p.vx += (dx / d) * f * f * 7
            p.vy += (dy / d) * f * f * 7
          }
          p.vx += (p.hx - p.x) * 0.055
          p.vy += (p.hy - p.y) * 0.055
          p.vx *= 0.84; p.vy *= 0.84
          p.x += p.vx; p.y += p.vy
        }
        if (p.b !== cur) { cur = p.b; ctx.globalAlpha = 0.22 + 0.78 * (cur / (BUCKETS - 1)) }
        ctx.fillRect(p.x, p.y, size, size)
      }
      ctx.globalAlpha = 1
      running = true
      raf = requestAnimationFrame(frame)
    }
    const start = () => { if (!running && !raf) raf = requestAnimationFrame(frame) }

    const img = new Image()
    img.onload = () => {
      const off = document.createElement('canvas')
      off.width = img.naturalWidth; off.height = img.naturalHeight
      const o = off.getContext('2d', { willReadFrequently: true })
      if (!o) return
      o.drawImage(img, 0, 0)
      const { data } = o.getImageData(0, 0, off.width, off.height)
      srcW = off.width; srcH = off.height
      for (let y = 0; y < srcH; y += STRIDE) {
        for (let x = 0; x < srcW; x += STRIDE) {
          const i = (y * srcW + x) * 4
          if (data[i + 3] < 128) continue
          if (y > srcH * 0.8) continue
          const lum = data[i] / 255
          const fade = Math.min(1, Math.max(0.04, (1 - y / srcH) * 2.0)) // dissolve towards the bottom
          if (Math.random() < (0.16 + 0.84 * lum) * fade) {
            samples.push({ sx: x + (Math.random() - 0.5) * STRIDE, sy: y + (Math.random() - 0.5) * STRIDE, lum })
          }
        }
      }
      build(); start()
    }
    img.src = src

    const move = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    const leave = () => { mouse.x = -9999; mouse.y = -9999 }
    const ro = new ResizeObserver(() => { if (samples.length) build() })
    ro.observe(box)
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) start() })
    io.observe(box)
    window.addEventListener('pointermove', move)
    document.documentElement.addEventListener('mouseleave', leave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [src])

  return (
    <div ref={wrap} role="img" aria-label={label} className={className}>
      <canvas ref={canvas} className="h-full w-full" />
    </div>
  )
}
