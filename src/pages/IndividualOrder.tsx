import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import MistButton from '../components/MistButton'
import { CONTACT_EMAIL, submitToEmail } from '../lib/email'
import { BRAND_NAME } from '../lib/brand'
import './pages.css'

export default function IndividualOrder() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    platform: '',
    appType: '',
    purpose: '',
    features: '',
    designNotes: '',
    additionalInfo: '',
  })

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const result = await submitToEmail(
      `[${BRAND_NAME}] Individual Order: ${form.appType || 'New App'}`,
      {
        Name: form.name,
        Email: form.email,
        Platform: form.platform,
        'App Type': form.appType,
        Purpose: form.purpose,
        Features: form.features,
        'Design Preferences': form.designNotes || 'None',
        'Additional Info': form.additionalInfo || 'None',
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
          <h2>Order Received</h2>
          <p>
            Your idea has been captured. We&apos;ll review your request and get
            back to you with a plan and quote.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page__title">Individual Order</h1>
      <p className="page__subtitle">
        Answer a few questions about your app idea. Keep it simple — we&apos;ll
        handle the complexity.
      </p>

      <div className="page__divider" />

      <motion.form
        className="form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {error && (
          <div className="form__error">
            {error}{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        )}

        <div className="form__row">
          <div className="form__group">
            <label className="form__label" htmlFor="name">Your Name</label>
            <input
              id="name"
              className="form__input"
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
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
              onChange={(e) => update('email', e.target.value)}
            />
          </div>
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="platform">What platform do you need?</label>
          <select
            id="platform"
            className="form__select"
            required
            value={form.platform}
            onChange={(e) => update('platform', e.target.value)}
          >
            <option value="">Select platform</option>
            <option value="mobile">Mobile (iOS &amp; Android)</option>
            <option value="mobile-ios">Mobile (iOS only)</option>
            <option value="mobile-android">Mobile (Android only)</option>
            <option value="web">Web Application</option>
            <option value="desktop">Desktop Application</option>
            <option value="web-mobile">Web + Mobile</option>
            <option value="unsure">Not sure — advise me</option>
          </select>
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="appType">What kind of app is it?</label>
          <select
            id="appType"
            className="form__select"
            required
            value={form.appType}
            onChange={(e) => update('appType', e.target.value)}
          >
            <option value="">Select type</option>
            <option value="productivity">Productivity / Tools</option>
            <option value="social">Social / Community</option>
            <option value="ecommerce">E-commerce / Marketplace</option>
            <option value="education">Education / Learning</option>
            <option value="health">Health / Fitness</option>
            <option value="entertainment">Entertainment / Media</option>
            <option value="finance">Finance / Budgeting</option>
            <option value="portfolio">Portfolio / Personal</option>
            <option value="game">Game</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="purpose">What is the app for?</label>
          <span className="form__hint">Describe the main purpose — what problem does it solve or what need does it fill?</span>
          <textarea
            id="purpose"
            className="form__textarea"
            required
            rows={4}
            placeholder="e.g. I want an app to track my daily habits and send me reminders..."
            value={form.purpose}
            onChange={(e) => update('purpose', e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="features">What should the app do?</label>
          <span className="form__hint">List the key features and things you want users to be able to do.</span>
          <textarea
            id="features"
            className="form__textarea"
            required
            rows={5}
            placeholder="e.g. Users can create accounts, log daily entries, view progress charts, set goals..."
            value={form.features}
            onChange={(e) => update('features', e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="designNotes">Design Preferences</label>
          <span className="form__hint">Any colours, styles, or apps you&apos;d like yours to feel similar to? (optional)</span>
          <textarea
            id="designNotes"
            className="form__textarea"
            rows={3}
            value={form.designNotes}
            onChange={(e) => update('designNotes', e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="additionalInfo">Anything else?</label>
          <textarea
            id="additionalInfo"
            className="form__textarea"
            rows={3}
            value={form.additionalInfo}
            onChange={(e) => update('additionalInfo', e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <MistButton type="submit" variant="large" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Order'}
          </MistButton>
        </div>
      </motion.form>
    </div>
  )
}
