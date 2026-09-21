import { useEffect, useRef, useState } from 'react'
import ProjectsPage from './pages/ProjectsPage'
import ProductsPage from './pages/ProductsPage'
import MediaPage from './pages/MediaPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import AdminPortal from './admin/AdminPortal'
import { navigate, SiteFooter } from './components/Shared'
import { homeContent, aboutContent, servicesAndSolutionsContent } from './content/siteContent'

const services = homeContent.whatWeDo.services
const process = homeContent.howWeWork.steps
const strengths = homeContent.whyChooseUs.strengths

function Arrow() { return <span aria-hidden="true">↗</span> }

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
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.disconnect() } }, { threshold: .12 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function EmptyState({ label, text }) {
  return <div className="empty-state"><span className="empty-icon">+</span><strong>{label}</strong><p>{text}</p></div>
}

function ServicesShowcase() {
  return <div className="service-grid service-showcase" aria-label="Solar services">{services.map((service) => <Reveal key={service.number} className="service-card"><div className="service-photo" style={{ backgroundImage: `url(${service.image})` }}><span>{service.number}</span></div><div className="service-body"><h3>{service.title}</h3><p>{service.text}</p><a href="/services" aria-label={`Learn about ${service.title}`}>Explore <Arrow /></a></div></Reveal>)}</div>
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
  ['08', 'Solar pumps & energy solutions', 'Solar pumping solutions and energy-efficiency solutions for suitable applications.'],
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
  ['16', 'Solar geyser / water heating', 'Solar water-heating systems for suitable residential, commercial, and institutional applications.'],
  ['17', 'Solar pump solutions', 'Solar-powered water pumping solutions for agricultural, irrigation, water-supply, and other suitable requirements.'],
  ['18', 'Energy efficiency, subsidies, financing & net metering', 'Support with energy efficiency, applicable subsidy schemes, financing possibilities, documentation, and net-metering requirements.'],
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
    <a className="brand" href="/" onClick={(e) => handleNav(e, '/')} aria-label="N Solutions home"><span className="brand-logo">N Solutions</span></a>
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
  const { companyOverview, chairmanMessage, visionAndMission, journey, whatWeDo, howWeWork } = aboutContent

  return <div className="about-page"><SiteHeader activePath="/about" /><main>
    <section className="about-hero">
      <div className="about-hero-image" />
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
                <span className="timeline-arrow">→</span>
                <span className="timeline-step">Experience</span>
                <span className="timeline-arrow">→</span>
                <span className="timeline-step">Growth</span>
                <span className="timeline-arrow">→</span>
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
            <p className="eyebrow light"><span /> {visionAndMission.eyebrow}</p>
            <h2>{visionAndMission.title}<br /><em>{visionAndMission.subtitle}</em></h2>
          </div>
          <p className="heading-note">{visionAndMission.intro}</p>
        </Reveal>

        <div className="vision-mission">
          <div className="vision-block">
            <p className="eyebrow light">{visionAndMission.vision.tag}</p>
            <h3>{visionAndMission.vision.title}</h3>
            <p>{visionAndMission.vision.text}</p>
            <div className="principle-grid">
              {visionAndMission.vision.principles.map(([num, t, d]) => (
                <Reveal className="principle" key={num}>
                  <span>{num}</span>
                  <strong>{t}</strong>
                  <small>{d}</small>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mission-block">
            <p className="eyebrow">{visionAndMission.mission.tag}</p>
            <h3>{visionAndMission.mission.title}</h3>
            <p>{visionAndMission.mission.text}</p>
            <div className="principle-grid">
              {visionAndMission.mission.principles.map(([num, t, d]) => (
                <Reveal className="principle" key={num}>
                  <span>{num}</span>
                  <strong>{t}</strong>
                  <small>{d}</small>
                </Reveal>
              ))}
            </div>
            <blockquote>{visionAndMission.guidingPrinciple}</blockquote>
          </div>
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

    {/* What We Do */}
    <section className="about-capabilities">
      <div className="wrap">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow light"><span /> {whatWeDo.eyebrow}</p>
            <h2>{whatWeDo.title}<br /><em>{whatWeDo.subtitle}</em></h2>
          </div>
          <p className="heading-note">{whatWeDo.intro}</p>
        </Reveal>
        <div className="capability-grid">
          {whatWeDo.capabilities.map(([number, title, text]) => (
            <Reveal className="capability" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
        <p className="capability-flow">{whatWeDo.flow}</p>
      </div>
    </section>

    {/* How We Work */}
    <section className="about-process wrap">
      <Reveal className="section-heading">
        <div>
          <p className="eyebrow"><span /> {howWeWork.eyebrow}</p>
          <h2>{howWeWork.title}<br /><em>{howWeWork.subtitle}</em></h2>
        </div>
        <p className="heading-note">{howWeWork.intro}</p>
      </Reveal>
      <div className="about-process-list">
        {howWeWork.steps.map(([number, title, text]) => (
          <Reveal className="about-process-row" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
      <p className="process-flow">{howWeWork.flow}</p>
    </section>

    {/* Credentials / Trust */}
    <section className="about-credentials wrap">
      <Reveal className="section-heading">
        <div>
          <p className="eyebrow"><span /> 07 — Credentials & recognitions</p>
          <h2>Recognition, when<br /><em>verified.</em></h2>
        </div>
        <p className="heading-note">Relevant government registrations and empanelments for solar and electrical projects.</p>
      </Reveal>
      <div className="credential-grid">
        <EmptyState label="Government Empanelments" text="Empanelled across solar programs and state initiatives." />
        <EmptyState label="Certifications and approvals" text="Verified ISO, MNRE, and technical certifications." />
      </div>
    </section>

    {/* CTA */}
    <section className="about-cta">
      <div className="wrap">
        <p className="eyebrow light"><span /> One partner. Complete solar solutions.</p>
        <h2>From experience<br /><em>to a sustainable future.</em></h2>
        <p>Assess → Design → Supply → Install → Commission → Operate → Maintain</p>
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

        {/* 18 Comprehensive Services & Solutions Catalog */}
        <section className="wrap" style={{ padding: '80px 0 60px' }}>
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow"><span /> Complete Portfolio</p>
              <h2>Comprehensive Solar Services<br /><em>& Solutions (01 – 18)</em></h2>
            </div>
            <p className="heading-note">
              From turnkey EPC and utility-scale installations to rooftop PM Surya Ghar, O&M, and energy advisory, explore our 18 end-to-end solar solutions.
            </p>
          </Reveal>

          <div className="services-catalog-grid">
            {services.map((service) => (
              <Reveal className="service-catalog-card" key={service.number}>
                <div className="service-catalog-header">
                  <span className="service-catalog-num">{service.number}</span>
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
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.applications && (
                  <div className="service-apps-row">
                    <strong>Applications:</strong> {service.applications}
                  </div>
                )}
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
            <p className="process-flow light-flow">Requirement <i>→</i> Design <i>→</i> Execution <i>→</i> Support</p>
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
    <SiteHeader />

    <main id="top">
      <section className="hero">
        <div className="hero-image" /><video className="hero-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true"><source src="/media/hero-solar.mp4" type="video/mp4" /></video><div className="hero-shade" />
        <div className="hero-content wrap"><p className="eyebrow light"><span /> 16+ years of solar experience</p><h1>Built on <em>experience.</em><br />Driven by solar.</h1><p className="hero-copy">N Solutions delivers customized solar solutions through engineering, procurement, installation, commissioning, and ongoing support.</p><div className="hero-actions"><a className="button button-accent" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>Talk to N Solutions <Arrow /></a><a className="button button-ghost" href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects') }}>Explore our projects <Arrow /></a></div></div>
        <div className="hero-note"><span>01</span><div><strong>Solar, engineered.</strong><small>Residential to MW-scale projects</small></div></div><a className="scroll-cue" href="#proof"><span>Scroll to explore</span><i>↓</i></a>
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

      <section className="journey" id="how-we-work">
        <div className="wrap journey-grid">
          <Reveal>
            <p className="eyebrow light"><span /> {homeContent.howWeWork.eyebrow}</p>
            <h2>{homeContent.howWeWork.title}<br /><em>{homeContent.howWeWork.subtitle}</em></h2>
            <p className="journey-copy">{homeContent.howWeWork.description}</p>
            <p className="journey-flow">{homeContent.howWeWork.flow}</p>
            <a className="button button-accent" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>Start your project <Arrow /></a>
          </Reveal>
          <div className="steps">
            {process.map((step) => (
              <Reveal className="step" key={step.number}>
                <span>{step.number}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
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

      <section className="why">
        <div className="wrap">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow light"><span /> {homeContent.whyChooseUs.eyebrow}</p>
              <h2>{homeContent.whyChooseUs.title}<br /><em>{homeContent.whyChooseUs.subtitle}</em></h2>
            </div>
            <p className="heading-note">{homeContent.whyChooseUs.note}</p>
          </Reveal>
          <div className="strength-grid">
            {strengths.map(([number, title, description]) => (
              <Reveal className="strength" key={number}>
                <span>{number}</span>
                <div>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </div>
                <i>↗</i>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="projects wrap" id="projects"><Reveal className="section-heading"><div><p className="eyebrow"><span /> Our work</p><h2>Powering progress<br /><em>across India.</em></h2></div><a className="text-link" href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects') }}>View all projects <Arrow /></a></Reveal><div className="project-ready"><div><span className="project-ready-number">500+</span><strong>PM Surya Ghar sites completed in Vizianagaram</strong><p>The project showcase is ready for verified project records and images when the public project data is connected.</p></div><a className="button button-accent" href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects') }}>View all projects <Arrow /></a></div></section>

      <section className="trust wrap"><Reveal className="section-heading"><div><p className="eyebrow"><span /> Proof of trust</p><h2>Trusted by<br /><em>our clients.</em></h2></div><p className="heading-note">A space ready for verified client stories as they become available.</p></Reveal><div className="trust-grid"><EmptyState label="Testimonials" text="Verified client testimonials will appear here." /><EmptyState label="Approved credentials" text="Official certifications and registrations will appear here." /><EmptyState label="Awards & achievements" text="Verified awards and achievements will appear here." /></div></section>

      <section className="contact-band" id="contact"><div className="wrap contact-inner"><p className="eyebrow light"><span /> One partner. Complete solar solutions.</p><h2>Assess. Design.<br /><em>Supply. Install.</em></h2><p>Talk to N Solutions about your project, from first requirement through operate and maintain.</p><a className="button button-accent" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>Talk to N Solutions <Arrow /></a></div></section>

    </main>

    <SiteFooter />
  </div>
}

export default App