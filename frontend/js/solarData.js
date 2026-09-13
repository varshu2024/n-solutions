/**
 * N Solutions Solar Company - Master Data Store
 * All authentic content, reference statistics, projects, products,
 * testimonials, certifications, and initial admin state.
 */

export const COMPANY_INFO = {
  name: "N Solutions",
  fullName: "N Solutions Solar Company",
  tagline: "Solar EPC Excellence",
  description: "Leading Solar EPC company specializing in Commercial, Industrial, Residential Rooftop, PM Surya Ghar, and Government solar power plants with 16+ years of engineering heritage across 9 states.",
  experienceYears: 16,
  statesCount: 9,
  pmSuryaGharCompleted: "500+",
  pmSuryaGharPipeline: "250+",
  pmSuryaGharTarget: "2,000+",
  totalCapacityMW: "120+",
  phone: "+91 94401 23456",
  phoneAlt: "+91 891 2789012",
  email: "info@nsolutions.in",
  emailSupport: "support@nsolutions.in",
  headOffice: "Plot No. 42, Green Tech Enclave, Near IT SEZ, Visakhapatnam, Andhra Pradesh - 530045",
  branchOffices: [
    { city: "Vizianagaram", address: "Main Road, Near Collectorate, Vizianagaram - 535002" },
    { city: "Vijayawada", address: "MG Road, Benz Circle, Vijayawada - 520010" },
    { city: "Hyderabad", address: "Hitech City, Madhapur, Hyderabad - 500081" },
    { city: "Bengaluru", address: "Indiranagar 100ft Road, Bengaluru - 560038" }
  ],
  socials: {
    linkedin: "https://linkedin.com/company/nsolutions-solar",
    twitter: "https://twitter.com/nsolutions_solar",
    facebook: "https://facebook.com/nsolutionssolar",
    instagram: "https://instagram.com/nsolutionssolar",
    youtube: "https://youtube.com/@nsolutionssolar",
    whatsapp: "https://wa.me/919440123456"
  }
};

export const CERTIFICATIONS = [
  {
    title: "A-Grade Electrical Contractor License",
    issuer: "A.P. Electrical Licensing Board",
    desc: "Authorized for HT/LT electrical installations, substations, and MW-scale grid connections.",
    badge: "A-GRADE LICENSED"
  },
  {
    title: "PM Surya Ghar National Portal Empanelment",
    issuer: "Ministry of New & Renewable Energy (MNRE)",
    desc: "Officially empaneled channel partner for rooftop solar installations and direct subsidy credit.",
    badge: "MNRE EMPANELED"
  },
  {
    title: "Approved Channel Partner",
    issuer: "NREDCAP (New & Renewable Energy Dev. Corp. of AP)",
    desc: "State nodal agency approved partner for renewable energy projects and solar pumps.",
    badge: "NREDCAP PARTNER"
  },
  {
    title: "Empaneled Contractor",
    issuer: "APEPDCL (Eastern Power Distribution Co.)",
    desc: "Registered contractor for bi-directional net metering approvals and DISCOM synchronizations.",
    badge: "DISCOM EMPANELED"
  },
  {
    title: "ISO 9001:2015 Certification",
    issuer: "Quality Management System",
    desc: "Certified for solar EPC engineering, procurement, installation, testing, and maintenance.",
    badge: "ISO 9001:2015"
  },
  {
    title: "MSME / UDYAM Registered Enterprise",
    issuer: "Ministry of MSME, Govt. of India",
    desc: "Recognized national green energy engineering enterprise.",
    badge: "UDYAM GOVT"
  },
  {
    title: "ALMM Approved Modules & Tier-1 BIS",
    issuer: "Approved List of Models & Manufacturers",
    desc: "Strictly compliant with MNRE domestic content requirements (DCR) and BIS standards.",
    badge: "ALMM COMPLIANT"
  }
];

export const AWARDS = [
  {
    title: "Speed Execution Milestone Award",
    year: "2024",
    org: "AP State Renewable Summit",
    desc: "Awarded for completing 500+ residential PM Surya Ghar rooftop installations at Vizianagaram within 7 months."
  },
  {
    title: "Excellence in Commercial Solar EPC",
    year: "2023",
    org: "South India Clean Energy Forum",
    desc: "Recognized for delivering high-efficiency captive rooftop solar systems with over 99.2% operational uptime."
  },
  {
    title: "Best Regional Solar Partner",
    year: "2022",
    org: "National Green Energy Leadership Council",
    desc: "Honored for safety compliance and engineering excellence across 9 states in India."
  }
];

export const WORK_PROCESS = [
  {
    num: "01",
    label: "Site Assessment & Feasibility",
    desc: "Comprehensive shadow analysis, structural load testing, 3D rooftop modeling, and solar insolation calculations to determine maximum generation potential."
  },
  {
    num: "02",
    label: "Design & Engineering",
    desc: "Tailored electrical single-line diagrams (SLD), PVsyst generation simulation, string optimization, and selection of tier-1 panels and smart inverters."
  },
  {
    num: "03",
    label: "Procurement & Approvals",
    desc: "Turnkey liaison with DISCOM for net metering feasibility, CEIG safety clearance, and PM Surya Ghar national portal subsidy documentation."
  },
  {
    num: "04",
    label: "Precision Installation",
    desc: "Erection of hot-dip galvanized mounting structures, UV-resistant DC cabling, chemical earth pits, and lightning arrestors by A-Grade licensed teams."
  },
  {
    num: "05",
    label: "Commissioning & 25-Year O&M",
    desc: "Synchronization with power grid, bi-directional meter activation, mobile app monitoring setup, and scheduled preventive maintenance."
  }
];

export const ENERGY_FLOW = [
  {
    id: 0,
    icon: "sun",
    label: "Sun",
    sub: "Solar Irradiance",
    desc: "Photons radiate 1,000 W/m² peak solar energy onto rooftops."
  },
  {
    id: 1,
    icon: "grid-3x3",
    label: "PV Modules",
    sub: "DC Electricity Generated",
    desc: "High-efficiency TOPCon / Mono PERC cells convert sunlight into Direct Current (DC)."
  },
  {
    id: 2,
    icon: "cpu",
    label: "Solar Inverter",
    sub: "DC to AC Conversion",
    desc: "Smart Dual-MPPT inverter transforms DC power into 230V/415V Alternating Current (AC)."
  },
  {
    id: 3,
    icon: "zap",
    label: "Electrical System",
    sub: "LT Distribution Panel",
    desc: "Power passes through ACDB, surge protection devices, and bi-directional net meter."
  },
  {
    id: 4,
    icon: "building-2",
    label: "Consumption & Grid",
    sub: "Business / Home / Grid",
    desc: "Power runs your appliances first; surplus units are exported to DISCOM for credits."
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "16+ Years Engineering Legacy",
    desc: "Over a decade and a half of electrical contracting and solar EPC execution across commercial, industrial, and residential sectors."
  },
  {
    title: "9-State Pan-India Presence",
    desc: "Active operational footprints and dedicated technical field teams in AP, Telangana, Karnataka, Tamil Nadu, Odisha, and beyond."
  },
  {
    title: "500+ PM Surya Ghar Sites Done",
    desc: "Proven track record of delivering 500+ residential sites at Vizianagaram in just 7 months with 100% subsidy disbursement rate."
  },
  {
    title: "A-Grade Electrical Contractor",
    desc: "Fully licensed by the Electrical Licensing Board to execute LT/HT installations up to 33kV substations with complete safety compliance."
  },
  {
    title: "Tier-1 ALMM Equipment Only",
    desc: "We deploy solely MNRE-approved tier-1 solar panels (Vikram, Goldi, Adani) with 25-year linear performance warranties."
  },
  {
    title: "End-to-End Turnkey Accountability",
    desc: "From drone shadow analysis to DISCOM net-metering synchronization and continuous O&M, we take care of everything under one roof."
  }
];

export const CHAIRMAN_MESSAGE = {
  author: "N. Srinivasa Rao",
  role: "Chairman & Managing Director",
  company: "N Solutions Solar Company",
  quote: "Solar energy is no longer an alternative—it is the cornerstone of India's industrial sovereignty and energy freedom. At N Solutions, we have built a reputation over 16 years on uncompromised engineering quality, transparency, and rapid execution. Delivering 500+ PM Surya Ghar rooftop solar systems in Vizianagaram in record time is just the beginning of our nationwide mission.",
  subtext: "Our vision is to decarbonize over 100,000 roofs by 2030, empowering businesses to slash overheads and families to generate their own green electricity."
};

export const SERVICES = [
  {
    id: "commercial",
    num: "01",
    label: "Commercial Solar Installation",
    tagline: "Turnkey EPC for offices, hospitals, retail, and campuses",
    summary: "High-yield grid-connected rooftop and carport solar installations that slash commercial electricity tariffs from ₹11+/unit to under ₹3/unit levelized.",
    benefits: [
      "Significant electricity cost reduction of up to 75%",
      "Grid-connected with bi-directional net metering",
      "Accelerated depreciation benefits under IT Act",
      "Minimal rooftop space utilization with high-efficiency TOPCon panels",
      "Real-time mobile app and SCADA generation tracking"
    ],
    applications: "Offices, shopping malls, hospitals, private colleges, hotels, and banks.",
    image: "https://images.unsplash.com/photo-1786913507799-0ddbb3e7dbb6?w=900&h=600&fit=crop&auto=format"
  },
  {
    id: "residential",
    num: "02",
    label: "Residential Rooftop Solar",
    tagline: "PM Surya Ghar subsidy-linked systems for independent houses & villas",
    summary: "Complete rooftop solar packages designed for homeowners. Take advantage of up to ₹78,000 Central Govt subsidy under PM Surya Ghar Muft Bijli Yojana.",
    benefits: [
      "Zero or negligible monthly electricity bills",
      "Direct bank subsidy credit of up to ₹78,000",
      "Zero downpayment and low-interest bank loan facilitation",
      "25-year performance warranty on solar panels",
      "Protection from rising grid electricity tariffs"
    ],
    applications: "Independent houses, gated communities, villa projects, and residential welfare societies.",
    image: "https://images.unsplash.com/photo-1780445392692-a26e723dcf89?w=900&h=600&fit=crop&auto=format"
  },
  {
    id: "industrial",
    num: "03",
    label: "Industrial Solar EPC",
    tagline: "High-capacity captive solar for factories, warehouses, and mills",
    summary: "Large-capacity rooftop and ground-mounted solar installations for high-load industrial consumers looking to optimize operating margins and achieve ESG goals.",
    benefits: [
      "High ROI with 3.5-year simple payback period",
      "Captive power with seamless DG-synchronization",
      "Substantial tax savings via 40% accelerated depreciation",
      "Open access solar consultancy for MW-scale consumers",
      "Heavy-duty galvanized mounting engineered for 180 km/h wind speeds"
    ],
    applications: "Manufacturing factories, cold storage, textile mills, cement plants, and logistics hubs.",
    image: "https://images.unsplash.com/photo-1770936994282-8811fb7129ac?w=900&h=600&fit=crop&auto=format"
  },
  {
    id: "surya-ghar",
    num: "04",
    label: "PM Surya Ghar Execution",
    tagline: "Official empaneled channel partner on national portal",
    summary: "Dedicated project execution wing for PM Surya Ghar: Muft Bijli Yojana. 500+ installations completed at Vizianagaram alone with 250+ in active queue.",
    benefits: [
      "Empaneled contractor on National Solar Portal",
      "End-to-end subsidy application and DISCOM meter changeover",
      "Fast-track site survey within 48 hours",
      "DCR-compliant tier-1 bifacial panels",
      "Full documentation and loan assistance with nationalized banks"
    ],
    applications: "Residential households eligible under PM Surya Ghar national scheme.",
    image: "https://images.unsplash.com/photo-1780445392792-556e5609c5ab?w=900&h=600&fit=crop&auto=format"
  },
  {
    id: "om",
    num: "05",
    label: "Operation & Maintenance (O&M)",
    tagline: "Maximize uptime and kilowatt-hour yield over 25 years",
    summary: "Proactive, multi-tier O&M contracts that ensure your solar investment produces peak energy every day, rain or shine.",
    benefits: [
      "Automated and scheduled robotic/manual panel cleaning",
      "Drone thermal imaging (thermography) for hot-spot detection",
      "Inverter preventive diagnostics and string health checks",
      "Lightning protection and earth pit resistance audits (<2 Ohms)",
      "Guaranteed PR (Performance Ratio) service level agreements"
    ],
    applications: "All solar installations: commercial, industrial, residential, and MW power plants.",
    image: "https://images.unsplash.com/photo-1770068511771-7c146210a55b?w=900&h=600&fit=crop&auto=format"
  },
  {
    id: "supply",
    num: "06",
    label: "Solar Product Supply",
    tagline: "Wholesale & OEM distribution of tier-1 BOS components",
    summary: "Direct distribution of genuine tier-1 solar panels, smart inverters, customized galvanized structures, tinned DC cables, and chemical earthing systems.",
    benefits: [
      "Authorized channel partner for Vikram, Deye, Goldi, Polycab",
      "Factory-direct bulk pricing with GST invoices",
      "Immediate stock availability at regional warehouses",
      "Comprehensive test certificates and factory warranty support",
      "Pan-India logistics and on-site delivery"
    ],
    applications: "Solar system integrators, EPC contractors, institutions, and self-install projects.",
    image: "https://images.unsplash.com/photo-1780922577018-f49a4223e2d3?w=900&h=600&fit=crop&auto=format"
  },
  {
    id: "subsidies",
    num: "07",
    label: "Subsidies & Financing Assistance",
    tagline: "Hassle-free approvals, subsidy disbursements, and green loans",
    summary: "Our dedicated regulatory desk guides you through government subsidies, MNRE compliance, and zero-collateral green loans through SBI, Canara, PNB, and private banks.",
    benefits: [
      "PM Surya Ghar portal application submission and tracking",
      "Net-metering sanctioning from DISCOM without client legwork",
      "Collateral-free solar rooftop loans with tenure up to 7 years",
      "Accelerated depreciation certificate advisory",
      "Fastest subsidy credit directly into customer accounts"
    ],
    applications: "Homeowners, small & medium enterprises (MSMEs), and housing societies.",
    image: "https://images.unsplash.com/photo-1780445392628-d6f5b9e5609b?w=900&h=600&fit=crop&auto=format"
  },
  {
    id: "agri-pumps",
    num: "08",
    label: "Solar Water Pumps",
    tagline: "MNRE PM-KUSUM scheme solar agricultural pumping systems",
    summary: "Reliable AC/DC solar pumps that provide dependable irrigation for farming communities in off-grid or power-deficit agricultural belts.",
    benefits: [
      "Zero electricity and zero diesel operating costs",
      "Up to 60-90% subsidy under PM-KUSUM and state schemes",
      "Automatic solar tracking and dry-run protection",
      "High-discharge stainless steel submersible pump sets",
      "Drip and sprinkler irrigation integration"
    ],
    applications: "Agricultural farms, horticulture, rural drinking water schemes, and dairy farms.",
    image: "https://images.unsplash.com/photo-1776918570438-886f538edd93?w=900&h=600&fit=crop&auto=format"
  }
];

export const PRODUCTS = [
  {
    id: "panel-mono-topcon",
    name: "N-Type TOPCon 440W-550W Solar Panels",
    category: "solar-panels",
    categoryName: "Solar Panels",
    brand: "Vikram / Goldi Solar",
    specs: "440W - 550W | 22.8% Efficiency | 25-Yr Warranty",
    desc: "Next-generation N-Type TOPCon half-cut bifacial cells with ultra-low degradation, superior temperature coefficient, and maximum kWh yield per square meter.",
    applications: ["Commercial Rooftop", "Industrial Plants", "Residential Solar"],
    image: "https://images.unsplash.com/photo-1770936994282-8811fb7129ac?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "panel-mono-perc",
    name: "Monocrystalline PERC 410W-540W Panels",
    category: "solar-panels",
    categoryName: "Solar Panels",
    brand: "Adani / Vikram Solar",
    specs: "410W - 540W | 21.4% Efficiency | Tier-1 ALMM",
    desc: "High-reliability Mono PERC modules engineered for tough tropical Indian climates. Excellent diffuse light performance during cloudy monsoons.",
    applications: ["PM Surya Ghar", "Commercial Buildings", "Villa Projects"],
    image: "https://images.unsplash.com/photo-1780445392692-a26e723dcf89?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "inverter-string",
    name: "On-Grid String Inverters (3kW - 125kW)",
    category: "solar-inverters",
    categoryName: "Solar Inverters",
    brand: "Deye / Growatt",
    specs: "3kW to 125kW | Dual MPPT | 98.6% Efficiency",
    desc: "Transformerless grid-tied inverters with wide MPPT operating range, IP65 weatherproof casing, built-in DC disconnect switch, and Wi-Fi data logging.",
    applications: ["Commercial Solar", "Industrial Solar", "Residential Rooftop"],
    image: "https://images.unsplash.com/photo-1786913507799-0ddbb3e7dbb6?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "inverter-hybrid",
    name: "Smart Hybrid Inverters with Battery BMS",
    category: "solar-inverters",
    categoryName: "Solar Inverters",
    brand: "Deye Hybrid",
    specs: "5kW - 50kW | 48V / High-Voltage Battery Compatible",
    desc: "Multi-mode hybrid inverter supporting solar, LiFePO4 battery storage, diesel generator input, and grid export for 24/7 uninterrupted power.",
    applications: ["Hospitals", "Data Centers", "Commercial Power Backup"],
    image: "https://images.unsplash.com/photo-1780445392792-556e5609c5ab?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "earth-pit-chemical",
    name: "Maintenance-Free Chemical Earth Pits",
    category: "earth-pits",
    categoryName: "Earth Pits & Arrestors",
    brand: "N Solutions SafeGround",
    specs: "Copper Bonded 17.2mm Rod | BFC Compound | < 2 Ohms",
    desc: "Engineered maintenance-free earthing solution for solar DC and AC systems. Low resistivity backfill compound ensures steady dissipation of fault currents.",
    applications: ["All Solar Installations", "Substations", "Industrial Earthing"],
    image: "https://images.unsplash.com/photo-1770068511771-7c146210a55b?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "lightning-arrestor",
    name: "ESE Lightning Arrestors & Surge Protection",
    category: "earth-pits",
    categoryName: "Earth Pits & Arrestors",
    brand: "Early Streamer Emission",
    specs: "Level 1 Protection | 107m Protection Radius | NFC 17-102",
    desc: "Early Streamer Emission (ESE) lightning protection designed to protect rooftop and ground-mount photovoltaic arrays against direct atmospheric lightning strikes.",
    applications: ["Factory Sheds", "High-Rise Commercial", "Solar Farms"],
    image: "https://images.unsplash.com/photo-1780922577018-f49a4223e2d3?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "dc-cables",
    name: "UV-Resistant DC Solar Cables (4 sq.mm & 6 sq.mm)",
    category: "accessories",
    categoryName: "Accessories",
    brand: "Polycab / Havells",
    specs: "1500V DC Rated | Electron-Beam Cross-Linked XLPO | TUV Certified",
    desc: "Halogen-free, flame-retardant tinned copper solar cables built to withstand extreme heat, UV radiation, and ozone exposure for 25+ years.",
    applications: ["String Wiring", "Inter-module connections", "Inverter link"],
    image: "https://images.unsplash.com/photo-1780445392628-d6f5b9e5609b?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "mounting-structures",
    name: "Hot-Dip Galvanized Mounting Structures",
    category: "accessories",
    categoryName: "Accessories",
    brand: "N Solutions StructCore",
    specs: "80+ Micron Zinc Coating | 180 km/h Wind Speed Rated",
    desc: "Precision cold-formed galvanized steel rails, mid/end clamps, and pre-punched strut channels tailored for concrete flat roofs, tin sheds, and ground mounts.",
    applications: ["Rooftop Solar", "Industrial Sheds", "Elevated Solar Carports"],
    image: "https://images.unsplash.com/photo-1776918570438-886f538edd93?w=800&h=600&fit=crop&auto=format"
  },
  {
    id: "ac-dc-db",
    name: "ACDB & DCDB Distribution Boxes",
    category: "accessories",
    categoryName: "Accessories",
    brand: "IP65 Weatherproof",
    specs: "Schneider / L&T MCBs | Type-2 SPD | IP65 Enclosure",
    desc: "Pre-wired AC and DC distribution boxes equipped with high-surge SPDs, rotary DC isolator switches, and terminal blocks for foolproof electrical isolation.",
    applications: ["Residential Rooftops", "Commercial Grid-Tie", "Industrial"],
    image: "https://images.unsplash.com/photo-1786913507799-0ddbb3e7dbb6?w=800&h=600&fit=crop&auto=format"
  }
];

export const PROJECTS = [
  {
    id: "proj-1",
    title: "Sri Industries 250 kWp Industrial Rooftop",
    category: "Industrial",
    state: "Andhra Pradesh",
    location: "Auto Nagar, Visakhapatnam",
    capacity: "250 kWp",
    status: "Completed",
    year: "2024",
    desc: "Grid-connected captive solar power plant on a metal shed roof. Generates over 375,000 kWh annually, saving ₹28 Lakhs/yr.",
    scope: "Turnkey EPC: Structural load analysis, custom elevated purlins, 250kW string inverters, and DISCOM net-metering synchronization.",
    image: "https://images.unsplash.com/photo-1786913507799-0ddbb3e7dbb6?w=900&h=600&fit=crop&auto=format"
  },
  {
    id: "proj-2",
    title: "PM Surya Ghar 500+ Residential Cluster",
    category: "Residential",
    state: "Andhra Pradesh",
    location: "Vizianagaram District",
    capacity: "1.8 MWp Cumulative",
    status: "Completed",
    year: "2024",
    desc: "Executed 500+ rooftop solar installations across residential households within 7 months of national portal empanelment.",
    scope: "Site surveys, DCR TOPCon modules, subsidy application processing, DISCOM inspection, and net-meter provisioning.",
    image: "https://images.unsplash.com/photo-1780445392692-a26e723dcf89?w=900&h=600&fit=crop&auto=format"
  },
  {
    id: "proj-3",
    title: "Lakshmi Textiles 1.2 MWp Ground-Mount Solar",
    category: "Industrial",
    state: "Telangana",
    location: "Guntur / Hyderabad Corridor",
    capacity: "1.2 MWp",
    status: "Completed",
    year: "2023",
    desc: "MW-scale captive ground-mounted solar farm with centralized telemetry and 11kV evacuation for a large textile manufacturing mill.",
    scope: "Civil foundation, piling, HT switchyard, 33kV transmission line, and annual performance ratio SLA maintenance.",
    image: "https://images.unsplash.com/photo-1770936994282-8811fb7129ac?w=900&h=600&fit=crop&auto=format"
  },
  {
    id: "proj-4",
    title: "Government Medical College Solar Rooftop",
    category: "Government",
    state: "Karnataka",
    location: "Bengaluru Suburbs",
    capacity: "450 kWp",
    status: "Completed",
    year: "2023",
    desc: "NREDCAP/KREDL approved government institutional project powering ICU, laboratory, and hospital administrative blocks.",
    scope: "Complete engineering, supply of tier-1 ALMM panels, safety walkways, and 24/7 remote monitoring setup.",
    image: "https://images.unsplash.com/photo-1780922577018-f49a4223e2d3?w=900&h=600&fit=crop&auto=format"
  },
  {
    id: "proj-5",
    title: "Green Valley Housing Society (80 Villas)",
    category: "Residential",
    state: "Andhra Pradesh",
    location: "Madhurawada, Visakhapatnam",
    capacity: "240 kWp",
    status: "Completed",
    year: "2024",
    desc: "Rooftop solar network across 80 luxury villas plus club house common areas with individual net metering.",
    scope: "Custom aesthetic aluminum railings, dual string inverters per villa, and central society energy dashboard.",
    image: "https://images.unsplash.com/photo-1780445392628-d6f5b9e5609b?w=900&h=600&fit=crop&auto=format"
  },
  {
    id: "proj-6",
    title: "Grand Horizon Commercial Complex",
    category: "Commercial",
    state: "Tamil Nadu",
    location: "Chennai IT Highway",
    capacity: "350 kWp",
    status: "Completed",
    year: "2024",
    desc: "High-density commercial rooftop system offsetting 70% of day-time air conditioning and lighting loads.",
    scope: "Design, Supply, Installation, and commissioning with DG synchronization controller.",
    image: "https://images.unsplash.com/photo-1780445392792-556e5609c5ab?w=900&h=600&fit=crop&auto=format"
  },
  {
    id: "proj-7",
    title: "PM-KUSUM Agri Solar Pumping Grid",
    category: "Government",
    state: "Andhra Pradesh",
    location: "Anakapalli & Vizianagaram",
    capacity: "75 Solar Pumps (5HP & 7.5HP)",
    status: "Completed",
    year: "2024",
    desc: "Solar water pumping installations enabling year-round agricultural cultivation for rural farming clusters.",
    scope: "Solar PV arrays, VFD controller, submersible pump erection, and earth pit testing.",
    image: "https://images.unsplash.com/photo-1776918570438-886f538edd93?w=900&h=600&fit=crop&auto=format"
  },
  {
    id: "proj-8",
    title: "Mega Food Park 500 kWp Captive Plant",
    category: "Industrial",
    state: "Andhra Pradesh",
    location: "Coastal Corridor",
    capacity: "500 kWp",
    status: "In Progress",
    year: "2025",
    desc: "Large cold-storage captive solar plant currently in advanced commissioning stage.",
    scope: "Heavy industrial shed mounting, HT line synchronization, and SCADA automation.",
    image: "https://images.unsplash.com/photo-1770068511771-7c146210a55b?w=900&h=600&fit=crop&auto=format"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Ravi Kumar",
    company: "Sri Industries, Visakhapatnam",
    role: "Managing Director",
    project: "250 kWp Commercial Rooftop",
    text: "N Solutions handled our 250 kW rooftop installation with absolute professionalism. Their team took care of structural verification, net-metering approvals, and DISCOM synchronization without any headaches for us. Our monthly utility power bills have decreased by 68%. Highly recommended for any industrial facility.",
    rating: 5,
    date: "December 2024"
  },
  {
    id: 2,
    name: "Suresh Babu",
    company: "Lakshmi Textiles, Guntur",
    role: "Head of Plant Operations",
    project: "1.2 MWp Ground-Mount Solar",
    text: "Executing a 1.2 MW ground-mounted project requires deep engineering know-how. N Solutions delivered the plant two weeks ahead of schedule. The generation PR has consistently exceeded 82% over the last 18 months, and their proactive O&M team keeps the modules spotless.",
    rating: 5,
    date: "November 2024"
  },
  {
    id: 3,
    name: "Anita Sharma",
    company: "Green Valley Residents Welfare Association",
    role: "President",
    project: "PM Surya Ghar Villa Cluster (45 Homes)",
    text: "Under the PM Surya Ghar initiative, N Solutions solarized 45 homes in our colony. From paperless loan processing to clean installation and government subsidy crediting into our bank accounts, the process was seamless. Our society common area bills are now virtually zero!",
    rating: 5,
    date: "January 2025"
  },
  {
    id: 4,
    name: "K. Satyanarayana",
    company: "Aditya Cold Storage & Logistics",
    role: "Director",
    project: "350 kWp Industrial Rooftop",
    text: "For a cold storage business, electricity is our highest operating expense. N Solutions engineered a dual-MPPT high-capacity array that synchronizes directly with our backup DG sets. The return on investment has surpassed our original financial projections.",
    rating: 5,
    date: "October 2024"
  }
];

export const JOURNEY_TIMELINE = [
  {
    year: "2008",
    title: "Electrical Contracting Genesis",
    desc: "Established as an A-Grade licensed electrical contractor in Andhra Pradesh executing substations and HT transmission networks."
  },
  {
    year: "2014",
    title: "Entry into Solar EPC",
    desc: "Inception of the dedicated Solar Energy division; commissioned our first 100 kWp rooftop solar installation for a commercial enterprise."
  },
  {
    year: "2018",
    title: "State Empanelment & Regional Expansion",
    desc: "Empaneled as an approved channel partner with NREDCAP and APEPDCL. Expanded operations to Telangana, Karnataka, and Tamil Nadu."
  },
  {
    year: "2021",
    title: "50+ MW Cumulative EPC Milestone",
    desc: "Crossed 50 MW of cumulative solar capacity deployed across commercial, industrial, and agricultural pumping sectors."
  },
  {
    year: "2024",
    title: "PM Surya Ghar Record: 500+ Sites in 7 Months",
    desc: "Officially empaneled on the National Solar Portal. Executed 500+ residential rooftop sites at Vizianagaram with 100% subsidy clearance."
  },
  {
    year: "2025",
    title: "Pan-India Expansion across 9 States",
    desc: "Scaling active pipeline of 250+ residential sites, multiple MW-scale industrial plants, and growing footprint across 9 Indian states."
  },
  {
    year: "2026 Target",
    title: "2,000+ Rooftops & 250 MW Footprint",
    desc: "Corporate strategic target to achieve 2,000+ PM Surya Ghar rooftop solar homes and 250 MW cumulative clean energy footprint."
  }
];

export const LEADERSHIP = [
  {
    name: "N. Srinivasa Rao",
    initials: "NSR",
    role: "Chairman & Managing Director",
    bio: "Over 25 years of leadership in power distribution, heavy electrical engineering, and renewable energy. Founded N Solutions with a vision to deliver dependable clean power."
  },
  {
    name: "Dr. K. V. Ramanamurthy",
    initials: "KVR",
    role: "Director — Technical & Engineering",
    bio: "M.Tech & Ph.D in Power Systems with 18+ years designing high-voltage substations, grid sync architectures, and utility-scale PV plants."
  },
  {
    name: "M. Rajesh Varma",
    initials: "MRV",
    role: "Head of Projects & EPC Execution",
    bio: "Solar industry veteran who has overseen 120+ MW of solar installations across South India. Specializes in rapid-deployment rooftop and ground systems."
  },
  {
    name: "P. Lakshmi Prasanna",
    initials: "PLP",
    role: "Head of PM Surya Ghar Operations",
    bio: "Leads our residential rooftop initiatives and government portal liaison, delivering the 500+ site milestone at Vizianagaram in record time."
  }
];

export const CAREER_JOBS = [
  {
    id: "job-1",
    title: "Senior Solar EPC Project Manager",
    dept: "Projects & Operations",
    location: "Visakhapatnam / Vijayawada",
    experience: "5 - 8 Years",
    type: "Full-Time",
    desc: "Lead turnkey execution of Commercial & Industrial rooftop and ground-mounted solar projects from survey to net metering commissioning."
  },
  {
    id: "job-2",
    title: "Solar Design & Electrical Engineer",
    dept: "Engineering & Design",
    location: "Visakhapatnam (HQ)",
    experience: "2 - 5 Years",
    type: "Full-Time",
    desc: "Design detailed PVsyst generation models, AutoCAD layout drawings, string sizing, SLDs, and cable schedule calculations."
  },
  {
    id: "job-3",
    title: "PM Surya Ghar Rooftop Supervisor",
    dept: "Residential Operations",
    location: "Vizianagaram / Srikakulam",
    experience: "1 - 3 Years",
    type: "Full-Time",
    desc: "Oversee on-site installation of residential rooftop systems under the PM Surya Ghar scheme, ensuring safety and compliance."
  },
  {
    id: "job-4",
    title: "Business Development Executive (C&I Solar)",
    dept: "Sales & Marketing",
    location: "Hyderabad / Visakhapatnam",
    experience: "2 - 5 Years",
    type: "Full-Time",
    desc: "Identify, consult, and close rooftop solar opportunities with factory owners, commercial complexes, and hospital institutions."
  },
  {
    id: "job-5",
    title: "Solar O&M Technician",
    dept: "Service & Maintenance",
    location: "Andhra Pradesh & Telangana",
    experience: "1 - 3 Years",
    type: "Full-Time",
    desc: "Execute preventive maintenance, module thermography inspections, inverter troubleshooting, and earth resistance audits."
  }
];

export const INITIAL_LEADS = [
  {
    id: "lead-1",
    name: "Ravi Kumar",
    company: "Sri Industries",
    type: "Commercial Solar",
    location: "Visakhapatnam",
    status: "Qualified",
    phone: "+91 98480 11223",
    email: "ravi@sriindustries.com",
    bill: "₹1,80,000/mo",
    date: "2025-01-15"
  },
  {
    id: "lead-2",
    name: "Suresh Babu",
    company: "Lakshmi Textiles",
    type: "Industrial Solar",
    location: "Guntur",
    status: "In Progress",
    phone: "+91 98480 33445",
    email: "suresh@lakshmitextiles.in",
    bill: "₹5,20,000/mo",
    date: "2025-01-20"
  },
  {
    id: "lead-3",
    name: "Anita Sharma",
    company: "Green Valley Society",
    type: "Residential Rooftop",
    location: "Vizianagaram",
    status: "Contacted",
    phone: "+91 98480 55667",
    email: "anita.sharma@gmail.com",
    bill: "₹6,500/mo",
    date: "2025-01-28"
  },
  {
    id: "lead-4",
    name: "Rajesh Patel",
    company: "Green Farms Ltd",
    type: "Solar Pump",
    location: "Anakapalli",
    status: "New",
    phone: "+91 98480 77889",
    email: "rajesh@greenfarms.org",
    bill: "Agricultural",
    date: "2025-02-02"
  },
  {
    id: "lead-5",
    name: "Dr. K. Srinivas",
    company: "Apollo Dental Clinic",
    type: "Commercial Solar",
    location: "Vijayawada",
    status: "New",
    phone: "+91 98480 99001",
    email: "dr.srinivas@apollodental.com",
    bill: "₹35,000/mo",
    date: "2025-02-05"
  }
];

export const INITIAL_ENQUIRIES = [
  {
    id: "enq-1",
    name: "Mohan Das",
    email: "mohan@example.com",
    phone: "+91 91234 56780",
    subject: "Commercial Solar 100 kWp Enquiry",
    message: "We want to install 100 kW solar for our packaging factory in Autonagar. Please provide quotation and site visit schedule.",
    date: "2025-02-01",
    status: "Unread"
  },
  {
    id: "enq-2",
    name: "Priya Reddy",
    email: "priya@example.com",
    phone: "+91 92345 67891",
    subject: "PM Surya Ghar 3kW Rooftop Application",
    message: "Interested in 3kW rooftop solar for our 2-floor house in Vizianagaram. Please guide regarding subsidy and loan.",
    date: "2025-02-03",
    status: "Read"
  },
  {
    id: "enq-3",
    name: "Arun Kumar",
    email: "arun@example.com",
    phone: "+91 93456 78902",
    subject: "Annual O&M Contract for 500 kW Plant",
    message: "Looking for comprehensive O&M contract including automated cleaning and thermography scans for our plant in Guntur.",
    date: "2025-02-04",
    status: "Resolved"
  }
];

export const MEDIA_GALLERY = [
  {
    id: "med-1",
    title: "500+ PM Surya Ghar Sites Completed at Vizianagaram",
    tag: "Milestone",
    date: "December 2024",
    category: "Milestones",
    image: "https://images.unsplash.com/photo-1780445392692-a26e723dcf89?w=900&h=600&fit=crop&auto=format",
    desc: "N Solutions achieved the benchmark milestone of completing 500 residential rooftop solar installations at Vizianagaram within 7 months of empanelment under the PM Surya Ghar National Portal."
  },
  {
    id: "med-2",
    title: "250+ PM Surya Ghar Sites in Active Pipeline",
    tag: "Pipeline",
    date: "January 2025",
    category: "Milestones",
    image: "https://images.unsplash.com/photo-1780445392628-d6f5b9e5609b?w=900&h=600&fit=crop&auto=format",
    desc: "Over 250 additional residential solar sites currently in progress across Andhra Pradesh with turnkey DISCOM sanctioning and net metering."
  },
  {
    id: "med-3",
    title: "Target 2026: 2,000+ PM Surya Ghar Rooftops",
    tag: "Target",
    date: "Vision 2026",
    category: "Milestones",
    image: "https://images.unsplash.com/photo-1770936994282-8811fb7129ac?w=900&h=600&fit=crop&auto=format",
    desc: "Targeting 2,000+ completed PM Surya Ghar residential solar installations and 250 MW cumulative solar footprint by end of 2026."
  },
  {
    id: "med-4",
    title: "MW-Scale Ground-Mount Solar Construction",
    tag: "Gallery",
    date: "Ongoing",
    category: "Gallery",
    image: "https://images.unsplash.com/photo-1780922577018-f49a4223e2d3?w=900&h=600&fit=crop&auto=format",
    desc: "Site foundation and module erection for large-scale utility solar farm."
  },
  {
    id: "med-5",
    title: "Industrial Metal Roof Solar Array",
    tag: "Gallery",
    date: "Completed",
    category: "Gallery",
    image: "https://images.unsplash.com/photo-1786913507799-0ddbb3e7dbb6?w=900&h=600&fit=crop&auto=format",
    desc: "Elevated customized aluminum structure on industrial factory tin shed."
  },
  {
    id: "med-6",
    title: "Aerial View of Solar Power Station",
    tag: "Gallery",
    date: "Completed",
    category: "Gallery",
    image: "https://images.unsplash.com/photo-1776918570438-886f538edd93?w=900&h=600&fit=crop&auto=format",
    desc: "High-voltage grid-connected solar power evacuation system."
  },
  {
    id: "med-7",
    title: "Solar Agricultural Pump Installations",
    tag: "Gallery",
    date: "Completed",
    category: "Gallery",
    image: "https://images.unsplash.com/photo-1770068511771-7c146210a55b?w=900&h=600&fit=crop&auto=format",
    desc: "MNRE supported solar pump installations powering rural farming."
  }
];
