import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MistButton from '../components/MistButton'
import './pages.css'

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const EXAMPLES = [
  {
    name: 'Meridian Portal',
    category: 'Business',
    platform: 'Web Application',
    desc: 'A secure client portal for a professional services firm — document sharing, appointment booking, and billing in one place.',
    features: ['User roles & permissions', 'Secure document upload', 'Online payments', 'Admin dashboard'],
    accent: '#7c3aed',
  },
  {
    name: 'TradeFlow',
    category: 'Business',
    platform: 'Web + Mobile',
    desc: 'Job scheduling and dispatch app for a Melbourne trades business. Field staff get mobile updates; managers run everything from the web.',
    features: ['Real-time job tracking', 'GPS check-ins', 'Customer notifications', 'Invoicing integration'],
    accent: '#6d28d9',
  },
  {
    name: 'Stockline',
    category: 'Business',
    platform: 'Web Application',
    desc: 'Inventory and order management dashboard for a small e-commerce warehouse. Live stock levels, low-stock alerts, and supplier tracking.',
    features: ['Live inventory sync', 'Order fulfilment workflow', 'Reporting & exports', 'Multi-user access'],
    accent: '#5b21b6',
  },
  {
    name: 'Pulse',
    category: 'Individual',
    platform: 'Mobile (iOS & Android)',
    desc: 'A personal habit and wellness tracker with daily streaks, mood logging, and gentle reminders — built for one user, designed beautifully.',
    features: ['Daily habit logging', 'Push notifications', 'Progress charts', 'Dark mode UI'],
    accent: '#a78bfa',
  },
  {
    name: 'Gather',
    category: 'Individual',
    platform: 'Web + Mobile',
    desc: 'An event planning app for organising group dinners, trips, and parties. Invite friends, vote on dates, and split costs.',
    features: ['Shared event pages', 'RSVP & polling', 'Cost splitting', 'Calendar sync'],
    accent: '#8b5cf6',
  },
  {
    name: 'Folio',
    category: 'Individual',
    platform: 'Web Application',
    desc: 'A minimalist portfolio site for a freelance photographer — image galleries, contact form, and a CMS so they can update work themselves.',
    features: ['Image gallery layouts', 'Contact & enquiry form', 'Simple content editor', 'Mobile-responsive'],
    accent: '#7c3aed',
  },
]

export default function Portfolio() {
  const navigate = useNavigate()

  return (
    <div className="page page--wide" style={{ maxWidth: 1200 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="page__hero"
      >
        <h1 className="page__title">Example Work</h1>
        <p className="page__subtitle">
          Sample builds showing the kind of applications we create — from business
          platforms to personal apps. Every project is custom; these illustrate
          what&apos;s possible.
        </p>
      </motion.div>

      <div className="page__divider" />

      <motion.div
        className="portfolio-grid"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {EXAMPLES.map((item) => (
          <motion.article
            key={item.name}
            className="portfolio-card"
            variants={fadeUp}
            style={{ '--card-accent': item.accent } as Record<string, string>}
          >
            <div className="portfolio-card__header">
              <span className={`portfolio-card__badge portfolio-card__badge--${item.category.toLowerCase()}`}>
                {item.category}
              </span>
              <span className="portfolio-card__platform">{item.platform}</span>
            </div>

            <div className="portfolio-card__visual" aria-hidden="true">
              <span className="portfolio-card__visual-icon">◈</span>
            </div>

            <h3 className="portfolio-card__name">{item.name}</h3>
            <p className="portfolio-card__desc">{item.desc}</p>

            <ul className="portfolio-card__features">
              {item.features.map((f) => (
                <li key={f}>
                  <span className="portfolio-card__check">◆</span>
                  {f}
                </li>
              ))}
            </ul>

            <span className="portfolio-card__label">Example build</span>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="portfolio-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <p>Want something like this built for you?</p>
        <MistButton variant="large" onClick={() => navigate('/order')}>
          Start a Project
        </MistButton>
      </motion.div>
    </div>
  )
}
