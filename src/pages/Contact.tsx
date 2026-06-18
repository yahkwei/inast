import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import MistButton from '../components/MistButton'
import { CONTACT_EMAIL, submitToEmail } from '../lib/email'
import { BRAND_NAME } from '../lib/brand'
import './pages.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const result = await submitToEmail(
      `[${BRAND_NAME}] Contact: ${form.subject}`,
      {
        Name: form.name,
        Email: form.email,
        Subject: form.subject,
        Message: form.message,
      },
      { replyTo: form.email },
    )

    setSubmitting(false)
    if (result.success) {
      setSubmitted(true)
    } else {
      setError(result.message ?? 'Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="page">
        <motion.div
          className="form__success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2>Message Sent</h2>
          <p>
            Your message has drifted through the void and reached us.
            We&apos;ll be in touch shortly.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page__title">Contact Us</h1>
      <p className="page__subtitle">
        Have a question before starting a project? Reach out — we&apos;re listening.
      </p>

      <div className="page__divider" />

      <motion.form
        className="form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {error && (
          <div className="form__error">
            {error}{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        )}

        <div className="form__row">
          <div className="form__group">
            <label className="form__label" htmlFor="name">Name</label>
            <input
              id="name"
              className="form__input"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form__input"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="subject">Subject</label>
          <input
            id="subject"
            className="form__input"
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="message">Message</label>
          <textarea
            id="message"
            className="form__textarea"
            required
            rows={6}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <MistButton type="submit" variant="large" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </MistButton>
        </div>
      </motion.form>
    </div>
  )
}
