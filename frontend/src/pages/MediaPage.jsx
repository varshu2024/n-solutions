import { useState, useEffect, useRef } from 'react'
import { SiteHeader, SiteFooter, Arrow, navigate } from '../components/Shared'
import { apiGet } from '../utils/api'
import { useSEO } from '../utils/useSEO'
import {
  FiPlay, FiX, FiArrowRight, FiCamera, FiVideo,
  FiBriefcase, FiUsers, FiFileText, FiChevronRight, FiEye,
  FiCalendar, FiClock, FiExternalLink
} from 'react-icons/fi'

const caseStudySteps = [
  { num: '01', title: 'Planning & Survey', desc: 'Site analysis, design and approvals.' },
  { num: '02', title: 'Installation', desc: 'Expert execution with quality and safety.' },
  { num: '03', title: 'Completed Project', desc: 'Clean energy for a brighter tomorrow.' }
]

const TABS = [
  { id: 'all',     label: 'All',          icon: <FiCamera size={14}/> },
  { id: 'videos',  label: 'Videos',       icon: <FiVideo size={14}/> },
  { id: 'clients', label: 'Clients',      icon: <FiUsers size={14}/> },
  { id: 'team',    label: 'Team / Photos',         icon: <FiUsers size={14}/> },
  { id: 'press',   label: 'Press & News', icon: <FiFileText size={14}/> },
]



/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function MediaPage() {
  const [activeTab, setActiveTab]       = useState('all')
  const [playingVideo, setPlayingVideo] = useState(null)
  const [lightbox, setLightbox]         = useState(null)
  const [videos, setVideos]             = useState([])
  const [clients, setClients]           = useState([])
  const [press, setPress]               = useState([])
  const [teamPhotos, setTeamPhotos]     = useState([])
  const videoRef = useRef(null)
  useSEO({
    title: 'Media & Gallery – Solar Projects, Videos, Press & Team',
    description: "Explore N Solutions' media gallery: project photos, installation videos, client stories, team moments and press coverage of our solar EPC work across India.",
    keywords: 'N Solutions media, solar project gallery, solar videos, solar press, client testimonials, solar team, solar EPC gallery India',
    canonical: 'https://nsolutions.in/media',
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const loadMedia = async () => {
      try {
        const result = await apiGet('/public/media')
        if (!result?.success) return

        const data = result.data || {}
        setVideos((data.videos || []).map(video => ({
          id: video.id || video._id,
          title: video.title || '',
          description: video.description || '',
          videoUrl: video.videoUrl || ''
        })))
        setTeamPhotos((data.gallery || [])
          .filter(item => item.category === 'Company' && item.image?.url)
          .map(item => ({
            id: item.id || item._id,
            img: item.image.url,
            label: item.title || '',
            description: item.description || ''
          })))
        setPress((data.news || []).map(item => ({
          id: item.id || item._id,
          title: item.title || '',
          description: item.summary || item.description || '',
          url: item.articleUrl || '#'
        })))
        setClients((data.clients || []).map(item => ({
          id: item.id || item._id,
          name: item.name || '',
          image: item.image?.url || '',
          description: item.description || item.quote || ''
        })))
      } catch (err) {
        console.error('Failed to load media:', err)
      }
    }
    loadMedia()
  }, [])

  const show = (tab) => activeTab === 'all' || activeTab === tab

  return (
    <div className="mg-page">
      <SiteHeader activePath="/media" />

      <main>
        {/* ── HERO ── */}
        <section className="mg-hero">
          <div className="mg-hero-img" aria-hidden="true" />
          <div className="mg-hero-shade" />
          <div className="mg-hero-content wrap">
            <p className="mg-eyebrow"><span className="mg-eyebrow-line" /> MEDIA &amp; GALLERY</p>
            <h1 className="mg-hero-h1">
              Our Journey,<br />
              Captured in <em>Every Moment</em>
            </h1>
            <p className="mg-hero-sub">
              A glimpse of our projects, people, clients and milestones in building a cleaner and sustainable tomorrow.
            </p>
            <button
              type="button"
              className="mg-hero-play-btn"
              onClick={() => {
                const firstVideo = videos?.[0] || videoItems?.[0];
                if (firstVideo) setPlayingVideo(firstVideo);
              }}
            >
              <span className="mg-play-circle"><FiPlay size={18} /></span>
              <span>
                <strong>Watch Our Story</strong>
                <small>1:48 · Company Overview</small>
              </span>
            </button>
          </div>

          {/* stats strip */}
          <div className="mg-stats-strip">
            <div className="mg-stat"><FiCamera size={16}/><strong>150+</strong><small>Project Photos</small></div>
            <div className="mg-stat"><FiVideo size={16}/><strong>50+</strong><small>Video Highlights</small></div>
            <div className="mg-stat"><FiUsers size={16}/><strong>25+</strong><small>Clients with Projects</small></div>
            <div className="mg-stat"><FiFileText size={16}/><strong>20+</strong><small>Press Mentions</small></div>
          </div>
        </section>

        {/* ── TABS ── */}
        <div className="mg-tabs-bar">
          <div className="mg-tabs-inner wrap">
            {TABS.map(t => (
              <button
                key={t.id}
                type="button"
                className={`mg-tab${activeTab === t.id ? ' is-active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── VIDEOS ── */}
        {show('videos') && (
          <section className="mg-section wrap">
            <div className="mg-section-head">
              <div>
                <p className="mg-sec-eyebrow"><span className="mg-eyebrow-line" /> VIDEOS</p>
                <h2 className="mg-sec-h2">Watch <em>Our Story</em></h2>
                <p className="mg-sec-sub">Project highlights, installation process, client stories and our journey towards clean energy.</p>
              </div>
              <button type="button" className="mg-view-all-btn" onClick={() => setActiveTab('videos')}>
                View All Videos <FiArrowRight size={14}/>
              </button>
            </div>

            <div className="mg-videos-grid">
              {videos.map(v => (
                <div key={v.id} className="mg-video-card">
                  <div className="mg-vc-thumb">
                    <video
                      src={v.videoUrl}
                      controls
                      playsInline
                      aria-label={v.title}
                    />
                  </div>
                  <div className="mg-vc-body">
                    <strong className="mg-vc-title">{v.title}</strong>
                    <p className="mg-vc-desc">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {show('clients') && (
          <section className="mg-section wrap">
            <div className="mg-section-head">
              <div>
                <p className="mg-sec-eyebrow"><span className="mg-eyebrow-line" /> OUR CLIENTS</p>
                <h2 className="mg-sec-h2">Clients with <em>Real Impact</em></h2>
                <p className="mg-sec-sub">Partnering with homes, businesses, industries and farms for a sustainable future.</p>
              </div>
              <button type="button" className="mg-view-all-btn" onClick={() => navigate('/projects')}>
                View All Clients <FiArrowRight size={14}/>
              </button>
            </div>

            <div className="mg-clients-grid">
              {clients.map(c => (
                <div key={c.id} className="mg-client-card">
                  <div className="mg-client-top">
                    {c.image ? (
                      <img
                        src={c.image}
                        alt={c.name}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          flexShrink: 0
                        }}
                      />
                    ) : (
                      <div className="mg-client-initial">{c.name ? c.name.charAt(0) : 'C'}</div>
                    )}
                    <div>
                      <strong className="mg-client-name">{c.name}</strong>
                    </div>
                  </div>
                  <p className="mg-client-quote">{c.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── TEAM ── */}
        {show('team') && (
          <section className="mg-section mg-section-alt">
            <div className="wrap">
              <div className="mg-section-head">
                <div>
                  <p className="mg-sec-eyebrow"><span className="mg-eyebrow-line" /> OUR TEAM / Photos Archive</p>
                  <h2 className="mg-sec-h2">People Behind <em>the Progress</em></h2>
                  <p className="mg-sec-sub">Our dedicated team working together to create a cleaner and brighter tomorrow.</p>
                </div>
                <button type="button" className="mg-view-all-btn">
                  View All Moments <FiArrowRight size={14}/>
                </button>
              </div>

              <div className="mg-team-grid">
                {teamPhotos.map(t => (
                  <div key={t.id} className="mg-team-card" onClick={() => setLightbox({ type: 'photo', src: t.img, title: t.label, description: t.description })}>
                    <img src={t.img} alt={t.label} loading="lazy"/>
                    <span className="mg-team-label">
                      <strong>{t.label}</strong>
                      {t.description && <small className="mg-team-description">{t.description}</small>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── PRESS & NEWS ── */}
        {show('press') && (
          <section className="mg-section wrap">
            <div className="mg-section-head">
              <div>
                <p className="mg-sec-eyebrow"><span className="mg-eyebrow-line" /> PRESS &amp; NEWS</p>
                <h2 className="mg-sec-h2">In the <em>News</em></h2>
                <p className="mg-sec-sub">Latest media coverage, announcements and updates about our projects and impact.</p>
              </div>
              <button type="button" className="mg-view-all-btn" onClick={() => setActiveTab('press')}>
                View All Press &amp; News <FiArrowRight size={14}/>
              </button>
            </div>

            <div className="mg-press-grid">
              {press.map(pr => (
                <a key={pr.id} className="mg-press-card" href={pr.url} target="_blank" rel="noopener noreferrer">
                  <div className="mg-press-body">
                    <p className="mg-press-title">{pr.title}</p>
                    <p>{pr.description}</p>
                    <span className="mg-press-link">Read More <FiExternalLink size={11}/></span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ── FEATURED CASE STUDY ── */}
        {(activeTab === 'all') && (
          <section className="mg-case-section">
            <div className="wrap mg-case-inner">
              <div className="mg-case-left">
                <p className="mg-sec-eyebrow light-eyebrow"><span className="mg-eyebrow-line light" /> FEATURED STORY</p>
                <h2 className="mg-case-h2">
                  From Planning to<br /><em>Power Generation</em>
                </h2>
                <p className="mg-case-desc">
                  A real project story showcasing our end-to-end execution from design to clean energy delivery.
                </p>
                <button type="button" className="mg-case-cta" onClick={() => navigate('/projects')}>
                  View Full Case Study <FiArrowRight size={14}/>
                </button>
              </div>

              <div className="mg-case-steps">
                {caseStudySteps.map((s, i) => (
                  <div key={s.num} className="mg-case-step">
                    <span className="mg-case-num">{s.num}</span>
                    <div className="mg-case-step-img">
                      <img
                        src={[
                          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
                          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=300&q=80',
                          'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=300&q=80'
                        ][i]}
                        alt={s.title}
                        loading="lazy"
                      />
                    </div>
                    <strong className="mg-case-step-title">{s.title}</strong>
                    <p className="mg-case-step-desc">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ── VIDEO MODAL ── */}
      {playingVideo && (
        <div className="mg-modal-backdrop" onClick={() => setPlayingVideo(null)}>
          <div className="mg-video-modal" onClick={e => e.stopPropagation()}>
            <button type="button" className="mg-modal-close" onClick={() => setPlayingVideo(null)} aria-label="Close">
              <FiX size={20}/>
            </button>
            <div className="mg-video-modal-meta">
              <strong>{playingVideo.title}</strong>
            </div>
            <video
              ref={videoRef}
              key={playingVideo.videoUrl}
              controls
              autoPlay
              playsInline
              className="mg-video-player"
            >
              <source src={playingVideo.videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* ── PHOTO LIGHTBOX ── */}
      {lightbox && lightbox.type === 'photo' && (
        <div className="mg-modal-backdrop" onClick={() => setLightbox(null)}>
          <div className="mg-photo-modal" onClick={e => e.stopPropagation()}>
            <button type="button" className="mg-modal-close" onClick={() => setLightbox(null)} aria-label="Close">
              <FiX size={20}/>
            </button>
            <img src={lightbox.src} alt={lightbox.title} />
            <div className="mg-photo-modal-caption">
              <strong>{lightbox.title}</strong>
              {lightbox.description && <p>{lightbox.description}</p>}
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  )
}
