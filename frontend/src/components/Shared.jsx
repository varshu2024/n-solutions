import { useEffect, useRef, useState } from 'react'

export function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export function navigate(path) {
  if (window.location.pathname === path) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event('nsolutions-route-change'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function AnimatedMetric({ value, suffix = '', label }) {
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
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])
  return (
    <div ref={ref}>
      <strong>{count}<span>{suffix}</span></strong>
      <small>{label}</small>
    </div>
  )
}

export function Reveal({ children, className = '', id }) {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} id={id} className={`reveal ${className}`}>{children}</div>
}

export function EmptyState({ label, text }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">+</span>
      <strong>{label}</strong>
      <p>{text}</p>
    </div>
  )
}

export function SiteHeader({ activePath = '' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const closeMenu = () => setMenuOpen(false)
  const handleNav = (e, path) => { e.preventDefault(); closeMenu(); navigate(path) }
  const items = ['Home', 'About', 'Services', 'Projects', 'Products', 'Media', 'Careers', 'Contact']
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${activePath ? 'site-header-page' : ''}`}>
      <a className="brand" href="/" onClick={(e) => handleNav(e, '/')} aria-label="N Solutions home">
        <span className="brand-logo">N Solutions</span>
      </a>
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span />
      </button>
      <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
        {items.map((item) => {
          const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`
          const isCurrent = activePath === path || (path === '/' && activePath === '')
          return <a className={isCurrent ? 'active' : ''} key={item} href={path} onClick={(e) => handleNav(e, path)}>{item}</a>
        })}
        <a className="nav-cta" href="/contact" onClick={(e) => handleNav(e, '/contact')}>Get a Quote <Arrow /></a>
      </nav>
    </header>
  )
}

// Each logo: srcs[] = ordered list of image URLs to try. ui-avatars is always last resort.
const uiAvatar = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0875b6&color=fff&size=160&bold=true&format=png`

const logoGroups = [
  {
    label: 'Technology Partners',
    logos: [
      {
        name: 'ReNew Power',
        srcs: [
          '/logos/logo_1.jpeg',
          'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/ReNew_Power_Logo.png/320px-ReNew_Power_Logo.png',
        ],
      },
      {
        name: 'Deye',
        srcs: [
          '/logos/logo_2.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Deye_logo.svg/320px-Deye_logo.svg.png',
        ],
      },
      {
        name: 'CIKIT',
        srcs: [
          '/logos/logo_3.jpeg',
          'https://cikit.in/wp-content/uploads/2021/01/cikit-logo.png',
        ],
      },
      {
        name: 'Polycab',
        srcs: [
          '/logos/logo_4.jpeg',
          'https://upload.wikimedia.org/wikipedia/en/f/f6/Polycab_logo.png',
        ],
      },
      {
        name: 'Vikram Solar',
        srcs: [
          '/logos/logo_5.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Vikram_Solar_logo.svg/320px-Vikram_Solar_logo.svg.png',
        ],
      },
    ],
  },
  {
    label: 'Certifications & Awards',
    logos: [
      {
        name: 'ISO 9001:2015',
        srcs: [
          '/logos/logo_6.jpeg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/ISO_9001-2015_logo.svg/200px-ISO_9001-2015_logo.svg.png',
        ],
      },
      {
        name: 'PM Surya Ghar',
        srcs: [
          '/logos/logo_7.png',
          'https://pmsuryaghar.gov.in/wp-content/uploads/2024/02/PM-Surya-Ghar-Logo-PNG-1.png',
        ],
      },
      {
        name: 'NREDCAP',
        srcs: [
          '/logos/logo_8.png',
          'https://nredcap.in/images/logo.png',
        ],
      },
      {
        name: 'APEPDCL',
        srcs: [
          '/logos/logo_9.jpeg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/APEPDCL_logo.jpg/240px-APEPDCL_logo.jpg',
        ],
      },
      {
        name: 'MNRE',
        srcs: [
          '/logos/logo_10.png',
          'https://mnre.gov.in/img/documents/uploads/file_f-1623139036030.jpg',
        ],
      },
      {
        name: 'MSME',
        srcs: [
          '/logos/logo_11.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/MSME_logo.png/320px-MSME_logo.png',
        ],
      },
    ],
  },
  {
    label: 'Financial & Loan Partners',
    logos: [
      {
        name: 'SBI',
        srcs: [
          '/logos/logo_12.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/320px-SBI-logo.svg.png',
        ],
      },
      {
        name: 'Union Bank',
        srcs: [
          '/logos/logo_13.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Union_Bank_of_India_Logo.svg/320px-Union_Bank_of_India_Logo.svg.png',
        ],
      },
      {
        name: 'Canara Bank',
        srcs: [
          '/logos/logo_14.jpeg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Canara_Bank_Logo.svg/320px-Canara_Bank_Logo.svg.png',
        ],
      },
      {
        name: 'APGVB',
        srcs: [
          '/logos/logo_15.jpeg',
          'https://www.apgvbank.in/English/images/APGVB-Logo.png',
        ],
      },
    ],
  },
  {
    label: 'Our Clients',
    logos: [
      {
        name: 'Mahindra Solarize',
        srcs: [
          '/logos/logo_16.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Mahindra_New_Logo.svg/320px-Mahindra_New_Logo.svg.png',
        ],
      },
      {
        name: 'Premier Energies',
        srcs: [
          '/logos/logo_17.jpeg',
          'https://www.premierenergies.com/images/logo.png',
        ],
      },
      {
        name: 'Tata Power Solar',
        srcs: [
          '/logos/logo_18.jpeg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/200px-Tata_logo.svg.png',
        ],
      },
      {
        name: 'Kenexa',
        srcs: [
          '/logos/logo_19.jpeg',
          'https://logo.clearbit.com/kenexa.com',
        ],
      },
      {
        name: 'Maha Cement',
        srcs: [
          '/logos/logo_20.jpeg',
          'https://mahacements.com/wp-content/uploads/2021/01/maha-cement-logo.png',
        ],
      },
      {
        name: 'Reliance Comm.',
        srcs: [
          '/logos/logo_21.png',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Reliance_Communications.svg/320px-Reliance_Communications.svg.png',
        ],
      },
      {
        name: 'Fourth Partner Energy',
        srcs: [
          '/logos/logo_22.png',
          'https://www.fourthpartnerenergy.com/images/logo.png',
        ],
      },
      {
        name: 'Veddis Solars',
        srcs: [
          '/logos/logo_23.jpeg',
          'https://veddissolars.com/wp-content/uploads/2022/07/veddis-logo.png',
        ],
      },
      {
        name: 'Naviya Tech.',
        srcs: [
          '/logos/logo_24.jpeg',
          'https://naviyatechnologies.com/wp-content/uploads/2022/04/naviya-logo.png',
        ],
      },
      {
        name: 'JNTU Kakinada',
        srcs: [
          '/logos/logo_25.jpeg',
        ],
      },
      {
        name: 'GSE Renewables',
        srcs: [
          '/logos/logo_26.png',
        ],
      },
      {
        name: 'GVMC',
        srcs: [
          '/logos/logo_27.jpeg',
        ],
      },
      {
        name: 'Ray Power Solutions',
        srcs: [
          '/logos/logo_28.png',
        ],
      },
      {
        name: 'Jindal Steel & Power',
        srcs: [
          '/logos/logo_29.png',
        ],
      },
      {
        name: 'Shiva Marketing',
        srcs: [
          '/logos/logo_30.jpeg',
        ],
      },
    ],
  },
]

function LogoTile({ name, srcs }) {
  const allSrcs = [...srcs, uiAvatar(name)]
  const [idx, setIdx] = useState(0)
  const handleError = () => {
    if (idx < allSrcs.length - 1) setIdx(idx + 1)
  }
  return (
    <div className="logo-strip-item">
      <div className="logo-strip-img-wrap">
        <img
          src={allSrcs[idx]}
          alt={name}
          title={name}
          loading="lazy"
          onError={handleError}
        />
      </div>
      <span className="logo-strip-name">{name}</span>
    </div>
  )
}

function LogoStrip({ logos, reverse = false, speed = 28 }) {
  const items = [...logos, ...logos, ...logos]
  return (
    <div className="logo-strip-track" style={{ '--logo-speed': `${speed}s`, '--logo-dir': reverse ? 'reverse' : 'normal' }}>
      {items.map((logo, i) => <LogoTile key={i} name={logo.name} srcs={logo.srcs} />)}
    </div>
  )
}


function LogoPartnersSection() {
  return (
    <section className="logo-partners-section" aria-label="Partners, Clients & Certifications">
      <div className="wrap">
        <div className="logo-partners-heading">
          <p className="eyebrow"><span /> Our ecosystem</p>
          <h2>Trusted partners &amp; <em>valued clients.</em></h2>
        </div>
      </div>
      <div className="logo-partners-grid">
        {logoGroups.map((group, gi) => (
          <div key={gi} className="logo-partners-row">
            <div className="logo-partners-label"><span>{group.label}</span></div>
            <div className="logo-strip-viewport">
              <LogoStrip logos={group.logos} reverse={gi % 2 === 1} speed={22 + gi * 5} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function SiteFooter() {
  const handleNav = (e, path) => { e.preventDefault(); navigate(path) }
  return (
    <>
      <LogoPartnersSection />
      <footer className="footer">
        <div className="wrap footer-top">
          <div className="footer-brand-col">
            <a className="brand" href="/" onClick={(e) => handleNav(e, '/')}>
              <span className="brand-logo">N Solutions</span>
            </a>
            <p className="footer-tagline">
              Engineering, Procurement and Construction (EPC) Solar Company with 16+ years of proven experience across 9 states in India.
            </p>
            <div className="footer-credentials-badge">
              <span>PM Surya Ghar Empaneled</span>
              <span>MNRE Compliant</span>
              <span>Commercial &amp; Industrial EPC</span>
            </div>
          </div>
          <div className="footer-columns">
            <div>
              <strong>Navigation</strong>
              <a href="/" onClick={(e) => handleNav(e, '/')}>Home</a>
              <a href="/about" onClick={(e) => handleNav(e, '/about')}>About Us</a>
              <a href="/services" onClick={(e) => handleNav(e, '/services')}>Services &amp; Solutions</a>
              <a href="/projects" onClick={(e) => handleNav(e, '/projects')}>Projects Showcase</a>
              <a href="/products" onClick={(e) => handleNav(e, '/products')}>Solar Products</a>
              <a href="/media" onClick={(e) => handleNav(e, '/media')}>Media &amp; News</a>
              <a href="/careers" onClick={(e) => handleNav(e, '/careers')}>Careers</a>
              <a href="/contact" onClick={(e) => handleNav(e, '/contact')}>Contact Us</a>
            </div>
            <div>
              <strong>Core Services</strong>
              <a href="/services" onClick={(e) => handleNav(e, '/services')}>Commercial &amp; Industrial</a>
              <a href="/services" onClick={(e) => handleNav(e, '/services')}>Residential Rooftop</a>
              <a href="/services" onClick={(e) => handleNav(e, '/services')}>Solar EPC Solutions</a>
              <a href="/services" onClick={(e) => handleNav(e, '/services')}>PM Surya Ghar Scheme</a>
              <a href="/services" onClick={(e) => handleNav(e, '/services')}>Operation &amp; Maintenance</a>
              <a href="/services" onClick={(e) => handleNav(e, '/services')}>Subsidies &amp; Net Metering</a>
            </div>
            <div>
              <strong>Contact &amp; Reach</strong>
              <span><strong>HQ:</strong> Vizianagaram &amp; Visakhapatnam Cluster, AP</span>
              <span><strong>Reach:</strong> Operations across 9 States in India</span>
              <span><strong>Email:</strong> info@nsolutions.in</span>
              <span><strong>Projects:</strong> projects@nsolutions.in</span>
              <span><strong>Helpline:</strong> +91 891 278 9400</span>
              <div className="footer-cta-link">
                <a href="/contact" onClick={(e) => handleNav(e, '/contact')}>Request Feasibility Study →</a>
              </div>
            </div>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} N Solutions. Built on Experience. Driven by Solar. All rights reserved.</span>
          <span>Managing Partner: Ch. C.S.V. Raju</span>
        </div>
      </footer>
    </>
  )
}

