import { useEffect, useRef, useState } from 'react'
import { FiArrowUpRight} from 'react-icons/fi';

export function Arrow() {
  return <FiArrowUpRight aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', strokeWidth: 2.5 }} />
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
        <img className="brand-logo" src="/logo.png" alt="N Solutions" />
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
export function Credentials(){
  return(
<section className="credentials-section">
  <div className="credentials-overlay" />

  <div className="credentials-content">

    <div className="credentials-heading">
      <p className="credentials-eyebrow">
        OUR CREDENTIALS
      </p>

      <h2>
        <span>Certifications &amp;</span>{' '}
        <span className="credentials-blue">Awards</span>
      </h2>

      <p className="credentials-description">
        Recognized through Certifications, registrations,
        and industry enpanelments
      </p>
    </div>

    <div className="credentials-logos">

      <div className="credential-item">
        <div className="credential-logo">
          <img src="/logos/logo_6.jpeg" alt="ISO 9001:2015" />
        </div>

        <h3>ISO 9001:2015</h3>
        <p>Certified Company</p>
      </div>

      <div className="credential-item">
        <div className="credential-logo">
          <img src="/logos/logo_7.png" alt="PM Surya Ghar" />
        </div>

        <h3>PM Surya Ghar</h3>
        <p>Muft Bijli Yojana</p>
      </div>

      <div className="credential-item">
        <div className="credential-logo">
          <img src="/logos/logo_8.png" alt="NREDCAP" />
        </div>

        <h3>NREDCAP</h3>
        <p>Registered</p>
      </div>

      <div className="credential-item">
        <div className="credential-logo">
          <img src="/logos/logo_9.jpeg" alt="APEPDCL" />
        </div>

        <h3>APEPDCL</h3>
        <p>Empanelled</p>
      </div>

      <div className="credential-item">
        <div className="credential-logo">
          <img src="/logos/logo_10.png" alt="MNRE" />
        </div>

        <h3>Ministry of New and Renewable Energy</h3>
        <p>Enpanelled</p>
      </div>

      <div className="credential-item credential-sixth">
        <div className="credential-logo">
          <img src="/logos/logo_11.png" alt="MSME" />
        </div>

        <h3>MSME</h3>
        <p>Registered Enterprise</p>
      </div>

    </div>
<div className="credentials-divider">
  <span />

  <div className="credentials-badges">

    <div className="credential-badge">
      <div className="badge-icon">
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
      <span>Certified</span>
    </div>

    <div className="credential-badge">
      <div className="badge-icon">
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3h9l3 3v15H6z" />
          <path d="M15 3v4h4" />
          <path d="M9 12h6" />
          <path d="M9 16h6" />
        </svg>
      </div>
      <span>Registered</span>
    </div>

    <div className="credential-badge">
      <div className="badge-icon">
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <path d="M15 15c3.2-.2 5.5 1.9 6 5" />
        </svg>
      </div>
      <span>Empanelled</span>
    </div>

  </div>

  <span />
</div>


  </div>
</section>

  )
}

function LogoPartnersSection() {
  return (
    <>
      <section
        className="logo-partners-section"
        aria-label="Partners, Clients & Certifications"
      >
        <div className="wrap">
          <div className="logo-partners-heading">
            <p className="eyebrow">
              <span /> Our ecosystem
            </p>

            <h2>
              Trusted partners &amp; <em>valued clients.</em>
            </h2>
          </div>
        </div>

        <div className="logo-partners-grid">
          {logoGroups.map((group, gi) => (
            <div key={gi} className="logo-partners-row">
              <div className="logo-partners-label">
                <span>{group.label}</span>
              </div>

              <div className="logo-strip-viewport">
                <LogoStrip
                  logos={group.logos}
                  reverse={gi % 2 === 1}
                  speed={22 + gi * 5}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Credentials />
    </>
  )
}


export function SiteFooter() {
  const handleNav = (e, path) => {
    e.preventDefault()
    navigate(path)
  }

  return (
    <footer className="site-footer">
      <LogoPartnersSection/>
      {/* ================= MAIN FOOTER ================= */}
      <section className="footer-main">

        <div className="footer-inner">

          {/* BRAND */}
          <div className="footer-brand-col">

            <a
              className="footer-logo-link"
              href="/"
              onClick={(e) => handleNav(e, '/')}
            >
              <img
                className="footer-logo"
                src="/logo.png"
                alt="N Solutions"
              />
            </a>

            <p className="footer-tagline">
              Engineering, Procurement and Construction (EPC)
              Solar Company with 16+ years of proven experience
              across 9 states in India.
            </p>

            <div className="footer-credentials-badge">
              <span>PM Surya Ghar Empanelled</span>
              <span>MNRE Compliant</span>
              <span>Commercial &amp; Industrial EPC</span>
            </div>

          </div>


          {/* NAVIGATION */}
          <div className="footer-column">

            <h3>Navigation</h3>

            <div className="footer-heading-line" />

            <a href="/" onClick={(e) => handleNav(e, '/')}>
              Home
            </a>

            <a href="/about" onClick={(e) => handleNav(e, '/about')}>
              About Us
            </a>

            <a href="/services" onClick={(e) => handleNav(e, '/services')}>
              Services &amp; Solutions
            </a>

            <a href="/projects" onClick={(e) => handleNav(e, '/projects')}>
              Projects Showcase
            </a>

            <a href="/products" onClick={(e) => handleNav(e, '/products')}>
              Solar Products
            </a>

            <a href="/media" onClick={(e) => handleNav(e, '/media')}>
              Media &amp; News
            </a>

            <a href="/careers" onClick={(e) => handleNav(e, '/careers')}>
              Careers
            </a>

            <a href="/contact" onClick={(e) => handleNav(e, '/contact')}>
              Contact Us
            </a>

          </div>


          {/* CORE SERVICES */}
          <div className="footer-column">

            <h3>Core Services</h3>

            <div className="footer-heading-line" />

            <a href="/services" onClick={(e) => handleNav(e, '/services')}>
              Commercial &amp; Industrial
            </a>

            <a href="/services" onClick={(e) => handleNav(e, '/services')}>
              Residential Rooftop
            </a>

            <a href="/services" onClick={(e) => handleNav(e, '/services')}>
              Solar EPC Solutions
            </a>

            <a href="/services" onClick={(e) => handleNav(e, '/services')}>
              PM Surya Ghar Scheme
            </a>

            <a href="/services" onClick={(e) => handleNav(e, '/services')}>
              Operation &amp; Maintenance
            </a>

            <a href="/services" onClick={(e) => handleNav(e, '/services')}>
              Subsidies &amp; Net Metering
            </a>

          </div>


          {/* CONTACT */}
          <div className="footer-column footer-contact">

            <h3>Contact &amp; Reach</h3>

            <div className="footer-heading-line" />

            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12z" />
                  <circle cx="12" cy="9" r="2.3" />
                </svg>
              </span>

              <p>
                <strong>HQ:</strong> Vizianagaram &amp;
                Visakhapatnam Cluster, AP
                <br />
                Operations across 9 States in India
              </p>
            </div>


            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </span>

              <p>info@nsolutions.in</p>
            </div>


            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M7 3h3l2 5-2 2a14 14 0 0 0 4 4l2-2 5 2v3c0 1.1-.9 2-2 2C10.4 19 5 13.6 5 7c0-1.1.9-2 2-2z" />
                </svg>
              </span>

              <p>+91 891 278 9400</p>
            </div>


            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M6 3h9l3 3v15H6z" />
                  <path d="M15 3v4h4" />
                  <path d="M9 12h6M9 16h6" />
                </svg>
              </span>

              <p>projects@nsolutions.in</p>
            </div>


            <a
              href="/contact"
              className="footer-feasibility-btn"
              onClick={(e) => handleNav(e, '/contact')}
            >
              Request Feasibility Study
              <FiArrowUpRight />
            </a>

          </div>

        </div>

      </section>


      {/* ================= CREDENTIALS ================= */}
      <section className="footer-credentials">

        <div className="footer-credentials-inner">

          <div className="footer-credentials-title">
            <span>OUR CREDENTIALS</span>
            <div />
          </div>


          <div className="footer-credential-list">

            <div className="footer-credential-item">
              <div className="credential-logo credential-iso-logo">
                 <img src="/logos/logo_6.png" alt="ISO 9001:2015" />
              </div>
              <div>
                <strong>ISO 9001:2015</strong>
                <span>Certified Company</span>
            </div>
            </div>


            <div className="footer-credential-item">
              <img
                src="/logos/logo_7 (2).png"
                alt="PM Surya Ghar"
                style={{height: '80%',width: '70%'}}
              />

              <div>
                <strong>PM Surya Ghar</strong>
                <span>Muft Bijli Yojana</span>
              </div>
            </div>


            <div className="footer-credential-item">
              <img
                src="/logos/logo_9.png"
                alt="APEPDCL"
                style={{width:'60%',height:'20%',margin:'0px',padding:'0px'}}
              />

                <strong>APEPDCL</strong>
                <span>Empanelled</span>
              
            </div>


            <div className="footer-credential-item">
              <img
                src="/logos/logo_8.png"
                alt="NREDCAP"
                style={{height:'10%',width: '30%'}}
              />

              <div>
                <strong>NREDCAP</strong>
                <span>Registered</span>
              </div>
            </div>


            <div className="footer-credential-item">
              <img
                src="/logos/logo_10.png"
                alt="Ministry of New and Renewable Energy"
               style={{height: '90%',width: '70%',objectFit:'contain', marginBottom:'0px'}}/>

              <div>
                <strong>MNRE</strong>
                <span>Empanelled</span>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ================= BOTTOM BAR ================= */}
      <section className="footer-bottom-bar">

        <div className="footer-bottom-inner">

          <div className="footer-copy">
            © {new Date().getFullYear()} N Solutions.
            All rights reserved.
          </div>


          <div className="footer-bottom-links">

            <a href="/privacy">
              Privacy Policy
            </a>

            <span>|</span>

            <a href="/terms">
              Terms &amp; Conditions
            </a>

            <span>|</span>

            <a href="/">
              Sitemap
            </a>

          </div>


          <div className="footer-socials">

            <a href="#" aria-label="LinkedIn">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.5 8.5A1.5 1.5 0 1 0 6.5 5.5a1.5 1.5 0 0 0 0 3ZM5 10h3v9H5v-9Zm5 0h3v1.23c.43-.73 1.35-1.53 2.93-1.53 3.13 0 3.07 2.91 3.07 4.5V19h-3v-4.27c0-1.02-.02-2.33-1.42-2.33-1.42 0-1.64 1.1-1.64 2.25V19h-3v-9Z"
      />
    </svg>
  </a>
  <a href="#" aria-label="Instagram">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
      />
    </svg>
  </a>

  <a href="#" aria-label="YouTube">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2C2 9 2 12 2 12s0 3 .4 4.8a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2c.4-1.8.4-4.8.4-4.8s0-3-.4-4.8ZM10 15.3V8.7l5.5 3.3-5.5 3.3Z"
      />
    </svg>
  </a>

            <span className="footer-social-divider" />

            <span className="footer-developed">
              Designed &amp; Developed by
              <strong> Multivisiontrendz</strong>
            </span>

          </div>

        </div>

      </section>

    </footer>
  )
}
