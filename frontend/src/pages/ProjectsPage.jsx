import { useState, useEffect } from 'react'
import { SiteHeader, SiteFooter, Arrow, AnimatedMetric, Reveal, navigate } from '../components/Shared'
import { 
  FiMapPin, FiX, FiArrowDown, FiChevronRight, FiChevronLeft,
  FiSun, FiZap, FiTrendingUp, FiAward, FiShield, FiLayers, 
  FiCheck, FiActivity, FiCpu, FiCheckCircle
} from 'react-icons/fi'

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
  const [cockpitMode, setCockpitMode] = useState('telemetry')
  const [activeSchematicNode, setActiveSchematicNode] = useState(0)
  const [activeLifecycleStage, setActiveLifecycleStage] = useState(0)
  const [activeBomLayer, setActiveBomLayer] = useState(0)

  const lifecycleStages = [
    {
      num: '01',
      title: 'Feasibility & LIDAR Solar Irradiance Modeling',
      short: 'Feasibility & 3D LIDAR',
      objective: 'Comprehensive 3D topographical drone LIDAR mapping and PVSyst simulation to forecast generation yield with 99.4% accuracy.',
      tools: 'DJI Enterprise LIDAR Drone, PVSyst Solar Yield Simulation, Meteonorm Climate Database',
      checklist: [
        '3D shadow loss trajectory modeled through 365 sun positions',
        'Structural dead-weight and live-wind load calculations verified',
        'Financial LCOE, payback schedule, and IRR feasibility analysis'
      ]
    },
    {
      num: '02',
      title: 'DISCOM Approvals & High-Voltage Schematics',
      short: 'DISCOM Net-Metering',
      objective: 'Filing statutory net-metering feasibility with state DISCOMs and developing CEA-compliant single-line electrical schematics.',
      tools: 'AutoCAD Electrical, DISCOM National Portal Integration, CEIG Statutory Audit System',
      checklist: [
        'DISCOM technical net-metering feasibility sanction obtained',
        'Single-line diagram (SLD) and protection relay coordination approved',
        'Structural engineering certification with PE stamp'
      ]
    },
    {
      num: '03',
      title: 'Tier-1 ALMM Hardware Procurement & In-Factory QA',
      short: 'Tier-1 Procurement',
      objective: 'Procuring verified Grade-A N-Type TOPCon/Mono PERC modules directly from top tier-1 manufacturers with traceable serial numbers.',
      tools: 'Factory Electroluminescence (EL) Defect Testing, Flash Report Telemetry, BIS/ALMM Verification',
      checklist: [
        'Every solar panel verified for zero micro-cracks via factory EL imaging',
        'Class-1 ESE lightning arrestors and heavy-duty GI box pipes inspected',
        'Dual-certified TUV solar cables with flame-retardant cross-linking'
      ]
    },
    {
      num: '04',
      title: 'Precision Mechanical Erection & Electrical Safety',
      short: 'Precision Erection',
      objective: 'Deploying certified technicians for hot-dip galvanized mounting structure assembly, waterproof chemical anchoring, and DC string routing.',
      tools: 'Calibrated Torque Wrenches, Hilti Chemical Anchor Systems, UV Conduit Trenching',
      checklist: [
        'Zero rooftop puncture guarantees with chemical anchor seals',
        'Galvanized iron hardware torqued to exact engineering Nm tolerances',
        'String voltages tested for open-circuit parity prior to inverter connection'
      ]
    },
    {
      num: '05',
      title: 'Grid Net-Meter Synchronization & Megger Diagnostics',
      short: 'Grid Net-Meter Sync',
      objective: 'Executing multi-point insulation resistance tests, sub-1 Ohm earth pit audits, and DISCOM bidirectional meter commissioning.',
      tools: 'Fluke 1507 5kV Megger Tester, Fluke 1625 Earth Ground Clamp, CEIG Official Commissioning Kit',
      checklist: [
        'Insulation resistance validated (>50 MegaOhms at 1000V DC)',
        'Earth pit ground resistance audited to strictly sub-1 Ohm (<0.85 Ω)',
        'Bi-directional 4-quadrant smart net-meter installed with real-time export'
      ]
    },
    {
      num: '06',
      title: 'Cloud SCADA Telemetry & 25-Year Performance SLA',
      short: 'Cloud SCADA & O&M',
      objective: 'Connecting plant inverters to cloud SCADA servers for minute-by-minute generation logging, automated alert dispatch, and robotic wash support.',
      tools: 'Industrial IoT Telemetry Gateways, FLIR Thermal Drone Thermography, Automated Module Washers',
      checklist: [
        'Minute-by-minute generation tracking via mobile & web monitoring portals',
        'Thermographic drone scans detecting hot-spots and micro-soiling',
        'Guaranteed 24-hour on-site engineering turnaround for any fault code'
      ]
    }
  ]

  const bomLayers = [
    {
      id: 'modules',
      category: 'Solar PV Modules',
      name: 'Tier-1 Bi-Facial 625 Wp Mono PERC / TOPCon',
      desc: 'Dual-glass bi-facial architecture harvesting direct sunlight on the front and ground albedo reflection from the rear surface for up to 25% higher lifetime energy yield.',
      metrics: [
        '25-Year Linear Power Warranty',
        'ALMM & BIS Statutory Listed',
        'Anti-Reflective Toughened Dual-Glass',
        'Zero PID / LID Degradation Resistance'
      ],
      highlights: 'Captures both front and diffuse rear irradiance. Certified against extreme coastal salt-mist corrosion and severe monsoon humidity.'
    },
    {
      id: 'inverters',
      category: 'Power Electronics',
      name: 'Central & High-Capacity Multi-MPPT String Inverters',
      desc: 'High-conversion efficiency (>98.8%) smart solar inverters with individual string tracking, integrated DC disconnect switches, and type-II surge protection.',
      metrics: [
        '10-Year Comprehensive Warranty',
        'IP65 / IP66 All-Weather Enclosure',
        'Built-in Wi-Fi / 4G SCADA Telemetry',
        'Multi-MPPT Solar Yield Optimization'
      ],
      highlights: 'Advanced grid synchronization with instantaneous islanding protection, power factor correction, and harmonic distortion under 3%.'
    },
    {
      id: 'structures',
      category: 'Structural Engineering',
      name: 'Elevated Galvanized Iron Box Pipe Superstructure',
      desc: 'Heavy-gauge 7 x 8 FT elevated galvanized iron box pipe superstructures (JSW / Mangal) engineered to elevate panels while preserving 100% usable rooftop terrace space below.',
      metrics: [
        '80+ Micron Hot-Dip Galvanization',
        '180 km/h Cyclone Wind Resilience',
        'Full Usable Terrace Clearance Below',
        'Zero Roof Leakage Chemical Anchors'
      ],
      highlights: 'Engineered specifically for coastal Andhra Pradesh wind velocity zones. Solid hot-dip zinc coating ensures zero oxidation for over 30 years.'
    },
    {
      id: 'cabling-safety',
      category: 'Cabling & Safety Grid',
      name: 'Polycab DC Solar & Aluminum Armoured Transmission',
      desc: 'Cross-linked halogen-free DC solar cables paired with heavy-duty steel wire armoured aluminum power cables and dual-stage chemical earthing with sub-1 Ohm electrodes.',
      metrics: [
        'TUV 2 Pfg 1169 / EN 50618 Certified',
        'IS 7098 Subterranean Armoured Steel Wire',
        'Copper-Bonded Chemical Earth Pits (<1Ω)',
        'Class-1 Early Streamer Lightning Arrestor'
      ],
      highlights: 'Comprehensive electrical containment protecting inverter, panels, and connected building loads against high-voltage surges and atmospheric strikes.'
    }
  ]

  useEffect(() => {
    document.title = 'Projects Showcase | N Solutions Solar EPC'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Update modal active image when selectedProject changes
  useEffect(() => {
    if (selectedProject) {
      setActiveModalImg(selectedProject.image)
    }
  }, [selectedProject])

  const categories = [
    { id: 'ALL', label: 'All Projects', count: projectsData.length },
    { id: 'ground-mount', label: 'Ground Mount & Utility', count: projectsData.filter(p => p.category === 'ground-mount').length },
    { id: 'carport', label: 'Solar Car Ports', count: projectsData.filter(p => p.category === 'carport').length },
    { id: 'industrial', label: 'Industrial Rooftops & Sheds', count: projectsData.filter(p => p.category === 'industrial').length },
    { id: 'residential', label: 'PM Surya Ghar Residential', count: projectsData.filter(p => p.category === 'residential').length },
    { id: 'commercial', label: 'Commercial & Institutional', count: projectsData.filter(p => p.category === 'commercial').length },
  ]

  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = activeCategory === 'ALL' || project.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.capacity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase())
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
                Explore Flagship Case Studies <FiArrowDown style={{ verticalAlign: 'middle' }} />
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
                  <FiX size={14} />
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

          {/* Project Cards Grid */}
          <div className="projects-cards-grid">
            {filteredProjects.map((project) => (
              <Reveal key={project.id} className="project-portfolio-card">
                <div className="project-card-image-wrap">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <span className="project-badge-capacity">{project.capacity}</span>
                  <span className="project-badge-status">{project.status}</span>
                </div>

                <div className="project-card-content">
                  <div className="project-card-meta">
                    <span className="category-marker">{project.categoryLabel}</span>
                    <span className="project-year">{project.year}</span>
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
                      onClick={() => setSelectedProject(project)}
                    >
                      Inspect Specs & Photos ({project.gallery ? project.gallery.length : 1}) <Arrow />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {filteredProjects.length === 0 && (
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

            <div className="hardware-anatomy-layout">
              {/* Left Selector Tabs */}
              <div className="hardware-tabs-panel">
                {bomLayers.map((layer, idx) => (
                  <button
                    key={layer.id}
                    type="button"
                    className={`hardware-tab-item ${activeBomLayer === idx ? 'is-active' : ''}`}
                    onClick={() => setActiveBomLayer(idx)}
                  >
                    <div className="hardware-tab-text">
                      <small>{layer.category}</small>
                      <strong>{layer.name}</strong>
                    </div>
                    <FiChevronRight style={{ color: activeBomLayer === idx ? 'var(--brand-accent)' : 'var(--muted)' }} />
                  </button>
                ))}
              </div>

              {/* Right Interactive Telemetry Detail Display */}
              <div className="hardware-detail-display">
                <div>
                  <span className="hardware-detail-badge">{bomLayers[activeBomLayer].category} · Tier-1 Hardware Standard</span>
                  <h3>{bomLayers[activeBomLayer].name}</h3>
                  <p>{bomLayers[activeBomLayer].desc}</p>
                  
                  <div className="hardware-metric-capsules">
                    {bomLayers[activeBomLayer].metrics.map((m, mIdx) => (
                      <span key={mIdx} className="hardware-chip">
                        <FiCheckCircle size={14} />
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ background: '#f0f7fb', padding: '14px 18px', borderRadius: '8px', borderLeft: '3px solid var(--brand-accent)' }}>
                  <strong style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--brand-primary-deep)', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Engineering Field Guarantee</strong>
                  <span style={{ fontSize: '13px', color: '#334e68' }}>{bomLayers[activeBomLayer].highlights}</span>
                </div>
              </div>
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

            <div className="circuit-stream-wrapper">
              {/* Connected Pipeline Track */}
              <div className="circuit-timeline-track">
                {lifecycleStages.map((stage, sIdx) => (
                  <button
                    key={stage.num}
                    type="button"
                    className={`circuit-stage-node ${activeLifecycleStage === sIdx ? 'is-active' : ''}`}
                    onClick={() => setActiveLifecycleStage(sIdx)}
                  >
                    <span className="circuit-node-bubble">{stage.num}</span>
                    <span className="circuit-node-label">{stage.short}</span>
                  </button>
                ))}
              </div>

              {/* Active Stage Command Dossier */}
              <div className="circuit-dossier-card">
                <div className="dossier-grid-layout">
                  <div>
                    <div className="dossier-header-badge">
                      <FiActivity /> Stage {lifecycleStages[activeLifecycleStage].num} · Engineering Protocol
                    </div>
                    <h3 className="dossier-title">{lifecycleStages[activeLifecycleStage].title}</h3>
                    <p className="dossier-desc">{lifecycleStages[activeLifecycleStage].objective}</p>

                    <div className="dossier-nav-controls">
                      <button
                        type="button"
                        className="dossier-nav-btn"
                        onClick={() => setActiveLifecycleStage(prev => (prev > 0 ? prev - 1 : lifecycleStages.length - 1))}
                      >
                        <FiChevronLeft /> Previous Stage
                      </button>
                      <span style={{ fontSize: '12px', color: '#76bad9', fontStyle: 'italic' }}>
                        Step {activeLifecycleStage + 1} of {lifecycleStages.length}
                      </span>
                      <button
                        type="button"
                        className="dossier-nav-btn"
                        onClick={() => setActiveLifecycleStage(prev => (prev < lifecycleStages.length - 1 ? prev + 1 : 0))}
                      >
                        Next Stage <FiChevronRight />
                      </button>
                    </div>
                  </div>

                  <div className="dossier-tools-box">
                    <h5>Diagnostic Instrumentation & Tools</h5>
                    <p style={{ fontSize: '13px', color: '#ffffff', marginBottom: '16px', fontWeight: '600' }}>
                      {lifecycleStages[activeLifecycleStage].tools}
                    </p>

                    <h5>QA Sign-Off Checklist</h5>
                    <ul className="dossier-checklist">
                      {lifecycleStages[activeLifecycleStage].checklist.map((item, cIdx) => (
                        <li key={cIdx}>
                          <FiCheck />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
                <FiX size={20} />
              </button>

              <div className="modal-header">
                <div className="modal-header-meta">
                  <span className="badge-tag">{selectedProject.categoryLabel}</span>
                  <span className="badge-capacity">{selectedProject.capacity}</span>
                  <span className="badge-status">{selectedProject.status}</span>
                </div>
                <h2>{selectedProject.title}</h2>
                <p className="modal-location">
                   <FiMapPin size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />{selectedProject.location} · Client: <strong>{selectedProject.client}</strong> ({selectedProject.year})
                </p>
              </div>

              {/* Main Display Image */}
              <div className="modal-hero-image">
                <img src={activeModalImg || selectedProject.image} alt={selectedProject.title} />
              </div>

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
                  <p>{selectedProject.summary}</p>
                </div>

                {selectedProject.specs && (
                  <div className="telemetry-cockpit">
                    <div className="cockpit-header-bar">
                      <div className="cockpit-title-wrap">
                        <div className="cockpit-radar-icon">
                          <FiActivity size={14} />
                        </div>
                        <div>
                          <h3>Engineering Telemetry & System Specs</h3>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span className="cockpit-status-chip">
                          <span className="cockpit-pulse-dot" /> Live Grid Synchronized
                        </span>
                        <div className="cockpit-mode-toggle">
                          <button
                            type="button"
                            className={`cockpit-mode-btn ${cockpitMode === 'telemetry' ? 'is-active' : ''}`}
                            onClick={() => setCockpitMode('telemetry')}
                          >
                            <FiCpu size={12} /> Telemetry HUD
                          </button>
                          <button
                            type="button"
                            className={`cockpit-mode-btn ${cockpitMode === 'schematic' ? 'is-active' : ''}`}
                            onClick={() => setCockpitMode('schematic')}
                          >
                            <FiZap size={12} /> Energy Route
                          </button>
                        </div>
                      </div>
                    </div>

                    {cockpitMode === 'telemetry' ? (
                      <div className="telemetry-matrix">
                        {/* Channel 1: Modules */}
                        <div className="telemetry-capsule">
                          <div className="capsule-meta-top">
                            <span className="capsule-ch-id"><FiSun /> CH-01 · Array</span>
                            <span className="capsule-badge-pill">Tier-1 ALMM</span>
                          </div>
                          <p className="capsule-label">Solar PV Array</p>
                          <p className="capsule-value">{selectedProject.specs.modules}</p>
                          <div className="capsule-meter-line">
                            <div className="capsule-meter-fill" style={{ width: '96%' }} />
                          </div>
                        </div>

                        {/* Channel 2: Inverters */}
                        <div className="telemetry-capsule">
                          <div className="capsule-meta-top">
                            <span className="capsule-ch-id"><FiZap /> CH-02 · Conversion</span>
                            <span className="capsule-badge-pill">Multi-MPPT</span>
                          </div>
                          <p className="capsule-label">Inverter Architecture</p>
                          <p className="capsule-value">{selectedProject.specs.inverters}</p>
                          <div className="capsule-meter-line">
                            <div className="capsule-meter-fill" style={{ width: '98%' }} />
                          </div>
                        </div>

                        {/* Channel 3: Annual Generation */}
                        <div className="telemetry-capsule">
                          <div className="capsule-meta-top">
                            <span className="capsule-ch-id"><FiTrendingUp /> CH-03 · Harvest</span>
                            <span className="capsule-badge-pill">CUF &gt; 19%</span>
                          </div>
                          <p className="capsule-label">Annual Generation Harvest</p>
                          <p className="capsule-value">{selectedProject.specs.generation}</p>
                          <div className="capsule-meter-line">
                            <div className="capsule-meter-fill" style={{ width: '94%' }} />
                          </div>
                        </div>

                        {/* Channel 4: Carbon Offset */}
                        <div className="telemetry-capsule">
                          <div className="capsule-meta-top">
                            <span className="capsule-ch-id"><FiAward /> CH-04 · Abatement</span>
                            <span className="capsule-badge-pill">ESG Green</span>
                          </div>
                          <p className="capsule-label">CO₂ Carbon Offset</p>
                          <p className="capsule-value">{selectedProject.specs.co2Offset}</p>
                          <div className="capsule-meter-line">
                            <div className="capsule-meter-fill" style={{ width: '92%' }} />
                          </div>
                        </div>

                        {/* Channel 5: Grid Synchronization */}
                        <div className="telemetry-capsule">
                          <div className="capsule-meta-top">
                            <span className="capsule-ch-id"><FiShield /> CH-05 · Intertie</span>
                            <span className="capsule-badge-pill">CEIG Approved</span>
                          </div>
                          <p className="capsule-label">Grid Synchronization</p>
                          <p className="capsule-value">{selectedProject.specs.gridSync}</p>
                          <div className="capsule-meter-line">
                            <div className="capsule-meter-fill" style={{ width: '99%' }} />
                          </div>
                        </div>

                        {/* Channel 6: Mounting Structure */}
                        <div className="telemetry-capsule">
                          <div className="capsule-meta-top">
                            <span className="capsule-ch-id"><FiLayers /> CH-06 · Superstructure</span>
                            <span className="capsule-badge-pill">180 km/h Rated</span>
                          </div>
                          <p className="capsule-label">Mounting & Structural</p>
                          <p className="capsule-value">{selectedProject.specs.structure}</p>
                          <div className="capsule-meter-line">
                            <div className="capsule-meter-fill" style={{ width: '97%' }} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="schematic-flow-canvas">
                        <div className="schematic-busway">
                          <div 
                            className={`schematic-node ${activeSchematicNode === 0 ? 'is-active' : ''}`}
                            onClick={() => setActiveSchematicNode(0)}
                          >
                            <span className="schematic-step-indicator">01</span>
                            <h4>Solar Array</h4>
                            <p>{selectedProject.specs.modules}</p>
                          </div>
                          <div className="schematic-wire-arrow">➔</div>
                          <div 
                            className={`schematic-node ${activeSchematicNode === 1 ? 'is-active' : ''}`}
                            onClick={() => setActiveSchematicNode(1)}
                          >
                            <span className="schematic-step-indicator">02</span>
                            <h4>Inverter Bank</h4>
                            <p>{selectedProject.specs.inverters}</p>
                          </div>
                          <div className="schematic-wire-arrow">➔</div>
                          <div 
                            className={`schematic-node ${activeSchematicNode === 2 ? 'is-active' : ''}`}
                            onClick={() => setActiveSchematicNode(2)}
                          >
                            <span className="schematic-step-indicator">03</span>
                            <h4>Grid Intertie</h4>
                            <p>{selectedProject.specs.gridSync}</p>
                          </div>
                          <div className="schematic-wire-arrow">➔</div>
                          <div 
                            className={`schematic-node ${activeSchematicNode === 3 ? 'is-active' : ''}`}
                            onClick={() => setActiveSchematicNode(3)}
                          >
                            <span className="schematic-step-indicator">04</span>
                            <h4>Clean Power Output</h4>
                            <p>{selectedProject.specs.generation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedProject.highlights && (
                  <div className="modal-highlights-section">
                    <h3>Engineering Milestone & Execution Log</h3>
                    <div className="engineering-log-stream">
                      {selectedProject.highlights.map((h, i) => (
                        <div key={i} className="log-stream-entry">
                          <div className="log-stream-node">
                            <div className="log-stream-node-inner" />
                          </div>
                          <div className="log-stream-content">
                            <span className="log-stream-tag">✓ Audited Execution Standard · Milestone {i + 1}</span>
                            <p className="log-stream-text">{h}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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
