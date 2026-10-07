import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './lead-quote-modal.css'

const API_BASE_URL = (
  import.meta.env?.VITE_API_BASE_URL || '/api'
).replace(/\/+$/, '')

export default function LeadQuoteModal({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    type: '',
    location: '',
    phone: '',
    email: '',
    capacity: ''
  })

  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const scrollY = window.scrollY
    const body = document.body
    const originalStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight
    }
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const bodyPaddingRight =
      Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = 'auto'
    body.style.overflow = 'hidden'
    body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`

    return () => {
      Object.assign(body.style, originalStyles)
      window.scrollTo(0, scrollY)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSubmitting(true)
    setMessage('')
    setError('')

    try {
      const response = await fetch(`${API_BASE_URL}/public/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.message || 'Unable to submit your request.'
        )
      }

      setMessage('Your quote request has been submitted successfully!')

      setForm({
        name: '',
        company: '',
        type: '',
        location: '',
        phone: '',
        email: '',
        capacity: ''
      })

      setTimeout(() => {
        onClose()
      }, 1800)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return createPortal(
    <div
      className="lead-modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="lead-modal">
        <button
          type="button"
          className="lead-modal-close"
          onClick={onClose}
          aria-label="Close quote form"
        >
          ×
        </button>

        <div className="lead-modal-header">
          <span>GET A QUOTE</span>
          <h2>Let's discuss your solar project</h2>
          <p>
            Tell us a little about your requirements and our team
            will get in touch with you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="lead-form">

          <div className="lead-form-row">
            <div className="lead-form-field">
              <label htmlFor="lead-name">Name *</label>
              <input
                id="lead-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="lead-form-field">
              <label htmlFor="lead-company">Company</label>
              <input
                id="lead-company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name"
              />
            </div>
          </div>

          <div className="lead-form-row">
            <div className="lead-form-field">
              <label htmlFor="lead-type">Project Type *</label>
              <select
                id="lead-type"
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">Select project type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="lead-form-field">
              <label htmlFor="lead-location">Location *</label>
              <input
                id="lead-location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                placeholder="City / Location"
                required
              />
            </div>
          </div>

          <div className="lead-form-row">
            <div className="lead-form-field">
              <label htmlFor="lead-phone">Phone</label>
              <input
                id="lead-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>

            <div className="lead-form-field">
              <label htmlFor="lead-email">Email</label>
              <input
                id="lead-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
              />
            </div>
          </div>

          <div className="lead-form-field">
            <label htmlFor="lead-capacity">Required Capacity</label>
            <input
              id="lead-capacity"
              name="capacity"
              type="text"
              value={form.capacity}
              onChange={handleChange}
              placeholder="e.g. 100 kW"
            />
          </div>

          {error && (
            <div className="lead-form-error">
              {error}
            </div>
          )}

          {message && (
            <div className="lead-form-success">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="lead-form-submit"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  )
}