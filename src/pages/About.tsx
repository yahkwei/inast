import { motion } from 'framer-motion'
import './pages.css'

export default function About() {
  return (
    <div className="page page--wide">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page__title">About Us</h1>
        <p className="page__subtitle">
          We materialise ideas into software — web apps, mobile apps, and everything in between.
        </p>
      </motion.div>

      <div className="page__divider" />

      <motion.div
        className="page__grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="page__card">
          <h3>What We Do</h3>
          <p>
            Inast builds custom applications tailored to your needs. Whether you&apos;re a business
            with a detailed vision or an individual with a spark of an idea, we turn concepts into
            polished, functional software.
          </p>
        </div>

        <div className="page__card">
          <h3>How We Work</h3>
          <p>
            Every project starts with understanding. You tell us what you need — through a detailed
            scope document or a simple questionnaire — and we handle the rest. Design, development,
            and delivery, with meticulous attention at every step.
          </p>
        </div>

        <div className="page__card">
          <h3>Our Promise</h3>
          <p>
            No templates. No shortcuts. Each application is built from the ground up to match your
            exact requirements. We believe great software should feel invisible — it just works,
            like a ghost in the machine.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
