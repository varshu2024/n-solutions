import { useEffect, useRef, useState } from 'react'
import ProjectsPage, { projectsData } from './pages/ProjectsPage'
import ProductsPage from './pages/ProductsPage'
import MediaPage from './pages/MediaPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import AdminPortal from './admin/AdminPortal'
import { navigate, SiteFooter } from './components/Shared'
import { homeContent, aboutContent, servicesAndSolutionsContent } from './content/siteContent'
import { apiGet } from './utils/api'
import { 
  FiArrowUpRight, FiArrowDown, FiCheck, FiChevronRight, FiChevronLeft,
  FiZap, FiSun, FiShield, FiTarget, FiTrendingUp, FiGlobe, 
  FiCompass, FiCpu, FiAward, FiCheckCircle, FiRefreshCw, 
  FiBriefcase, FiHome, FiTool, FiActivity, FiSliders, 
  FiUsers, FiClock, FiLayers, FiFileText, FiMapPin, FiStar,
  FiPause, FiPlay
} from 'react-icons/fi'

const services = homeContent.whatWeDo.services
const process = homeContent.howWeWork.steps
const strengths = homeContent.whyChooseUs.strengths

function getVisionIcon(num) {
  switch (num) {
    case '01': return <FiSun />
    case '02': return <FiUsers />
    case '03': return <FiZap />
    case '04': return <FiTrendingUp />
    case '05': return <FiGlobe />
    case '06': return <FiCompass />
    default: return <FiSun />
  }
}

function getMissionIcon(num) {
  switch (num) {
    case '01': return <FiSliders />
    case '02': return <FiShield />
    case '03': return <FiTarget />
    case '04': return <FiRefreshCw />
    case '05': return <FiCpu />
    case '06': return <FiAward />
    default: return <FiShield />
  }
}

function getCapabilityIcon(num) {
  switch (num) {
    case '01': return <FiZap />
    case '02': return <FiBriefcase />
    case '03': return <FiHome />
    case '04': return <FiAward />
    case '05': return <FiTool />
    case '06': return <FiActivity />
    case '07': return <FiLayers />
    case '08': return <FiTrendingUp />
    default: return <FiSun />
  }
}

function getStrengthIcon(num) {
  switch (num) {
    case '01': return <FiClock />
    case '02': return <FiMapPin />
    case '03': return <FiCompass />
    case '04': return <FiBriefcase />
    case '05': return <FiSliders />
    case '06': return <FiAward />
    case '07': return <FiShield />
    case '08': return <FiCheckCircle />
    default: return <FiZap />
  }
}

function StrengthsOrbitWheel({ items }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const timerRef = useRef(null)
  const current = items[activeIdx]
  const N = items.length
  const SIZE = 640, CX = 320, CY = 320, RADIUS = 236

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % N)
    }, 3200)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [N])

  const handleClick = (idx) => {
    setActiveIdx(idx)
    startTimer()
  }

  const nodes = items.map((item, i) => {
    const angle = (2 * Math.PI * i / N) - Math.PI / 2
    return {
      x: CX + RADIUS * Math.cos(angle),
      y: CY + RADIUS * Math.sin(angle),
      item,
      idx: i
    }
  })

  const activeNode = nodes[activeIdx]
  const arcLen = 2 * Math.PI * RADIUS
  const segLen = arcLen / N
  const dashOffset = -(arcLen * activeIdx / N) + 0.01

  return (
    <div className="orbit-wheel-wrapper">
      <div className="orbit-wheel-left">
        <div className="orbit-stage-container" style={{ width: SIZE, height: SIZE }}>
          {/* SVG Background Orbits and Laser Beam */}
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="orbit-svg" aria-hidden="true">
            <defs>
              <linearGradient id="orbitBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1565c0" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0284c7" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="orbitArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1565c0" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <filter id="orbitGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer ambient decorative orbits */}
            <circle cx={CX} cy={CY} r={RADIUS + 44} fill="none" stroke="rgba(21, 101, 192, 0.08)" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke="rgba(21, 101, 192, 0.16)" strokeWidth="2.5" strokeDasharray="8 6" />
            <circle cx={CX} cy={CY} r={RADIUS - 58} fill="none" stroke="rgba(21, 101, 192, 0.06)" strokeWidth="1" />

            {/* Glowing active arc segment along the orbit */}
            <circle
              cx={CX}
              cy={CY}
              r={RADIUS}
              fill="none"
              stroke="url(#orbitArcGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${segLen * 0.85} ${arcLen - segLen * 0.85}`}
              strokeDashoffset={dashOffset}
              filter="url(#orbitGlow)"
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: `${CX}px ${CY}px`,
                transition: 'stroke-dashoffset 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            />

            {/* Connector beam lines */}
            {nodes.map(({ x, y, idx }) => {
              const isActive = idx === activeIdx
              return (
                <line
                  key={idx}
                  x1={CX}
                  y1={CY}
                  x2={x}
                  y2={y}
                  stroke={isActive ? 'url(#orbitBeamGrad)' : 'rgba(21, 101, 192, 0.09)'}
                  strokeWidth={isActive ? 3 : 1}
                  strokeDasharray={isActive ? 'none' : '3 3'}
                  style={{ transition: 'all 0.5s ease' }}
                />
              )
            })}
          </svg>

          {/* Center Hub */}
          <div className="orbit-center-hub" style={{ left: `${CX}px`, top: `${CY}px` }}>
            <div className="orbit-center-radar" />
            <div className="orbit-center-content">
              <span className="orbit-center-icon">
                {getStrengthIcon(current.number)}
              </span>
              <span className="orbit-center-badge">Strength {current.number}</span>
              <strong className="orbit-center-stat">{current.stat}</strong>
            </div>
          </div>

          {/* 8 Outer Nodes with React Icons */}
          <div className="orbit-nodes-layer">
            {nodes.map(({ x, y, item, idx }) => {
              const isActive = idx === activeIdx
              return (
                <div
                  key={item.number}
                  className={`orbit-node-wrapper ${isActive ? 'is-active' : ''}`}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                  }}
                >
                  <button
                    type="button"
                    className="orbit-node-btn"
                    onClick={() => handleClick(idx)}
                    aria-label={`${item.number} ${item.title}`}
                    title={item.title}
                  >
                    <span className="orbit-node-num-pill">{item.number}</span>
                    <span className="orbit-node-react-icon">
                      {getStrengthIcon(item.number)}
                    </span>
                  </button>
                  <span className="orbit-node-label">{item.stat}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Information */}
      <div className="orbit-wheel-right">
        <p className="eyebrow"><span /> {homeContent.whyChooseUs.eyebrow}</p>
        <h2 className="orbit-right-h2">
          {homeContent.whyChooseUs.title}<br />
          <em>{homeContent.whyChooseUs.subtitle}</em>
        </h2>
        <p className="orbit-right-note">{homeContent.whyChooseUs.note}</p>

        {/* Executive Active Card */}
        <div className="orbit-active-card" key={current.number}>
          <div className="orbit-active-top">
            <div className="orbit-active-icon-badge">
              {getStrengthIcon(current.number)}
            </div>
            <div className="orbit-active-meta">
              <span className="orbit-active-step-chip">Pillar {current.number} of {N}</span>
              <span className="orbit-active-stat-chip">{current.stat}</span>
            </div>
          </div>
          <h3 className="orbit-active-title">{current.title}</h3>
          <p className="orbit-active-desc">{current.description}</p>
          <div className="orbit-active-progress-bar">
            <div className="orbit-active-progress-fill is-playing" />
          </div>
        </div>
      </div>
    </div>
  )
}

function getServiceIcon(num) {
  switch (num) {
    case '01': return <FiBriefcase />
    case '02': return <FiHome />
    case '03': return <FiCpu />
    case '04': return <FiZap />
    case '05': return <FiAward />
    case '06': return <FiSun />
    case '07': return <FiTrendingUp />
    case '08': return <FiActivity />
    case '09': return <FiGlobe />
    case '10': return <FiSliders />
    case '11': return <FiLayers />
    case '12': return <FiTool />
    case '13': return <FiLayers />
    case '14': return <FiSun />
    case '15': return <FiZap />
    default: return <FiSun />
  }
}

function Arrow() { return <FiArrowUpRight aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', strokeWidth: 2.5 }} /> }

function AnimatedMetric({ value, suffix = '', label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const update = (now) => {
        const progress = Math.min((now - start) / 900, 1)
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))))
        if (progress < 1) requestAnimationFrame(update)
      }
      requestAnimationFrame(update)
      observer.disconnect()
    }, { threshold: .4 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])
  return <div ref={ref}><strong>{count}<span>{suffix}</span></strong><small>{label}</small></div>
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.disconnect()
      }
    }, { threshold: .12 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function ScrollProgressBar() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setWidth(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="scroll-progress-bar" style={{ width: `${width}%` }} aria-hidden="true" />
}

function EmptyState({ label, text }) {
  return <div className="empty-state"><span className="empty-icon">+</span><strong>{label}</strong><p>{text}</p></div>
}


const verifiedTestimonials = [
  {
    id: 1, rating: 5,
    quote: "N Solutions delivered our 50 kWp rooftop plant on time with exceptional build quality. The net-metering approval was handled end-to-end by their team — zero hassle for us.",
    name: "Ramesh Babu", role: "Plant Head", company: "Sri Sai Industries, Vizag",
    metric: "₹4.2L annual savings"
  },
  {
    id: 2, rating: 5,
    quote: "Professional EPC execution. Our 25 kWp system has been producing above PVSyst estimates for 18 months straight. The O&M support is prompt and reliable.",
    name: "Priya Nair", role: "Facility Manager", company: "GreenLeaf Exports, Tirupati",
    metric: "103% generation yield"
  },
  {
    id: 3, rating: 5,
    quote: "We availed the PM Surya Ghar subsidy through N Solutions. The documentation and portal registration was seamless. Highly recommend for residential solar.",
    name: "K. Venkata Rao", role: "Homeowner", company: "Kakinada",
    metric: "Subsidy processed in 12 days"
  },
]

function CertificationsShowcase({ theme = 'light' }) {
  return (
    <div className={`cert-showcase-section theme-${theme}`}>
      <div className="cert-grid-modern">
        {verifiedCertifications.map((cert) => {
          return (
            <Reveal className="cert-card-modern" key={cert.id}>
              {cert.docImage ? (
                <div className="cert-doc-preview-wrap">
                  <img src={cert.docImage} alt={cert.title} loading="lazy" />
                  <div className="cert-doc-overlay">
                    <span className="cert-doc-badge">{cert.badge}</span>
                  </div>
                </div>
              ) : (
                <div className="cert-card-icon-header">
                  <div className="cert-header-icon">{cert.icon}</div>
                  <span className="cert-doc-badge">{cert.badge}</span>
                </div>
              )}
              <div className="cert-card-body">
                <span className="cert-auth-tag">{cert.authority}</span>
                <h3 className="cert-card-title">{cert.title}</h3>
                <p className="cert-card-desc">{cert.description}</p>
                <div className="cert-ref-chip">
                  <FiFileText style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  {cert.refNumber}
                </div>
                <div className="cert-footer-row">
                  <span className="cert-status-pill">
                    <FiCheckCircle /> {cert.status}
                  </span>
                  <span>{cert.year}</span>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

function TestimonialsShowcase({ theme = 'light' }) {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchTestimonials = async () => {
      try {
        const result = await apiGet('/testimonials')

        if (!isMounted) return

        if (result.success) {
          const items = Array.isArray(result.data)
            ? result.data
            : []

          setTestimonials(items)
        } else {
          console.error('Failed to fetch testimonials:', result.message)
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchTestimonials()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className={`testimonials-showcase-section theme-${theme}`}>
      {loading ? (
        <div className="testimonials-grid-modern">
          <div className="testimonial-loading">
            Loading testimonials...
          </div>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="testimonials-grid-modern">
          <div className="testimonial-loading">
            No testimonials available.
          </div>
        </div>
      ) : (
        <div className="testimonials-grid-modern">
          {testimonials.map((t) => (
            <Reveal
              className="testimonial-card-modern"
              key={t.id}
            >
              <div className="testimonial-top-row">
                <div
                  className="testimonial-stars"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <FiStar
                      key={i}
                      style={{
                        fill: '#f5a623',
                        color: '#f5a623',
                        marginRight: '3px'
                      }}
                    />
                  ))}
                </div>

                <span className="testimonial-verified-badge">
                  <FiCheck /> Verified Client Project
                </span>
              </div>

              <p className="testimonial-quote-text">
                “{t.quote}”
              </p>

              <div className="testimonial-author-row">
                <div className="testimonial-author-info">
                  <strong className="testimonial-author-name">
                    {t.name}
                  </strong>

                  <span className="testimonial-author-role">
                    {t.role} · {t.company}
                  </span>
                </div>

                {t.metric && (
                  <span className="testimonial-metric-chip">
                    {t.metric}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}

function ServicesShowcase() {
  return <div className="service-grid service-showcase" aria-label="Solar services">{services.map((service) => <Reveal key={service.number} className="service-card"><div className="service-photo" style={{ backgroundImage: `url(${service.image})` }}><span>{service.number}</span></div><div className="service-body"><h3>{service.title}</h3><p>{service.text}</p><a href="/services" aria-label={`Learn about ${service.title}`}>Explore <Arrow /></a></div></Reveal>)}</div>
}

const pipelinePhases = [
  {
    number: '01',
    shortLabel: 'Consult & Audit',
    title: 'Consultation & Requirement Assessment',
    tag: 'Phase 01 · Diagnostic Scope',
    text: 'We begin by analyzing your historical energy consumption, identifying peak operational loads, assessing utility tariffs, and defining exact net-metering objectives to architect the most viable solar blueprint.',
    deliverables: [
      'Comprehensive Load & Tariff Audit',
      'PM Surya Ghar / C&I Subsidy Feasibility',
      'Preliminary Capacity & Financial Projections'
    ],
    metrics: [
      { label: 'Diagnostic Precision', value: '100%' },
      { label: 'Turnaround Window', value: '24–48 Hrs' },
      { label: 'DISCOM Feasibility', value: 'Pre-Audited' }
    ]
  },
  {
    number: '02',
    shortLabel: 'Site Survey',
    title: 'Site Assessment & Structural Audit',
    tag: 'Phase 02 · Precision Survey',
    text: 'Our engineering survey team evaluates structural integrity, RCC/tin roof load-bearing thresholds, 3D shadow obstacles, solar azimuth, and HT/LT electrical tie-in infrastructure on-site.',
    deliverables: [
      '3D Drone & LiDAR Shadow Profiling',
      'Structural Load & Wind Speed Verification',
      'Point-of-Common-Coupling (PCC) Mapping'
    ],
    metrics: [
      { label: 'Shadow Loss Margin', value: '< 1.5%' },
      { label: 'Wind Resistance Rating', value: '150+ km/h' },
      { label: 'Solar Resource Index', value: '5.2 kWh/m²' }
    ]
  },
  {
    number: '03',
    shortLabel: 'Design & Yield',
    title: 'System Design & Engineering Proposal',
    tag: 'Phase 03 · Blueprint & Yield',
    text: 'Using industry-leading PVSyst and AutoCAD simulation tools, we engineer the optimal electrical Single Line Diagram (SLD), string inverter configuration, and guaranteed generation models.',
    deliverables: [
      'PVSyst P50 / P90 Generation Yield Model',
      'Complete DC & AC Single Line Diagrams',
      'DISCOM CEIG Permitting & Net-Metering File'
    ],
    metrics: [
      { label: 'PR Efficiency Target', value: '82%+' },
      { label: 'Yield Modeling Tool', value: 'PVSyst V7.4' },
      { label: 'Grid Compliance', value: 'CEA / DISCOM Ready' }
    ]
  },
  {
    number: '04',
    shortLabel: 'Procurement',
    title: 'Procurement & Material Staging',
    tag: 'Phase 04 · Supply Chain',
    text: 'We source exclusively Tier-1 ALMM bifacial solar panels, high-efficiency string inverters, hot-dip galvanized mounting structures (80μ+ zinc coating), and multi-core armoured copper/aluminum cables.',
    deliverables: [
      'Tier-1 ALMM Bi-Facial Solar PV Modules',
      'Hot-Dip Galvanized GI Module Mounting Structures',
      'Factory Acceptance Testing (FAT) Certification'
    ],
    metrics: [
      { label: 'Module Quality Tier', value: 'Tier-1 ALMM' },
      { label: 'Galvanization Layer', value: '80+ Microns' },
      { label: 'Enclosure Standard', value: 'IP65 / IP68' }
    ]
  },
  {
    number: '05',
    shortLabel: 'Installation',
    title: 'Installation, Testing & Commissioning',
    tag: 'Phase 05 · Grid Synchronization',
    text: 'Certified solar engineers execute precision mechanical mounting, DC/AC cabling, sub-1Ω chemical earthing, lightning protection, anti-islanding testing, and official DISCOM bi-directional meter synchronization.',
    deliverables: [
      'Torque-Calibrated Mechanical GI Assembly',
      'Sub-1.0 Ω Chemical Earthing & SPD Arrestors',
      'Government CEIG Inspection & Meter Handover'
    ],
    metrics: [
      { label: 'Earthing Resistance', value: '< 1.0 Ω' },
      { label: 'Safety Track Record', value: 'Zero Incident' },
      { label: 'Testing Standard', value: 'IEC 62446 Validated' }
    ]
  },
  {
    number: '06',
    shortLabel: 'O&M Support',
    title: 'Support, SCADA Telemetry & Performance',
    tag: 'Phase 06 · 25-Year Stewardship',
    text: 'Post-commissioning, our monitoring center tracks real-time generation via IoT SCADA cloud telemetry, conducting scheduled module thermography, preventive cleaning, and ensuring maximum plant uptime.',
    deliverables: [
      '24/7 Cloud SCADA Generation Tracking',
      'Periodic Drone Thermographic Audits',
      '25-Year Output Warranty & Prompt SLA Support'
    ],
    metrics: [
      { label: 'Uptime SLA Guarantee', value: '99.2%' },
      { label: 'Performance Warranty', value: '25 Years' },
      { label: 'Support Response Window', value: '< 4 Hours' }
    ]
  }
]

function PhaseEngineeringIllustration({ phaseNumber }) {
  switch (phaseNumber) {
    case '01':
      return (
        <div className="phase-svg-graphic phase-svg-meter" aria-hidden="true">
          <svg viewBox="0 0 240 120" className="phase-illustration-svg">
            <rect x="10" y="10" width="220" height="100" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="22" y="22" width="196" height="42" rx="8" fill="#0f172a" />
            <text x="34" y="50" fill="#38bdf8" fontFamily="monospace" fontSize="20" fontWeight="800">42.8 kW</text>
            <text x="145" y="48" fill="#f59e0b" fontFamily="sans-serif" fontSize="11" fontWeight="700">● PEAK LOAD</text>
            {/* Waveform / Load profile */}
            <path d="M 24 95 Q 50 70 80 85 T 140 75 T 190 90 T 216 80" fill="none" stroke="#1565c0" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="140" cy="75" r="4" fill="#0284c7" />
            <text x="24" y="108" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">415V 3-PHASE · DISCOM TARIFF SYNC</text>
          </svg>
        </div>
      )
    case '02':
      return (
        <div className="phase-svg-graphic phase-svg-survey" aria-hidden="true">
          <svg viewBox="0 0 240 120" className="phase-illustration-svg">
            <rect x="10" y="10" width="220" height="100" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Sun angle & roof survey plane */}
            <circle cx="48" cy="38" r="14" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
            <line x1="48" y1="18" x2="48" y2="12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="48" y1="58" x2="48" y2="64" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="38" x2="22" y2="38" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="68" y1="38" x2="74" y2="38" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            {/* Roof plane polygon */}
            <polygon points="90,88 150,52 215,62 155,98" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
            {/* LiDAR grid lines */}
            <line x1="110" y1="76" x2="175" y2="86" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="130" y1="64" x2="195" y2="74" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
            {/* Ray trace */}
            <line x1="60" y1="46" x2="120" y2="70" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="92" y="32" fill="#0f172a" fontSize="10" fontWeight="700">AZIMUTH 180° · 28.4° TILT</text>
            <text x="24" y="108" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">3D SHADOW LOSS MARGIN &lt; 1.5%</text>
          </svg>
        </div>
      )
    case '03':
      return (
        <div className="phase-svg-graphic phase-svg-design" aria-hidden="true">
          <svg viewBox="0 0 240 120" className="phase-illustration-svg">
            <rect x="10" y="10" width="220" height="100" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Solar module array matrix */}
            <rect x="25" y="26" width="34" height="48" rx="3" fill="#1565c0" stroke="#93c5fd" strokeWidth="1" />
            <rect x="65" y="26" width="34" height="48" rx="3" fill="#1565c0" stroke="#93c5fd" strokeWidth="1" />
            <rect x="105" y="26" width="34" height="48" rx="3" fill="#1565c0" stroke="#93c5fd" strokeWidth="1" />
            <rect x="145" y="26" width="34" height="48" rx="3" fill="#1565c0" stroke="#93c5fd" strokeWidth="1" />
            {/* String wiring to inverter */}
            <path d="M 42 74 L 42 86 L 162 86 L 162 74" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <line x1="102" y1="86" x2="102" y2="98" stroke="#f59e0b" strokeWidth="2" />
            <rect x="188" y="34" width="32" height="40" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
            <text x="194" y="58" fill="#38bdf8" fontSize="9" fontWeight="800">INV</text>
            <text x="24" y="108" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">PVSYST SIMULATION · PR TARGET 82%+</text>
          </svg>
        </div>
      )
    case '04':
      return (
        <div className="phase-svg-graphic phase-svg-procurement" aria-hidden="true">
          <svg viewBox="0 0 240 120" className="phase-illustration-svg">
            <rect x="10" y="10" width="220" height="100" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="56" cy="54" r="28" fill="#e0f2fe" stroke="#1565c0" strokeWidth="2" strokeDasharray="5 3" />
            <text x="42" y="58" fill="#1565c0" fontSize="12" fontWeight="800">ALMM</text>
            <rect x="102" y="28" width="114" height="24" rx="6" fill="#0f172a" />
            <text x="112" y="44" fill="#4ade80" fontSize="10" fontWeight="700">✓ TIER-1 PASS FAT</text>
            <rect x="102" y="58" width="114" height="24" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
            <text x="112" y="74" fill="#0369a1" fontSize="9.5" fontWeight="700">80μ+ HDG STRUCTURE</text>
            <text x="24" y="108" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">APPROVED MODULES & IP68 ENCLOSURES</text>
          </svg>
        </div>
      )
    case '05':
      return (
        <div className="phase-svg-graphic phase-svg-install" aria-hidden="true">
          <svg viewBox="0 0 240 120" className="phase-illustration-svg">
            <rect x="10" y="10" width="220" height="100" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Grounding and structure sync */}
            <line x1="30" y1="78" x2="130" y2="78" stroke="#334155" strokeWidth="3" />
            <polygon points="40,78 60,38 120,38 100,78" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Earth spike */}
            <line x1="80" y1="78" x2="80" y2="98" stroke="#10b981" strokeWidth="2" />
            <line x1="72" y1="90" x2="88" y2="90" stroke="#10b981" strokeWidth="2" />
            <line x1="75" y1="94" x2="85" y2="94" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="178" cy="54" r="24" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
            <text x="162" y="52" fill="#22c55e" fontSize="9" fontWeight="800">NET-MTR</text>
            <text x="164" y="66" fill="#ffffff" fontSize="11" fontWeight="700">SYNC</text>
            <text x="24" y="108" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">SUB-1.0 Ω CHEMICAL EARTHING VERIFIED</text>
          </svg>
        </div>
      )
    case '06':
    default:
      return (
        <div className="phase-svg-graphic phase-svg-om" aria-hidden="true">
          <svg viewBox="0 0 240 120" className="phase-illustration-svg">
            <rect x="10" y="10" width="220" height="100" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="24" y="24" width="94" height="48" rx="8" fill="#0f172a" />
            <text x="34" y="44" fill="#94a3b8" fontSize="8.5" fontWeight="700">GENERATION</text>
            <text x="34" y="63" fill="#38bdf8" fontSize="14" fontWeight="800">128.4 MWh</text>
            <rect x="126" y="24" width="90" height="48" rx="8" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1" />
            <text x="136" y="44" fill="#047857" fontSize="8.5" fontWeight="700">PR YIELD</text>
            <text x="136" y="63" fill="#059669" fontSize="14" fontWeight="800">↗ +18.4%</text>
            <text x="24" y="96" fill="#0f172a" fontSize="10" fontWeight="700">99.2% UPTIME SLA GUARANTEE</text>
            <text x="24" y="108" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">24/7 IOT SCADA TELEMETRY MONITORING</text>
          </svg>
        </div>
      )
  }
}

function ProcessPipelineCockpit({ eyebrow, title, subtitle, intro, ctaText = 'Start your project' }) {
  const [activeStep, setActiveStep] = useState(0)
  const current = pipelinePhases[activeStep]
  const total = pipelinePhases.length

  return (
    <section className="proc-section" id="how-we-work">
      <div className="proc-wrap">

        {/* Header */}
        <Reveal className="proc-header">
          <p className="proc-eyebrow">
            <span className="proc-eyebrow-line" aria-hidden="true" />
            {eyebrow || '03 — HOW WE WORK'}
          </p>
          <h2 className="proc-heading">
            {title || 'From planning'}&nbsp;<em>{subtitle || 'to performance.'}</em>
          </h2>
          <p className="proc-lead">
            {intro || 'A six-stage engineering process designed to take your solar project from feasibility to long-term performance.'}
          </p>
        </Reveal>

        {/* Main Layout */}
        <div className="proc-layout">

          {/* Left: Phase Selector Tabs */}
          <nav className="proc-tabs" aria-label="Project phases">
            {/* Animated progress spine */}
            <div className="proc-spine-track" aria-hidden="true">
              <div
                className="proc-spine-fill"
                style={{ height: `${(activeStep / (total - 1)) * 100}%` }}
              />
            </div>

            {pipelinePhases.map((phase, idx) => {
              const isActive = idx === activeStep
              const isDone = idx < activeStep
              return (
                <button
                  key={phase.number}
                  type="button"
                  className={`proc-tab${isActive ? ' is-active' : ''}${isDone ? ' is-done' : ''}`}
                  onClick={() => setActiveStep(idx)}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span className="proc-tab-dot" aria-hidden="true">
                    {isDone ? <FiCheckCircle /> : <span className="proc-tab-dot-inner" />}
                  </span>
                  <span className="proc-tab-body">
                    <span className="proc-tab-num">Phase {phase.number}</span>
                    <span className="proc-tab-name">{phase.shortLabel}</span>
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Right: Content — key forces remount → triggers CSS entry animation */}
          <div key={activeStep} className="proc-content">

            {/* Phase tag */}
            <div className="proc-content-tag">
              <span className="proc-tag-badge">{current.tag}</span>
              <span className="proc-tag-fraction">{current.number} of 0{total}</span>
            </div>

            {/* Title + body */}
            <h3 className="proc-content-title">{current.title}</h3>
            <p className="proc-content-text">{current.text}</p>

            {/* Metrics */}
            <div className="proc-kpi-row">
              {current.metrics.map((m, i) => (
                <div key={m.label} className="proc-kpi" style={{ animationDelay: `${i * 80}ms` }}>
                  <strong className="proc-kpi-val">{m.value}</strong>
                  <span className="proc-kpi-lbl">{m.label}</span>
                  <div className="proc-kpi-track">
                    <div
                      className="proc-kpi-bar"
                      style={{ width: i === 0 ? '100%' : i === 1 ? '94%' : '82%' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Deliverables */}
            <div className="proc-deliv-wrap">
              <p className="proc-deliv-heading">Key Deliverables</p>
              <ul className="proc-deliv-list">
                {current.deliverables.map((d, i) => (
                  <li
                    key={d}
                    className="proc-deliv-item"
                    style={{ animationDelay: `${120 + i * 70}ms` }}
                  >
                    <FiCheckCircle className="proc-deliv-check" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer: nav + cta */}
            <div className="proc-footer">
              <div className="proc-nav-row">
                <button
                  type="button"
                  className="proc-nav-btn"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(p => Math.max(0, p - 1))}
                  aria-label="Previous phase"
                >← Prev</button>
                <span className="proc-nav-count">
                  {String(activeStep + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  className="proc-nav-btn"
                  disabled={activeStep === total - 1}
                  onClick={() => setActiveStep(p => Math.min(total - 1, p + 1))}
                  aria-label="Next phase"
                >Next →</button>
              </div>
              <a
                href="/contact"
                onClick={e => { e.preventDefault(); navigate('/contact') }}
                className="proc-cta"
              >
                {ctaText} <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


const aboutPrinciples = [
  ['01', 'Clean energy future', 'Accelerate the adoption of solar and renewable energy for a cleaner tomorrow.'],
  ['02', 'Trusted solar partner', 'Build long-term trust through dependable solutions, professional service, and responsible execution.'],
  ['03', 'Smarter energy solutions', 'Promote practical and efficient solar solutions that help customers make better use of energy.'],
  ['04', 'Sustainable growth', 'Support sustainable development by helping reduce dependence on conventional energy sources.'],
  ['05', 'Wider energy access', 'Make suitable solar solutions more accessible to businesses, industries, homes, and communities.'],
  ['06', "India's energy transition", "Play a meaningful role in India's journey towards cleaner and more sustainable energy."],
]

const missionPrinciples = [
  ['01', 'Engineering excellence'], ['02', 'Quality & safety'], ['03', 'Customer-centric solutions'],
  ['04', 'End-to-end execution'], ['05', 'Energy efficiency'], ['06', 'Long-term customer support'],
]

const journeyStages = [
  ['01', 'Building our foundation', 'We began by developing strong capabilities in electrical and solar solutions, building practical experience and technical expertise through project execution.'],
  ['02', 'Growing solar expertise', 'Our capabilities expanded across solar engineering, system design, procurement, installation, and project execution, enabling complete solar solutions.'],
  ['03', 'Expanding across India', 'Our project experience grew across 9 states in India, strengthening our ability to undertake projects across different locations and requirements.'],
  ['04', 'Moving to larger projects', 'We expanded into commercial and industrial projects, including MW-scale solar power plants, strengthening large-project execution capabilities.'],
  ['05', 'Government & residential solar', 'We expanded across government solar initiatives and residential rooftop projects, including implementation under PM Surya Ghar.'],
  ['06', 'Building the next chapter', 'Today, we continue to strengthen capabilities with a focus on quality, technology, energy efficiency, professional execution, and customer support.'],
]

const aboutCapabilities = [
  ['01', 'Solar EPC', 'Complete Engineering, Procurement and Construction solutions covering design, procurement, installation, and commissioning.'],
  ['02', 'Commercial & industrial solar', 'Customized solar solutions designed around project needs and energy usage.'],
  ['03', 'Residential rooftop solar', 'Rooftop solar solutions for homes with support for installation and applicable solar scheme requirements.'],
  ['04', 'Government solar projects', 'Solar solutions and project implementation for government requirements and initiatives.'],
  ['05', 'Installation & commissioning', 'Professional installation, testing, commissioning, and system handover for solar projects.'],
  ['06', 'Operation & maintenance', 'Ongoing operation and maintenance support to help solar systems operate reliably.'],
  ['07', 'Solar products & systems', 'Solar panels, inverters, earth pits, lightning arrestors, accessories, and other required system components.'],
]

const aboutProcess = [
  ['01', 'Consultation & requirement assessment', 'Understand energy requirements, project objectives, site needs, and expectations.'],
  ['02', 'Site assessment', 'Assess the site and relevant technical conditions to understand the project requirements.'],
  ['03', 'System design & proposal', 'Prepare the system design and project proposal based on requirements and project scope.'],
  ['04', 'Engineering & procurement', 'Carry out engineering and arrange the required solar equipment and system components.'],
  ['05', 'Installation & commissioning', 'Handle installation, testing, and commissioning to bring the solar system into operation.'],
  ['06', 'Support & maintenance', 'Provide ongoing support and maintenance following commissioning.'],
]

const installationServices = [
  { number: '01', title: 'Commercial solar installation', text: 'Turnkey solar installations for commercial establishments, designed to make effective use of available rooftop or project space and support the transition to clean energy.', detail: 'We support the project through requirement assessment, site evaluation, system planning, installation, testing, and commissioning.', benefits: ['Potential reduction in electricity costs', 'Efficient use of available rooftop space', 'Grid-connected system options', 'Customized system sizing', 'Professional installation and commissioning', 'Long-term solar energy generation', 'Support for applicable net-metering requirements'], applications: 'Offices, shopping centres, hospitals, hotels, educational institutions, and commercial buildings.', image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=88' },
  { number: '02', title: 'Residential solar installation', text: 'Reliable rooftop solar solutions for homes, planned according to household electricity requirements, available roof area, and applicable solar program requirements.', detail: 'We support customers from initial consultation and site assessment through system installation and commissioning.', benefits: ['Clean and renewable electricity generation', 'Potential reduction in household electricity bills', 'Effective rooftop utilization', 'Grid-connected rooftop solutions', 'Customized system planning', 'Support for applicable government schemes', 'Low-maintenance energy solution'], applications: 'Individual homes, apartments, residential buildings, villas, and housing communities.', image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1400&q=88' },
  { number: '03', title: 'Industrial solar installation', text: 'Solar solutions designed for industrial facilities with larger energy requirements and more complex site and electrical conditions.', detail: 'Our approach considers the facility, energy requirement, available installation area, electrical infrastructure, and project scope before implementation.', benefits: ['Supports large energy requirements', 'Potential reduction in electricity expenditure', 'Efficient use of industrial rooftops or available land', 'Customized system design', 'Professional installation and commissioning', 'Suitable for larger solar capacities', 'Ongoing maintenance support'], applications: 'Factories, manufacturing units, warehouses, processing facilities, and industrial campuses.', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=88' },
]

const servicesProcess = [
  ['01', 'Consultation & requirement assessment', 'Understand energy requirements, project objectives, site needs, and expectations.'],
  ['02', 'Site assessment', 'Assess the site and relevant technical conditions.'],
  ['03', 'System design & proposal', 'Prepare the system design and project proposal aligned with required capacity and project scope.'],
  ['04', 'Engineering & procurement', 'Carry out required engineering and arrange solar equipment and system components.'],
  ['05', 'Installation & commissioning', 'Handle installation, testing, and commissioning.'],
  ['06', 'Support & maintenance', 'Provide ongoing support and maintenance following commissioning.'],
]

const omBenefits = ['Regular system inspection', 'Preventive maintenance', 'Performance monitoring', 'Fault identification', 'Electrical and equipment checks', 'Maintenance planning', 'Ongoing technical support']
const adoptionAreas = [
  ['Energy efficiency solutions', "Help identify opportunities to make better use of energy through practical energy-efficiency approaches aligned with the customer's requirements."],
  ['Subsidy assistance', 'Guidance regarding applicable government solar subsidy schemes, eligibility considerations, documentation, and related processes.'],
  ['Financing assistance', 'Support in understanding available financing possibilities and the considerations involved in planning a solar investment.'],
  ['Net metering assistance', 'Guidance on the applicable net-metering process, technical requirements, documentation, and coordination for eligible solar installations.'],
]
const adoptionBenefits = ['Better understanding of energy consumption', 'Guidance on applicable solar schemes', 'Support with relevant documentation', 'Financing guidance', 'Net-metering process assistance', 'Better planning of solar investments', 'Support throughout the applicable process']
const productItems = ['Solar PV panels', 'Solar inverters', 'Earth pits', 'Lightning arrestors', 'Solar accessories']

const productCategories = ['Solar Panels', 'Solar Inverters', 'Earth Pits & Lightning Arrestors', 'Accessories']

const productCategoryImages = {
  'Solar Panels': 'https://tse2.mm.bing.net/th/id/OIP.Uk-gBBAPNXoTYcLKUea27QHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  'Solar Inverters': 'https://www.livemint.com/lm-img/img/2023/10/26/1600x900/2-0-753746399-solar-0_1680330329680_1698338750055.jpg',
  'Earth Pits & Lightning Arrestors': 'https://tse3.mm.bing.net/th/id/OIP.NnEW42ljKQbA0343soSdwgHaEJ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  'Accessories': 'https://tse1.mm.bing.net/th/id/OIP.MXONou_5bkxe7B-FmrD9AgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
}

function displayProductCategory(category = '') {
  const value = category.toLowerCase()
  if (value.includes('panel')) return 'Solar Panels'
  if (value.includes('inverter')) return 'Solar Inverters'
  if (value.includes('earth') || value.includes('arrest')) return 'Earth Pits & Lightning Arrestors'
  return 'Accessories'
}


const solutionCatalog = [
  ['01', 'Commercial solar installation', 'Turnkey solar installations for commercial establishments, planned around rooftop or project space, requirement assessment, installation, testing, and commissioning.'],
  ['02', 'Residential solar installation', 'Reliable rooftop solar solutions planned around household electricity requirements, available roof area, and applicable solar program requirements.'],
  ['03', 'Industrial solar installation', 'Solar solutions for industrial facilities with larger energy requirements and more complex site and electrical conditions.'],
  ['04', 'Solar EPC solutions', 'End-to-end Engineering, Procurement and Construction services covering design, procurement, installation, testing, commissioning, and handover.'],
  ['05', 'Government solar projects', 'Solar solutions and project implementation based on government requirements, site conditions, scope, documentation, and applicable guidelines.'],
  ['06', 'PM Surya Ghar', 'Residential rooftop solar implementation support for eligible customers, subject to scheme guidelines and customer eligibility.'],
  ['07', 'Open access solar power', 'Renewable power solutions for eligible commercial and industrial consumers looking to source solar electricity through applicable arrangements.'],
  ['08', 'On-site power solutions', "Renewable-energy solutions designed to generate power at or near the customer's facility, based on energy requirements and available resources."],
  ['09', 'Off-site renewable power', 'Renewable-energy solutions for customers sourcing clean electricity from renewable generation facilities away from their own premises.'],
  ['10', 'Asset management', 'Operational coordination, performance review, maintenance planning, issue tracking, reporting, and management of renewable-energy assets.'],
  ['11', 'Infrastructure management', 'Inspection, maintenance coordination, issue identification, and operational support for relevant solar project infrastructure.'],
  ['12', 'Operation & maintenance', 'Professional O&M services supporting reliable operation after commissioning through inspection, preventive maintenance, monitoring, and technical support.'],
  ['13', 'Solar product supply', 'Supply of solar PV panels, inverters, earth pits, lightning arrestors, accessories, and other project-specific system components.'],
  ['14', 'Solar lighting solutions', 'Solar-powered lighting solutions planned for suitable outdoor and infrastructure applications.'],
  ['15', 'Solar battery solutions', 'Battery-based solar solutions for energy storage, backup, and greater flexibility in energy usage.'],
]

function SiteHeader({ activePath = '' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const closeMenu = () => setMenuOpen(false)
  const handleNav = (e, path) => {
    e.preventDefault()
    closeMenu()
    navigate(path)
  }
  const items = ['Home', 'About', 'Services', 'Projects', 'Products', 'Media', 'Careers', 'Contact']
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${activePath ? 'site-header-page' : ''}`}>
    <a className="brand" href="/" onClick={(e) => handleNav(e, '/')} aria-label="N Solutions home"><img className="brand-logo" src="/logo.png" alt="N Solutions" /></a>
    <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
      {items.map((item) => { 
        const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`
        const isCurrent = activePath === path || (path === '/' && activePath === '')
        return <a className={isCurrent ? 'active' : ''} key={item} href={path} onClick={(e) => handleNav(e, path)}>{item}</a> 
      })}
      <a className="nav-cta" href="/contact" onClick={(e) => handleNav(e, '/contact')}>Get a quote <Arrow /></a>
    </nav>
  </header>
}


function AboutPage() {
  const [horizonTab, setHorizonTab] = useState('vision')
  const { companyOverview, chairmanMessage, visionAndMission, journey, whatWeDo, howWeWork } = aboutContent

  return <div className="about-page"><ScrollProgressBar /><SiteHeader activePath="/about" /><main>

    <section className="about-hero">
      {/* Solar energy background video — download from pixabay.com/videos/solar-panels-solar-power-plant-177600/ and place in public/media/solar-hero.mp4 */}
      <video
        className="about-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/media/solar-hero.mp4" type="video/mp4" />
      </video>
      <div className="about-hero-shade" />
      <div className="wrap about-hero-content">
        <p className="eyebrow light"><span /> {companyOverview.eyebrow}</p>
        <h1>{companyOverview.title}<br /><em>{companyOverview.subtitle}</em></h1>
        <p>{companyOverview.lead}</p>
      </div>
    </section>



    <section className="about-overview" aria-labelledby="company-overview-title">
      <div className="wrap">
        <Reveal className="about-overview-chapter">
          <p><b>01</b><span>—</span> Company overview</p>
          <i aria-hidden="true" />
          <span className="about-overview-chapter-meta">Solar EPC · Engineering & Infrastructure</span>
        </Reveal>

        <div className="about-overview-main">
          <div className="about-overview-left">
            <Reveal className="about-overview-heading">
              <h2 id="company-overview-title">
                Engineering Solar Solutions.<br />
                <em>Powering a Sustainable Future.</em>
              </h2>
            </Reveal>

            <Reveal className="about-overview-copy">
              <p className="about-lead">{companyOverview.lead}</p>
              {companyOverview.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </Reveal>

            <Reveal className="about-overview-timeline">
              <div className="timeline-strip" aria-label="N Solutions journey: Beginning, Experience, Growth, Today">
                <span className="timeline-step">Beginning</span>
                <span className="timeline-arrow"><FiChevronRight style={{ verticalAlign: 'middle' }} /></span>
                <span className="timeline-step">Experience</span>
                <span className="timeline-arrow"><FiChevronRight style={{ verticalAlign: 'middle' }} /></span>
                <span className="timeline-step">Growth</span>
                <span className="timeline-arrow"><FiChevronRight style={{ verticalAlign: 'middle' }} /></span>
                <span className="timeline-step is-current">Today</span>
              </div>
            </Reveal>
          </div>

          <div className="about-overview-right">
            <Reveal className="about-overview-visual">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=85"
                alt="N Solutions solar energy infrastructure"
                className="about-overview-image"
                loading="eager"
              />
              <div className="about-overview-image-badge">
                <span className="badge-tag">NS / 01</span>
                <div className="badge-info">
                  <strong>Nationwide Solar EPC</strong>
                  <small>Engineering · Procurement · Construction</small>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 3 Core Pillars: Our Approach, Our Experience, Our Commitment */}
        <Reveal className="about-pillars-grid">
          {companyOverview.pillars.map((pillar) => (
            <div className="about-pillar-card" key={pillar.title}>
              <span className="about-pillar-number">{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </div>
          ))}
        </Reveal>

        <div className="about-tagline-band">
          {companyOverview.tagline}
        </div>

        {/* Statistics Strip */}
        <Reveal className="about-overview-statistics" aria-label="N Solutions company statistics">
          <div className="stat-block stat-exp">
            <AnimatedMetric value={16} suffix="+" label="Years of experience" />
          </div>
          <div className="stat-block stat-states">
            <AnimatedMetric value={9} suffix="+" label="States across India" />
          </div>
          <div className="stat-block stat-sectors">
            <span className="sectors-heading">Project Verticals</span>
            <div className="sectors-grid">
              <span>Residential</span>
              <span>Commercial</span>
              <span>Industrial</span>
              <span>Government</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Extended Chairman's Message */}
    <section className="about-message">
      <div className="wrap message-grid">
        <Reveal className="message-copy">
          <p className="eyebrow light"><span /> {chairmanMessage.eyebrow}</p>
          <h2>{chairmanMessage.title}<br /><em>{chairmanMessage.subtitle}</em></h2>
          <p className="about-lead">{chairmanMessage.lead}</p>
          {chairmanMessage.paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
          <blockquote>{chairmanMessage.quote}</blockquote>
          <div className="signature">
            <strong>{chairmanMessage.author}</strong>
            <small>{chairmanMessage.role}</small>
          </div>
        </Reveal>
        <Reveal className="message-placeholder">
          <span>NS</span>
          <small>Leadership in Solar EPC<br />Managing Partner</small>
        </Reveal>
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="about-vision">
      <div className="wrap">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow"><span /> {visionAndMission.eyebrow}</p>
            <h2>{visionAndMission.title}<br /><em>{visionAndMission.subtitle}</em></h2>
          </div>
          <p className="heading-note">{visionAndMission.intro}</p>
        </Reveal>

        <div className="horizon-mission-container">
          {/* Interactive Horizon Switcher */}
          <div className="horizon-tabs-nav">
            <button
              type="button"
              className={`horizon-tab-btn ${horizonTab === 'vision' ? 'is-active' : ''}`}
              onClick={() => setHorizonTab('vision')}
            >
              <FiSun size={15} /> Strategic Vision · Horizon 2030
            </button>
            <button
              type="button"
              className={`horizon-tab-btn mission-tab ${horizonTab === 'mission' ? 'is-active' : ''}`}
              onClick={() => setHorizonTab('mission')}
            >
              <FiShield size={15} /> Operational Mission · Field Protocols
            </button>
          </div>

          {horizonTab === 'vision' ? (
            <Reveal className="horizon-stage-canvas">
              <div className="horizon-manifesto-box">
                <span className="horizon-manifesto-badge">
                  <FiCompass /> {visionAndMission.vision.tag} · Clean Energy Direction
                </span>
                <h3>{visionAndMission.vision.title}</h3>
                <p>{visionAndMission.vision.text}</p>
              </div>

              <div className="horizon-vectors-stream">
                {visionAndMission.vision.principles.map(([num, t, d]) => (
                  <div className="horizon-vector-item" key={num}>
                    <div className="vector-icon-circle">
                      {getVisionIcon(num)}
                    </div>
                    <div className="vector-content">
                      <span className="vector-meta-tag">Strategic Vector · {num}</span>
                      <h4>{t}</h4>
                      <p>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : (
            <Reveal className="horizon-stage-canvas">
              <div className="horizon-manifesto-box">
                <span className="horizon-manifesto-badge mission-badge">
                  <FiSliders /> {visionAndMission.mission.tag} · Engineering Directives
                </span>
                <h3>{visionAndMission.mission.title}</h3>
                <p>{visionAndMission.mission.text}</p>
              </div>

              <div className="horizon-vectors-stream">
                {visionAndMission.mission.principles.map(([num, t, d]) => (
                  <div className="horizon-vector-item mission-item" key={num}>
                    <div className="vector-icon-circle">
                      {getMissionIcon(num)}
                    </div>
                    <div className="vector-content">
                      <span className="vector-meta-tag">Execution Directive · {num}</span>
                      <h4>{t}</h4>
                      <p>{d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="guiding-principle-ribbon">
                <blockquote>{visionAndMission.guidingPrinciple}</blockquote>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>

    {/* Our Journey */}
    <section className="about-journey wrap">
      <Reveal className="section-heading">
        <div>
          <p className="eyebrow"><span /> {journey.eyebrow}</p>
          <h2>{journey.title}<br /><em>{journey.subtitle}</em></h2>
        </div>
        <p className="heading-note">{journey.intro}</p>
      </Reveal>
      <div className="journey-timeline">
        {journey.stages.map(([number, title, text]) => (
          <Reveal className="journey-stage" key={number}>
            <span>{number}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="today-beyond">
        <strong>Today & beyond</strong>
        <p>{journey.todayAndBeyond}</p>
      </div>
      <p className="process-flow" style={{ marginTop: '28px' }}>{journey.flow}</p>
    </section>

    {/* What We Do - Visual Capability Showcase */}
    <section className="about-capabilities">
      <div className="wrap">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow light"><span /> {whatWeDo.eyebrow}</p>
            <h2>{whatWeDo.title}<br /><em>{whatWeDo.subtitle}</em></h2>
          </div>
          <p className="heading-note">{whatWeDo.intro}</p>
        </Reveal>
        <div className="capability-grid capability-grid-modern">
          {whatWeDo.capabilities.map((cap) => {
            const num = cap.number || cap[0]
            const title = cap.title || cap[1]
            const text = cap.text || cap[2]
            const image = cap.image || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=85'
            const tag = cap.tag || 'Solar Capability'
            const icon = getCapabilityIcon(num)
            return (
              <Reveal className="capability-card-modern" key={num}>
                <div className="capability-image-wrap">
                  <img src={image} alt={title} loading="lazy" />
                  <div className="capability-image-overlay" />
                  <span className="capability-num-badge">{num}</span>
                  <span className="capability-tag-badge">{tag}</span>
                </div>
                <div className="capability-content">
                  <div className="capability-title-row">
                    <span className="capability-icon">{icon}</span>
                    <h3>{title}</h3>
                  </div>
                  <p>{text}</p>
                  <a href="/services" onClick={(e) => { e.preventDefault(); navigate('/services') }} className="capability-link">
                    Explore Solutions <Arrow />
                  </a>
                </div>
              </Reveal>
            )
          })}
        </div>
        <p className="capability-flow">{whatWeDo.flow}</p>
      </div>
    </section>

    {/* How We Work - Interactive Process Pipeline Cockpit */}
    <ProcessPipelineCockpit
      theme="light"
      eyebrow={howWeWork.eyebrow}
      title={howWeWork.title}
      subtitle={howWeWork.subtitle}
      intro={howWeWork.intro}
      flow={howWeWork.flow}
      ctaText="Discuss Project Execution"
    />

    {/* Verified Testimonials */}
    <section className="about-credentials wrap">
      <Reveal className="section-heading">
        <div>
          <p className="eyebrow"><span /> 07 — Client Trust & Performance</p>
          <h2>Proven delivery,<br /><em>direct feedback.</em></h2>
        </div>
        <p className="heading-note">Authentic testimonials from industrial leaders, institutions, and residential clusters.</p>
      </Reveal>
      <TestimonialsShowcase theme="light" />
    </section>

    {/* CTA */}
    <section className="about-cta">
      <div className="wrap">
        <p className="eyebrow light"><span /> One partner. Complete solar solutions.</p>
        <h2>From experience<br /><em>to a sustainable future.</em></h2>
        <p>Assess <FiChevronRight style={{ verticalAlign: 'middle' }} /> Design <FiChevronRight style={{ verticalAlign: 'middle' }} /> Supply <FiChevronRight style={{ verticalAlign: 'middle' }} /> Install <FiChevronRight style={{ verticalAlign: 'middle' }} /> Commission <FiChevronRight style={{ verticalAlign: 'middle' }} /> Operate <FiChevronRight style={{ verticalAlign: 'middle' }} /> Maintain</p>
        <a className="button button-accent" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>
          Talk to N Solutions About Your Project <Arrow />
        </a>
      </div>
    </section>
  </main><SiteFooter /></div>
}

function ServicesPage() {
  const { header, services, cta } = servicesAndSolutionsContent

  useEffect(() => {
    document.title = 'Services & Solutions | N Solutions'
    return () => { document.title = 'N Solutions | Solar EPC' }
  }, [])

  return (
    <div className="services-page">
      <ScrollProgressBar />
      <SiteHeader activePath="/services" />
      <main>
        <section className="services-hero">
          <video className="hero-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
            <source src="/media/products.mp4" type="video/mp4" />
          </video>
          <div className="services-hero-shade" />

          <div className="wrap services-hero-content">
            <p className="eyebrow light">
              <span /> {header.eyebrow}
            </p>

            <h1>
              {header.title}<br />
              <em>{header.subtitle}</em>
            </h1>

            <p>{header.intro}</p>

            <a className="button button-accent" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>
              Talk to N Solutions About Your Project <Arrow />
            </a>
          </div>

          <div className="services-hero-marker">
            <span>NS / 04</span>
            <small>
              Solar lifecycle<br />
              engineering
            </small>
          </div>
        </section>

        {/* 15 Comprehensive Services & Solutions Catalog */}
        <section className="wrap" style={{ padding: '80px 0 60px' }}>
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow"><span /> Complete Portfolio</p>
              <h2>Comprehensive Solar Services<br /><em>& Solutions (01 – 15)</em></h2>
            </div>
            <p className="heading-note">
              From turnkey EPC and utility-scale installations to rooftop PM Surya Ghar, O&M, and energy advisory, explore our 15 end-to-end solar solutions.
            </p>
          </Reveal>

          <div className="services-catalog-grid">
            {services.map((service) => (
              <Reveal className="service-catalog-card" key={service.number}>
                <div className="service-catalog-image-wrap">
                  <img
                    src={service.image || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=85'}
                    alt={service.title}
                    loading="lazy"
                  />
                  <div className="service-catalog-img-scrim" />
                  <div className="service-catalog-badges">
                    <span className="service-catalog-num">{service.number}</span>
                    {service.tag && <span className="service-catalog-tag">{service.tag}</span>}
                  </div>
                </div>

                <div className="service-catalog-body">
                  <div className="service-catalog-title-row">
                    <span className="service-catalog-icon">{getServiceIcon(service.number)}</span>
                    <div>
                      {service.subtitle && <span className="service-catalog-badge">{service.subtitle}</span>}
                      <h3 className="service-catalog-title">{service.title}</h3>
                    </div>
                  </div>

                  <p className="service-catalog-text">{service.text}</p>
                  {service.detail && <p className="service-catalog-detail">{service.detail}</p>}

                  {service.subAreas && service.subAreas.length > 0 && (
                    <div className="service-subareas-list">
                      {service.subAreas.map((sub) => (
                        <div className="service-subarea-box" key={sub.title}>
                          <strong>{sub.title}</strong>
                          <p>{sub.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {service.benefits && service.benefits.length > 0 && (
                    <div className="service-benefits-wrap">
                      <strong>Key Benefits</strong>
                      <ul className="service-benefits-list">
                        {service.benefits.map((b) => (
                          <li key={b}>
                            <span className="benefit-check-icon" aria-hidden="true"><FiCheck /></span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.applications && (
                    <div className="service-apps-row">
                      <span className="apps-label">Applications:</span>
                      <p className="apps-content">{service.applications}</p>
                    </div>
                  )}

                  <div className="service-card-footer">
                    <a
                      href="/contact"
                      onClick={(e) => { e.preventDefault(); navigate('/contact') }}
                      className="service-catalog-cta-btn"
                    >
                      Enquire for this service <Arrow />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Structured Process Flow */}
        <section className="services-process">
          <div className="wrap">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow light"><span /> Project execution process</p>
                <h2>From requirement<br /><em>to support.</em></h2>
              </div>
              <p className="heading-note">A structured project journey carefully planned and executed across every milestone.</p>
            </Reveal>
            <div className="services-process-line">
              {servicesProcess.map(([number, title, text]) => (
                <Reveal className="services-process-step" key={number} tabIndex="0">
                  <span>{number}</span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </Reveal>
              ))}
            </div>
            <p className="process-flow light-flow">Requirement <i><FiChevronRight style={{ verticalAlign: 'middle' }} /></i> Design <i><FiChevronRight style={{ verticalAlign: 'middle' }} /></i> Execution <i><FiChevronRight style={{ verticalAlign: 'middle' }} /></i> Support</p>
          </div>
        </section>

        {/* CTA section */}
        <section className="services-cta">
          <div className="wrap">
            <p className="eyebrow light"><span /> {cta.eyebrow}</p>
            <h2>{cta.title}<br /><em>{cta.subtitle}</em></h2>
            <p>{cta.text}</p>
            <p className="cta-flow">{cta.flow}</p>
            <a className="button button-accent" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>
              {cta.buttonText} <Arrow />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}


function RouteShell() {
  return <div className="route-shell"><SiteHeader activePath={window.location.pathname} /><main><p className="eyebrow"><span /> N Solutions Solar EPC</p><h1>This page is being prepared.</h1><p>Return to the Home page while the next section is connected.</p><a className="button button-accent" href="/" onClick={(e) => { e.preventDefault(); navigate('/') }}>Back to Home <Arrow /></a></main></div>
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname)
    const onCustomRoute = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    window.addEventListener('nsolutions-route-change', onCustomRoute)

    let resetTimer
    const showRouteGesture = (target) => {
      const link = target.closest?.('a[href]')
      if (!link || link.target || link.hasAttribute('download')) return
      const destination = new URL(link.href, window.location.href)
      if (destination.origin !== window.location.origin) return
      if (destination.pathname !== window.location.pathname) {
        document.body.classList.add('is-route-gesturing')
        window.clearTimeout(resetTimer)
        resetTimer = window.setTimeout(() => document.body.classList.remove('is-route-gesturing'), 1400)
      }
    }
    const onPointerDown = (event) => { if (event.button === 0) showRouteGesture(event.target) }
    const onKeyDown = (event) => { if (event.key === 'Enter') showRouteGesture(event.target) }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown, true)

    return () => {
      window.removeEventListener('popstate', onPopState)
      window.removeEventListener('nsolutions-route-change', onCustomRoute)
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown, true)
      window.clearTimeout(resetTimer)
      document.body.classList.remove('is-route-gesturing')
    }
  }, [])

  if (currentPath === '/about') return <AboutPage />
  if (currentPath === '/services') return <ServicesPage />
  if (currentPath === '/projects') return <ProjectsPage />
  if (currentPath === '/products') return <ProductsPage />
  if (currentPath === '/media') return <MediaPage />
  if (currentPath === '/careers') return <CareersPage />
  if (currentPath === '/contact') return <ContactPage />
  if (currentPath === '/admin' || currentPath.startsWith('/admin/')) return <AdminPortal />
  if (currentPath !== '/') return <RouteShell />


  return <div className="site-shell home-page">
    <ScrollProgressBar />
    <SiteHeader />

    <main id="top">
      <section className="hero">
        <div className="hero-image" /><video className="hero-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true"><source src="/media/hero-solar.mp4" type="video/mp4" /></video><div className="hero-shade" />
        <div className="hero-content wrap"><p className="eyebrow light"><span /> 16+ years of solar experience</p><h1>Built on <em>experience.</em><br />Driven by solar.</h1><p className="hero-copy">N Solutions delivers customized solar solutions through engineering, procurement, installation, commissioning, and ongoing support.</p><div className="hero-actions"><a className="button button-accent" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>Talk to N Solutions <Arrow /></a><a className="button button-ghost" href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects') }}>Explore our projects <Arrow /></a></div></div>
        <div className="hero-note"><span>01</span><div><strong>Solar, engineered.</strong><small>Residential to MW-scale projects</small></div></div><a className="scroll-cue" href="#proof"><span>Scroll to explore</span><i><FiArrowDown style={{ verticalAlign: 'middle' }} /></i></a>
      </section>

      <section className="proof" id="proof"><div className="wrap proof-grid"><p className="eyebrow"><span /> Experience that speaks for itself</p><div className="proof-intro"><h2>Built on experience.<br /><em>Driven by solar.</em></h2><p>N Solutions is an Engineering, Procurement and Construction solar company with 16+ years of experience across 9 states in India.</p><p>We combine engineering expertise, reliable solar technology, and professional project execution to help customers move towards cleaner energy, improved efficiency, and sustainable growth.</p></div><div className="proof-aside"><span className="proof-aside-mark">16+</span><div><strong>Years of solar operations</strong><p>From MW-scale solar power projects to residential rooftop installations under PM Surya Ghar.</p></div><span className="proof-aside-line" /></div><div className="stats"><AnimatedMetric value={16} suffix="+" label="Years of experience" /><AnimatedMetric value={9} label="States across India" /><AnimatedMetric value={360} suffix="°" label="End-to-end solar EPC" /><AnimatedMetric value={500} suffix="+" label="PM Surya Ghar sites" /></div></div></section>

      <section className="who wrap" id="who-we-are">
        <Reveal className="who-image">
          <div className="who-photo" />
          <span className="image-caption">From MW-scale projects<br />to residential rooftops</span>
        </Reveal>
        <Reveal className="who-copy">
          <p className="eyebrow"><span /> {homeContent.whoWeAre.eyebrow}</p>
          <h2>{homeContent.whoWeAre.title}<br /><em>{homeContent.whoWeAre.subtitle}</em></h2>
          <p><strong>{homeContent.whoWeAre.lead}</strong></p>
          <p>{homeContent.whoWeAre.description}</p>
          <p>{homeContent.whoWeAre.highlight}</p>
          <div className="about-tagline-badge" style={{ display: 'inline-block', margin: '14px 0 18px', padding: '8px 16px', background: 'rgba(118,186,217,0.12)', border: '1px solid rgba(118,186,217,0.3)', borderRadius: '6px', fontWeight: '700', fontSize: '13px', color: 'var(--brand-primary-dark)' }}>
            {homeContent.whoWeAre.tagline}
          </div>
          <p>{homeContent.whoWeAre.conclusion}</p>
          <a className="text-link" href="/about" onClick={(e) => { e.preventDefault(); navigate('/about') }}>About N Solutions <Arrow /></a>
        </Reveal>
      </section>

      <section className="services wrap" id="services">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow"><span /> {homeContent.whatWeDo.eyebrow}</p>
            <h2>{homeContent.whatWeDo.title}<br /><em>{homeContent.whatWeDo.subtitle}</em></h2>
          </div>
          <p className="heading-note">{homeContent.whatWeDo.description}</p>
        </Reveal>
        <ServicesShowcase />
        <a className="section-cta text-link" href="/services" onClick={(e) => { e.preventDefault(); navigate('/services') }}>Explore Our Services <Arrow /></a>
      </section>

      <section className="chairman wrap">
        <Reveal className="chairman-copy">
          <p className="eyebrow"><span /> {homeContent.chairmanMessage.eyebrow}</p>
          <h2>{homeContent.chairmanMessage.title}<br /><em>{homeContent.chairmanMessage.subtitle}</em></h2>
          <blockquote>“{homeContent.chairmanMessage.quote}”</blockquote>
          <div className="message-ready">
            {(homeContent.chairmanMessage.paragraphs || homeContent.chairmanMessage.body || []).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="signature">
            <strong>{homeContent.chairmanMessage.author}</strong>
            <small>{homeContent.chairmanMessage.role}</small>
          </div>
        </Reveal>
        <Reveal className="chairman-art">
          <span>NS</span>
          <small>Leadership<br />in solar EPC</small>
        </Reveal>
      </section>

      <section className="why why-orbit">
        <div className="orbit-full-wrap">
          <StrengthsOrbitWheel items={strengths} />
        </div>
      </section>

      <section className="projects wrap" id="projects">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow"><span /> Flagship EPC Portfolio</p>
            <h2>Powering progress<br /><em>across India.</em></h2>
          </div>
          <a className="text-link" href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects') }}>
            View all projects <Arrow />
          </a>
        </Reveal>

        <div className="home-projects-showcase">
          <div className="home-projects-grid">
            {projectsData.slice(0, 3).map((proj) => (
              <Reveal key={proj.id} className="home-project-card" onClick={() => navigate('/projects')}>
                <div className="home-project-media">
                  <img src={proj.image} alt={proj.title} loading="lazy" />
                  <span className="home-project-capacity-pill">{proj.capacity}</span>
                  <span className="home-project-category-pill">{proj.categoryLabel}</span>
                </div>
                <div className="home-project-body">
                  <div className="home-project-location">
                    <FiMapPin aria-hidden="true" />
                    <span>{proj.location.split(',')[0]} · {proj.location.split(',').slice(-1)[0].trim()}</span>
                  </div>
                  <h3 className="home-project-title">{proj.client}</h3>
                  <p className="home-project-desc">{proj.headline}</p>
                  <div className="home-project-footer">
                    <span>Explore Project Case Study</span>
                    <FiChevronRight aria-hidden="true" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="home-residential-highlight">
            <div className="highlight-stat-box">
              <span className="highlight-stat-num">500+</span>
              <span className="highlight-stat-label">Rooftop Sites</span>
            </div>
            <div className="highlight-content-box">
              <div className="highlight-badge-row">
                <span className="highlight-pill-mission">PM Surya Ghar: Muft Bijli Yojana</span>
              </div>
              <h3>High-Density Residential Cluster Installations</h3>
              <p>Turnkey execution across Andhra Pradesh & Telangana featuring high-efficiency Tier-1 mono PERC/TOPCon modules, elevated monkey-proof GI structures, and bi-directional net-metering approvals.</p>
              <div className="highlight-metrics-row">
                <span className="highlight-chip">₹78,000 Direct Subsidy DBT</span>
                <span className="highlight-chip">Sub-1.0 Ω Chemical Earthing</span>
                <span className="highlight-chip">APEPDCL Net-Meter Synchronized</span>
              </div>
            </div>
            <div className="highlight-action-box">
              <a className="button button-accent" href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects') }}>
                View All Projects <Arrow />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="trust wrap">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow"><span /> Proof of trust</p>
            <h2>Trusted by<br /><em>our clients.</em></h2>
          </div>
          <p className="heading-note">Real client outcomes from industrial plants, institutions, and residential rooftop clusters.</p>
        </Reveal>
        
        <TestimonialsShowcase theme="light" />


      </section>

      <section className="contact-band" id="contact"><div className="wrap contact-inner"><p className="eyebrow light"><span /> One partner. Complete solar solutions.</p><h2>Assess. Design.<br /><em>Supply. Install.</em></h2><p>Talk to N Solutions about your project, from first requirement through operate and maintain.</p><a className="button button-accent" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>Talk to N Solutions <Arrow /></a></div></section>

    </main>

    <SiteFooter />
  </div>
}

export default App