import { useState, type FormEvent, type ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import MistButton from '../components/MistButton'
import { CONTACT_EMAIL, submitToEmail } from '../lib/email'
import { BRAND_NAME } from '../lib/brand'
import './pages.css'

export default function BusinessOrder() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')
  const [scopeFile, setScopeFile] = useState<File | null>(null)
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    projectTitle: '',
    industry: '',
    timeline: '',
    budget: '',
    description: '',
    technicalRequirements: '',
    integrations: '',
    targetAudience: '',
    additionalNotes: '',
  })

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setScopeFile(file ?? null)
    setFileName(file ? file.name : '')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const result = await submitToEmail(
      `[${BRAND_NAME}] Business Order: ${form.projectTitle}`,
      {
        'Company Name': form.companyName,
        'Contact Name': form.contactName,
        Email: form.email,
        Phone: form.phone || 'Not provided',
        'Project Title': form.projectTitle,
        Industry: form.industry || 'Not provided',
        Timeline: form.timeline || 'Not specified',
        Budget: form.budget || 'Not specified',
        'Project Description': form.description,
        'Technical Requirements': form.technicalRequirements || 'Not provided',
        Integrations: form.integrations || 'Not provided',
        'Target Audience': form.targetAudience || 'Not provided',
        'Additional Notes': form.additionalNotes || 'None',
        'Scope Document': scopeFile ? scopeFile.name : 'No file uploaded',
      },
      { replyTo: form.email, file: scopeFile },
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
            Your business project has been submitted. We&apos;ll review your scope
            and reach out within 48 hours to discuss next steps.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="page page--wide">
      <h1 className="page__title">Business Order</h1>
      <p className="page__subtitle">
        Tell us everything. The more detail you provide, the closer the result
        will be to your vision. Upload a scope document if you have one.
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
            <label className="form__label" htmlFor="companyName">Company Name</label>
            <input
              id="companyName"
              className="form__input"
              required
              value={form.companyName}
              onChange={(e) => update('companyName', e.target.value)}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="contactName">Contact Name</label>
            <input
              id="contactName"
              className="form__input"
              required
              value={form.contactName}
              onChange={(e) => update('contactName', e.target.value)}
            />
          </div>
        </div>

        <div className="form__row">
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
          <div className="form__group">
            <label className="form__label" htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              className="form__input"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
            />
          </div>
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="projectTitle">Project Title</label>
          <input
            id="projectTitle"
            className="form__input"
            required
            placeholder="e.g. Customer Portal Redesign"
            value={form.projectTitle}
            onChange={(e) => update('projectTitle', e.target.value)}
          />
        </div>

        <div className="form__row">
          <div className="form__group">
            <label className="form__label" htmlFor="industry">Industry</label>
            <input
              id="industry"
              className="form__input"
              placeholder="e.g. Healthcare, Finance, E-commerce"
              value={form.industry}
              onChange={(e) => update('industry', e.target.value)}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="timeline">Desired Timeline</label>
            <select
              id="timeline"
              className="form__select"
              value={form.timeline}
              onChange={(e) => update('timeline', e.target.value)}
            >
              <option value="">Select timeline</option>
              <option value="asap">ASAP</option>
              <option value="1-3months">1–3 months</option>
              <option value="3-6months">3–6 months</option>
              <option value="6plus">6+ months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="budget">Budget Range</label>
          <select
            id="budget"
            className="form__select"
            value={form.budget}
            onChange={(e) => update('budget', e.target.value)}
          >
            <option value="">Select budget range</option>
            <option value="under10k">Under $10,000</option>
            <option value="10k-25k">$10,000 – $25,000</option>
            <option value="25k-50k">$25,000 – $50,000</option>
            <option value="50k-100k">$50,000 – $100,000</option>
            <option value="100kplus">$100,000+</option>
            <option value="discuss">Prefer to discuss</option>
          </select>
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="description">Project Description</label>
          <span className="form__hint">Describe the full vision — what the application should do, who it serves, and what success looks like.</span>
          <textarea
            id="description"
            className="form__textarea"
            required
            rows={6}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="technicalRequirements">Technical Requirements</label>
          <span className="form__hint">Platforms (web, iOS, Android), tech preferences, performance needs, security requirements.</span>
          <textarea
            id="technicalRequirements"
            className="form__textarea"
            rows={4}
            value={form.technicalRequirements}
            onChange={(e) => update('technicalRequirements', e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="integrations">Integrations &amp; Third-Party Services</label>
          <span className="form__hint">Payment gateways, CRMs, APIs, databases, authentication providers, etc.</span>
          <textarea
            id="integrations"
            className="form__textarea"
            rows={3}
            value={form.integrations}
            onChange={(e) => update('integrations', e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="targetAudience">Target Audience</label>
          <textarea
            id="targetAudience"
            className="form__textarea"
            rows={3}
            placeholder="Who will use this application? Internal staff, customers, both?"
            value={form.targetAudience}
            onChange={(e) => update('targetAudience', e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Scope Document</label>
          <span className="form__hint">Upload your own scope, brief, or requirements document (PDF, DOCX, TXT).</span>
          <label className="form__file">
            <input type="file" accept=".pdf,.doc,.docx,.txt,.md" onChange={handleFile} />
            {fileName ? fileName : 'Click to upload or drag your file here'}
          </label>
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="additionalNotes">Additional Notes</label>
          <textarea
            id="additionalNotes"
            className="form__textarea"
            rows={3}
            value={form.additionalNotes}
            onChange={(e) => update('additionalNotes', e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <MistButton type="submit" variant="large" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Business Order'}
          </MistButton>
        </div>
      </motion.form>
    </div>
  )
}
