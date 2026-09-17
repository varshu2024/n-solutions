import { useEffect, useRef, useState } from 'react'

const services = [
  { number: '01', title: 'Solar EPC', text: 'Complete engineering, procurement, installation, and commissioning for solar projects. We manage every stage with a focus on quality and efficient execution.', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=85' },
  { number: '02', title: 'Commercial & industrial solar', text: 'Customized solar systems designed around business and industrial energy requirements, with practical, project-focused solutions.', image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=85' },
  { number: '03', title: 'Residential rooftop solar', text: 'Reliable rooftop solar solutions for homes and communities, from system planning through installation and commissioning.', image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=900&q=85' },
  { number: '04', title: 'Government solar projects', text: 'Solar solutions supporting government projects and initiatives, with professional engineering and implementation based on requirements.', image: 'https://images.unsplash.com/photo-1545208942-e1c9e3b7a4b5?auto=format&fit=crop&w=900&q=85' },
  { number: '05', title: 'O&M services', text: 'Ongoing operation and maintenance support that helps solar installations maintain dependable operation and long-term performance.', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=900&q=85' },
  { number: '06', title: 'Solar products & pumps', text: 'Solar panels, inverters, essential components, and solar pumping solutions to support different implementation requirements.', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85' },
]

const process = [
  ['01', 'Consultation & requirement assessment'], ['02', 'Site assessment'], ['03', 'System design & proposal'],
  ['04', 'Engineering & procurement'], ['05', 'Installation & commissioning'], ['06', 'Support & performance'],
]

const strengths = [
  ['01', '16+ years of experience', 'Proven experience in solar operations and project execution.'], ['02', 'Presence across 9 states', 'Project experience extending across multiple states in India.'], ['03', 'End-to-end EPC expertise', 'From engineering and procurement to installation and commissioning.'], ['04', 'Commercial & industrial focus', 'Customized solar solutions for C&I energy requirements.'],
  ['05', 'Customized solar solutions', 'Every project is planned around its site, energy needs, and objectives.'], ['06', 'Government empanelments', 'Relevant government registrations and empanelments for solar and electrical projects.'], ['07', 'Quality & safety first', 'Professional execution with attention to quality, safety, and project requirements.'], ['08', 'Complete solar support', 'Consultation, installation, commissioning, O&M, and support beyond installation.'],
]

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
  const items = ['Home', 'About', 'Services', 'Projects', 'Products', 'Media', 'Careers', 'Contact']
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${activePath ? 'site-header-page' : ''}`}>
    <a className="brand" href="/" onClick={closeMenu} aria-label="N Solutions home"><span className="brand-logo">N Solutions</span></a>
    <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
      {items.map((item) => { const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`; return <a className={activePath === path ? 'active' : ''} key={item} href={path} onClick={closeMenu}>{item}</a> })}
      <a className="nav-cta" href="/#contact" onClick={closeMenu}>Get a quote <Arrow /></a>
    </nav>
  </header>
}

function AboutPage() {
  return <div className="about-page"><SiteHeader activePath="/about" /><main>
    <section className="about-hero"><div className="about-hero-image" /><div className="about-hero-shade" /><div className="wrap about-hero-content"><p className="eyebrow light"><span /> N Solutions Solar EPC</p><h1>Engineering solar solutions.<br /><em>Powering a sustainable future.</em></h1><p>Complete solar energy solutions shaped by experience, technical understanding, and practical project execution.</p></div></section>

    <section className="about-overview" aria-labelledby="company-overview-title">
      <div className="wrap">
        {/* Chapter Header */}
        <Reveal className="about-overview-chapter">
          <p><b>01</b><span>—</span> Company overview</p>
          <i aria-hidden="true" />
          <span className="about-overview-chapter-meta">Solar EPC · Engineering & Infrastructure</span>
        </Reveal>

        {/* Main Two-Column Editorial Story */}
        <div className="about-overview-main">
          {/* Left Column: Heading + Copy + Timeline */}
          <div className="about-overview-left">
            <Reveal className="about-overview-heading">
              <h2 id="company-overview-title">
                Engineering<br />
                a Better<br />
                <em>Energy Future</em>
              </h2>
            </Reveal>

            <Reveal className="about-overview-copy">
              <p className="about-lead">
                N Solutions is a solar Engineering, Procurement and Construction company focused on delivering complete solar energy solutions for diverse project requirements.
              </p>
              <p>
                With 16+ years of experience and operations across 9 states in India, we combine technical understanding with practical project execution across residential, commercial, industrial, and government solar projects.
              </p>
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

          {/* Right Column: Visual Storytelling Element */}
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

        {/* Full-Width Editorial Statistics Strip */}
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

    <section className="about-message"><div className="wrap message-grid"><Reveal className="message-copy"><p className="eyebrow light"><span /> 02 — Chairman's message</p><h2>Shaping the future<br /><em>through solar energy.</em></h2><blockquote>“Our journey is driven by a simple belief — solar energy can create a cleaner, smarter, and more sustainable future.”</blockquote><p>At N Solutions, we are committed to delivering reliable solar solutions through experience, engineering, and responsible execution. Our focus is to understand every customer's energy needs and create solutions that deliver meaningful value.</p><p>With 16+ years of experience, we continue to grow with a clear purpose: to power businesses, industries, homes, and communities through dependable solar energy.</p><div className="signature"><strong>Ch. C.S.V. Raju</strong><small>Managing Partner, N Solutions</small></div></Reveal><Reveal className="message-placeholder"><span>NS</span><small>Official leadership portrait<br />can be placed here</small></Reveal></div></section>

    <section className="about-people wrap"><Reveal className="section-heading"><div><p className="eyebrow"><span /> 03 — Our people</p><h2>People behind<br /><em>the execution.</em></h2></div><p className="heading-note">A dedicated space for verified Board of Directors and Partners information.</p></Reveal><EmptyState label="Board of Directors / Partners" text="Authentic people information will appear here when it is provided in the approved company content." /></section>

    <section className="about-vision"><div className="wrap"><Reveal className="section-heading"><div><p className="eyebrow light"><span /> 04 — Our vision & mission</p><h2>A clearer energy future,<br /><em>engineered responsibly.</em></h2></div><p className="heading-note">Our vision defines where we want to go. Our mission guides how we create value through solar energy, engineering, and responsible project execution.</p></Reveal><div className="vision-mission"><div className="vision-block"><p className="eyebrow light">Our vision</p><h3>Shaping a Cleaner, Smarter & More Sustainable Energy Future</h3><p>Our vision is to become a trusted and leading renewable energy solutions provider in India, enabling businesses, industries, homes, and communities to adopt reliable and sustainable solar energy.</p><div className="principle-grid">{aboutPrinciples.map(([number, title, text]) => <Reveal className="principle" key={number}><span>{number}</span><strong>{title}</strong><small>{text}</small></Reveal>)}</div></div><div className="mission-block"><p className="eyebrow">Our mission</p><h3>Engineering Reliable Solar Solutions That Create Real Value</h3><p>Deliver reliable, efficient, and cost-effective solar energy solutions through professional engineering, quality technology, responsible execution, and continued customer support.</p><div className="mission-list">{missionPrinciples.map(([number, title]) => <div key={number}><span>{number}</span><strong>{title}</strong></div>)}</div><blockquote>“Engineer with purpose. Execute with responsibility. Power a better tomorrow.”</blockquote></div></div></div></section>

    <section className="about-journey wrap"><Reveal className="section-heading"><div><p className="eyebrow"><span /> 05 — Our journey</p><h2>16+ years of experience.<br /><em>One growing solar journey.</em></h2></div><p className="heading-note">From experience to expertise to a sustainable future.</p></Reveal><div className="journey-timeline">{journeyStages.map(([number, title, text]) => <Reveal className="journey-stage" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div><div className="today-beyond"><strong>Today & beyond</strong><p>With 16+ years of experience, N Solutions continues to deliver end-to-end solar solutions while building stronger capabilities for the future, from smaller requirements to large-scale solar projects.</p></div></section>

    <section className="about-capabilities"><div className="wrap"><Reveal className="section-heading"><div><p className="eyebrow light"><span /> 06 — What we do</p><h2>Complete solar solutions,<br /><em>built around your needs.</em></h2></div><p className="heading-note">Our capabilities bring solar technology, engineering expertise, and project execution together across different scales and applications.</p></Reveal><div className="capability-grid">{aboutCapabilities.map(([number, title, text]) => <Reveal className="capability" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div><p className="capability-flow">Plan <i>→</i> Engineer <i>→</i> Procure <i>→</i> Install <i>→</i> Commission <i>→</i> Support</p></div></section>

    <section className="about-process wrap"><Reveal className="section-heading"><div><p className="eyebrow"><span /> 07 — How we work</p><h2>A structured approach<br /><em>to every solar project.</em></h2></div><p className="heading-note">From the initial discussion to commissioning and support, every stage is planned with attention to project requirements.</p></Reveal><div className="about-process-list">{aboutProcess.map(([number, title, text]) => <Reveal className="about-process-row" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div><p className="process-flow">Understand <i>→</i> Assess <i>→</i> Design <i>→</i> Procure <i>→</i> Execute <i>→</i> Support</p></section>

    <section className="about-credentials wrap"><Reveal className="section-heading"><div><p className="eyebrow"><span /> 08 — Awards & achievements</p><h2>Recognition, when<br /><em>verified.</em></h2></div><p className="heading-note">A content-ready space for genuine awards and achievements from approved company records.</p></Reveal><div className="credential-grid"><EmptyState label="Awards & achievements" text="Verified award information will appear here when available." /><div><p className="eyebrow"><span /> 09 — Certifications details</p><EmptyState label="Certifications and approvals" text="Verified certification and approval details will appear here when available." /></div></div></section>

    <section className="about-cta"><div className="wrap"><p className="eyebrow light"><span /> One partner. Complete solar solutions.</p><h2>From experience<br /><em>to a sustainable future.</em></h2><p>Assess → Design → Supply → Install → Commission → Operate → Maintain</p><a className="button button-accent" href="/#contact">Talk to N Solutions About Your Project <Arrow /></a></div></section>
  </main><SiteFooter /></div>
}

function ServicesPage() {
  useEffect(() => {
    document.title = 'Services & Solutions | N Solutions'
    return () => { document.title = 'N Solutions | Solar EPC' }
  }, [])
  return <div className="services-page"><SiteHeader activePath="/services" /><main>
    <section className="services-hero"><div className="services-hero-image" /><div className="services-hero-shade" /><div className="wrap services-hero-content"><p className="eyebrow light"><span /> Services & solutions</p><h1>Complete solar solutions.<br /><em>From planning to performance.</em></h1><p>N Solutions provides a comprehensive range of solar and renewable-energy solutions for residential, commercial, industrial, and eligible institutional requirements.</p><a className="button button-accent" href="/#contact">Talk to N Solutions About Your Project <Arrow /></a></div><div className="services-hero-marker"><span>NS / 04</span><small>Solar lifecycle<br />engineering</small></div></section>

    <nav className="service-categories wrap" aria-label="Service categories"><a href="#installation" className="active">Installation</a><a href="#om">Operation & Maintenance</a><a href="#adoption">Subsidies & Financing</a><a href="#products">Solar Product Supply</a></nav>

    <section className="installation wrap" id="installation"><Reveal className="section-heading"><div><p className="eyebrow"><span /> 01 — Installation</p><h2>Solar installation<br /><em>for every scale.</em></h2></div><p className="heading-note">Professional installation solutions planned around the requirements of commercial, residential, and industrial projects.</p></Reveal><div className="installation-list">{installationServices.map((service, index) => <Reveal className={`installation-item ${index % 2 ? 'reverse' : ''}`} key={service.number}><div className="installation-image" style={{ backgroundImage: `url(${service.image})` }}><span>{service.number}</span></div><div className="installation-copy"><p className="eyebrow"><span /> {service.title}</p><h3>{service.title}</h3><p>{service.text}</p><p>{service.detail}</p><div className="benefit-columns"><div><strong>Key benefits</strong><ul>{service.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></div><div><strong>Applications</strong><p>{service.applications}</p></div></div></div></Reveal>)}</div></section>

    <section className="services-process"><div className="wrap"><Reveal className="section-heading"><div><p className="eyebrow light"><span /> 02 — Installation process</p><h2>From requirement<br /><em>to support.</em></h2></div><p className="heading-note">A structured project journey. Hover or focus a stage to reveal the role it plays.</p></Reveal><div className="services-process-line">{servicesProcess.map(([number, title, text]) => <Reveal className="services-process-step" key={number} tabIndex="0"><span>{number}</span><strong>{title}</strong><small>{text}</small></Reveal>)}</div><p className="process-flow light-flow">Requirement <i>→</i> Design <i>→</i> Execution <i>→</i> Support</p></div></section>

    <section className="om-section wrap" id="om"><Reveal className="om-image"><div className="om-image-photo" /><span>MONITOR / INSPECT / MAINTAIN / SUPPORT</span></Reveal><Reveal className="om-copy"><p className="eyebrow"><span /> 03 — Operation & maintenance</p><h2>Reliable performance<br /><em>after commissioning.</em></h2><p>Professional O&M services to support the reliable operation of solar systems after commissioning.</p><p>Maintenance activities can be planned around the system's requirements, helping identify operational issues and maintain the installation in proper working condition.</p><div className="benefits-list"><strong>Key benefits</strong>{omBenefits.map((benefit) => <span key={benefit}>{benefit}</span>)}</div><p className="applications-line"><strong>Applications</strong> Residential · Commercial · Industrial · Rooftop · Larger solar installations</p></Reveal></section>

    <section className="adoption-section" id="adoption"><div className="wrap"><Reveal className="section-heading"><div><p className="eyebrow light"><span /> 04 — Smarter solar adoption</p><h2>Energy efficiency, subsidies,<br /><em>financing & net metering.</em></h2></div><p className="heading-note">Customers often need support with energy efficiency, applicable subsidies, financing options, and net-metering requirements.</p></Reveal><div className="adoption-grid">{adoptionAreas.map(([title, text], index) => <Reveal className="adoption-item" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div><div className="adoption-benefits"><strong>Supporting smarter solar adoption</strong><div>{adoptionBenefits.map((benefit) => <span key={benefit}>{benefit}</span>)}</div></div></div></section>

    <section className="products-section wrap" id="products"><Reveal className="products-image"><div className="products-photo" /><span>PRODUCT SUPPLY / SYSTEM SUPPORT</span></Reveal><Reveal className="products-copy"><p className="eyebrow"><span /> 05 — Solar product supply</p><h2>Essential components<br /><em>for solar implementation.</em></h2><p>Supply of essential solar products and system components for different installation and project requirements.</p><p>The product range supports residential, commercial, industrial, rooftop, and solar project installations.</p><div className="product-list">{productItems.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><i>↗</i></div>)}</div></Reveal></section>

    <section className="more-solutions wrap"><Reveal className="section-heading"><div><p className="eyebrow"><span /> Complete services & solutions</p><h2>One capability set.<br /><em>Many applications.</em></h2></div><p className="heading-note">N Solutions brings together the full catalog of solar and renewable-energy capabilities described in the official Services & Solutions content.</p></Reveal><div className="solution-catalog">{solutionCatalog.map(([number, title, text]) => <Reveal className="solution-catalog-item" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><i>↗</i></Reveal>)}</div></section>

    <section className="services-cta"><div className="wrap"><p className="eyebrow light"><span /> One partner. Complete solar solutions.</p><h2>Assess. Design.<br /><em>Supply. Install.</em></h2><p>From rooftop solar and EPC projects to renewable power, asset management, O&M, solar products, and energy solutions, N Solutions brings together capabilities across the solar lifecycle.</p><p className="cta-flow">Assess → Design → Supply → Install → Commission → Operate → Maintain</p><a className="button button-accent" href="/#contact">Talk to N Solutions About Your Project <Arrow /></a></div></section>
  </main><SiteFooter /></div>
}

function SiteFooter() {
  return <footer className="footer"><div className="wrap footer-top"><a className="brand" href="/"><span className="brand-logo">N Solutions</span></a><div className="footer-columns"><div><strong>Quick links</strong><a href="/about">About</a><a href="/services">Services</a><a href="/projects">Projects</a><a href="#contact">Contact</a></div><div><strong>Services</strong><span>Solar EPC</span><span>Commercial & industrial</span><span>Residential rooftop</span><span>Government solar</span></div><div><strong>Contact</strong><span>Approved contact details will appear here.</span></div></div></div><div className="wrap footer-bottom"><span>Engineering a smarter solar future.</span></div></footer>
}

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(productCategories[0])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    document.title = 'Products | N Solutions'
    const controller = new AbortController()
    fetch('/api/public/products', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load products')
        const payload = await response.json()
        setProducts(Array.isArray(payload?.data) ? payload.data : [])
        setStatus('ready')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error')
      })
    return () => { controller.abort(); document.title = 'N Solutions | Solar EPC' }
  }, [])

  const visibleProducts = products.filter((product) => displayProductCategory(product.category) === selectedCategory)
  const chooseCategory = (category) => {
    setSelectedCategory(category)
    document.getElementById('product-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return <div className="products-page"><SiteHeader activePath="/products" /><main>
    <section className="products-hero"><div className="products-hero-image" /><div className="products-hero-shade" /><div className="wrap products-hero-content"><p className="eyebrow light"><span /> Solar product supply</p><h1>Essential components<br /><em>for solar implementation.</em></h1><p>Supply of essential solar products and system components for different installation and project requirements.</p></div></section>

    <nav className="product-categories wrap" aria-label="Product categories">{productCategories.map((category) => <button type="button" key={category} className={selectedCategory === category ? 'active' : ''} onClick={() => chooseCategory(category)} aria-pressed={selectedCategory === category}>{category}</button>)}</nav>

    <section className="product-catalog wrap" id="product-catalog" aria-live="polite"><Reveal className="section-heading"><div><p className="eyebrow"><span /> Product category</p><h2>{selectedCategory}</h2></div><p className="heading-note">The product range supports residential, commercial, industrial, rooftop, and solar project installations.</p></Reveal><Reveal className="product-category-visual" key={selectedCategory}><img src={productCategoryImages[selectedCategory]} alt="" /></Reveal>
      {status === 'loading' && <div className="product-loading" aria-label="Loading products"><span /><span /><span /></div>}
      {status === 'error' && <EmptyState label="Products" text="Product information will appear here when it is available." />}
      {status === 'ready' && visibleProducts.length === 0 && <EmptyState label={selectedCategory} text="Product information will appear here when it is available." />}
      {status === 'ready' && visibleProducts.length > 0 && <div className="product-grid">{visibleProducts.map((product) => <Reveal className="product-card" key={product.id}><div className="product-card-image">{product.image?.url && <img src={product.image.url} alt={product.name} />}</div><div className="product-card-body"><span className="product-brand">{product.brand}</span><h3>{product.name}</h3><p>{product.description}</p>{product.applications?.length > 0 && <div className="product-applications">{product.applications.map((application) => <span key={application}>{application}</span>)}</div>}</div></Reveal>)}</div>}
    </section>

    <section className="products-support"><div className="wrap"><Reveal className="products-support-inner"><p className="eyebrow light"><span /> Solar product supply</p><h2>Solar panels, inverters,<br /><em>and essential components.</em></h2><p>Solar panels, inverters, earth pits, lightning arrestors, accessories, and other project-specific system components.</p><a className="button button-accent" href="/#contact">Talk to N Solutions About Your Project <Arrow /></a></Reveal></div></section>
  </main><SiteFooter /></div>
}

const projectCategories = ['ALL', 'COMMERCIAL', 'INDUSTRIAL', 'RESIDENTIAL', 'GOVERNMENT']

const staticProjects = [
  { id: 'static-sri-industries', category: 'industrial', year: '2024', status: 'Completed', capacity: '250 kWp', title: 'Sri Industries 250 kWp Industrial Rooftop', location: 'Auto Nagar, Visakhapatnam, Andhra Pradesh', description: 'Grid-connected captive solar power plant on a metal shed roof. Generates over 375,000 kWh annually, saving ₹28 Lakhs/yr.', services: ['Turnkey EPC: Structural load analysis, custom elevated purlins, 250kW string inverters, and DISCOM net-metering synchronization.'] },
  { id: 'static-pm-surya-ghar', category: 'residential', year: '2024', status: 'Completed', capacity: '1.8 MWp Cumulative', title: 'PM Surya Ghar 500+ Residential Cluster', location: 'Vizianagaram District, Andhra Pradesh', description: 'Executed 500+ rooftop solar installations across residential households within 7 months of national portal empanelment.', services: ['Site surveys, DCR TOPCon modules, subsidy application processing, DISCOM inspection, and net-meter provisioning.'] },
  { id: 'static-lakshmi-textiles', category: 'industrial', year: '2023', status: 'Completed', capacity: '1.2 MWp', title: 'Lakshmi Textiles 1.2 MWp Ground-Mount Solar', location: 'Guntur / Hyderabad Corridor, Telangana', description: 'MW-scale captive ground-mounted solar farm with centralized telemetry and 11kV evacuation for a large textile manufacturing mill.', services: ['Civil foundation, piling, HT switchyard, 33kV transmission line, and annual performance ratio SLA maintenance.'] },
  { id: 'static-medical-college', category: 'government', year: '2023', status: 'Completed', capacity: '450 kWp', title: 'Government Medical College Solar Rooftop', location: 'Bengaluru Suburbs, Karnataka', description: 'NREDCAP/KREDL approved government institutional project powering ICU, laboratory, and hospital administrative blocks.', services: ['Complete engineering, supply of tier-1 ALMM panels, safety walkways, and 24/7 remote monitoring setup.'] },
  { id: 'static-green-valley', category: 'residential', year: '2024', status: 'Completed', capacity: '240 kWp', title: 'Green Valley Housing Society (80 Villas)', location: 'Madhurawada, Visakhapatnam, Andhra Pradesh', description: 'Rooftop solar network across 80 luxury villas plus club house common areas with individual net metering.', services: ['Custom aesthetic aluminum railings, dual string inverters per villa, and central society energy dashboard.'] },
  { id: 'static-grand-horizon', category: 'commercial', year: '2024', status: 'Completed', capacity: '350 kWp', title: 'Grand Horizon Commercial Complex', location: 'Chennai IT Highway, Tamil Nadu', description: 'High-density commercial rooftop system offsetting 70% of day-time air conditioning and lighting loads.', services: ['Design, Supply, Installation, and commissioning with DG synchronization controller.'] },
  { id: 'static-pm-kusum', category: 'government', year: '2024', status: 'Completed', capacity: '75 Solar Pumps (5HP & 7.5HP)', title: 'PM-KUSUM Agri Solar Pumping Grid', location: 'Anakapalli & Vizianagaram, Andhra Pradesh' },
  { id: 'static-mega-food-park', category: 'industrial', year: '2025', status: 'In Progress', capacity: '500 kWp', title: 'Mega Food Park 500 kWp Captive Plant', location: 'Coastal Corridor, Andhra Pradesh' },
]

function projectCategoryLabel(category = '') {
  return String(category).toUpperCase()
}

function ProjectImage({ project, className = '' }) {
  if (!project.image?.url) return <div className={`project-image-placeholder ${className}`} aria-label="Project image unavailable" role="img" />
  return <img className={className} src={project.image.url} alt={project.title || 'N Solutions project'} loading="lazy" />
}

function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    document.title = 'Projects | N Solutions'
    const controller = new AbortController()
    fetch('/api/public/projects', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load projects')
        const payload = await response.json()
        setProjects(Array.isArray(payload?.data) ? payload.data : [])
        setStatus('ready')
      })
      .catch((error) => { if (error.name !== 'AbortError') setStatus('error') })
    return () => { controller.abort(); document.title = 'N Solutions | Solar EPC' }
  }, [])

  const allProjects = [...staticProjects, ...projects]
  const featuredProject = projects.find((project) => project.image?.url)
  const visibleProjects = selectedCategory === 'ALL'
    ? allProjects
    : allProjects.filter((project) => projectCategoryLabel(project.category) === selectedCategory)

  return <div className="projects-page"><SiteHeader activePath="/projects" /><main>
    <section className="projects-hero">
      <div className="projects-hero-visual" aria-hidden="true">{featuredProject?.image?.url && <img src={featuredProject.image.url} alt="" />}</div>
      <div className="projects-hero-shade" />
      <div className="wrap projects-hero-content"><p className="eyebrow light"><span /> Our projects</p><h1>Our <em>projects.</em></h1><p>N Solutions has experience across different solar project requirements and scales.</p></div>
    </section>

    <nav className="project-categories wrap" aria-label="Project categories">
      {projectCategories.map((category) => <button type="button" key={category} className={selectedCategory === category ? 'active' : ''} onClick={() => setSelectedCategory(category)} aria-pressed={selectedCategory === category}>{category}</button>)}
    </nav>

    <section className="project-stories wrap" aria-live="polite">
      {status === 'loading' && <div className="project-skeletons" aria-label="Loading projects"><i /><i /><i /></div>}
      {status === 'error' && <EmptyState label="Projects" text="Project entries will appear here when they are available." />}
      {status === 'ready' && visibleProjects.length === 0 && <EmptyState label={selectedCategory === 'ALL' ? 'Projects' : selectedCategory} text="No project entries are currently available in this category." />}
      {status === 'ready' && visibleProjects.length > 0 && <div className="project-story-list" key={selectedCategory}>
        {visibleProjects.map((project, index) => <Reveal className={`project-story project-story-${index % 3}`} key={project.id}>
          <div className="project-story-image"><ProjectImage project={project} /></div>
          <div className="project-story-copy"><div className="project-story-meta"><p className="eyebrow"><span /> {projectCategoryLabel(project.category)}</p>{project.year && <span>{project.year}</span>}{project.status && <span className={`project-status ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>{project.status}</span>}</div><h2>{project.title}</h2>{project.capacity && <p className="project-capacity">{project.capacity}</p>}{project.location && <p className="project-location">{project.location}</p>}{project.description && <p className="project-description">{project.description}</p>}{Array.isArray(project.services) && project.services.length > 0 && <div className="project-services">{project.services.map((service) => <span key={service}>{service}</span>)}</div>}</div>
        </Reveal>)}
      </div>}
    </section>

    <section className="projects-cta"><div className="wrap"><Reveal><p className="eyebrow light"><span /> N Solutions</p><h2>Talk to N Solutions<br /><em>About Your Project</em></h2><a className="button button-accent" href="/#contact">Talk to N Solutions About Your Project <Arrow /></a></Reveal></div></section>
  </main><SiteFooter /></div>
}

function RouteShell() {
  return <div className="route-shell"><SiteHeader activePath={window.location.pathname} /><main><p className="eyebrow"><span /> N Solutions Solar EPC</p><h1>This page is being prepared.</h1><p>Return to the Home page while the next section is connected.</p><a className="button button-accent" href="/">Back to Home <Arrow /></a></main></div>
}

function App() {
  useEffect(() => {
    let resetTimer
    const showRouteGesture = (target) => {
      const link = target.closest?.('a[href]')
      if (!link || link.target || link.hasAttribute('download')) return
      const destination = new URL(link.href, window.location.href)
      if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return
      document.body.classList.add('is-route-gesturing')
      window.clearTimeout(resetTimer)
      resetTimer = window.setTimeout(() => document.body.classList.remove('is-route-gesturing'), 1400)
    }
    const onPointerDown = (event) => { if (event.button === 0) showRouteGesture(event.target) }
    const onKeyDown = (event) => { if (event.key === 'Enter') showRouteGesture(event.target) }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown, true)
    return () => { document.removeEventListener('pointerdown', onPointerDown, true); document.removeEventListener('keydown', onKeyDown, true); window.clearTimeout(resetTimer); document.body.classList.remove('is-route-gesturing') }
  }, [])
  if (window.location.pathname === '/about') return <AboutPage />
  if (window.location.pathname === '/services') return <ServicesPage />
  if (window.location.pathname === '/projects') return <ProjectsPage />
  if (window.location.pathname === '/products') return <ProductsPage />
  if (window.location.pathname !== '/') return <RouteShell />

  return <div className="site-shell home-page">
    <SiteHeader />

    <main id="top">
      <section className="hero">
        <div className="hero-image" /><video className="hero-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true"><source src="/media/hero-solar.mp4" type="video/mp4" /></video><div className="hero-shade" />
        <div className="hero-content wrap"><p className="eyebrow light"><span /> 16+ years of solar experience</p><h1>Built on <em>experience.</em><br />Driven by solar.</h1><p className="hero-copy">N Solutions delivers customized solar solutions through engineering, procurement, installation, commissioning, and ongoing support.</p><div className="hero-actions"><a className="button button-accent" href="#contact">Talk to N Solutions <Arrow /></a><a className="button button-ghost" href="#projects">Explore our projects <Arrow /></a></div></div>
        <div className="hero-note"><span>01</span><div><strong>Solar, engineered.</strong><small>Residential to MW-scale projects</small></div></div><a className="scroll-cue" href="#proof"><span>Scroll to explore</span><i>↓</i></a>
      </section>

      <section className="proof" id="proof"><div className="wrap proof-grid"><p className="eyebrow"><span /> Experience that speaks for itself</p><div className="proof-intro"><h2>Built on experience.<br /><em>Driven by solar.</em></h2><p>N Solutions is an Engineering, Procurement and Construction solar company with 16+ years of experience across 9 states in India.</p><p>We combine engineering expertise, reliable solar technology, and professional project execution to help customers move towards cleaner energy, improved efficiency, and sustainable growth.</p></div><div className="proof-aside"><span className="proof-aside-mark">16+</span><div><strong>Years of solar operations</strong><p>From MW-scale solar power projects to residential rooftop installations under PM Surya Ghar.</p></div><span className="proof-aside-line" /></div><div className="stats"><AnimatedMetric value={16} suffix="+" label="Years of experience" /><AnimatedMetric value={9} label="States across India" /><AnimatedMetric value={360} suffix="°" label="End-to-end solar EPC" /><AnimatedMetric value={500} suffix="+" label="PM Surya Ghar sites" /></div></div></section>

      <section className="who wrap" id="who-we-are"><Reveal className="who-image"><div className="who-photo" /><span className="image-caption">From MW-scale projects<br />to residential rooftops</span></Reveal><Reveal className="who-copy"><p className="eyebrow"><span /> Who we are</p><h2>Engineering a<br /><em>smarter solar future.</em></h2><p>N Solutions is an EPC Solar Company focused on customized solar solutions for Commercial & Industrial businesses and communities, with an emphasis on efficient engineering, quality execution, and long-term energy savings.</p><p>Our experience extends from MW-scale solar power projects to residential rooftop installations under PM Surya Ghar, including 500+ sites completed in Vizianagaram in the last seven months.</p><p>From engineering and procurement to installation and commissioning, every solution is tailored to the specific energy requirements of the customer.</p><a className="text-link" href="/about">About N Solutions <Arrow /></a></Reveal></section>

      <section className="services wrap" id="services"><Reveal className="section-heading"><div><p className="eyebrow"><span /> What we do</p><h2>Solar solutions<br /><em>built for tomorrow.</em></h2></div><p className="heading-note">One accountable partner for the complete solar journey, from feasibility and design to commissioning and care.</p></Reveal><ServicesShowcase /><a className="section-cta text-link" href="/services">Explore our services <Arrow /></a></section>

      <section className="journey" id="how-we-work"><div className="wrap journey-grid"><Reveal><p className="eyebrow light"><span /> How we work</p><h2>From planning<br /><em>to performance.</em></h2><p className="journey-copy">A clear overview of the solar project journey, from understanding requirements to commissioning and ongoing support.</p><p className="journey-flow">Requirement → Design → Execution → Support</p><a className="button button-accent" href="#contact">Start your project <Arrow /></a></Reveal><div className="steps">{process.map(([number, title]) => <Reveal className="step" key={number}><span>{number}</span><strong>{title}</strong></Reveal>)}</div></div></section>

      <section className="chairman wrap"><Reveal className="chairman-copy"><p className="eyebrow"><span /> Chairman's message</p><h2>Shaping the future<br /><em>through solar energy.</em></h2><blockquote>“Our journey is driven by a simple belief — solar energy can create a cleaner, smarter, and more sustainable future.”</blockquote><p className="message-ready">At N Solutions, we are committed to delivering reliable solar solutions through experience, engineering, and responsible execution. With 16+ years of experience, we continue to grow with a clear purpose: to power businesses, industries, homes, and communities through dependable solar energy.</p><div className="signature"><strong>Ch. C.S.V. Raju</strong><small>Managing Partner · N Solutions</small></div></Reveal><Reveal className="chairman-art"><span>NS</span><small>Leadership<br />in solar EPC</small></Reveal></section>

      <section className="why"><div className="wrap"><Reveal className="section-heading"><div><p className="eyebrow light"><span /> Why N Solutions</p><h2>Built on experience.<br /><em>Driven by results.</em></h2></div><p className="heading-note">The capabilities and commitment behind every N Solutions project.</p></Reveal><div className="strength-grid">{strengths.map(([number, title, description]) => <Reveal className="strength" key={number}><span>{number}</span><div><strong>{title}</strong><small>{description}</small></div><i>↗</i></Reveal>)}</div></div></section>

      <section className="projects wrap" id="projects"><Reveal className="section-heading"><div><p className="eyebrow"><span /> Our work</p><h2>Powering progress<br /><em>across India.</em></h2></div><a className="text-link" href="/projects">View all projects <Arrow /></a></Reveal><div className="project-ready"><div><span className="project-ready-number">500+</span><strong>PM Surya Ghar sites completed in Vizianagaram</strong><p>The project showcase is ready for verified project records and images when the public project data is connected.</p></div><a className="button button-accent" href="/projects">View all projects <Arrow /></a></div></section>

      <section className="trust wrap"><Reveal className="section-heading"><div><p className="eyebrow"><span /> Proof of trust</p><h2>Trusted by<br /><em>our clients.</em></h2></div><p className="heading-note">A space ready for verified client stories as they become available.</p></Reveal><div className="trust-grid"><EmptyState label="Testimonials" text="Verified client testimonials will appear here." /><EmptyState label="Approved credentials" text="Official certifications and registrations will appear here." /><EmptyState label="Awards & achievements" text="Verified awards and achievements will appear here." /></div></section>

      <section className="contact-band" id="contact"><div className="wrap contact-inner"><p className="eyebrow light"><span /> One partner. Complete solar solutions.</p><h2>Assess. Design.<br /><em>Supply. Install.</em></h2><p>Talk to N Solutions about your project, from first requirement through operate and maintain.</p><a className="button button-accent" href="#contact">Talk to N Solutions <Arrow /></a></div></section>
    </main>

    <SiteFooter />
  </div>
}

export default App
