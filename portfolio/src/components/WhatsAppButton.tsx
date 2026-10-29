import { useRef } from 'react'
import { motion } from 'framer-motion'
import { whatsappLink } from '../data/portfolio'

// Appears only after you set profile.whatsapp in src/data/portfolio.ts
// Drag it anywhere on the page; a simple tap/click opens WhatsApp.
export default function WhatsAppButton() {
  const area = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const href = whatsappLink()
  if (!href) return null

  return (
    <div ref={area} className="pointer-events-none fixed inset-0 z-50">
      <motion.div
        drag
        dragConstraints={area}
        dragElastic={0}
        dragMomentum={false}
        whileHover={{ scale: 1.06 }}
        whileDrag={{ scale: 1.1 }}
        onDragStart={() => { dragging.current = true }}
        onDragEnd={() => { setTimeout(() => { dragging.current = false }, 0) }}
        style={{ touchAction: 'none' }}
        className="pointer-events-auto absolute bottom-6 right-6 grid h-[80px] w-[80px] cursor-grab place-items-center active:cursor-grabbing has-[:focus-visible]:drop-shadow-[0_0_8px_var(--blue)]"
      >
        {/* soft pulse ring */}
        <motion.span
          aria-hidden
          className="pointer-events-none col-start-1 row-start-1 h-[54px] w-[54px] rotate-45 rounded-[19px] border-2 border-[#25D366]"
          animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />

        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          draggable={false}
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp (drag to move)"
          onClick={(e) => { if (dragging.current) e.preventDefault() }}
          className="relative col-start-1 row-start-1 block h-[54px] w-[54px] rotate-45 overflow-hidden rounded-[19px] shadow-[0_14px_32px_-6px_rgba(37,211,102,0.65)] focus-visible:outline-none"
        >
          {/* rotating gradient border */}
          <motion.span
            aria-hidden
            className="absolute -inset-6"
            style={{ background: 'conic-gradient(from 0deg, #25D366, #2dd4bf, #5b8cff, #8b6cff, #25D366)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          {/* dark glass face */}
          <span
            aria-hidden
            className="absolute inset-[2.5px] rounded-[16px]"
            style={{ background: 'radial-gradient(circle at 30% 25%, #1f6a4b 0%, #0d2a21 60%, #08150f 100%)' }}
          />
          {/* upright icon */}
          <span className="absolute inset-0 flex -rotate-45 items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-7 w-7 drop-shadow-[0_0_6px_#25D366]" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path strokeWidth="1.8" d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              <g transform="translate(7.3 6.8) scale(0.4)" strokeWidth="3.4">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </g>
            </svg>
          </span>
        </a>
      </motion.div>
    </div>
  )
}