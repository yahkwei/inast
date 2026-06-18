import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MistButton from '../components/MistButton'
import './pages.css'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="page" style={{ minHeight: '70vh' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center' }}
      >
        <motion.div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 18vw, 10rem)',
            color: 'var(--grey-500)',
            letterSpacing: '0.05em',
            lineHeight: 1,
            marginBottom: '1rem',
            textShadow: '0 0 60px rgba(124,58,237,0.15)',
          }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          404
        </motion.div>

        <h1 className="page__title" style={{ marginBottom: '0.75rem' }}>
          Lost in the Void
        </h1>
        <p className="page__subtitle" style={{ marginBottom: '2.5rem' }}>
          This page drifted into the mist and couldn&apos;t be found.
        </p>

        <MistButton variant="large" onClick={() => navigate('/')}>
          Return Home
        </MistButton>
      </motion.div>
    </div>
  )
}
