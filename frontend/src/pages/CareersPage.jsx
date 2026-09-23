import { useState, useEffect } from 'react'
import { SiteHeader, SiteFooter, Arrow, Reveal, navigate } from '../components/Shared'
import { apiGet, apiPost } from '../utils/api'
export const jobListings = [
  {
    id: 'job-solar-design-lead',
    title: 'Lead Solar Design Engineer (PVSyst / AutoCAD)',
    department: 'engineering',
    deptLabel: 'Engineering & Design',
    location: 'Visakhapatnam / Hybrid',
    experience: '4 – 7 Years',
    type: 'Full-Time · Permanent',
    openings: 2,
    overview: 'Lead the system sizing, 3D shadow modeling, string layout planning, and electrical Single Line Diagram (SLD) creation for MW-scale captive solar plants and high-density commercial rooftops.',
    responsibilities: [
      'Conduct detailed solar resource analysis and yield simulations using PVSyst, Meteonorm, and AutoCAD.',
      'Design complete DC and AC electrical schematics, string configuration, cable sizing, and protection coordination.',
      'Perform 3D shading analysis and structural load validation for industrial metal rooftops and RCC terraces.',
      'Prepare comprehensive Bill of Materials (BOM) and technical documentation for DISCOM and CEIG approvals.',
      'Collaborate closely with on-site execution teams to resolve engineering modifications during construction.'
    ],
    requirements: [
      'B.Tech / M.Tech in Electrical / Renewable Energy Engineering.',
      'Minimum 4+ years of proven design experience in C&I rooftop and ground-mounted solar PV projects.',
      'High proficiency in PVSyst, AutoCAD, SketchUp, and electrical load calculation tools.',
      'Strong understanding of CEA regulations, IEEE standards, and Indian National Electrical Code (NEC).'
    ]
  },
  {
    id: 'job-site-execution-engineer',
    title: 'Senior Site Execution Engineer (C&I & MW-Scale)',
    department: 'execution',
    deptLabel: 'Project Execution & EPC',
    location: 'Multi-State Sites (AP, Telangana, TN, Karnataka)',
    experience: '3 – 6 Years',
    type: 'Full-Time · On-Site',
    openings: 3,
    overview: 'Supervise on-site turnkey installation, civil foundations, structural mounting, electrical cabling, and commissioning of commercial and MW-scale ground mount solar projects.',
    responsibilities: [
      'Oversee day-to-day site civil works, pile ramming, module mounting structure (MMS) erection, and module alignment.',
      'Manage DC cabling, string inverter installations, chemical earthing pits, and HT switchyard connections.',
      'Enforce zero-tolerance safety protocols, daily tool-box talks, and PPE compliance across contractor labor.',
      'Conduct pre-commissioning testing: insulation resistance (megger), polarity, VOC, ISC, and earth loop impedance.',
      'Coordinate with DISCOM engineers for inspection, synchronization, and net-metering commissioning.'
    ],
    requirements: [
      'Diploma / Degree in Electrical or Civil Engineering.',
      '3 to 6 years of hands-on site execution experience in solar power projects.',
      'Willingness to travel and station at active project sites across India.',
      'Valid electrical supervisor certification is highly advantageous.'
    ]
  },
  {
    id: 'job-pm-surya-ghar-manager',
    title: 'Operations Manager - PM Surya Ghar Cluster',
    department: 'execution',
    deptLabel: 'Project Execution & EPC',
    location: 'Vizianagaram & North Coastal AP',
    experience: '3 – 6 Years',
    type: 'Full-Time · Field Based',
    openings: 2,
    overview: 'Drive residential rooftop installation workflows under PM Surya Ghar Muft Bijli Yojana, leading multiple mobile execution teams across Vizianagaram and adjacent districts.',
    responsibilities: [
      'Manage high-volume residential rooftop installation pipelines from roof survey to net-meter commissioning.',
      'Coordinate daily field technician assignments, material dispatch from regional warehouses, and quality audits.',
      'Ensure timely uploading of commissioning reports and geo-tagged photos on the National PM Surya Ghar Portal.',
      'Liaise with local DISCOM section officers for bi-directional meter release and inspection scheduling.',
      'Deliver exceptional customer satisfaction and homeowner orientation for smart solar inverters.'
    ],
    requirements: [
      'Graduate in Engineering or Management with 3+ years experience in distributed rooftop solar operations.',
      'Demonstrated experience handling multi-site residential solar projects in Andhra Pradesh.',
      'Fluency in Telugu and English; outstanding team management and communication skills.',
      'Deep familiarity with National PM Surya Ghar portal protocols and DISCOM guidelines.'
    ]
  },
  {
    id: 'job-om-scada-specialist',
    title: 'Solar O&M & SCADA Automation Specialist',
    department: 'om',
    deptLabel: 'Operations & Maintenance',
    location: 'Visakhapatnam Operations Center',
    experience: '2 – 5 Years',
    type: 'Full-Time · Permanent',
    openings: 2,
    overview: 'Monitor remote solar plant generation across operating assets, analyze Performance Ratios (PR), and dispatch preventative and breakdown maintenance teams.',
    responsibilities: [
      'Monitor centralized SCADA and cloud telemetry dashboards across 500+ residential and C&I solar installations.',
      'Detect anomalous inverter tripping, string underperformance, grid curtailment, and soiling loss.',
      'Schedule preventative maintenance schedules: robotic module cleaning, thermal drone scans, and electrical retorquing.',
      'Perform on-site troubleshooting for inverter alarms, communication gateway failures, and ground faults.',
      'Prepare monthly Generation & SLA reports for corporate and institutional clients.'
    ],
    requirements: [
      'Degree / Diploma in Electrical & Electronics Engineering.',
      '2+ years experience in solar power plant O&M, SCADA telemetry, and string inverter diagnostics.',
      'Hands-on expertise with clamp meters, earth testers, thermal imaging cameras, and IV curve tracers.',
      'Analytical problem-solver with strong attention to system performance data.'
    ]
  },
  {
    id: 'job-bd-manager-ci',
    title: 'Business Development Manager (Commercial & Industrial)',
    department: 'sales',
    deptLabel: 'Business Development',
    location: 'Hyderabad / Visakhapatnam / Chennai',
    experience: '4 – 8 Years',
    type: 'Full-Time · Corporate',
    openings: 2,
    overview: 'Originate and close turnkey solar EPC opportunities with industrial manufacturers, commercial complexes, healthcare institutions, and educational campuses.',
    responsibilities: [
      'Identify and engage prospective C&I clients evaluating rooftop or captive solar solutions.',
      'Analyze client electricity bills, tariff structures, available roof/land area, and financial payback models.',
      'Present custom EPC proposals, CAPEX/OPEX financial modeling, and accelerated tax depreciation benefits.',
      'Lead commercial contract negotiations, EPC terms, and project milestone agreements.',
      'Represent N Solutions at renewable energy industry expos, industrial association forums, and trade bodies.'
    ],
    requirements: [
      'B.Tech with MBA preferred; 4+ years of B2B sales experience in solar EPC or industrial capital equipment.',
      'Proven track record of closing 100 kWp to MW-scale solar EPC contracts in South / Western India.',
      'Exceptional consultative presentation skills and financial acumen.'
    ]
  },
  {
    id: 'job-discom-liaison-officer',
    title: 'DISCOM Liaison & Regulatory Net-Metering Officer',
    department: 'liaison',
    deptLabel: 'Regulatory & Subsidies',
    location: 'Vijayawada / Visakhapatnam, AP',
    experience: '2 – 5 Years',
    type: 'Full-Time · Field & Office',
    openings: 2,
    overview: 'Interface with state power distribution companies (APEPDCL, APSPDCL, TGSPDCL) and regulatory authorities to fast-track net-metering approvals, CEIG clearances, and subsidy claims.',
    responsibilities: [
      'Coordinate grid connectivity feasibility applications and sync permissions for LT and HT solar installations.',
      'Liaise with DISCOM sub-stations, divisional engineers, and meter testing laboratories.',
      'Ensure prompt inspection scheduling, meter calibration, synchronization certificate issuance, and billing adjustments.',
      'Track state subsidy disbursement and net-metering regulatory amendments.'
    ],
    requirements: [
      'Bachelor’s Degree in any discipline or Electrical Diploma.',
      '2+ years experience in electrical liaisoning or solar net-metering approvals in Andhra Pradesh / Telangana.',
      'Comprehensive understanding of DISCOM net-metering regulations and portal workflows.',
      'Fluent in Telugu and English with excellent interpersonal skills.'
    ]
  }
]

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


  const [jobs, setJobs] = useState(jobListings)
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
    setJobs(jobListings)
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

  useEffect(() => {
  document.title = 'Careers | N Solutions Solar EPC'
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
              <a 
                className="button button-ghost" 
                href="#culture"
              >
                Why Work With Us ↓
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

        {/* WHY WORK AT N SOLUTIONS */}
        <section className="careers-pillars wrap" id="culture">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow"><span /> Employee Value Proposition</p>
              <h2>Why build your career<br /><em>with N Solutions?</em></h2>
            </div>
            <p className="heading-note">
              We empower engineers and operations professionals with real project ownership, continuous technical training, and exposure to cutting-edge solar technologies.
            </p>
          </Reveal>

          <div className="pillars-grid">
            <Reveal className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Authentic Engineering Mastery</h3>
              <p>
                Work with latest N-Type TOPCon bi-facial modules, high-capacity string inverters, and high-voltage 11kV/33kV substations. We do not just assemble systems; we engineer long-term energy solutions.
              </p>
              <div className="pillar-badge">Advanced Solar Tech</div>
            </Reveal>

            <Reveal className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Fast-Track Project Ownership</h3>
              <p>
                Take direct charge of project milestones from feasibility and PVSyst simulation to site construction and grid net-metering. Your contribution directly determines clean energy delivery.
              </p>
              <div className="pillar-badge">Real Responsibility</div>
            </Reveal>

            <Reveal className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Safety & Professional Ethics</h3>
              <p>
                Safety is not an afterthought; it is our foundation. From high-altitude rooftop lifeline systems to electrical lockout/tagout protocols, every employee is protected by certified standards.
              </p>
              <div className="pillar-badge">Zero-Compromise Safety</div>
            </Reveal>

            <Reveal className="pillar-card">
              <span className="pillar-num">04</span>
              <h3>Tangible Decarbonization Impact</h3>
              <p>
                Every megawatt commissioned avoids thousands of metric tonnes of carbon emissions annually and reduces financial burdens for local families and manufacturing mills alike.
              </p>
              <div className="pillar-badge">Clean Energy Impact</div>
            </Reveal>
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
                    <span>📍 {job.location}</span>
                    <span>⏱ {job.experience}</span>
                    <span>👥 {job.openings} Openings</span>
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

        {/* 4-STEP HIRING PROCESS */}
        <section className="careers-process">
          <div className="wrap">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow light"><span /> Transparent & Respectful</p>
                <h2>Our 4-step hiring<br /><em>evaluation process.</em></h2>
              </div>
              <p className="heading-note light">
                We respect your time. Our interview process is structured, transparent, and focused on practical solar competence.
              </p>
            </Reveal>

            <div className="process-stages-grid">
              <Reveal className="process-stage-card">
                <span className="stage-num">01</span>
                <h4>Application Review</h4>
                <p>Our engineering and HR leadership reviews your background, portfolio, and solar project history within 48 business hours.</p>
              </Reveal>

              <Reveal className="process-stage-card">
                <span className="stage-num">02</span>
                <h4>Technical Discussion</h4>
                <p>In-depth technical dialogue with a senior solar design engineer or project lead on real-world engineering challenges.</p>
              </Reveal>

              <Reveal className="process-stage-card">
                <span className="stage-num">03</span>
                <h4>Project Case / Field Fit</h4>
                <p>A practical discussion on site safety, DISCOM coordination, or system layout sizing relevant to the prospective role.</p>
              </Reveal>

              <Reveal className="process-stage-card">
                <span className="stage-num">04</span>
                <h4>Offer & Onboarding</h4>
                <p>Transparent compensation offer, structured onboarding curriculum, and introduction to our active project sites.</p>
              </Reveal>
            </div>
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
              <button 
                type="button" 
                className="button button-accent"
                onClick={() => {
                  setSelectedJob({ title: 'General Solar Engineering Application', deptLabel: 'Open Consideration' })
                  setIsApplying(true)
                  setApplicationSuccess(false)
                }}
              >
                Submit General Application <Arrow />
              </button>
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
                      <label htmlFor="app-exp">Years of Solar / Engineering Experience</label>
                      <select 
                        id="app-exp"
                        value={applicantExp} 
                        onChange={(e) => setApplicantExp(e.target.value)}
                      >
                        <option value="fresher">Fresher / Graduate (&lt;1 yr)</option>
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
                    <label htmlFor="app-note">Brief Summary of Experience / Key Projects</label>
                    <textarea 
                      id="app-note"
                      rows={3} 
                      placeholder="Mention your relevant solar design, PVSyst, rooftop or MW execution experience..."
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                    />
                  </div>

                  <div className="form-file-box">
  <label htmlFor="app-resume">
    📎 Resume Upload *
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
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="button button-accent"
                      disabled={applicationSubmitting}
                    >
                      {applicationSubmitting
                        ? 'Submitting...'
                        : <>Submit Job Application <Arrow /></>
                      }
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
  )
}
