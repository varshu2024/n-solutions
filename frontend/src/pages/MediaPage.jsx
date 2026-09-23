import { useState, useEffect } from 'react'
import { SiteHeader, SiteFooter, Arrow, Reveal, navigate } from '../components/Shared'
import { FiPlay, FiMapPin, FiArrowDown, FiArrowUpRight, FiX } from 'react-icons/fi'

export const pressArticles = [
  {
    id: 'press-500-sites',
    tag: 'Milestone Release',
    date: 'August 2024',
    readTime: '4 min read',
    title: 'N Solutions Achieves Landmark 500+ PM Surya Ghar Rooftop Installations in Vizianagaram District',
    summary: 'Within seven months of portal empanelment, N Solutions has completed over 500 residential solar installations in Vizianagaram with 250+ further sites in the pipeline, catalyzing household clean energy adoption.',
    fullText: `Vizianagaram, Andhra Pradesh — N Solutions, a premier solar Engineering, Procurement and Construction (EPC) company with 16+ years of operational excellence, has achieved a critical milestone under the Government of India's PM Surya Ghar Muft Bijli Yojana by successfully commissioning over 500 residential solar rooftop systems across Vizianagaram district in just seven months.

The initiative has transformed urban and semi-urban households by reducing monthly electricity bills to virtually zero while contributing clean power back to the APEPDCL regional grid through state-of-the-art bi-directional net metering.

"Our mission has always been to make solar adoption simple, transparent, and technically dependable for homeowners," stated Ch. C.S.V. Raju, Managing Partner of N Solutions. "Reaching 500+ households in seven months demonstrates our ground-level execution speed, rigorous engineering quality, and seamless coordination with government subsidy portals. With 250+ additional sites currently in the execution pipeline, we are proud to lead the regional clean energy movement."

Every installation is equipped with ALMM-listed high-efficiency DCR modules, IP65 smart string inverters with Wi-Fi telemetry, and certified chemical earthing protection, accompanied by 5 years of complimentary on-site maintenance.`,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'press-mw-expansion',
    tag: 'Corporate Growth',
    date: 'June 2024',
    readTime: '5 min read',
    title: 'Expanding MW-Scale Commercial & Industrial Solar Portfolio Across 9 States in India',
    summary: 'With over 16 years of solar engineering expertise, N Solutions expands its Commercial & Industrial footprint, delivering captive ground-mounted solar plants and high-voltage grid synchronizations for major manufacturing hubs.',
    fullText: `Hyderabad / Visakhapatnam — As Indian industrial enterprises face rising commercial grid tariffs and stringent carbon compliance requirements, N Solutions has announced the expansion of its multi-megawatt captive solar EPC operations across nine Indian states, including Andhra Pradesh, Telangana, Tamil Nadu, Karnataka, Maharashtra, and Odisha.

N Solutions provides complete turnkey EPC services—spanning initial solar resource estimation and shadow analysis to civil piling, HT transmission evacuation, and automated SCADA integration.

Recent industrial milestones include a 1.2 MWp ground-mounted solar plant for Lakshmi Textiles, a 250 kWp metal rooftop installation for Sri Industries, and a 500 kWp cold-chain solar facility for Coastal Mega Food Park.

"Commercial and industrial consumers account for over 50% of India's power consumption. Transitioning these energy-intensive facilities to captive solar delivers extraordinary financial returns with payback periods as short as 3 to 4 years," added Ch. C.S.V. Raju.`,
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'press-agri-pumps',
    tag: 'Agricultural Innovation',
    date: 'March 2024',
    readTime: '3 min read',
    title: 'Deployment of 75 Solar Pumping Systems Under PM-KUSUM Powers Rural Irrigation',
    summary: 'Replacing polluting diesel irrigation pumps with automated 5HP and 7.5HP solar variable frequency drives, ensuring consistent daytime water supply for agricultural communities.',
    fullText: `Anakapalli / Vizianagaram — Strengthening agricultural water security in non-electrified farming pockets, N Solutions has completed the deployment of 75 solar water pumping installations under the PM-KUSUM initiative across agricultural belts in Andhra Pradesh.

The solar pumps feature automated solar MPPT variable frequency drives, dry-run protection sensors, and seasonal tilt mounting structures. Farmers now have dependable irrigation power during daytime sunlight hours, completely free from costly diesel purchases or irregular rural grid schedules.

N Solutions provides a 5-year comprehensive service guarantee backed by regional mobile maintenance teams to ensure zero irrigation downtime during critical agricultural crop seasons.`,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'press-chairman-message',
    tag: 'Leadership Editorial',
    date: 'January 2024',
    readTime: '4 min read',
    title: 'Managing Partner Ch. C.S.V. Raju on Engineering a Resilient Clean Energy Future',
    summary: '“The future of energy is not only about generating power — it is about generating it smarter.” An executive perspective on solar reliability, quality engineering, and responsible project execution.',
    fullText: `In an exclusive editorial, Ch. C.S.V. Raju, Managing Partner of N Solutions, reflects on 16+ years of navigating India's renewable energy landscape:

"Solar energy in India has reached an inflection point. Where once the conversation was solely around installation costs, today the primary focus is on long-term plant yield, engineering durability, and safety standards. A solar plant is a 25-year infrastructure commitment. Cutting corners on mounting structures, DC cabling, or inverters undermines the asset's lifetime value.

At N Solutions, we have always prioritized engineering integrity. Whether designing a 3kW residential rooftop under PM Surya Ghar or an 11kV evacuation switchyard for a multi-megawatt industrial client, our approach remains rooted in deep technical understanding and responsible execution. We look forward to powering the next chapter of India's green growth."`,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'press-topcon-tech',
    tag: 'Technology Spotlight',
    date: 'November 2023',
    readTime: '4 min read',
    title: 'Adopting N-Type TOPCon & Bi-Facial Solar Modules for Maximum Rooftop Energy Density',
    summary: 'How advanced tunnel oxide passivated contact (TOPCon) modules are delivering up to 22.5% efficiency and superior temperature coefficients for Indian commercial facilities.',
    fullText: `Visakhapatnam — N Solutions has integrated latest-generation N-Type TOPCon (Tunnel Oxide Passivated Contact) and bi-facial solar modules across its C&I and premium residential projects.

With a lower temperature coefficient (-0.30%/°C) compared to traditional p-type modules, TOPCon technology generates significantly higher power output during intense Indian summer midday temperatures, delivering 4% to 7% higher annual energy yield on the same rooftop surface area.

Paired with intelligent multi-MPPT inverters and smart shade optimization, commercial facilities maximize energy generation even on restricted rooftop footprints.`,
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'press-om-standards',
    tag: 'Operations & Maintenance',
    date: 'September 2023',
    readTime: '3 min read',
    title: 'The Vital Role of Preventative Solar O&M: Protecting 25-Year Asset Performance',
    summary: 'Thermal drone thermography, string-level electrical audits, and regular robotic module de-soiling can increase solar plant generation by up to 15% annually.',
    fullText: `Visakhapatnam — While solar PV systems have no moving parts in their primary generation array, dust accumulation, hot spots, loose terminations, and environmental weathering can degrade system output over time.

N Solutions offers comprehensive Operation & Maintenance (O&M) programs across commercial, industrial, and utility portfolios. Utilizing thermal imaging cameras to identify micro-cracks and hot-spotting before inverter tripping occurs, N Solutions guarantees high performance ratio (PR) standards and maximum financial returns for plant owners.`,
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=900&q=85'
  }
]

export const galleryImages = [
  {
    title: 'PM Surya Ghar Residential Cluster',
    location: 'Vizianagaram, AP',
    category: 'Residential Rooftop',
    src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=85'
  },
  {
    title: '1.2 MWp Captive Solar Power Plant',
    location: 'Guntur Corridor, AP',
    category: 'MW-Scale Ground Mount',
    src: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1000&q=85'
  },
  {
    title: 'Industrial Metal Rooftop 250 kWp',
    location: 'Auto Nagar, Visakhapatnam',
    category: 'Industrial Rooftop',
    src: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=85'
  },
  {
    title: 'Institutional Healthcare Solar Array',
    location: 'Medical College Campus',
    category: 'Government Solar',
    src: 'https://images.unsplash.com/photo-1545208942-e1c9e3b7a4b5?auto=format&fit=crop&w=1000&q=85'
  },
  {
    title: 'Solar Pumping Irrigation Array',
    location: 'Anakapalli Agri Belt',
    category: 'Agri Solar Pumps',
    src: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1000&q=85'
  },
  {
    title: 'High-Voltage Inverter & Switchyard',
    location: 'Captive Solar Substation',
    category: 'Infrastructure & EPC',
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=85'
  }
]

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [activeArticle, setActiveArticle] = useState(null)
  const [activePhoto, setActivePhoto] = useState(null)
  const [activeVideo, setActiveVideo] = useState('/media/hero-solar.mp4')

  useEffect(() => {
    document.title = 'Media & News Center | N Solutions Solar EPC'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="media-page">
      <SiteHeader activePath="/media" />

      <main>
        {/* HERO SECTION */}
        <section className="media-hero">
          <div className="media-hero-bg" />
          <div className="media-hero-shade" />

          <div className="wrap media-hero-content">
            <p className="eyebrow light">
              <span /> News, Insights & Media Center
            </p>
            <h1>
              Documenting India’s<br />
              <em>Clean Energy Transition.</em>
            </h1>
            <p className="media-hero-lead">
              Official press releases, project commissioning stories, video walkthroughs, and editorial perspectives from N Solutions across 16+ years of solar operations and 9 Indian states.
            </p>

            <div className="media-hero-stats">
              <div>
                <strong>500+</strong>
                <small>PM Surya Ghar Sites Documented</small>
              </div>
              <div>
                <strong>9 States</strong>
                <small>Operational Reach Covered</small>
              </div>
              <div>
                <strong>16+ Years</strong>
                <small>Solar Operations History</small>
              </div>
            </div>
          </div>
        </section>

        {/* MEDIA TABS */}
        <div className="media-nav-bar wrap">
          <div className="media-tabs-list">
            <button 
              type="button" 
              className={activeTab === 'all' ? 'is-active' : ''} 
              onClick={() => setActiveTab('all')}
            >
              All Updates
            </button>
            <button 
              type="button" 
              className={activeTab === 'press' ? 'is-active' : ''} 
              onClick={() => setActiveTab('press')}
            >
              Press Releases
            </button>
            <button 
              type="button" 
              className={activeTab === 'videos' ? 'is-active' : ''} 
              onClick={() => setActiveTab('videos')}
            >
              Video Spotlights
            </button>
            <button 
              type="button" 
              className={activeTab === 'gallery' ? 'is-active' : ''} 
              onClick={() => setActiveTab('gallery')}
            >
              Photo Archive
            </button>
            <button 
              type="button" 
              className={activeTab === 'kit' ? 'is-active' : ''} 
              onClick={() => setActiveTab('kit')}
            >
              Media Kit & Brand
            </button>
          </div>
        </div>

        {/* BREAKING MILESTONE BANNER */}
        <section className="media-milestone-banner wrap">
          <div className="milestone-card">
            <div className="milestone-pill">Featured Milestone Release</div>
            <h2>
              N Solutions Completes 500+ PM Surya Ghar Residential Rooftops in Vizianagaram
            </h2>
            <p>
              Delivered within 7 months of national portal launch, empowering hundreds of households with zero electricity bills. An additional 250+ sites are currently in execution across the district.
            </p>
            <div className="milestone-footer">
              <button 
                type="button" 
                className="button button-accent"
                onClick={() => setActiveArticle(pressArticles[0])}
              >
                Read Official Announcement <Arrow />
              </button>
              <span className="milestone-date">August 2024 · Verified Milestone</span>
            </div>
          </div>
        </section>

        {/* VIDEO SPOTLIGHTS SECTION */}
        {(activeTab === 'all' || activeTab === 'videos') && (
          <section className="media-videos-section wrap">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow"><span /> High-Definition Video Center</p>
                <h2>Solar engineering<br /><em>in motion.</em></h2>
              </div>
              <p className="heading-note">
                Visual walkthroughs of our solar installations, EPC project stages, and solar component infrastructure.
              </p>
            </Reveal>

            <div className="media-video-player-container">
              <div className="main-video-screen">
                <video 
                  key={activeVideo} 
                  controls 
                  autoPlay 
                  muted 
                  playsInline 
                  className="active-video-player"
                >
                  <source src={activeVideo} type="video/mp4" />
                </video>
              </div>

              <div className="video-playlist-sidebar">
                <div 
                  className={`playlist-item ${activeVideo === '/media/hero-solar.mp4' ? 'is-playing' : ''}`}
                  onClick={() => setActiveVideo('/media/hero-solar.mp4')}
                >
                  <span className="playlist-icon">▶</span>
                  <div>
                    <strong>N Solutions Solar EPC Overview</strong>
                    <small>High-yield MW plants to residential rooftop networks</small>
                  </div>
                </div>

                <div 
                  className={`playlist-item ${activeVideo === '/media/services.mp4' ? 'is-playing' : ''}`}
                  onClick={() => setActiveVideo('/media/services.mp4')}
                >
                  <span className="playlist-icon">▶</span>
                  <div>
                    <strong>Turnkey EPC Execution Services</strong>
                    <small>From feasibility and design to testing and net-metering</small>
                  </div>
                </div>

                <div 
                  className={`playlist-item ${activeVideo === '/media/products.mp4' ? 'is-playing' : ''}`}
                  onClick={() => setActiveVideo('/media/products.mp4')}
                >
                  <span className="playlist-icon"><FiPlay size={14} /></span>
                  <div>
                    <strong>Solar Products & System Equipment</strong>
                    <small>Tier-1 PV modules, smart string inverters & protection gear</small>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PRESS RELEASES & NEWS GRID */}
        {(activeTab === 'all' || activeTab === 'press') && (
          <section className="media-news-section wrap">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow"><span /> Press & Articles</p>
                <h2>Official announcements<br /><em>& solar insights.</em></h2>
              </div>
              <p className="heading-note">
                Stay updated on company milestones, technical whitepapers, and regulatory updates across India.
              </p>
            </Reveal>

            <div className="press-articles-grid">
              {pressArticles.map((article) => (
                <Reveal key={article.id} className="press-article-card">
                  <div className="press-card-image">
                    <img src={article.image} alt={article.title} loading="lazy" />
                    <span className="press-card-tag">{article.tag}</span>
                  </div>
                  <div className="press-card-body">
                    <div className="press-card-meta">
                      <span>{article.date}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.summary}</p>
                    <button 
                      type="button" 
                      className="press-read-btn"
                      onClick={() => setActiveArticle(article)}
                    >
                      Read Full Story <Arrow />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* PHOTO ARCHIVE / FIELD GALLERY */}
        {(activeTab === 'all' || activeTab === 'gallery') && (
          <section className="media-gallery-section wrap">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow"><span /> Visual Archive</p>
                <h2>Field photography &<br /><em>commissioned sites.</em></h2>
              </div>
              <p className="heading-note">
                Authentic field documentation of our residential clusters, commercial rooftops, and MW-scale installations.
              </p>
            </Reveal>

            <div className="photo-archive-grid">
              {galleryImages.map((photo, i) => (
                <Reveal key={i} className="gallery-card" onClick={() => setActivePhoto(photo)}>
                  <img src={photo.src} alt={photo.title} loading="lazy" />
                  <div className="gallery-card-overlay">
                    <span className="gallery-category">{photo.category}</span>
                    <h4>{photo.title}</h4>
                    <small><FiMapPin size={12} style={{ verticalAlign: 'middle', marginRight: 2 }} />{photo.location}</small>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* MEDIA KIT & BRAND ASSETS */}
        {(activeTab === 'all' || activeTab === 'kit') && (
          <section className="media-kit-section wrap">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow"><span /> Media Kit & Resources</p>
                <h2>Official brand assets &<br /><em>executive resources.</em></h2>
              </div>
              <p className="heading-note">
                Official logos, company backgrounders, executive bios, and brand standards for media publications and partners.
              </p>
            </Reveal>

            <div className="media-kit-grid">
              <div className="kit-card">
                <div className="kit-icon">SVG</div>
                <h3>Official N Solutions Logo Pack</h3>
                <p>High-resolution vector SVG and transparent PNGs of the official brand logo in royal blue gradient, dark mode, and light mode.</p>
                <a 
                  className="kit-download-btn" 
                  href="/cursor-arrow.svg" 
                  download="n-solutions-brand-assets.zip"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Brand asset pack: Vector SVG & high-resolution PNG logos are packaged in the project repository.')
                  }}
                >
                  Download Logo Assets (ZIP) <FiArrowDown style={{ verticalAlign: 'middle' }} />
                </a>
              </div>

              <div className="kit-card">
                <div className="kit-icon">PDF</div>
                <h3>Corporate Profile & EPC Capabilities</h3>
                <p>Comprehensive factsheet outlining 16+ years of experience, 9-state footprint, MW-scale case studies, and PM Surya Ghar operations.</p>
                <a 
                  className="kit-download-btn" 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/contact')
                  }}
                >
                  Request Corporate Deck (PDF) <FiArrowUpRight style={{ verticalAlign: 'middle' }} />
                </a>
              </div>

              <div className="kit-card">
                <div className="kit-icon">BIO</div>
                <h3>Executive Leadership Biography</h3>
                <p>Official executive biography and leadership overview of Ch. C.S.V. Raju, Managing Partner of N Solutions.</p>
                <button 
                  type="button" 
                  className="kit-download-btn"
                  onClick={() => setActiveArticle(pressArticles[3])}
                >
                  View Executive Profile <FiArrowUpRight style={{ verticalAlign: 'middle' }} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* PRESS CONTACT & INQUIRIES */}
        <section className="media-contact-bar wrap">
          <div className="media-contact-inner">
            <div>
              <p className="eyebrow light"><span /> Press & Media Relations</p>
              <h2>Need an executive interview or official solar comment?</h2>
              <p>
                Our media relations desk assists journalists, industry analysts, and event organizers with technical solar data, verified facts, and leadership interviews.
              </p>
            </div>
            <div className="media-contact-action">
              <a 
                className="button button-accent" 
                href="mailto:info@nsolutions.in?subject=Media%20Inquiry%20-%20N%20Solutions"
              >
                Contact Press Desk <Arrow />
              </a>
              <span>Email: info@nsolutions.in · Vizianagaram / Visakhapatnam</span>
            </div>
          </div>
        </section>

        {/* ARTICLE FULL MODAL */}
        {activeArticle && (
          <div className="media-article-modal-backdrop" onClick={() => setActiveArticle(null)}>
            <div className="media-article-modal-card" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                className="modal-close-btn"
                onClick={() => setActiveArticle(null)}
                aria-label="Close article"
              >
                <FiX size={20} />
              </button>

              <div className="article-modal-header">
                <div className="article-modal-meta">
                  <span className="badge-tag">{activeArticle.tag}</span>
                  <span>{activeArticle.date}</span>
                  <span>·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h2>{activeArticle.title}</h2>
              </div>

              <div className="article-modal-image">
                <img src={activeArticle.image} alt={activeArticle.title} />
              </div>

              <div className="article-modal-body">
                {activeArticle.fullText.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="article-modal-footer">
                <button 
                  type="button" 
                  className="button button-ghost-dark"
                  onClick={() => setActiveArticle(null)}
                >
                  Back to Media Center
                </button>
                <a 
                  className="button button-accent"
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveArticle(null)
                    navigate('/contact')
                  }}
                >
                  Contact N Solutions <Arrow />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* PHOTO LIGHTBOX MODAL */}
        {activePhoto && (
          <div className="media-photo-lightbox-backdrop" onClick={() => setActivePhoto(null)}>
            <div className="photo-lightbox-card" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                className="modal-close-btn"
                onClick={() => setActivePhoto(null)}
              >
                <FiX size={20} />
              </button>
              <img src={activePhoto.src} alt={activePhoto.title} />
              <div className="photo-lightbox-caption">
                <span className="badge-tag">{activePhoto.category}</span>
                <h3>{activePhoto.title}</h3>
                <p><FiMapPin size={14} style={{ verticalAlign: 'middle', marginRight: 3 }} />{activePhoto.location}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
