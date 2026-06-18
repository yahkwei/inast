import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './pages.css'

const FAQS = [
  {
    q: 'How does the process work?',
    a: 'You submit an order — either through our Business or Individual form. We review your request within 48 hours, confirm scope and pricing, then begin design and development. You receive regular updates and can provide feedback at each stage.',
  },
  {
    q: 'How long does a project take?',
    a: 'Timelines vary by complexity. Individual Starter apps typically take 2–3 weeks. Standard projects run 4–8 weeks. Business and Enterprise projects are scoped individually — we\'ll give you a clear timeline before work begins.',
  },
  {
    q: 'What do I need to provide to get started?',
    a: 'For Individual orders, just fill in our questionnaire — no technical knowledge needed. For Business orders, the more detail the better: documents, wireframes, or examples all help. We\'ll ask follow-up questions if anything is unclear.',
  },
  {
    q: 'Do I own the code when the project is complete?',
    a: 'Yes. All code, assets, and intellectual property created for your project are fully yours upon final payment. We hand off the complete source code and any documentation.',
  },
  {
    q: 'What technologies do you build with?',
    a: 'We select technology based on what\'s best for your specific project. Common choices include React, React Native, Node.js, and various cloud platforms. If you have preferences or existing systems, just let us know.',
  },
  {
    q: 'Can I request changes during development?',
    a: 'Yes. Every plan includes a set number of revision rounds. Additional changes outside the agreed scope can be handled at an hourly rate or scoped as a follow-on project.',
  },
  {
    q: 'Do you offer ongoing support after launch?',
    a: 'Standard and higher tiers include a post-launch support window (30–90 days depending on plan). After that, we offer maintenance retainers — just ask.',
  },
  {
    q: 'Can you work with an existing codebase?',
    a: 'Yes. We can extend, refactor, or rebuild existing applications. For Business orders, mention this in your project description and upload any relevant documents.',
  },
  {
    q: 'How do payments work?',
    a: 'Typically a 50% deposit to begin, with the remainder due on delivery. For larger Enterprise projects we can arrange milestone-based payments. Payment details are confirmed during the scoping phase.',
  },
  {
    q: 'What if I\'m not happy with the result?',
    a: 'We work closely with you throughout the project to make sure the outcome matches your expectations. If something isn\'t right, your included revision rounds cover it. We don\'t consider a project done until you\'re satisfied.',
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="faq-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.07 }}
    >
      <button
        className={`faq-item__question${open ? ' faq-item__question--open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <motion.span
          className="faq-item__icon"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-item__answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <div className="page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page__title">FAQ</h1>
        <p className="page__subtitle">
          Common questions, answered. If yours isn&apos;t here, reach out.
        </p>
      </motion.div>

      <div className="page__divider" />

      <div className="faq-list">
        {FAQS.map((item, i) => (
          <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
        ))}
      </div>
    </div>
  )
}
