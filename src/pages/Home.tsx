import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MistButton from '../components/MistButton'
import './pages.css'

const MENU_ITEMS = [
  { label: 'Start a Project', path: '/order' },
  { label: 'Example Work', path: '/portfolio' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
]

const STEPS = [
  {
    num: '01',
    title: 'Place your order',
    desc: 'Choose Business or Individual. Fill in your details — or upload a full scope document if you have one.',
  },
  {
    num: '02',
    title: 'We review & confirm',
    desc: 'Within 48 hours we\'ll review your submission, ask any follow-up questions, and confirm scope, timeline, and pricing.',
  },
  {
    num: '03',
    title: 'Design & build',
    desc: 'We get to work. You receive regular updates and can give feedback at every stage. Nothing ships without your approval.',
  },
  {
    num: '04',
    title: 'Delivery & handoff',
    desc: 'Your finished application is delivered with full source code, documentation, and support through the launch window.',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ width: '100%' }}>
      {/* ── Hero ── */}
      <section className="page" style={{ minHeight: '85vh' }}>
        <motion.div
          className="page__hero"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <h1 className="page__title">What shall we build?</h1>
          <p className="page__subtitle">
            Web and mobile applications, crafted with precision — from ambitious
            business visions to personal ideas brought to life.
          </p>
        </motion.div>

        <div className="page__divider" />

        <motion.div
          className="page__actions"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {MENU_ITEMS.map((item) => (
            <motion.div key={item.path} variants={fadeUp}>
              <MistButton variant="large" onClick={() => navigate(item.path)}>
                {item.label}
              </MistButton>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── How It Works ── */}
      <section
        className="page"
        style={{ background: 'rgba(10,10,16,0.6)', paddingTop: '5rem', paddingBottom: '5rem' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="page__title" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
            How It Works
          </h2>
          <p className="page__subtitle">
            From first message to final handoff — a clear, straightforward process.
          </p>
        </motion.div>

        <div className="page__divider" />

        <div className="steps" style={{ maxWidth: 640 }}>
          {STEPS.map((step, i) => (
            <motion.div
              className="step"
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <span className="step__num">{step.num}</span>
              <div>
                <div className="step__title">{step.title}</div>
                <div className="step__desc">{step.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{ marginTop: '3rem' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <MistButton variant="large" onClick={() => navigate('/order')}>
            Start a Project
          </MistButton>
        </motion.div>
      </section>

      {/* ── CTA strip ── */}
      <section
        className="page"
        style={{ paddingTop: '4rem', paddingBottom: '4rem' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <h2 className="page__title" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: '0.75rem' }}>
            Ready when you are
          </h2>
          <p className="page__subtitle" style={{ marginBottom: '2.5rem' }}>
            Questions first? Browse pricing or drop us a message.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <MistButton onClick={() => navigate('/pricing')}>View Pricing</MistButton>
            <MistButton variant="ghost" onClick={() => navigate('/contact')}>Contact Us</MistButton>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
