import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MistButton from '../components/MistButton'
import './pages.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const INDIVIDUAL_TIERS = [
  {
    name: 'Starter',
    price: '$499',
    note: 'one-time',
    desc: 'A focused single-purpose app — clean, functional, and delivered fast.',
    features: [
      'Web or mobile (one platform)',
      'Core feature set',
      'Basic UI design',
      '2 rounds of revisions',
      'Source code handoff',
    ],
  },
  {
    name: 'Standard',
    price: '$1,200',
    note: 'one-time',
    highlight: true,
    desc: 'A full-featured personal app with polished design and more flexibility.',
    features: [
      'Web + mobile or dual-platform',
      'User authentication',
      'Custom UI design',
      '4 rounds of revisions',
      'Basic backend / data storage',
      'Source code handoff',
    ],
  },
  {
    name: 'Premium',
    price: 'Custom',
    note: 'quote on request',
    desc: 'Complex personal projects with advanced features and integrations.',
    features: [
      'All platforms',
      'Advanced backend & database',
      'Third-party integrations',
      'Unlimited revisions',
      '30-day post-launch support',
      'Full source code & docs',
    ],
  },
]

const BUSINESS_TIERS = [
  {
    name: 'Launch',
    price: '$4,500',
    note: 'starting from',
    desc: 'For small businesses needing a focused, professional application.',
    features: [
      'Web application',
      'User roles & auth',
      'Custom branding',
      'Basic integrations (1–2)',
      '3 rounds of revisions',
      'Source code & docs',
    ],
  },
  {
    name: 'Growth',
    price: '$12,000',
    note: 'starting from',
    highlight: true,
    desc: 'Full-scale applications built for reliability, scale, and your exact requirements.',
    features: [
      'Web + mobile',
      'Advanced user management',
      'Multiple integrations',
      'Custom backend architecture',
      'Performance optimisation',
      'Unlimited revisions',
      '60-day post-launch support',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    note: 'quote on request',
    desc: 'Large-scale, mission-critical software with dedicated attention at every layer.',
    features: [
      'All platforms',
      'Dedicated project management',
      'Security & compliance focus',
      'Full test coverage',
      'SLA-backed delivery',
      '90-day post-launch support',
      'Ongoing retainer options',
    ],
  },
]

interface TierCardProps {
  tier: (typeof INDIVIDUAL_TIERS)[number]
  onOrder: () => void
  orderLabel: string
}

function TierCard({ tier, onOrder, orderLabel }: TierCardProps) {
  return (
    <motion.div
      className={`pricing-card${tier.highlight ? ' pricing-card--highlight' : ''}`}
      variants={fadeUp}
    >
      {tier.highlight && <span className="pricing-card__badge">Most Popular</span>}
      <h3 className="pricing-card__name">{tier.name}</h3>
      <div className="pricing-card__price">
        {tier.price}
        <span className="pricing-card__note">{tier.note}</span>
      </div>
      <p className="pricing-card__desc">{tier.desc}</p>
      <ul className="pricing-card__features">
        {tier.features.map((f) => (
          <li key={f}>
            <span className="pricing-card__check">◆</span>
            {f}
          </li>
        ))}
      </ul>
      <MistButton onClick={onOrder} variant="large">
        {orderLabel}
      </MistButton>
    </motion.div>
  )
}

export default function Pricing() {
  const navigate = useNavigate()

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page page--wide" style={{ maxWidth: 1200 }}>
      <motion.div
        className="pricing-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          type="button"
          className="pricing-jump__btn pricing-jump__btn--left"
          onClick={() => scrollToSection('pricing-individual')}
        >
          Individual
        </button>

        <div className="pricing-header__center">
          <h1 className="page__title">Pricing</h1>
          <p className="page__subtitle" style={{ marginBottom: 0 }}>
            Transparent pricing for every scale. Not sure which fits? Start an order
            and we&apos;ll advise you.
          </p>
        </div>

        <button
          type="button"
          className="pricing-jump__btn pricing-jump__btn--right"
          onClick={() => scrollToSection('pricing-business')}
        >
          Business
        </button>
      </motion.div>

      <div className="page__divider" />

      <section id="pricing-individual" className="pricing-section">
      <motion.h2
        className="pricing-section__label"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        Individual
      </motion.h2>

      <motion.div
        className="pricing-grid"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {INDIVIDUAL_TIERS.map((tier) => (
          <TierCard
            key={tier.name}
            tier={tier}
            onOrder={() => navigate('/order/individual')}
            orderLabel="Get Started"
          />
        ))}
      </motion.div>
      </section>

      <div style={{ height: '3.5rem' }} />

      <section id="pricing-business" className="pricing-section">
      <motion.h2
        className="pricing-section__label"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        Business
      </motion.h2>

      <motion.div
        className="pricing-grid"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {BUSINESS_TIERS.map((tier) => (
          <TierCard
            key={tier.name}
            tier={tier}
            onOrder={() => navigate('/order/business')}
            orderLabel="Start a Business Order"
          />
        ))}
      </motion.div>
      </section>

      <motion.p
        style={{ textAlign: 'center', color: 'var(--grey-400)', fontSize: '0.85rem', marginTop: '3rem' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        All prices are in USD. Final quotes are confirmed after initial review.
        Custom and Enterprise projects are scoped individually.
      </motion.p>
    </div>
  )
}
