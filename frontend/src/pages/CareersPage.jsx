import { useState, useEffect } from 'react'
import SEO from "../components/SEO/SEO";
import { SiteHeader, SiteFooter, Arrow, Reveal, navigate } from '../components/Shared'
import { apiGet, apiPost } from '../utils/api'
import { useSEO } from '../utils/useSEO'
import { 
  FiMapPin, 
  FiClock, 
  FiUsers, 
  FiFileText, 
  FiPaperclip, 
  FiX, 
  FiCheck,
  FiZap,
  FiSun
} from 'react-icons/fi'


const mapApiJobToFrontend = (job) => ({
  id: job.id || job._id,
  backendId: job.id || job._id,

  title: job.jobTitle || '',
  department: (job.department || '').toLowerCase(),

  deptLabel: job.department || 'General',

  location: job.location || '',
  experience: job.experienceRequired || '',
  type: job.employmentType || '',

  openings: job.numberOfOpenings || 0,

  overview: job.jobDescription || '',

  responsibilities: Array.isArray(job.jobResponsibilities)
    ? job.jobResponsibilities
    : [],

  requirements: job.qualification
    ? [job.qualification]
    : [],

  applicationDeadline: job.applicationDeadline,
  jobStatus: job.jobStatus
})


export default function CareersPage() {
  const [activeDepartment, setActiveDepartment] = useState('ALL')
  const [selectedJob, setSelectedJob] = useState(null)
  const [isApplying, setIsApplying] = useState(false)
  const [applicationSuccess, setApplicationSuccess] = useState(false)
  
  // Application Form State
  const [applicantName, setApplicantName] = useState('')
  const [applicantEmail, setApplicantEmail] = useState('')
  const [applicantPhone, setApplicantPhone] = useState('')
  const [applicantExp, setApplicantExp] = useState('3-5')
  const [applicantLocation, setApplicantLocation] = useState('')
  const [applicantNote, setApplicantNote] = useState('')


  const [jobs, setJobs] = useState([])
  const [jobsStatus, setJobsStatus] = useState('loading')
  const [jobsError, setJobsError] = useState('')

  const [resumeFile, setResumeFile] = useState(null)
  const [applicationSubmitting, setApplicationSubmitting] = useState(false)
  const [applicationError, setApplicationError] = useState('')

  const loadJobs = async () => {
  setJobsStatus('loading')
  setJobsError('')

  const result = await apiGet('/jobs')

  if (!result.success) {
    setJobsStatus('error')
    setJobsError(result.message || 'Unable to load current openings.')
    return
  }

  const apiJobs = Array.isArray(result.data)
    ? result.data.map(mapApiJobToFrontend)
    : []

  setJobs(apiJobs)
  setJobsStatus(apiJobs.length ? 'ready' : 'empty')
}

  useSEO({
    title: 'Careers at N Solutions – Join Our Solar EPC Team',
    description: 'Explore career opportunities at N Solutions – a leading Solar EPC company in India. We hire solar engineers, project managers, sales professionals, and more. Apply today.',
    keywords: 'solar jobs India, solar engineer jobs, EPC careers, solar company jobs Andhra Pradesh, N Solutions careers, solar project manager, renewable energy jobs',
    canonical: 'https://nsolutions.in/careers',
  })

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })

  loadJobs()
}, [])

  const departments = [
  {
    id: 'ALL',
    label: 'All Openings',
    count: jobs.length
  },
  {
    id: 'engineering',
    label: 'Engineering & Design',
    count: jobs.filter(j => j.department === 'engineering').length
  },
  {
    id: 'execution',
    label: 'Project Execution & EPC',
    count: jobs.filter(j => j.department === 'execution').length
  },
  {
    id: 'om',
    label: 'Operations & Maintenance',
    count: jobs.filter(j => j.department === 'om').length
  },
  {
    id: 'sales',
    label: 'Business Development',
    count: jobs.filter(j => j.department === 'sales').length
  },
  {
    id: 'liaison',
    label: 'Regulatory & Liaison',
    count: jobs.filter(j => j.department === 'liaison').length
  }
]
  const filteredJobs = activeDepartment === 'ALL'
  ? jobs
  : jobs.filter(j => j.department === activeDepartment)

  const handleApplyClick = (job) => {
    setSelectedJob(job)
    setIsApplying(true)
    setApplicationSuccess(false)
  }

  const handleSubmitApplication = async (e) => {
  e.preventDefault()

  if (!selectedJob?.backendId) {
    setApplicationError('Unable to identify this job. Please select an active opening.')
    return
  }

  if (!resumeFile) {
    setApplicationError('Please upload your resume before submitting.')
    return
  }

  setApplicationSubmitting(true)
  setApplicationError('')

  const formData = new FormData()

  formData.append('jobId', selectedJob.backendId)
  formData.append('fullName', applicantName.trim())
  formData.append('email', applicantEmail.trim())
  formData.append('phoneNumber', applicantPhone.trim())
  formData.append('positionAppliedFor', selectedJob.title || '')
  formData.append('yearsOfExperience', applicantExp === 'fresher' ? '0' : applicantExp.split('-')[0])
  formData.append('message', applicantNote.trim())
  formData.append('resume', resumeFile)

  const result = await apiPost('/job-applications', formData)

  setApplicationSubmitting(false)

  if (!result.success) {
    setApplicationError(
      result.message || 'Unable to submit your application. Please try again.'
    )
    return
  }

  setApplicationSuccess(true)
}
  return (
    <>
    <SEO
        title="Careers at N Solutions | Solar & Renewable Energy Jobs"
        description="Explore career opportunities at N Solutions and join a growing team working across solar EPC, engineering, project execution, operations and renewable energy."
        keywords="solar jobs India, renewable energy careers, solar EPC jobs, solar engineer jobs, renewable energy jobs"
        path="/careers"
      />
    <div className="careers-page">
      <SiteHeader activePath="/careers" />

      <main>
        {/* HERO SECTION */}
        <section className="careers-hero">
          <div className="careers-hero-bg" />
          <div className="careers-hero-shade" />

          <div className="wrap careers-hero-content">
            <p className="eyebrow light">
              <span /> Careers in Clean Tech · N Solutions
            </p>
            <h1>
              Build Your Career in Clean Energy.<br />
              <em>Power India’s Solar Future.</em>
            </h1>
            <p className="careers-hero-lead">
              Join an engineering-driven solar EPC company with 16+ years of operational excellence across 9 states. We offer hands-on responsibility on landmark projects—from multi-megawatt industrial solar farms to 500+ residential rooftop clusters.
            </p>

            <div className="careers-hero-actions">
              <a className="button button-accent" href="#openings">
                Explore Open Positions ({jobs.length}) <Arrow />
              </a>
            </div>
          </div>

          <div className="careers-hero-strip">
            <div className="wrap careers-hero-metrics">
              <div className="metric-cell">
                <strong>16+ Years</strong>
                <small>Industry Stability & Track Record</small>
              </div>
              <div className="metric-cell">
                <strong>9 States</strong>
                <small>Pan-India Project Exposure</small>
              </div>
              <div className="metric-cell">
                <strong>500+ Sites</strong>
                <small>PM Surya Ghar Installations</small>
              </div>
              <div className="metric-cell">
                <strong>100%</strong>
                <small>Safety Compliance on Every Site</small>
              </div>
            </div>
          </div>
        </section>

        {/* CULTURE & LIFE BANNER */}
        <section className="careers-quote-banner">
          <div className="wrap">
            <Reveal className="careers-quote-box">
              <p className="eyebrow light"><span /> Managing Partner's Message to New Talent</p>
              <blockquote>
                “At N Solutions, our greatest competitive advantage is the integrity and technical skill of our people. We believe in mentoring engineers who care deeply about getting the details right on every installation.”
              </blockquote>
              <div className="quote-author">
                <strong>Ch. C.S.V. Raju</strong>
                <small>Managing Partner, N Solutions</small>
              </div>
            </Reveal>
          </div>
        </section>

        {/* OPEN POSITIONS DIRECTORY */}
        <section className="careers-openings wrap" id="openings">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow"><span /> Current Opportunities</p>
              <h2>Open career positions<br /><em>across departments.</em></h2>
            </div>
            <p className="heading-note">
              Explore active job openings in solar design, project execution, operations, and regulatory liaison.
            </p>
          </Reveal>

          {/* Department Filter Pills */}
          <div className="careers-filter-pills">
            {departments.map((dept) => (
              <button
                key={dept.id}
                type="button"
                className={`category-pill ${activeDepartment === dept.id ? 'is-active' : ''}`}
                onClick={() => setActiveDepartment(dept.id)}
              >
                <span>{dept.label}</span>
                <small>{dept.count}</small>
              </button>
            ))}
          </div>

          {/* Job Listings Grid */}
          <div className="careers-jobs-grid">
            {filteredJobs.map((job) => (
              <Reveal key={job.id} className="job-card">
                <div className="job-card-header">
                  <div className="job-card-meta">
                    <span className="job-dept-tag">{job.deptLabel}</span>
                    <span className="job-type-tag">{job.type}</span>
                  </div>
                  <h3>{job.title}</h3>
                  <div className="job-details-pills">
                    <span><FiMapPin style={{ marginRight: '5px', verticalAlign: 'middle' }} /> {job.location}</span>
                    <span><FiClock style={{ marginRight: '5px', verticalAlign: 'middle' }} /> {job.experience}</span>
                    <span><FiUsers style={{ marginRight: '5px', verticalAlign: 'middle' }} /> {job.openings} Openings</span>
                  </div>
                </div>

                <p className="job-card-overview">{job.overview}</p>

                <div className="job-card-actions">
                  <button
                    type="button"
                    className="job-view-btn"
                    onClick={() => setSelectedJob(job)}
                  >
                    View Job Description ↓
                  </button>
                  <button
                    type="button"
                    className="button button-accent"
                    onClick={() => handleApplyClick(job)}
                  >
                    Apply Now <Arrow />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>



        {/* SPONTANEOUS APPLICATION CALLOUT */}
        <section className="careers-spontaneous wrap">
          <div className="spontaneous-box">
            <div>
              <p className="eyebrow"><span /> General Inquiries</p>
              <h3>Don’t see an exact opening for your profile?</h3>
              <p>
                We are continuously searching for talented solar engineers, electrical project managers, AutoCAD draftsmen, and certified site supervisors across India.
              </p>
            </div>
            <div className="spontaneous-actions">
              <span>Or email your resume to <strong>careers@nsolutions.in</strong></span>
            </div>
          </div>
        </section>

        {/* JOB DETAILS MODAL */}
        {selectedJob && !isApplying && (
          <div className="job-modal-backdrop" onClick={() => setSelectedJob(null)}>
            <div className="job-modal-card" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                className="modal-close-btn"
                onClick={() => setSelectedJob(null)}
              >
                ✕
              </button>

              <div className="job-modal-header">
                <span className="badge-tag">{selectedJob.deptLabel}</span>
                <h2>{selectedJob.title}</h2>
                <div className="job-modal-pills">
                  <span>📍 {selectedJob.location}</span>
                  <span>⏱ {selectedJob.experience}</span>
                  <span>📋 {selectedJob.type}</span>
                </div>
              </div>

              <div className="job-modal-body">
                <div className="modal-section">
                  <h3>Role Overview</h3>
                  <p>{selectedJob.overview}</p>
                </div>

                {selectedJob.responsibilities && (
                  <div className="modal-section">
                    <h3>Key Responsibilities</h3>
                    <ul>
                      {selectedJob.responsibilities.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedJob.requirements && (
                  <div className="modal-section">
                    <h3>Candidate Qualifications</h3>
                    <ul>
                      {selectedJob.requirements.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="job-modal-footer">
                <button 
                  type="button" 
                  className="button button-ghost-dark"
                  onClick={() => setSelectedJob(null)}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="button button-accent"
                  onClick={() => setIsApplying(true)}
                >
                  Apply for this Role <Arrow />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* APPLICATION FORM MODAL */}
        {isApplying && (
          <div className="job-modal-backdrop" onClick={() => setIsApplying(false)}>
            <div className="job-modal-card apply-modal-card" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                className="modal-close-btn"
                onClick={() => setIsApplying(false)}
              >
                ✕
              </button>

              <div className="job-modal-header">
                <span className="badge-tag">Job Application</span>
                <h2>Apply for {selectedJob?.title || 'Open Role'}</h2>
                <p className="modal-sub">
                  Join N Solutions and power India's clean energy transition.
                </p>
              </div>

              {applicationSuccess ? (
                <div className="application-success-view">
                  <div className="success-icon">✓</div>
                  <h3>Application Submitted Successfully!</h3>
                  <p>
                    Thank you, <strong>{applicantName || 'Candidate'}</strong>. Your application for <strong>{selectedJob?.title}</strong> has been received by our recruitment desk.
                  </p>
                  <p className="success-note">
                    Our engineering leadership reviews all candidates and will contact you via email or phone within 48 to 72 business hours.
                  </p>
                  <button 
                    type="button" 
                    className="button button-accent"
                    onClick={() => {
                      setIsApplying(false)
                      setSelectedJob(null)
                    }}
                  >
                    Done <Arrow />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="application-form">
  <div className="form-row-grid">
    <div className="form-group">
      <label htmlFor="app-name">Full Name *</label>
      <input
        id="app-name"
        type="text"
        required
        placeholder="e.g. Rajesh Kumar"
        value={applicantName}
        onChange={(e) => setApplicantName(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="app-email">Email Address *</label>
      <input
        id="app-email"
        type="email"
        required
        placeholder="e.g. rajesh@domain.com"
        value={applicantEmail}
        onChange={(e) => setApplicantEmail(e.target.value)}
      />
    </div>
  </div>

  <div className="form-row-grid">
    <div className="form-group">
      <label htmlFor="app-phone">Phone / WhatsApp Number *</label>
      <input
        id="app-phone"
        type="tel"
        required
        placeholder="e.g. +91 98765 43210"
        value={applicantPhone}
        onChange={(e) => setApplicantPhone(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="app-exp">
        Years of Solar / Engineering Experience
      </label>

      <select
        id="app-exp"
        value={applicantExp}
        onChange={(e) => setApplicantExp(e.target.value)}
      >
        <option value="fresher">
          Fresher / Graduate (&lt;1 yr)
        </option>
        <option value="1-3">1 – 3 Years</option>
        <option value="3-5">3 – 5 Years</option>
        <option value="5-8">5 – 8 Years</option>
        <option value="8+">8+ Years Senior Level</option>
      </select>
    </div>
  </div>

  <div className="form-group">
    <label htmlFor="app-loc">Current City & State</label>

    <input
      id="app-loc"
      type="text"
      placeholder="e.g. Visakhapatnam, Andhra Pradesh"
      value={applicantLocation}
      onChange={(e) => setApplicantLocation(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label htmlFor="app-note">
      Brief Summary of Experience / Key Projects
    </label>

    <textarea
      id="app-note"
      rows={3}
      placeholder="Mention your relevant solar design, PVSyst, rooftop or MW execution experience..."
      value={applicantNote}
      onChange={(e) => setApplicantNote(e.target.value)}
    />
  </div>

  {/* Resume Upload - API Integration */}
  <div className="form-file-box">
    <label htmlFor="app-resume">
      <FiPaperclip
        style={{
          marginRight: '6px',
          verticalAlign: 'middle'
        }}
      />
      Resume Upload *
    </label>

    <input
      id="app-resume"
      type="file"
      accept=".pdf,.doc,.docx"
      required
      onChange={(e) => {
        setResumeFile(e.target.files?.[0] || null)
        setApplicationError('')
      }}
    />

    <span>
      Upload your CV or resume in PDF, DOC, or DOCX format.
    </span>
  </div>

  {/* API Error Message */}
  {applicationError && (
    <div
      className="application-error-view"
      role="alert"
      aria-live="polite"
    >
      {applicationError}
    </div>
  )}

  <div className="application-form-footer">
    <button
      type="button"
      className="button button-ghost-dark"
      onClick={() => setIsApplying(false)}
      disabled={applicationSubmitting}
    >
      Cancel
    </button>

    <button
      type="submit"
      className="button button-accent"
      disabled={applicationSubmitting}
    >
      {applicationSubmitting ? (
        'Submitting...'
      ) : (
        <>
          Submit Job Application <Arrow />
        </>
      )}
    </button>
  </div>
</form>
              )}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
    </>
  )
}
