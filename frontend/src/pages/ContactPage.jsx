import { useState, useEffect, useRef } from 'react'
import { SiteHeader, SiteFooter, Arrow, Reveal } from '../components/Shared'
import { apiPost } from '../utils/api'
import {
  FiPhone,
  FiSmartphone,
  FiMail,
  FiGlobe,
  FiClock,
  FiZap,
  FiCheck,
  FiPlus,
  FiMinus
} from 'react-icons/fi'

const ENQUIRY_PROJECT_TYPES = [
  'Commercial Solar',
  'Industrial Solar',
  'Residential Rooftop',
  'PM Surya Ghar',
  'Government Project',
  'Solar Pump',
  'O&M Services',
  'Product Enquiry',
  'Other'
]

const ENQUIRY_PROJECT_TYPE_MAP = {
  'PM Surya Ghar Residential Rooftop': 'PM Surya Ghar',
  'Commercial Solar Installation': 'Commercial Solar',
  'Industrial Solar EPC': 'Industrial Solar',
  'PM-KUSUM Agri Solar Pumps': 'Solar Pump',
  'Solar Operation & Maintenance': 'O&M Services',
  'Solar Products & Inverters': 'Product Enquiry'
}

function mapEnquiryProjectType(value) {
  if (ENQUIRY_PROJECT_TYPES.includes(value)) return value
  return ENQUIRY_PROJECT_TYPE_MAP[value] || 'Other'
}

function buildEnquiryPayload(formData) {
  const payload = {
    fullName: formData.fullName.trim(),
    phoneNumber: formData.phone.trim(),
    emailAddress: formData.email.trim(),
    projectType: mapEnquiryProjectType(formData.projectType)
  }

  const companyName = formData.organization.trim()
  const projectLocation = formData.location.trim()
  const message = formData.message.trim()

  if (companyName) payload.companyName = companyName
  if (projectLocation) payload.projectLocation = projectLocation
  if (message) payload.message = message

  return payload
}

export default function ContactPage() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    projectType: 'PM Surya Ghar Residential Rooftop',
    location: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [activeFaq, setActiveFaq] = useState(null)
  const submittingRef = useRef(false)

  useEffect(() => {
    document.title = 'Contact & Project Consultation | N Solutions Solar EPC'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (submitError) setSubmitError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (submittingRef.current) return

    submittingRef.current = true
    setSubmitError('')
    setIsSubmitting(true)

    const result = await apiPost(
      '/enquiries',
      buildEnquiryPayload(formData)
    )

    submittingRef.current = false
    setIsSubmitting(false)

    if (result.success) {
      setIsSubmitted(true)
      return
    }

    setSubmitError(
      result.message || 'Unable to send your inquiry. Please try again.'
    )
  }
  

  const faqs = [
    {
      q: 'How does the PM Surya Ghar Muft Bijli Yojana subsidy work?',
      a: 'Under the PM Surya Ghar scheme, eligible residential households receive direct central government subsidies credited to their bank account: ₹30,000 for 1 kW, ₹60,000 for 2 kW, and up to ₹78,000 for 3 kW and higher. As an empaneled vendor with 500+ completed installations in Vizianagaram alone, N Solutions manages the complete documentation, DISCOM net-metering inspection, and subsidy disbursement process.'
    },
    {
      q: 'What is the expected payback period for Commercial & Industrial solar installations?',
      a: 'Commercial and industrial solar installations in India typically achieve complete financial payback within 3 to 4 years. Given industrial grid tariffs ranging from ₹8 to ₹11 per unit, generating your own clean power reduces operational electricity bills by up to 70%. Additionally, commercial enterprises can claim 40% accelerated tax depreciation under Section 32 of the Income Tax Act.'
    },
    {
      q: 'Does N Solutions manage the DISCOM net-metering approvals?',
      a: 'Yes, completely. We provide turnkey EPC services, which means our regulatory and liaison teams handle the single-line diagram preparation, CEIG approvals (for high-voltage/HT installations), DISCOM feasibility requests, and the procurement and calibration of bi-directional net meters.'
    },
    {
      q: 'What warranties and ongoing maintenance are included?',
      a: 'We provide Tier-1 solar modules with a 12-year product warranty and 25 to 30-year linear power generation performance warranty (&gt;80% capacity at year 25). Inverters come with standard 5 to 10-year manufacturer warranties. In addition, N Solutions offers comprehensive Operation & Maintenance (O&M) programs including regular scheduled wash cycles, electrical retorquing, thermal thermography scans, and 24/7 cloud generation monitoring.'
    },
    {
      q: 'Which states does N Solutions currently operate in?',
      a: 'N Solutions has executed solar and electrical infrastructure projects across 9 Indian states, including Andhra Pradesh, Telangana, Tamil Nadu, Karnataka, Maharashtra, Odisha, Gujarat, Madhya Pradesh, and Rajasthan. Our cluster execution hub is based in Vizianagaram and Visakhapatnam.'
    }
  ]

  return (
    <div className="contact-page">
      <SiteHeader activePath="/contact" />

      <main>
        {/* HERO SECTION */}
        <section className="contact-hero">
          <div className="contact-hero-bg" />
          <div className="contact-hero-shade" />

          <div className="wrap contact-hero-content">
            <p className="eyebrow light">
              <span /> 16+ Years · 9 States · End-to-End Solar EPC
            </p>
            <h1>
              Let’s Engineer Your Solar Transition.<br />
              <em>Connect with N Solutions.</em>
            </h1>
            <p className="contact-hero-lead">
              Whether you are a homeowner seeking zero electricity bills under PM Surya Ghar, or a commercial enterprise or industrial mill seeking megawatt-scale captive power savings, our engineering team is ready to assist.
            </p>
          </div>

          <div className="contact-hero-quick-strip">
            <div className="wrap contact-quick-items">
              <div>
                <strong>Vizianagaram HQ</strong>
                <small>MIG-214, APHB Colony, Babametta</small>
              </div>
              <div>
                <strong>+91 7993836424</strong>
                <small>Direct Solar Engineering Desk</small>
              </div>
              <div>
                <strong>info@nsol.in</strong>
                <small>Corporate & Projects Inquiries</small>
              </div>
              <div>
                <strong>Category 'A' Grade</strong>
                <small>Licensed Electrical Contractor</small>
              </div>
            </div>
          </div>
        </section>


        {/* CONTACT INFORMATION & FORM SECTION */}
        <section className="contact-main-section wrap" id="inquiry-form">
          <div className="contact-two-column-grid">
            {/* Left: Contact Info & Hubs */}
            <div className="contact-info-col">
              <Reveal className="section-heading">
                <div>
                  <p className="eyebrow"><span /> Contact Matrix</p>
                  <h2>Get in touch with<br /><em>our solar offices.</em></h2>
                </div>
                <p className="heading-note">
                  Reach our engineering desks, project managers, and customer support representatives across our operating regions.
                </p>
              </Reveal>

              <div className="contact-cards-stack">
                <div className="contact-hub-card">
                  <div className="hub-header">
                    <span className="hub-marker">HQ / Registered Office</span>
                    <h3>M/s N Solutions — Vizianagaram</h3>
                  </div>
                  <p>
                    <strong>Address:</strong> D.No. 27-23-27, MIG – 214, A.P.H.B. Colony, Phase II, Babametta, Vizianagaram, Andhra Pradesh, India - 535002.
                  </p>
                  <p style={{ marginTop: '6px', fontSize: '13px', color: '#4a5c68' }}>
                    <strong>Managing Partner:</strong> Mr. Ch. C. S. V. Raju
                  </p>
                  <div className="hub-links">
                    <span><FiPhone size={13} style={{ marginRight: 5, verticalAlign: 'middle', color: 'var(--brand-primary-dark, #0875b6)' }} /><strong>Mobile:</strong> +91 7993836424 / +91 9492731212</span>
                    <span><FiSmartphone size={13} style={{ marginRight: 5, verticalAlign: 'middle', color: 'var(--brand-primary-dark, #0875b6)' }} /><strong>Project Hotline:</strong> +91 9494703452</span>
                    <span><FiMail size={13} style={{ marginRight: 5, verticalAlign: 'middle', color: 'var(--brand-primary-dark, #0875b6)' }} /><strong>E-Mail:</strong> info@nsol.in / nsolutions@live.com</span>
                    <span><FiGlobe size={13} style={{ marginRight: 5, verticalAlign: 'middle', color: 'var(--brand-primary-dark, #0875b6)' }} /><strong>Official Portal:</strong> www.nsol.in</span>
                  </div>
                </div>

                <div className="contact-hub-card">
                  <div className="hub-header">
                    <span className="hub-marker">Multi-State Reach</span>
                    <h3>Pan-India Project Operations</h3>
                  </div>
                  <p>
                    Active project execution teams across 9 states: Andhra Pradesh, Telangana, Tamil Nadu, Karnataka, Maharashtra, Odisha, Gujarat, Madhya Pradesh, and Rajasthan.
                  </p>
                  <div className="hub-links">
                    <span><FiClock size={13} style={{ marginRight: 5, verticalAlign: 'middle', color: 'var(--brand-primary-dark, #0875b6)' }} /><strong>Business Hours:</strong> Monday – Saturday: 9:00 AM – 6:30 PM IST</span>
                    <span><FiZap size={13} style={{ marginRight: 5, verticalAlign: 'middle', color: 'var(--brand-primary-dark, #0875b6)' }} /><strong>24/7 O&M Hotline:</strong> emergency-om@nsolutions.in</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Consultation Request Form */}
            <div className="contact-form-col">
              <Reveal className="contact-form-wrapper">
                <div className="form-header">
                  <span className="badge-tag">Project Inquiry</span>
                  <h3>Request a Solar Consultation & Site Audit</h3>
                  <p>Fill in your details below and a senior solar engineer will contact you within 24 business hours.</p>
                </div>

                {isSubmitted ? (
                  <div className="contact-success-box">
                    <div className="success-check-icon"><FiCheck size={24} strokeWidth={3} /></div>
                    <h3>Inquiry Received Successfully!</h3>
                    <p>
                      Thank you, <strong>{formData.fullName || 'Valued Customer'}</strong>. Your consultation request for <strong>{formData.projectType}</strong> has been logged with our engineering dispatch desk.
                    </p>
                    <p className="success-sub">
                      A dedicated project engineer will review your site parameters and contact you at <strong>{formData.phone || formData.email}</strong> to schedule a complimentary site audit.
                    </p>
                    <button 
                      type="button" 
                      className="button button-accent"
                      onClick={() => {
                        setIsSubmitted(false)
                        setSubmitError('')
                      }}
                    >
                      Submit Another Inquiry <Arrow />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="inquiry-form-grid">
                    <div className="form-two-fields">
                      <div className="form-group">
                        <label htmlFor="f-name">Your Full Name *</label>
                        <input 
                          id="f-name"
                          type="text" 
                          name="fullName"
                          required 
                          placeholder="e.g. Ch. Venkat Raju"
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="f-org">Organization / Residence Name</label>
                        <input 
                          id="f-org"
                          type="text" 
                          name="organization"
                          placeholder="e.g. Sri Industries / Private Residence"
                          value={formData.organization}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-two-fields">
                      <div className="form-group">
                        <label htmlFor="f-phone">Phone / WhatsApp Number *</label>
                        <input 
                          id="f-phone"
                          type="tel" 
                          name="phone"
                          required 
                          placeholder="e.g. +91 98480 12345"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="f-email">Email Address *</label>
                        <input 
                          id="f-email"
                          type="email" 
                          name="email"
                          required 
                          placeholder="e.g. contact@domain.com"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-two-fields">
                      <div className="form-group">
                        <label htmlFor="f-type">Solar Solution Needed</label>
                        <select 
                          id="f-type"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                        >
                          <option value="PM Surya Ghar Residential Rooftop">PM Surya Ghar Residential Rooftop (Subsidy)</option>
                          <option value="Commercial Solar Installation">Commercial Solar (Offices, Hospitals, Retail)</option>
                          <option value="Industrial Solar EPC">Industrial Solar EPC (Factories, Warehouses, MW Plants)</option>
                          <option value="PM-KUSUM Agri Solar Pumps">PM-KUSUM Agri Solar Pumping Solutions</option>
                          <option value="Solar Operation & Maintenance">Solar O&M & Health Audit Services</option>
                          <option value="Solar Products & Inverters">Solar Products, Panels & Inverters Supply</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="f-loc">Site City, District & State *</label>
                        <input 
                          id="f-loc"
                          type="text" 
                          name="location"
                          required 
                          placeholder="e.g. Vizianagaram / Visakhapatnam, AP"
                          value={formData.location}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="f-msg">Project Details / Roof Space / Requirements</label>
                      <textarea 
                        id="f-msg"
                        name="message"
                        rows={4} 
                        placeholder="Tell us about your current monthly power bill, available roof type (RCC slab or metal shed), or specific project deadlines..."
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </div>

                    {submitError ? (
                      <p className="heading-note" role="alert">
                        {submitError}
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      className="button button-accent submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Submitting...'
                      ) : (
                        <>
                          Request Solar Feasibility Study & Site Audit <Arrow />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <section className="contact-faq-section wrap">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow"><span /> Common Questions</p>
              <h2>Frequently asked questions<br /><em>about solar implementation.</em></h2>
            </div>
            <p className="heading-note">
              Helpful answers on subsidies, payback timelines, net metering, and EPC execution standards.
            </p>
          </Reveal>

          <div className="faq-accordion-container">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFaq === index ? 'is-open' : ''}`}
              >
                <button 
                  type="button" 
                  className="faq-question-btn"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  aria-expanded={activeFaq === index}
                >
                  <span>{faq.q}</span>
                  <span className="faq-toggle-icon">{activeFaq === index ? <FiMinus size={16} /> : <FiPlus size={16} />}</span>
                </button>
                {activeFaq === index && (
                  <div className="faq-answer-body">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
