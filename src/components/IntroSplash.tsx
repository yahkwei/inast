import { useEffect } from 'react'
import { motion } from 'framer-motion'
import './IntroSplash.css'
interface IntroSplashProps {
  onComplete: () => void
}

const DISSOLVE_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 200,
  y: (Math.random() - 0.5) * 200,
  size: 4 + Math.random() * 12,
  delay: Math.random() * 0.3,
}))

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4200)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="intro"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="intro__fog" />

      {/* Mist burst behind logo */}
      <motion.div
        className="intro__mist-burst"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2.5, 2], opacity: [0, 0.8, 0.4] }}
        transition={{ duration: 2, times: [0, 0.4, 1], ease: 'easeOut' }}
      />

      {/* Logo emerges from smoke */}
      <motion.div
        className="intro__logo"
        initial={{ opacity: 0, filter: 'blur(30px)', scale: 0.8 }}
        animate={{
          opacity: [0, 0.3, 1, 1, 0],
          filter: ['blur(30px)', 'blur(15px)', 'blur(0px)', 'blur(0px)', 'blur(20px)'],
          scale: [0.8, 0.95, 1, 1, 1.1],
        }}
        transition={{
          duration: 3.8,
          times: [0, 0.2, 0.35, 0.7, 1],
          ease: 'easeOut',
        }}
      >
        Inast      </motion.div>

      {/* Dissolve particles */}
      <div className="intro__dissolve-particles">
        {DISSOLVE_PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="intro__dissolve-particle"
            style={{
              left: '50%',
              top: '50%',
              width: p.size,
              height: p.size,
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 0, 0.8, 0],
              x: [0, 0, p.x],
              y: [0, 0, p.y],
              scale: [1, 1, 1.5],
            }}
            transition={{
              duration: 1.5,
              delay: 2.2 + p.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Final mist wash */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, var(--bg-deep) 70%)',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 1] }}
        transition={{ duration: 4.2, times: [0, 0.6, 0.75, 1] }}
      />
    </motion.div>
  )
}
