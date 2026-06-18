import { useState, useCallback, type ReactNode, type MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './MistButton.css'

interface MistButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'default' | 'large' | 'small' | 'ghost'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const DISSOLVE_COUNT = 16

export default function MistButton({
  children,
  onClick,
  href,
  variant = 'default',
  className = '',
  type = 'button',
  disabled = false,
}: MistButtonProps) {
  const [dissolving, setDissolving] = useState(false)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number }[]>([])

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled || dissolving) return

      if (type === 'submit') {
        e.preventDefault()
      }

      const rect = e.currentTarget.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top

      const newParticles = Array.from({ length: DISSOLVE_COUNT }, (_, i) => ({
        id: i,
        x: cx + (Math.random() - 0.5) * 120,
        y: cy + (Math.random() - 0.5) * 60,
        size: 3 + Math.random() * 10,
      }))

      setParticles(newParticles)
      setDissolving(true)

      const form = e.currentTarget.closest('form')

      setTimeout(() => {
        if (onClick) {
          onClick()
        } else if (type === 'submit' && form) {
          form.requestSubmit()
        } else if (href) {
          window.location.href = href
        }
      }, 500)
    },
    [disabled, dissolving, onClick, href, type],
  )

  const classes = [
    'mist-btn',
    variant !== 'default' ? `mist-btn--${variant}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <AnimatePresence>
        {!dissolving && (
          <motion.span
            className="mist-btn__label"
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>

      {dissolving && (
        <span className="mist-btn__dissolve">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="mist-btn__dissolve-particle"
              style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
              initial={{ opacity: 0.9, scale: 1 }}
              animate={{
                opacity: 0,
                scale: 2,
                x: (Math.random() - 0.5) * 60,
                y: -30 - Math.random() * 40,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          ))}
        </span>
      )}

      <motion.span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        animate={dissolving ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    </>
  )

  if (href && !onClick) {
    return (
      <motion.button
        className={classes}
        onClick={handleClick}
        disabled={disabled || dissolving}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.button>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={handleClick}
      disabled={disabled || dissolving}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  )
}
