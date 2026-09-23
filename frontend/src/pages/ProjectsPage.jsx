import { useState, useEffect } from 'react'
import { SiteHeader, SiteFooter, Arrow, AnimatedMetric, Reveal, navigate } from '../components/Shared'
import { apiGet } from '../utils/api'

const PUBLIC_PROJECT_CATEGORY_MAP = {
  residential: 'residential',
  commercial: 'commercial',
  industrial: 'industrial',
  Government: 'commercial'
}

const PUBLIC_PROJECT_CATEGORY_LABELS = {
  residential: 'PM Surya Ghar Residential',
  commercial: 'Commercial & Institutional',
  industrial: 'Industrial Rooftops & Sheds',
  Government: 'Government'
}

function mapPublicProject(project) {
  const apiCategory = project?.category || 'commercial'
  const category = PUBLIC_PROJECT_CATEGORY_MAP[apiCategory] || 'commercial'
  const services = Array.isArray(project?.services)
    ? project.services.filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim())
    : []
  const image = project?.image?.url || ''
  const createdAt = project?.createdAt ? new Date(project.createdAt) : null
  const year = createdAt && !Number.isNaN(createdAt.getTime()) ? String(createdAt.getFullYear()) : ''

  return {
    id: project?.id,
    title: project?.title || '',
    category,
    categoryLabel: PUBLIC_PROJECT_CATEGORY_LABELS[apiCategory] || 'Commercial & Institutional',
    capacity: '',
    location: project?.location || '',
    client: '',
    year,
    status: '',
    image,
    gallery: image ? [image] : [],
    headline: project?.description || '',
    summary: project?.description || '',
    specs: null,
    highlights: services.length ? services : null
  }
}

function normalizePublicProjects(payload) {
  if (!Array.isArray(payload)) return []
  return payload.map(mapPublicProject).filter((project) => project.id && project.title)
}

export const projectsData = [
  {
    id: 'proj-coastal-corp',
    title: '3.6 MWp Ground Mount Solar Power Plant at Coastal Corporation Ltd',
    category: 'ground-mount',
    categoryLabel: 'Ground Mount EPC',
    capacity: '3.6 MWp Ground Mount',
    location: 'Sompeta, Srikakulam District, Andhra Pradesh',
    client: 'Coastal Corporation Ltd',
    year: '2023',
    status: 'Commissioned & Operational',
    image: '/projects/coastal-corp-3-6mwp-sompeta-aerial.jpg',
    gallery: [
      '/projects/coastal-corp-3-6mwp-sompeta-aerial.jpg',
      '/projects/coastal-corp-sompeta-substation.jpg',
      '/projects/coastal-corp-overview.jpg'
    ],
    headline: 'Utility-scale 3.6 MWp ground-mounted solar plant delivering captive green energy with on-site substation yard.',
    summary: 'Comprehensive turnkey EPC execution including land grading, piling, mounting structure installation, solar PV arrays, dedicated step-up power transformer substation yard, and high-voltage grid tie-in for Coastal Corporation Ltd at Sompeta.',
    specs: {
      modules: 'Tier-1 High-Efficiency Bi-Facial Mono PERC Modules (25-Year Warranty)',
      inverters: 'Central & High-Capacity Multi-MPPT Utility-Grade String Inverters',
      generation: 'Over 5,500,000 kWh clean power generated annually',
      co2Offset: '4,400+ Metric Tonnes CO2 avoided per year',
      gridSync: 'Dedicated HT bay evacuation with on-site step-up transformer substation',
      structure: 'Ground-mount fixed-tilt galvanized structural steel designed for coastal wind loads'
    },
    highlights: [
      'Turnkey EPC executed across challenging coastal topography with dedicated civil piling',
      'On-site high-voltage step-up power transformer substation yard with lightning mast protection',
      'Off-sets over 70% of energy requirements for commercial marine processing facilities',
      'Continuous SCADA generation monitoring with automated weather sensor telemetry'
    ]
  },
  {
    id: 'proj-jharkhand-high-court',
    title: '1.6 MWp Solar Car Port at Jharkhand High Court',
    category: 'carport',
    categoryLabel: 'Solar Car Port',
    capacity: '1.6 MWp Car Port Canopy',
    location: 'Jharkhand High Court Campus, Ranchi, Jharkhand',
    client: 'Jharkhand High Court / Government Institutional',
    year: '2023',
    status: 'Completed & Operational',
    image: '/projects/jharkhand-high-court-carport-aerial.jpg',
    gallery: [
      '/projects/jharkhand-high-court-carport-aerial.jpg',
      '/projects/jharkhand-high-court-carport-cars.jpg',
      '/projects/jharkhand-high-court-carport-building.jpg',
      '/projects/jharkhand-high-court-carport-canopy.jpg'
    ],
    headline: 'Massive 1.6 MWp solar car port canopy sheltering hundreds of vehicles while generating clean power.',
    summary: 'Architectural landmark solar carport engineered across the vast vehicle parking zones of the Jharkhand High Court in Ranchi. Features high-clearance galvanized structural steel cantilevers providing shade for hundreds of cars and two-wheelers with dual-purpose solar energy harvesting.',
    specs: {
      modules: 'High-Efficiency Mono PERC Solar Panels with anti-reflective coating',
      inverters: 'Three-Phase Grid-Tied Inverters with surge protection Type II',
      generation: '2,400,000+ kWh clean solar electricity annually',
      co2Offset: '1,950 Metric Tonnes CO2 avoided / year',
      gridSync: 'High-voltage grid synchronization with institutional feeder',
      structure: 'Heavy-duty hot-dip galvanized GI cantilever car-port frames (JSW / Mangal)'
    },
    highlights: [
      'Dual-utility infrastructure: Weather-protected parking for hundreds of vehicles + mega clean power',
      'High-clearance cantilever structural design engineered for heavy wind gusts and vehicle safety',
      'Landmark government judiciary campus installation setting benchmarks in institutional green transition',
      'Integrated LED illumination under canopy ceiling and concealed cable tray architecture'
    ]
  },
  {
    id: 'proj-saint-gobain',
    title: '1.5 MWp Industrial Rooftop Solar Power Plant at Saint Gobain',
    category: 'industrial',
    categoryLabel: 'Industrial Rooftop',
    capacity: '1.5 MWp Industrial Rooftop',
    location: 'Atchutapuram SEZ / Industrial Area, Visakhapatnam, AP',
    client: 'Saint-Gobain India',
    year: '2024',
    status: 'Operational',
    image: '/projects/saint-gobain-1-5mwp-vizag-shed.jpg',
    gallery: [
      '/projects/saint-gobain-1-5mwp-vizag-shed.jpg',
      '/projects/saint-gobain-1-5mwp-vizag-roof1.jpg',
      '/projects/saint-gobain-1-5mwp-vizag-walkway.jpg'
    ],
    headline: 'Megawatt-scale industrial metal shed rooftop solar offsetting heavy manufacturing energy loads.',
    summary: 'Turnkey engineering on Saint-Gobain\'s massive industrial manufacturing sheds in Atchutapuram. Custom-engineered clamp mounting without drilling through sheet profiles to preserve factory roof integrity, integrated with fall-arrest lifelines and safety walkways.',
    specs: {
      modules: 'Bi-Facial 625 Wp Mono PERC NDCR Solar Panels',
      inverters: 'Multi-MPPT High-Capacity Industrial Inverters with IP66 enclosures',
      generation: '2,250,000 kWh clean captive energy annually',
      co2Offset: '1,840 Metric Tonnes CO2 avoided per year',
      gridSync: 'LT / HT Net-metering with reverse power relay & DG synchronization',
      structure: 'Anodized aluminum roof-seam clamps with EPDM weather-proofing gaskets'
    },
    highlights: [
      'Engineered for Saint-Gobain\'s international manufacturing quality and industrial safety standards',
      '100% leak-proof zero-drill mounting on standing seam metal roofing sheets',
      'Reduces enterprise electricity bill overheads by ₹1.8+ Crores per annum',
      'Equipped with full-length walkway grid and lifeline safety harness systems for O&M staff'
    ]
  },
  {
    id: 'proj-sikidiri-dam',
    title: '2 MWp Canal Top Solar Power Plant at Sikidiri Dam',
    category: 'ground-mount',
    categoryLabel: 'Canal Top Solar',
    capacity: '2 MWp Canal Top',
    location: 'Sikidiri Dam Water Canal, Jharkhand',
    client: 'State Renewable Energy / Water Resources Dept',
    year: '2023',
    status: 'Commissioned',
    image: '/projects/sikidiri-dam-2mwp-canal-top-structure.jpg',
    gallery: [
      '/projects/sikidiri-dam-2mwp-canal-top-structure.jpg',
      '/projects/sikidiri-dam-canal-solar-array1.jpg',
      '/projects/sikidiri-dam-canal-solar-array2.jpg',
      '/projects/sikidiri-dam-2mwp-substation.jpg',
      '/projects/sikidiri-dam-canal-engineers.jpg'
    ],
    headline: 'Innovative canal top solar engineering preserving agricultural water while generating 2 MWp.',
    summary: 'A flagship engineering marvel mounting solar arrays over flowing water canals at Sikidiri Dam. The canal-top structure eliminates the need for land acquisition, cools the solar modules from water evaporation for higher yield, and prevents millions of gallons of water loss through surface evaporation.',
    specs: {
      modules: 'Water-Resistant Dual-Glass Bi-facial Solar Modules',
      inverters: 'Weatherproof Inverter Enclosure with compact step-up transformer',
      generation: '3,100,000 kWh annual green energy',
      co2Offset: '2,540 Metric Tonnes CO2 offset / year',
      gridSync: 'Evacuation to regional 33kV substation feeder',
      structure: 'High-strength structural steel lattice trusses spanning across the canal embankments'
    },
    highlights: [
      'Zero land acquisition required—ingeniously utilizes canal air-rights and embankments',
      'Conserves over 18 Million Liters of vital agricultural irrigation water from evaporation every year',
      'Natural evaporative cooling beneath modules boosts electrical conversion efficiency by 4-6%',
      'Integrated compact transformer substation yard and remote telemetry system'
    ]
  },
  {
    id: 'proj-pokarna-stone',
    title: '2 MWp Solar Power Plant - Tin Shed at POKARNA STONE',
    category: 'industrial',
    categoryLabel: 'Industrial Tin Shed',
    capacity: '2 MWp Tin Shed Rooftop',
    location: 'Pokarna Engineered Stone Facility, Hyderabad, Telangana',
    client: 'Pokarna Engineered Stone Ltd',
    year: '2023',
    status: 'Commissioned',
    image: '/projects/pokarna-stone-2mwp-tin-shed1.jpg',
    gallery: [
      '/projects/pokarna-stone-2mwp-tin-shed1.jpg',
      '/projects/pokarna-stone-2mwp-tin-shed2.jpg',
      '/projects/pokarna-stone-2mwp-solis-inverters.jpg',
      '/projects/pokarna-stone-2mwp-inverter-room.jpg'
    ],
    headline: 'High-yield tin shed solar plant powering precision stone processing operations.',
    summary: 'Deployed on extensive curved and pitched industrial tin shed roofs at Pokarna Stone\'s manufacturing campus. Featuring an outdoor Solis string inverter bank, dedicated indoor control room, and DG-synchronization relay.',
    specs: {
      modules: 'Mono PERC Half-Cut Tier-1 Solar Panels',
      inverters: 'Bank of Multi-MPPT Solis & SG Industrial 3-Phase Inverters',
      generation: '3,000,000 kWh green energy generated per annum',
      co2Offset: '2,450 Metric Tonnes CO2 avoided / year',
      gridSync: 'HT connection with automated reverse power protection and DG-sync relay',
      structure: 'Curved and pitched industrial tin shed elevated mounting rails'
    },
    highlights: [
      'Powers energy-intensive stone cutting, polishing, and manufacturing assembly lines',
      'Outdoor inverter station equipped with 10kW to 100kW string inverters and Polycab armoured cables',
      'Central indoor control and monitoring switchgear room with real-time SCADA telemetry',
      'Payback period achieved in just 3.2 years of continuous industrial operation'
    ]
  },
  {
    id: 'proj-dr-reddys',
    title: '519.93 KWp Solar Rooftop System & Car Port at Dr. Reddy\'s Laboratories',
    category: 'carport',
    categoryLabel: 'Pharma Rooftop & Carport',
    capacity: '519.93 KWp Rooftop & Carport',
    location: 'Dr. Reddy\'s Laboratories Campus, Hyderabad / AP',
    client: 'Dr. Reddy\'s Laboratories Ltd',
    year: '2023',
    status: 'Completed & Commissioned',
    image: '/projects/dr-reddys-520kwp-rooftop.jpg',
    gallery: [
      '/projects/dr-reddys-520kwp-rooftop.jpg',
      '/projects/dr-reddys-520kwp-carport-inauguration.jpg',
      '/projects/dr-reddys-520kwp-substation-yard.jpg',
      '/projects/dr-reddys-520kwp-transformer-station.jpg',
      '/projects/dr-reddys-520kwp-inverter-kiosk.jpg'
    ],
    headline: 'Pharmaceutical campus solar integration combining industrial rooftop arrays with executive carport canopies.',
    summary: 'Engineered to meet stringent pharmaceutical quality and electrical isolation standards. Includes dedicated HT transformer yard, elevated executive car park canopy with festive inauguration, and high-efficiency rooftop PV arrays.',
    specs: {
      modules: 'Bi-Facial Mono PERC 545Wp Modules',
      inverters: 'Multi-MPPT High Efficiency Inverters with dedicated outdoor weather kiosk',
      generation: '780,000 kWh annual clean energy yield',
      co2Offset: '640 Metric Tonnes CO2 avoided per year',
      gridSync: 'Dedicated HT substation yard with oil-cooled step-up transformer',
      structure: 'Elevated executive carport canopy + Rooftop framing'
    },
    highlights: [
      'Stringent pharmaceutical cGMP electrical safety and isolation compliance',
      'Combines cleanroom rooftop solar power with an executive vehicle solar parking canopy',
      'Dedicated on-site electrical transformer station and covered outdoor inverter kiosks',
      'Commissioned with full ceremony in presence of senior pharma leadership'
    ]
  },
  {
    id: 'proj-port-stadium',
    title: '590 KWp Solar Rooftop (Ballast Model) at Port Indoor Stadium',
    category: 'commercial',
    categoryLabel: 'Ballast Model Rooftop',
    capacity: '590 KWp Ballast Rooftop',
    location: 'Port Indoor Stadium, Visakhapatnam Port Authority, AP',
    client: 'Visakhapatnam Port Authority (Govt of India)',
    year: '2024',
    status: 'Commissioned',
    image: '/projects/port-indoor-stadium-590kwp-ballast-roof.jpg',
    gallery: [
      '/projects/port-indoor-stadium-590kwp-ballast-roof.jpg',
      '/projects/port-indoor-stadium-590kwp-inverters.jpg',
      '/projects/port-indoor-stadium-590kwp-substation.jpg'
    ],
    headline: '590 KWp non-penetrative ballast solar plant atop premier maritime port indoor sports stadium.',
    summary: 'Engineered with precast concrete ballast blocks to avoid any roof drilling or structural piercing on the stadium dome roof. Paired with outdoor step-up transformer and an elevated walk-in inverter bank.',
    specs: {
      modules: 'High-Efficiency Tier-1 Solar Modules',
      inverters: 'Multi-unit commercial string inverter bank with weather canopy',
      generation: '885,000 kWh clean power per year',
      co2Offset: '725 Metric Tonnes CO2 avoided / year',
      gridSync: 'APEPDCL HT net-metering synchronization with outdoor substation kiosk',
      structure: 'Non-penetrating aerodynamic concrete ballast mounts (zero roof punctures)'
    },
    highlights: [
      '100% non-penetrative ballast mounting engineered for sports arena domed roofing',
      'Outdoor high-voltage transformer kiosk delivering clean power directly into stadium grid',
      'Dedicated elevated service walkway and sheltered inverter banks for easy maintenance',
      'Executed for Visakhapatnam Port Authority under national port greening initiatives'
    ]
  },
  {
    id: 'proj-dmart-carports',
    title: 'D-Mart Solar Car Port Canopies (20 Retail Hypermarket Locations)',
    category: 'carport',
    categoryLabel: 'Commercial Retail Carport',
    capacity: 'Multi-Location Portfolio (20 Sites)',
    location: '20 D-Mart Hypermarkets across AP, Telangana, Maharashtra & Karnataka',
    client: 'Avenue Supermarts Ltd (D-Mart)',
    year: '2023 - 2024',
    status: 'Completed Across 20 Stores',
    image: '/projects/dmart-carport-20locations-aerial.jpg',
    gallery: [
      '/projects/dmart-carport-20locations-aerial.jpg',
      '/projects/dmart-carport-20locations-street.jpg'
    ],
    headline: 'Distributed retail solar carports transforming commercial parking lots into clean power generators.',
    summary: 'Custom high-clearance twin solar canopies installed over customer parking lots across 20 D-Mart hypermarkets. Protects customer vehicles from harsh sun and weather while directly supplying clean solar electricity to retail refrigeration and air-conditioning.',
    specs: {
      modules: 'High-Wattage Mono PERC Modules',
      inverters: 'Commercial smart grid inverters with automatic retail load synchronization',
      generation: 'Over 3,200,000 kWh generated across 20 retail stores',
      co2Offset: '2,600 Metric Tonnes CO2 avoided annually',
      gridSync: 'Individual retail store net-metering synchronization',
      structure: 'Galvanized high-clearance steel canopies with integrated LED lighting and cable trays'
    },
    highlights: [
      'Multi-state rollout across 20 retail stores executed with standardized modular canopy design',
      'High-clearance two-way vehicular entry and parking protection against sun and rain',
      'Powers retail refrigeration, central chilling plants, and commercial store operations',
      'Zero downtime to daily retail store operations during installation and commissioning'
    ]
  },
  {
    id: 'proj-ramky-pharma',
    title: '300 KWp Solar Power Plant (Ballast Model) at Ramky Pharmaceuticals',
    category: 'industrial',
    categoryLabel: 'Industrial Ballast Rooftop',
    capacity: '300 KWp Ballast Rooftop',
    location: 'Ramky Pharma City, Parawada / Hyderabad',
    client: 'Ramky Group / Ramky Pharmaceuticals',
    year: '2023',
    status: 'Commissioned',
    image: '/projects/ramky-pharma-300kwp-ballast-model.jpg',
    gallery: [
      '/projects/ramky-pharma-300kwp-ballast-model.jpg',
      '/projects/ramky-pharma-ballast-array.jpg',
      '/projects/ramky-pharma-indicube-rooftop-work.jpg',
      '/projects/ramky-pharma-inverter-enclosure.jpg'
    ],
    headline: 'Ballast model solar rooftop plant engineered for sensitive pharmaceutical cleanrooms.',
    summary: 'Executed with non-puncturing ballast foundations to maintain air-tight and water-tight containment of pharmaceutical facilities. Accompanied by outdoor weatherproof inverter enclosures and precision balance-of-system.',
    specs: {
      modules: 'Bi-Facial Mono PERC NDCR Solar Panels',
      inverters: 'Grid Inverters with compact weatherproof outdoor kiosk',
      generation: '450,000 kWh annual clean output',
      co2Offset: '370 Metric Tonnes CO2 avoided / year',
      gridSync: 'Industrial LT/HT synchronized net-metering',
      structure: 'Zero-roof-penetration precast ballast blocks'
    },
    highlights: [
      'Zero-penetration concrete ballast structure preserving pharma cleanroom waterproofing',
      'High-grade stainless steel hardware and chemical earthing systems',
      'Weather-shielded outdoor inverter kiosk with automated isolation breakers',
      'Continuous savings on high-tariff industrial commercial power bills'
    ]
  },
  {
    id: 'proj-pm-surya-ghar',
    title: 'PM Surya Ghar 500+ Residential Rooftop Cluster',
    category: 'residential',
    categoryLabel: 'PM Surya Ghar',
    capacity: '1.8+ MWp Cumulative (500+ Sites)',
    location: 'Vizianagaram District & North Coastal Andhra Pradesh',
    client: 'APEPDCL & NREDCAP Empaneled Residential Beneficiaries',
    year: '2024 - 2026',
    status: '500+ Completed Sites (250+ in Pipeline)',
    image: '/projects/pm-surya-ghar-vizianagaram-elevated-gi.jpg',
    gallery: [
      '/projects/pm-surya-ghar-vizianagaram-elevated-gi.jpg'
    ],
    headline: '500+ residential homes solarized under PM Surya Ghar Muft Bijli Yojana in Vizianagaram within 7 months.',
    summary: 'Official empaneled vendor by APEPDCL and NREDCAP under National Portal. Installing elevated 7x8 ft GI box pipe structures (JSW/Mangal) with Bi-Facial 625 Wp Mono PERC NDCR solar panels and Deye/Microtek 3-phase grid inverters, delivering zero electricity bills and up to ₹78,000 direct bank subsidy per household.',
    specs: {
      modules: 'Bi-Facial 625 Wp Mono PERC NDCR Solar Panels (25-Year Performance Warranty)',
      inverters: '3 kW, 5 kW & 10 kW Deye / Microtek 3-Phase Grid Inverters (10-Year Warranty)',
      generation: 'Over 2,700,000 kWh clean green energy generated annually',
      co2Offset: '2,200 Metric Tonnes CO2 avoided / year',
      gridSync: 'APEPDCL Net-metering synchronization with bi-directional smart meters',
      structure: 'Elevated Structure 7 x 8 FT GI Box Pipes (JSW / Mangal) with 180 km/h wind resilience'
    },
    highlights: [
      'Empaneled direct vendor under National PM Surya Ghar Portal (Order Ref: 570375/25)',
      'Delivered 500+ sites in Vizianagaram alone within 7 months; 250+ further sites in active rollout',
      'End-to-end processing of DISCOM net-metering and direct DBT subsidy up to ₹78,000 into bank accounts',
      'Equipped with Polycab 4 sq mm DC / 50 sq mm AC cables, chemical earth pits & lightning arrestors'
    ]
  },
  {
    id: 'proj-ramky-indicube',
    title: 'Grandiose & Indicube Solar Rooftop Systems, Hyderabad',
    category: 'commercial',
    categoryLabel: 'Commercial Office Complex',
    capacity: '180 kWp Commercial Complex',
    location: 'Financial District / Hyderabad, Telangana',
    client: 'Ramky Group / Indicube',
    year: '2023',
    status: 'Completed',
    image: '/projects/ramky-pharma-indicube-building-view.jpg',
    gallery: [
      '/projects/ramky-pharma-indicube-building-view.jpg',
      '/projects/ramky-pharma-indicube-rooftop-work.jpg'
    ],
    headline: 'Urban commercial and co-working solar rooftop system with architectural aesthetics.',
    summary: 'Installed on modern multi-storey commercial complexes in Hyderabad, providing renewable self-consumption during daytime peak electricity tariff hours.',
    specs: {
      modules: 'High-Efficiency Mono PERC Solar Panels',
      inverters: 'Smart Commercial Three-Phase Inverters with cloud telemetry',
      generation: '270,000 kWh annual clean yield',
      co2Offset: '220 Metric Tonnes CO2 avoided annually',
      gridSync: 'Commercial LT Net-metering sync with building management system (BMS)',
      structure: 'Custom flat-roof aluminum mounting brackets and safety perimeter'
    },
    highlights: [
      'Custom architectural layout preserving aesthetic sightlines of corporate office building',
      'Significant reduction in daytime air-conditioning and enterprise IT server power costs',
      'Real-time cloud energy dashboard viewable on corporate building management screens',
      'Turnkey delivery with zero disruption to corporate co-working occupants'
    ]
  }
]

export const clientList = [
  'TATA Power Solar',
  'ReNew Power',
  'Adani Solar',
  'Saint-Gobain',
  'Dr. Reddy\'s Laboratories',
  'D-Mart (Avenue Supermarts)',
  'Pokarna Engineered Stone',
  'Coastal Corporation Ltd',
  'Ramky Pharmaceuticals',
  'Jharkhand High Court',
  'Visakhapatnam Port Authority',
  'Kalpa Power',
  'Premier Energy',
  'Shakti Pumps',
  'Jain Irrigation Systems',
  'Kosol Energie',
  'Andhra University',
  'JNTU Kakinada',
  'Airtel',
  'Novus Green',
  'Four Solar',
  'Greenpeace',
  'Naviya Technologies',
  'Access Solar'
]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeModalImg, setActiveModalImg] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [projects, setProjects] = useState([])
  const [catalogStatus, setCatalogStatus] = useState('loading')
  const [catalogError, setCatalogError] = useState('')
  const [detailStatus, setDetailStatus] = useState('idle')
  const [detailError, setDetailError] = useState('')

  const loadProjects = async () => {
    setCatalogStatus('loading')
    setCatalogError('')

    const result = await apiGet('/public/projects')
    if (!result.success) {
      setProjects([])
      setCatalogStatus('error')
      setCatalogError(result.message || 'Unable to load projects. Please try again.')
      return
    }

    const nextProjects = normalizePublicProjects(result.data)
    setProjects(nextProjects)
    setCatalogStatus(nextProjects.length ? 'ready' : 'empty')
  }

  const openProjectDetails = async (project, { fetchDetails = false } = {}) => {
    setSelectedProject(project)
    setDetailError('')
    setDetailStatus('idle')

    if (!fetchDetails || !project?.id) return

    setDetailStatus('loading')
    const result = await apiGet(`/public/projects/${project.id}`)
    if (!result.success) {
      setDetailStatus('error')
      setDetailError(result.message || 'Unable to load project details. Please try again.')
      return
    }

    const detailed = mapPublicProject(result.data)
    setSelectedProject((current) => (current && current.id === detailed.id ? { ...current, ...detailed } : current))
    setDetailStatus('ready')
  }

  useEffect(() => {
    document.title = 'Projects Showcase | N Solutions Solar EPC'
    window.scrollTo({ top: 0, behavior: 'smooth' })
    loadProjects()
  }, [])

  // Update modal active image when selectedProject changes
  useEffect(() => {
    if (selectedProject) {
      setActiveModalImg(selectedProject.image)
    }
  }, [selectedProject])

  const categories = [
    { id: 'ALL', label: 'All Projects', count: projects.length },
    { id: 'ground-mount', label: 'Ground Mount & Utility', count: projects.filter(p => p.category === 'ground-mount').length },
    { id: 'carport', label: 'Solar Car Ports', count: projects.filter(p => p.category === 'carport').length },
    { id: 'industrial', label: 'Industrial Rooftops & Sheds', count: projects.filter(p => p.category === 'industrial').length },
    { id: 'residential', label: 'PM Surya Ghar Residential', count: projects.filter(p => p.category === 'residential').length },
    { id: 'commercial', label: 'Commercial & Institutional', count: projects.filter(p => p.category === 'commercial').length },
  ]

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'ALL' || project.category === activeCategory
    const query = searchQuery.toLowerCase()
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(query) ||
      project.location.toLowerCase().includes(query) ||
      (project.capacity || '').toLowerCase().includes(query) ||
      (project.client || '').toLowerCase().includes(query) ||
      (project.headline || '').toLowerCase().includes(query) ||
      (project.categoryLabel || '').toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="projects-page">
      <SiteHeader activePath="/projects" />

      <main>
        {/* HERO SECTION */}
        <section className="projects-hero">
          <div className="projects-hero-bg-visual" />
          <div className="projects-hero-shade" />

          <div className="wrap projects-hero-content">
            <p className="eyebrow light">
              <span /> 16+ Years · 9 States · MW-Scale to Rooftop
            </p>
            <h1>
              Proven Solar Projects.<br />
              <em>Engineered for Lasting Yield.</em>
            </h1>
            <p className="projects-hero-lead">
              From the 3.6 MWp ground-mount plant at Coastal Corporation and 1.6 MWp solar carport at Jharkhand High Court, to 1.5 MWp at Saint-Gobain, 2 MWp canal-top at Sikidiri Dam, and 500+ residential PM Surya Ghar installations in Vizianagaram—our track record proves disciplined engineering and verified performance.
            </p>

            <div className="projects-hero-actions">
              <a 
                className="button button-accent" 
                href="/contact" 
                onClick={(e) => { e.preventDefault(); navigate('/contact') }}
              >
                Discuss Your Solar Project <Arrow />
              </a>
              <a 
                className="button button-ghost" 
                href="#case-studies"
              >
                Explore Flagship Case Studies ↓
              </a>
            </div>
          </div>

          <div className="projects-hero-strip">
            <div className="wrap projects-hero-metrics">
              <div className="metric-cell">
                <AnimatedMetric value={16} suffix="+" label="Years Solar Track Record" />
              </div>
              <div className="metric-cell">
                <AnimatedMetric value={9} label="States Project Footprint" />
              </div>
              <div className="metric-cell">
                <AnimatedMetric value={500} suffix="+" label="PM Surya Ghar Sites in Vizianagaram" />
              </div>
              <div className="metric-cell">
                <AnimatedMetric value={100} suffix="%" label="Safety & Grid Net-Meter SLA" />
              </div>
            </div>
          </div>
        </section>

        {/* FLAGSHIP CASE STUDIES SECTION */}
        <section className="projects-featured wrap" id="case-studies">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow"><span /> Flagship Milestone Projects</p>
              <h2>Case studies in<br /><em>engineering excellence.</em></h2>
            </div>
            <p className="heading-note">
              A closer look at how N Solutions engineers custom solar infrastructure for utility developers, government campuses, and residential communities.
            </p>
          </Reveal>

          <div className="case-studies-grid">
            {/* Case Study 1: Coastal Corp 3.6 MWp */}
            <Reveal className="case-study-card">
              <div className="case-study-media">
                <img 
                  src="/projects/coastal-corp-3-6mwp-sompeta-aerial.jpg" 
                  alt="Coastal Corporation 3.6 MWp Sompeta" 
                />
                <span className="case-badge">3.6 MWp Utility Ground-Mount</span>
              </div>
              <div className="case-study-body">
                <span className="case-tag">Coastal Corporation Ltd · Sompeta, AP</span>
                <h3>3.6 MWp Ground-Mount Solar Power Plant</h3>
                <p>
                  Comprehensive turnkey EPC execution including land grading, piling, mounting structures, and a dedicated on-site step-up power transformer substation yard.
                </p>
                <div className="case-specs-mini">
                  <div><strong>3.6 MWp</strong><small>Capacity</small></div>
                  <div><strong>5.5M kWh</strong><small>Annual Yield</small></div>
                  <div><strong>HT Substation</strong><small>Grid Sync</small></div>
                </div>
                <button 
                  type="button" 
                  className="case-cta-btn"
                  onClick={() => setSelectedProject(projectsData[0])}
                >
                  View Full Engineering Specs <Arrow />
                </button>
              </div>
            </Reveal>

            {/* Case Study 2: Jharkhand High Court 1.6 MWp */}
            <Reveal className="case-study-card">
              <div className="case-study-media">
                <img 
                  src="/projects/jharkhand-high-court-carport-aerial.jpg" 
                  alt="Jharkhand High Court 1.6 MWp Solar Carport" 
                />
                <span className="case-badge">1.6 MWp Solar Carport</span>
              </div>
              <div className="case-study-body">
                <span className="case-tag">Government Landmark · Ranchi, Jharkhand</span>
                <h3>1.6 MWp Car Port at Jharkhand High Court</h3>
                <p>
                  Architectural landmark solar carport canopy sheltering hundreds of vehicles across judicial parking lots while generating 2.4M+ kWh clean electricity annually.
                </p>
                <div className="case-specs-mini">
                  <div><strong>1.6 MWp</strong><small>Carport Size</small></div>
                  <div><strong>2.4M kWh</strong><small>Annual Yield</small></div>
                  <div><strong>Dual Benefit</strong><small>Shade + Power</small></div>
                </div>
                <button 
                  type="button" 
                  className="case-cta-btn"
                  onClick={() => setSelectedProject(projectsData[1])}
                >
                  View Full Engineering Specs <Arrow />
                </button>
              </div>
            </Reveal>

            {/* Case Study 3: PM Surya Ghar 500+ Homes Cluster */}
            <Reveal className="case-study-card">
              <div className="case-study-media">
                <img 
                  src="/projects/pm-surya-ghar-vizianagaram-elevated-gi.jpg" 
                  alt="PM Surya Ghar Vizianagaram Elevated GI Structure" 
                />
                <span className="case-badge">500+ Homes Milestone</span>
              </div>
              <div className="case-study-body">
                <span className="case-tag">PM Surya Ghar · Vizianagaram Cluster</span>
                <h3>500+ Residential Rooftop Installations</h3>
                <p>
                  Official empaneled vendor with 500+ residential rooftop sites completed in 7 months. Delivered zero electricity bills and direct DBT central subsidies.
                </p>
                <div className="case-specs-mini">
                  <div><strong>1.8+ MWp</strong><small>Cumulative Size</small></div>
                  <div><strong>7 Months</strong><small>500+ Sites</small></div>
                  <div><strong>100%</strong><small>DBT Subsidy</small></div>
                </div>
                <button 
                  type="button" 
                  className="case-cta-btn"
                  onClick={() => setSelectedProject(projectsData[9])}
                >
                  View Full Engineering Specs <Arrow />
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ALL PROJECTS FILTER & DIRECTORY */}
        <section className="projects-directory wrap" id="all-projects">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow"><span /> Complete Portfolio Showcase</p>
              <h2>All project installations<br /><em>across India.</em></h2>
            </div>
            <div className="directory-search-box">
              <input 
                type="text"
                placeholder="Search by client, city, capacity, type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search projects"
              />
              {searchQuery && (
                <button 
                  className="search-clear" 
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </Reveal>

          {/* Filter Pills */}
          <div className="project-category-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-pill ${activeCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <small>{cat.count}</small>
              </button>
            ))}
          </div>

          {catalogStatus === 'loading' ? (
            <p className="heading-note">Loading project catalog...</p>
          ) : null}

          {catalogStatus === 'error' ? (
            <div className="projects-empty-results">
              <p role="alert">{catalogError}</p>
              <button
                type="button"
                className="button button-accent"
                onClick={loadProjects}
              >
                Retry
              </button>
            </div>
          ) : null}

          {catalogStatus === 'empty' ? (
            <div className="projects-empty-results">
              <p>No projects are currently listed.</p>
            </div>
          ) : null}

          {catalogStatus === 'ready' ? (
            <div className="projects-cards-grid">
              {filteredProjects.map((project) => (
                <Reveal key={project.id} className="project-portfolio-card">
                  <div className="project-card-image-wrap">
                    {project.image ? (
                      <img src={project.image} alt={project.title} loading="lazy" />
                    ) : null}
                    {project.capacity ? (
                      <span className="project-badge-capacity">{project.capacity}</span>
                    ) : null}
                    {project.status ? (
                      <span className="project-badge-status">{project.status}</span>
                    ) : null}
                  </div>

                  <div className="project-card-content">
                    <div className="project-card-meta">
                      <span className="category-marker">{project.categoryLabel}</span>
                      {project.year ? (
                        <span className="project-year">{project.year}</span>
                      ) : null}
                    </div>

                    <h3>{project.title}</h3>
                    <p className="project-location-pin">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {project.location}
                    </p>
                    
                    <p className="project-summary-text">{project.headline}</p>

                    <div className="project-card-footer">
                      <button
                        type="button"
                        className="project-inspect-btn"
                        onClick={() => openProjectDetails(project, { fetchDetails: true })}
                      >
                        Inspect Specs & Photos ({project.gallery ? project.gallery.length : 1}) <Arrow />
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : null}

          {catalogStatus === 'ready' && filteredProjects.length === 0 && (
            <div className="projects-empty-results">
              <p>No projects match your current filter criteria.</p>
              <button 
                type="button" 
                className="button button-accent" 
                onClick={() => { setActiveCategory('ALL'); setSearchQuery(''); }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* ENTERPRISE CLIENTS & STRATEGIC PARTNERS */}
        <section className="projects-clients-section">
          <div className="wrap">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow"><span /> Proven Partnerships</p>
                <h2>Trusted by India's leading<br /><em>enterprises & utilities.</em></h2>
              </div>
              <p className="heading-note">
                Our 16-year engineering credentials have earned the trust of India’s top solar developers, pharmaceutical giants, commercial retail chains, and government bodies.
              </p>
            </Reveal>

            <div className="clients-grid-container">
              {/* Clients Document Graphic */}
              <div className="clients-sheet-card">
                <img 
                  src="/projects/key-clients-grid.jpg" 
                  alt="N Solutions Key Clients Portfolio" 
                  loading="lazy"
                />
              </div>

              {/* Interactive Badges Grid */}
              <div className="clients-badges-wrap">
                {clientList.map((client, idx) => (
                  <span key={idx} className="client-pill">
                    <span className="client-dot" />
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BILL OF MATERIALS & EQUIPMENT STANDARDS */}
        <section className="projects-bom-section">
          <div className="wrap">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow"><span /> Engineering Bill of Materials</p>
                <h2>Certified Tier-1 equipment &<br /><em>hardware architecture.</em></h2>
              </div>
              <p className="heading-note">
                Every N Solutions installation uses rigorously vetted Tier-1 solar modules, smart grid-tied inverters, certified galvanized structures, and heavy-duty switchgear.
              </p>
            </Reveal>

            <div className="bom-cards-grid">
              <Reveal className="bom-card">
                <span className="bom-card-tag">Solar Modules</span>
                <h3>Bi-Facial 625 Wp Mono PERC NDCR</h3>
                <p>High-efficiency dual-glass bi-facial modules capturing both direct sunlight and ground albedo reflection for up to 25% higher lifetime yield.</p>
                <ul className="bom-specs-list">
                  <li>25-Year Linear Power Warranty</li>
                  <li>NDCR & ALMM Certified Quality</li>
                  <li>Anti-reflective toughened glass</li>
                </ul>
              </Reveal>

              <Reveal className="bom-card">
                <span className="bom-card-tag">Solar Inverters</span>
                <h3>DEYE & Microtek 3-Phase Grid Inverters</h3>
                <p>Advanced multi-MPPT grid-tied inverters (3 kW, 5 kW, 10 kW to central utility MW banks) with Solis & SG smart telemetry loggers.</p>
                <ul className="bom-specs-list">
                  <li>10-Year Comprehensive Warranty</li>
                  <li>IP65 / IP66 Outdoor Rated Enclosures</li>
                  <li>Built-in Wi-Fi cloud performance logging</li>
                </ul>
              </Reveal>

              <Reveal className="bom-card">
                <span className="bom-card-tag">Solar Structures</span>
                <h3>Elevated GI Box Pipes (JSW / Mangal)</h3>
                <p>Heavy-gauge 7 x 8 FT elevated galvanized iron box pipe structures engineered for high wind resilience, zero corrosion, and optimal usable space below.</p>
                <ul className="bom-specs-list">
                  <li>80+ Micron Hot-Dip Galvanization</li>
                  <li>180 km/h Cyclone Wind Resistance</li>
                  <li>Full usable rooftop clearance below</li>
                </ul>
              </Reveal>

              <Reveal className="bom-card">
                <span className="bom-card-tag">DC Cabling</span>
                <h3>Polycab DC Solar Cable (4 sq mm)</h3>
                <p>Electron-beam cross-linked halogen-free cables designed to withstand extreme UV radiation, ozone, moisture, and high thermal loads without degradation.</p>
                <ul className="bom-specs-list">
                  <li>Flame retardant & UV resistant</li>
                  <li>TUV 2 Pfg 1169 / EN 50618 certified</li>
                  <li>Minimum voltage drop optimization</li>
                </ul>
              </Reveal>

              <Reveal className="bom-card">
                <span className="bom-card-tag">AC Armoured Cabling</span>
                <h3>Polycab 3.5 Core 50 sq mm Al Armoured</h3>
                <p>Heavy-duty galvanized steel wire armoured aluminum power cables ensuring mechanical protection, subterranean routing safety, and reliable grid feed.</p>
                <ul className="bom-specs-list">
                  <li>IS 7098 / IS 1554 compliance</li>
                  <li>Steel wire armoured mechanical armor</li>
                  <li>Low electrical impedance transmission</li>
                </ul>
              </Reveal>

              <Reveal className="bom-card">
                <span className="bom-card-tag">Safety & Maintenance</span>
                <h3>Chemical Earth Pits & Lightning Arrestors</h3>
                <p>Comprehensive protection including copper-bonded chemical earthing electrodes (&lt;1Ω), Class-1 lightning arrestors, and automated module wash systems.</p>
                <ul className="bom-specs-list">
                  <li>Dual-stage chemical earthing grid</li>
                  <li>ESE high-rise lightning protection</li>
                  <li>Integrated pressurized wash pipelines</li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* OFFICIAL STATUTORY EMPANELMENTS & CERTIFICATIONS */}
        <section className="projects-empanelment-section">
          <div className="wrap">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow light"><span /> Government Empanelments & Credentials</p>
                <h2>Statutory approvals &<br /><em>official vendor empanelments.</em></h2>
              </div>
              <p className="heading-note light">
                Fully authorized and empaneled by state electricity distribution companies and renewable energy development nodal agencies across India.
              </p>
            </Reveal>

            <div className="empanelment-grid">
              <Reveal className="empanelment-card">
                <div className="empanelment-doc-preview">
                  <img 
                    src="/projects/apepdcl-pm-suryaghar-empanelment-order.png" 
                    alt="APEPDCL PM Surya Ghar Empanelment Order" 
                  />
                </div>
                <div className="empanelment-info">
                  <span className="badge-tag">APEPDCL Empaneled</span>
                  <h3>PM Surya Ghar National Portal Vendor</h3>
                  <p>
                    Official vendor empanelment for residential solar rooftop installations under PM Surya Ghar Muft Bijli Yojana with verified State Bank of India bank guarantee.
                  </p>
                  <small>Order Ref: Lr.No.CGM/EC&Solar/EPDCL/GM/EE/Dy.EE/JE/EC&Solar/E-397417/D.No.1/570375/25</small>
                </div>
              </Reveal>

              <Reveal className="empanelment-card">
                <div className="empanelment-doc-preview">
                  <img 
                    src="/projects/nredcap-solar-rooftop-empanelment-order.jpg" 
                    alt="NREDCAP Solar Rooftop Empanelment Order" 
                  />
                </div>
                <div className="empanelment-info">
                  <span className="badge-tag">NREDCAP Approved</span>
                  <h3>Grid-Connected Solar Rooftop (1-100 KWp)</h3>
                  <p>
                    Approved supplier by New & Renewable Energy Development Corporation of Andhra Pradesh Ltd (NREDCAP) under CAPEX mode for 1 kWp to 100 kWp installations.
                  </p>
                  <small>Ref: NREDCAP/SE/SPV 1-500 KWp/42-316/2024-25</small>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 6-STEP EXECUTION LIFECYCLE */}
        <section className="projects-lifecycle">
          <div className="wrap">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow light"><span /> Engineering Standard</p>
                <h2>How we deliver every<br /><em>solar installation.</em></h2>
              </div>
              <p className="heading-note light">
                A structured, disciplined engineering protocol applied uniformly from residential PM Surya Ghar roofs to MW-scale solar farms.
              </p>
            </Reveal>

            <div className="lifecycle-grid">
              <Reveal className="lifecycle-step">
                <span className="step-num">01</span>
                <h4>Feasibility & Shadow Analysis</h4>
                <p>3D LIDAR and drone roof mapping, solar irradiance modeling (PVSyst), structural load-bearing calculation, and electrical single-line design.</p>
              </Reveal>
              <Reveal className="lifecycle-step">
                <span className="step-num">02</span>
                <h4>Engineering & DISCOM Approvals</h4>
                <p>Preparation of electrical schematic drawings, grid net-metering feasibility filing, DISCOM statutory approvals, and structural validation.</p>
              </Reveal>
              <Reveal className="lifecycle-step">
                <span className="step-num">03</span>
                <h4>Tier-1 Procurement</h4>
                <p>Procurement of ALMM-listed mono-crystalline/TOPCon modules, high-efficiency smart inverters, Class-1 lightning arrestors, and GI mounting structures.</p>
              </Reveal>
              <Reveal className="lifecycle-step">
                <span className="step-num">04</span>
                <h4>Installation & Safety Protocol</h4>
                <p>Qualified technicians carry out precise structural erection, DC cable trenching, chemical earthing pits, and waterproof sealing.</p>
              </Reveal>
              <Reveal className="lifecycle-step">
                <span className="step-num">05</span>
                <h4>Testing, Grid Sync & Net-Meter</h4>
                <p>Insulation resistance (megger) testing, earth pit resistance audit (&lt;1 ohm), CEIG / DISCOM inspection, and bi-directional meter synchronization.</p>
              </Reveal>
              <Reveal className="lifecycle-step">
                <span className="step-num">06</span>
                <h4>24/7 Monitoring & O&M SLA</h4>
                <p>Cloud SCADA live telemetry, preventative seasonal module cleaning, thermal drone thermography, and rapid breakdown support.</p>
              </Reveal>
            </div>

            <p className="projects-flow-indicator">
              Understand <i>→</i> Assess <i>→</i> Design <i>→</i> Procure <i>→</i> Execute <i>→</i> Support
            </p>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="projects-cta-section">
          <div className="wrap">
            <Reveal className="projects-cta-box">
              <p className="eyebrow light"><span /> Built on Experience · Driven by Solar</p>
              <h2>Have a rooftop, land parcel, or commercial facility?<br /><em>Let's calculate your solar generation & savings.</em></h2>
              <p>
                From residential rooftop solar under PM Surya Ghar to MW-scale captive commercial plants, our engineering team provides complete site audits and financial feasibility models.
              </p>
              <div className="cta-actions">
                <a 
                  className="button button-accent" 
                  href="/contact" 
                  onClick={(e) => { e.preventDefault(); navigate('/contact') }}
                >
                  Request Solar Site Audit <Arrow />
                </a>
                <a 
                  className="button button-ghost" 
                  href="tel:+917993836424"
                >
                  Call Engineering Desk (+91 7993836424)
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TECHNICAL DETAILS & GALLERY MODAL */}
        {selectedProject && (
          <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
            <div className="project-modal-card" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="modal-header">
                <div className="modal-header-meta">
                  <span className="badge-tag">{selectedProject.categoryLabel}</span>
                  {selectedProject.capacity ? (
                    <span className="badge-capacity">{selectedProject.capacity}</span>
                  ) : null}
                  {selectedProject.status ? (
                    <span className="badge-status">{selectedProject.status}</span>
                  ) : null}
                </div>
                <h2>{selectedProject.title}</h2>
                <p className="modal-location">
                  📍 {selectedProject.location}
                  {selectedProject.client ? <> · Client: <strong>{selectedProject.client}</strong></> : null}
                  {selectedProject.year ? <> ({selectedProject.year})</> : null}
                </p>
              </div>

              {/* Main Display Image */}
              {selectedProject.image || activeModalImg ? (
                <div className="modal-hero-image">
                  <img src={activeModalImg || selectedProject.image} alt={selectedProject.title} />
                </div>
              ) : null}

              {/* Thumbnail Gallery Strip if Multiple Photos Exist */}
              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <div className="modal-gallery-strip">
                  {selectedProject.gallery.map((photo, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      className={`modal-gallery-thumb ${activeModalImg === photo ? 'is-active' : ''}`}
                      onClick={() => setActiveModalImg(photo)}
                      aria-label={`View photo ${pIdx + 1}`}
                    >
                      <img src={photo} alt="" />
                    </button>
                  ))}
                </div>
              )}

              <div className="modal-body-content">
                <div className="modal-overview-text">
                  <h3>Project Overview</h3>
                  {detailStatus === 'loading' ? (
                    <p className="heading-note">Loading project details...</p>
                  ) : null}
                  {detailStatus === 'error' ? (
                    <p className="heading-note" role="alert">{detailError}</p>
                  ) : null}
                  <p>{selectedProject.summary}</p>
                </div>

                {selectedProject.specs && (
                  <div className="modal-specs-section">
                    <h3>Technical Engineering Parameters</h3>
                    <div className="specs-table-grid">
                      <div className="spec-row">
                        <strong>Solar Modules:</strong>
                        <span>{selectedProject.specs.modules}</span>
                      </div>
                      <div className="spec-row">
                        <strong>Inverter Architecture:</strong>
                        <span>{selectedProject.specs.inverters}</span>
                      </div>
                      <div className="spec-row">
                        <strong>Annual Generation:</strong>
                        <span>{selectedProject.specs.generation}</span>
                      </div>
                      <div className="spec-row">
                        <strong>CO₂ Carbon Offset:</strong>
                        <span>{selectedProject.specs.co2Offset}</span>
                      </div>
                      <div className="spec-row">
                        <strong>Grid Synchronization:</strong>
                        <span>{selectedProject.specs.gridSync}</span>
                      </div>
                      <div className="spec-row">
                        <strong>Mounting & Structural:</strong>
                        <span>{selectedProject.specs.structure}</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedProject.highlights && (
                  <div className="modal-highlights-section">
                    <h3>Key Execution Highlights</h3>
                    <ul>
                      {selectedProject.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="modal-footer-cta">
                  <p>Want a similar solar solution for your home, commercial complex, or industry?</p>
                  <a 
                    className="button button-accent" 
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedProject(null)
                      navigate('/contact')
                    }}
                  >
                    Inquire About This Setup <Arrow />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
