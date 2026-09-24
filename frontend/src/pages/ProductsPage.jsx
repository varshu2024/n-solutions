import { useState, useEffect } from 'react'
import { SiteHeader, SiteFooter, Arrow, AnimatedMetric, Reveal, navigate } from '../components/Shared'
import { apiGet } from '../utils/api'
import {
  FiArrowDown,
  FiX,
  FiActivity,
  FiZap,
  FiShield,
  FiSun,
  FiCpu,
  FiCheckCircle
} from 'react-icons/fi'

const PUBLIC_PRODUCT_CATEGORY_MAP = {
  'Solar Panels': 'modules',
  'Solar Inverters': 'inverters',
  'Solar Pumps': 'pumps',
  'Mounting Structures': 'structures',
  'Solar Cables': 'cables-bos',
  'Earth Pits & Arrestors': 'protection',
  'Electrical Accessories': 'cables-bos',
  'Other Components': 'protection'
}

function mapPublicProduct(product) {
  const categoryLabel = product?.category || 'Other Components'

  const applications = Array.isArray(product?.applications)
    ? product.applications
        .filter((item) => typeof item === 'string' && item.trim())
        .map((item) => item.trim())
    : []

  return {
    id: product?.id,
    name: product?.name || '',
    brand: product?.brand || '',
    category: PUBLIC_PRODUCT_CATEGORY_MAP[categoryLabel] || 'protection',
    categoryLabel,
    image: product?.image?.url || '',
    badge: categoryLabel,
    summary: product?.description || '',
    applications,
    warranty: '',
    efficiency: '',
    ratedOutput: applications[0] || '',
    certifications: '',
    specs: null,
    features: null
  }
}

function normalizePublicProducts(payload) {
  if (!Array.isArray(payload)) return []

  return payload
    .map(mapPublicProduct)
    .filter((product) => product.id && product.name)
}

export const productsCatalog = [
  // 1. SOLAR MODULES
  {
    id: 'prod-bifacial-625',
    name: 'Bi-Facial 625 Wp Mono PERC NDCR Solar Panel',
    brand: 'N Solutions Certified Tier-1',
    category: 'modules',
    categoryLabel: 'Solar Modules',
    image: '/products/bifacial-solar-module.jpg',
    badge: '25-Year Warranty',
    warranty: '25 Years Linear Performance',
    efficiency: '21.8%',
    ratedOutput: '625 Wp',
    certifications: 'ALMM Listed, BIS Certified, IEC 61215 / 61730',
    summary: 'High-power dual-glass bi-facial monocrystalline solar panel engineered for maximum energy generation from both direct sunlight and ground albedo reflection.',
    specs: {
      'Module Type': 'Bi-Facial Monocrystalline PERC (NDCR)',
      'Rated Peak Power (Pmax)': '625 Wp (+3% Positive Tolerance)',
      'Module Efficiency': '21.8%',
      'Cell Configuration': '144 Half-Cut High-Yield Cells',
      'Glass Construction': '2.0 mm + 2.0 mm Anti-Reflective Semi-Tempered Glass',
      'Frame': '40 mm Anodized Aluminum Alloy (Marine-Grade Corrosion Resistant)',
      'Junction Box': 'IP68 Weatherproof with 3 Bypass Diodes',
      'Temperature Coefficient (Pmax)': '-0.35% / °C',
      'Mechanical Load': 'Front 5400 Pa (Snow/Wind), Rear 2400 Pa'
    },
    features: [
      'Dual-glass bi-facial design provides 10% to 25% extra energy generation from ground albedo',
      'Anti-PID and anti-LID cell technology preserves long-term power generation capability',
      'NDCR compliant and approved under Ministry of New & Renewable Energy (MNRE) guidelines',
      'Robust 40mm frame designed for heavy wind speeds and cyclone-prone coastal territories'
    ],
    applications: ['Utility Ground Mounts', 'Commercial Rooftops', 'Industrial Factory Sheds', 'PM Surya Ghar Clusters']
  },
  {
    id: 'prod-topcon-580',
    name: 'N-Type TOPCon 580 Wp Dual-Glass Solar Module',
    brand: 'Tier-1 High-Efficiency',
    category: 'modules',
    categoryLabel: 'Solar Modules',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=85',
    badge: '30-Year Warranty',
    warranty: '30 Years Linear Output',
    efficiency: '22.6%',
    ratedOutput: '580 Wp',
    certifications: 'ALMM Approved, TUV Rheinland, IEC 62804',
    summary: 'Cutting-edge N-Type TOPCon module delivering ultra-high efficiency, lower temperature coefficient, and superior performance during low-light cloudy days.',
    specs: {
      'Module Type': 'N-Type TOPCon Bifacial Dual Glass',
      'Rated Peak Power (Pmax)': '580 Wp',
      'Module Efficiency': '22.6%',
      'Low-Light Performance': 'Exceptional morning, evening, and diffuse-light yield',
      'First Year Degradation': '< 1.0%',
      'Annual Degradation (Yr 2-30)': '< 0.40% per year',
      'Temperature Coefficient': '-0.30% / °C (Outstanding hot climate yield)',
      'Dimensions': '2278 x 1134 x 35 mm'
    },
    features: [
      'N-Type tunnel oxide passivated contact technology eliminates light-induced degradation',
      'Superior temperature coefficient guarantees high generation during harsh summer heatwaves',
      'Extended 30-year performance warranty with >87.4% output retention at year 30',
      'High fire-resistance rating with dual tempered architectural glass'
    ],
    applications: ['C&I Rooftops', 'Institutional Campuses', 'Industrial Cold Storages', 'Export Processing Zones']
  },
  {
    id: 'prod-residential-allblack',
    name: 'All-Black Mono PERC 450 Wp Residential Solar Panel',
    brand: 'Aesthetic Line',
    category: 'modules',
    categoryLabel: 'Solar Modules',
    image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=900&q=85',
    badge: 'Architectural Grade',
    warranty: '25 Years Linear Performance',
    efficiency: '21.0%',
    ratedOutput: '450 Wp',
    certifications: 'BIS, IEC, PM Surya Ghar Approved',
    summary: 'Sleek, all-black aesthetic solar panel created specifically for villas, premium residences, and architectural rooftops where visual elegance is paramount.',
    specs: {
      'Module Type': 'Full Black Monocrystalline Half-Cut',
      'Rated Power': '450 Wp',
      'Aesthetic Finish': 'Matte-Black Backsheet & Black Anodized Frame',
      'Module Efficiency': '21.0%',
      'Weight': '21.5 kg (Ideal for residential roof loads)',
      'Dimensions': '1762 x 1134 x 30 mm'
    },
    features: [
      'Pure matte-black surface blends seamlessly with modern residential architecture',
      'Compact dimensions allow versatile layout planning on complex residential roof layouts',
      'High shade-tolerant half-cut cell arrangement minimizes power loss from nearby parapets'
    ],
    applications: ['Luxury Villas', 'Residential Rooftops', 'Boutique Hotels', 'Gated Community Microgrids']
  },

  // 2. SOLAR INVERTERS
  {
    id: 'prod-solis-industrial-inverter',
    name: 'Solis 50 kW – 100 kW Multi-MPPT Industrial Inverter',
    brand: 'Solis / Sungrow Series',
    category: 'inverters',
    categoryLabel: 'Grid Inverters',
    image: '/projects/pokarna-stone-2mwp-solis-inverters.jpg',
    badge: 'Industrial Grade',
    warranty: '10-Year Warranty Option',
    efficiency: '98.8%',
    ratedOutput: '50 kW to 100 kW',
    certifications: 'CEIG Compliant, CEA Grid Standard, IEC 61727',
    summary: 'Heavy-duty multi-MPPT industrial string inverter designed for MW-scale captive commercial plants, factories, and ground-mount arrays with extreme thermal resilience.',
    specs: {
      'Rated Output': '50 kW / 80 kW / 100 kW',
      'Max Efficiency': '98.8%',
      'MPPT Architecture': '4 to 8 Independent MPPTs for multi-aspect roofs',
      'Grid Support': 'Reactive power control, LVRT, HVRT, and frequency regulation',
      'Housing': 'Die-cast aluminum enclosure with IP66 protection'
    },
    features: [
      'Multi-MPPT architecture maximizes generation on complex, uneven factory roofs',
      'Intelligent I-V curve scanning identifies string faults and module shading within seconds',
      'Integrates seamlessly with industrial SCADA systems via Modbus RTU / SunSpec'
    ],
    applications: ['Textile Spinning Mills', 'Pharmaceutical Campuses', 'Stone Processing Units', 'Shopping Malls']
  },

  // 3. SOLAR WATER PUMPS
  {
    id: 'prod-solar-pump-products',
    name: '7.5 HP Solar Submersible Borewell Agri Pumping System',
    brand: 'PM-KUSUM Approved (Shakti / Jain)',
    category: 'pumps',
    categoryLabel: 'Solar Pumps',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85',
    badge: 'Govt Subsidy Approved',
    warranty: '5 Years Complete Field SLA',
    efficiency: '92% Motor Efficiency',
    ratedOutput: '7.5 HP (5.5 kW)',
    certifications: 'MNRE / PM-KUSUM Tested, BIS IS 14220 / IS 9079',
    summary: 'High-head stainless steel solar submersible borewell pump paired with an intelligent MPPT variable frequency drive (VFD), delivering dependable daylight irrigation without diesel.',
    specs: {
      'Pump Rating': '7.5 HP (5.5 kW) Submersible Stainless Steel Stage Pump',
      'Solar Array Capacity': '7.5 kWp to 9.0 kWp Solar Modules',
      'Discharge Capacity': 'Up to 180,000 Liters of water per daylight cycle',
      'Head Range': '60 meters to 150 meters borewell depth',
      'Controller': 'Smart Solar VFD with auto-start, dry-run protection, and GSM telemetry',
      'Mounting': 'Seasonal dual-axis manual tracking pole structure'
    },
    features: [
      'Eliminates diesel bills and rural grid power outages for agricultural farmers',
      'Built-in dry-run sensor automatically protects pump motor if groundwater drops',
      'Remote mobile monitoring transmits daily water discharge and operating status via SMS'
    ],
    applications: ['Paddy & Sugarcane Fields', 'Horticulture Orchards', 'Aquaculture Fish Ponds', 'Rural Community Water Schemes']
  },
  {
    id: 'prod-solar-pump-5hp',
    name: '5 HP Solar Surface Monoblock Agricultural Pumping Set',
    brand: 'PM-KUSUM Series',
    category: 'pumps',
    categoryLabel: 'Solar Pumps',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=900&q=85',
    badge: 'PM-KUSUM Ready',
    warranty: '5 Years Complete System',
    efficiency: '90% Efficiency',
    ratedOutput: '5 HP (3.7 kW)',
    certifications: 'MNRE Approved, BIS Compliant',
    summary: 'Surface centrifugal solar pump designed for open wells, irrigation canals, and farm ponds to support drip and sprinkler irrigation networks.',
    specs: {
      'Pump Type': 'Surface Monoblock High-Flow Centrifugal Pump',
      'Motor': 'High-efficiency IP68 brushless DC / AC induction motor',
      'Solar Array': '4.8 kWp to 6.0 kWp Solar PV',
      'Water Delivery': 'Up to 240,000 Liters / day at shallow head'
    },
    features: [
      'High-volume water discharge ideal for flood irrigation and drip manifolds',
      'Requires zero grid electricity; runs automatically from 7:00 AM to 5:30 PM',
      'Corrosion-resistant stainless steel impeller and heavy-duty cast iron body'
    ],
    applications: ['Canal Water Lifting', 'Farm Pond Irrigation', 'Dairy Farms', 'Plantations']
  },

  // 4. MOUNTING STRUCTURES
  {
    id: 'prod-elevated-gi-structure',
    name: 'Elevated 7 x 8 FT GI Box Pipe Mounting Structure',
    brand: 'JSW / Mangal Steel',
    category: 'structures',
    categoryLabel: 'Mounting Structures',
    image: '/products/elevated-gi-structure.jpg',
    badge: '180 km/h Cyclone Proof',
    warranty: '25 Years Structural Integrity',
    efficiency: 'Full Terrace Usability',
    ratedOutput: 'Custom Sized (kW to MW)',
    certifications: 'IS 2062 Grade Steel, IS 4759 Galvanization Standard',
    summary: 'Heavy-gauge galvanized iron box pipe elevated structure elevating solar panels 7 to 8 feet above roof level, creating a shaded, 100% usable terrace below.',
    specs: {
      'Steel Material': 'JSW / Mangal Certified Heavy Structural Steel',
      'Galvanization': '80+ Micron Hot-Dip Galvanization (>1000 hours salt spray test)',
      'Clearance Height': '7 FT Front / 8.5 FT Rear (Walkable headroom)',
      'Wind Load Resistance': 'Engineered to withstand 180 km/h cyclone coastal winds',
      'Fasteners': 'Grade SS304 Stainless Steel Nuts, Bolts, and Spring Washers',
      'Foundation': 'Non-vibrational RCC base pedestal casting with chemical rebar anchoring'
    },
    features: [
      'Converts rooftop into a functional covered terrace garden, leisure gazebo, or drying area',
      'Elevates panels above neighboring parapets and water tanks, eliminating shade losses',
      'Robust structural engineering certified by licensed structural civil engineers'
    ],
    applications: ['Residential Terraces', 'Commercial Buildings', 'Hospital Rooftops', 'Institutions']
  },
  {
    id: 'prod-ballast-mounting-system',
    name: 'Aerodynamic Non-Penetrative Ballast Mounting System',
    brand: 'N Solutions Industrial',
    category: 'structures',
    categoryLabel: 'Mounting Structures',
    image: '/projects/port-indoor-stadium-590kwp-ballast-roof.jpg',
    badge: '100% Leak-Proof',
    warranty: '25 Years Anti-Corrosion',
    efficiency: 'Zero Roof Penetration',
    ratedOutput: 'Flat Roof Compatible',
    certifications: 'Wind Tunnel Tested (DIN 1055-4)',
    summary: 'Engineered non-penetrative mounting system utilizing aerodynamic aluminum brackets and precast concrete ballast weights to anchor solar arrays without puncturing the roof.',
    specs: {
      'Mounting Method': 'Pre-cast concrete counter-weight blocks with rubber isolation pads',
      'Roof Impact': 'Zero drilling, zero puncturing, 100% waterproof integrity preserved',
      'Tilt Angle': 'Aerodynamic 10° to 15° fixed tilt minimizing wind uplift forces',
      'Material': 'AL6005-T5 Anodized Aluminum with SS304 hardware'
    },
    features: [
      'Eliminates all risk of water leakage into sensitive building interiors below',
      'As used on the 590 KWp Port Indoor Stadium and Ramky Pharma cleanrooms',
      'Quick modular assembly with integrated cable containment channels'
    ],
    applications: ['Cleanroom Pharma Facilities', 'Sports Stadiums', 'IT Parks', 'Waterproofed Flat Roofs']
  },
  {
    id: 'prod-carport-canopy-structure',
    name: 'High-Clearance Cantilever Solar Carport Canopy',
    brand: 'N Solutions Infrastructure',
    category: 'structures',
    categoryLabel: 'Mounting Structures',
    image: '/projects/jharkhand-high-court-carport-aerial.jpg',
    badge: 'Dual Utility Shade',
    warranty: '25 Years Warranty',
    efficiency: 'Parking + Generation',
    ratedOutput: '2 to 100+ Vehicle Bays',
    certifications: 'IS 800 Steel Design Code Compliant',
    summary: 'Heavy structural steel cantilever canopy structure transforming vehicle parking zones into clean solar electricity power stations with weatherproof shade.',
    specs: {
      'Structure Style': 'Single or Double Bay Cantilever with Central / Side Columns',
      'Clearance Height': '3.2 meters to 4.5 meters (Accommodates SUVs, ambulances, vans)',
      'Coating': 'Epoxy primer + polyurethane architectural coating or hot-dip GI',
      'Drainage': 'Integrated concealed rainwater gutters and downspouts'
    },
    features: [
      'Shelters vehicles against scorching sun, hail, and monsoon downpours',
      'Generates megawatt-scale power as demonstrated at Jharkhand High Court and 20 D-Mart locations',
      'Includes options for integrated EV charging station hookups and LED night lighting'
    ],
    applications: ['Government Judiciary Campuses', 'Hypermarket Parking Lots', 'Hospital Car Parks', 'Corporate Tech Parks']
  },

  // 5. CABLING & BALANCE OF SYSTEM (BOS)
  {
    id: 'prod-polycab-dc-cable',
    name: 'Polycab DC Solar Cable (Size 4 sq mm & 6 sq mm)',
    brand: 'Polycab',
    category: 'cables-bos',
    categoryLabel: 'Cabling & BOS',
    image: '/products/polycab-dc-cable.jpg',
    badge: 'TUV / EN 50618',
    warranty: '25 Years Design Life',
    efficiency: '< 1% Voltage Drop',
    ratedOutput: '1500V DC Rated',
    certifications: 'TUV 2 Pfg 1169, EN 50618, IS 694',
    summary: 'Tinned copper flexible conductors insulated with electron-beam cross-linked halogen-free copolymer, engineered specifically for harsh exterior solar PV installations.',
    specs: {
      'Conductor': 'Class 5 Flexible Electrolytic Tinned Copper',
      'Insulation': 'Electron-Beam Cross-Linked Halogen-Free Flame Retardant Compound (XLPO)',
      'Voltage Rating': '1.5 kV DC (Operating up to 1.8 kV DC)',
      'Temperature Range': '-40°C to +120°C (Max Conductor Temp)',
      'Resistance': 'High resistance to UV, ozone, moisture, microbial attack, and chemicals'
    },
    features: [
      'Official cable standard deployed across all N Solutions residential and megawatt projects',
      'Flame retardant and halogen-free compound prevents toxic gas emissions during fire hazards',
      'Guaranteed 25+ years operating life under continuous tropical ultraviolet exposure'
    ],
    applications: ['String Cabling', 'DC Junction Routing', 'Module Interconnections', 'Ground-Mount Arrays']
  },
  {
    id: 'prod-polycab-ac-cable',
    name: 'Polycab 3.5 Core 50 sq mm Aluminum Armoured AC Cable',
    brand: 'Polycab',
    category: 'cables-bos',
    categoryLabel: 'Cabling & BOS',
    image: '/products/polycab-ac-cable.jpg',
    badge: 'IS 7098 (Part 1)',
    warranty: '100% Tested & Certified',
    efficiency: 'Heavy-Duty Power Feed',
    ratedOutput: '1.1 kV AC Grade',
    certifications: 'IS 7098 Part 1, IS 1554, CPRI Tested',
    summary: 'Heavy-duty steel wire armoured multi-core power cable engineered for subterranean and exterior grid transmission from solar inverters to main LT panels.',
    specs: {
      'Configuration': '3.5 Core (3 Phase + Reduced Neutral)',
      'Conductor Size': '50 sq mm Stranded Compacted Aluminum',
      'Armor': 'Galvanized Steel Flat Strip / Wire Armor for superior mechanical crushing resistance',
      'Outer Sheath': 'Tough extruded PVC compound with moisture barrier'
    },
    features: [
      'Provides bulletproof mechanical defense against accidental excavation, rodents, and crushing',
      'Optimized conductor cross-section reduces AC line power losses to well under 1.5%',
      'Standardized for commercial, industrial, and institutional net-meter grid evacuations'
    ],
    applications: ['Inverter to Main LT Panel', 'Transformer Evacuation', 'Subterranean Trench Routing', 'Factory Main Switchboards']
  },
  {
    id: 'prod-dcdb-ajb',
    name: 'IP66 Solar Array Junction Box (DCDB) with Type-II SPD',
    brand: 'N Solutions Standard',
    category: 'cables-bos',
    categoryLabel: 'Cabling & BOS',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=85',
    badge: 'IP66 Weatherproof',
    warranty: '5 Years Guarantee',
    efficiency: '1000V DC Protection',
    ratedOutput: '1 to 4 Strings Input',
    certifications: 'IEC 61439, UL 94V-0 Fire Retardant',
    summary: 'Weatherproof enclosure housing 1000V DC fuses, rotary isolator disconnect switch, and Class-II surge protection devices to safeguard inverters from transient surges.',
    specs: {
      'Enclosure': 'Polycarbonate IP66 with transparent inspection window',
      'Fuses': '1000V / 1500V DC GPV Cylindrical Solar Fuses (15A/20A/30A)',
      'Surge Arrester': 'Class II (Type 2) DC Surge Protective Device (Imax 40kA)',
      'Switch': 'Lockable DC rotary isolator disconnect with arc extinguishment'
    },
    features: [
      'Shields sensitive solar inverter MPPT inputs against high-voltage atmospheric lightning pulses',
      'Quick-turn transparent cover allows instant visual inspection of blown fuse indicators',
      'Pre-terminated with waterproof cable glands for rapid on-site electrical connection'
    ],
    applications: ['Residential Rooftops', 'Commercial Solar Arrays', 'Solar Pump Systems']
  },

  // 6. PROTECTION & MAINTENANCE
  {
    id: 'prod-chemical-earth-pit',
    name: 'Copper-Bonded Chemical Earthing Electrode System',
    brand: 'N Solutions Certified',
    category: 'protection',
    categoryLabel: 'Safety & Earthing',
    image: '/products/chemical-earth-pit.jpg',
    badge: '< 1 Ohm Resistance',
    warranty: '15 Years Maintenance-Free',
    efficiency: 'Deep Ground Discharge',
    ratedOutput: 'Fault Current 40 kA',
    certifications: 'IEEE 80, IS 3043, CPRI Tested',
    summary: 'Maintenance-free copper-bonded steel chemical earthing rod embedded in ground-enhancing compound, guaranteeing fault dissipation with under 1-Ohm resistance.',
    specs: {
      'Electrode': 'High-tensile steel core with 250+ micron molecularly bonded electrolytic copper',
      'Rod Dimensions': '17.2 mm diameter x 3.0 meters depth',
      'Compound': 'Carbonaceous moisture-retaining Ground Enhancing Mineral (GEM)',
      'Chamber Cover': 'Heavy-duty poly-plastic / RCC inspection pit with test link'
    },
    features: [
      'Maintains stable sub-1 Ohm soil resistivity even during dry summer droughts without watering',
      'Eliminates dangerous touch and step voltages for homeowner and maintenance staff safety',
      'Meets all CEIG, DISCOM, and international electrical safety compliance regulations'
    ],
    applications: ['Solar DC Earthing', 'AC Inverter Neutral Ground', 'Lightning Arrestor Discharge', 'Industrial HT Yards']
  },
  {
    id: 'prod-lightning-arrestor',
    name: 'Early Streamer Emission (ESE) Lightning Protection Terminal',
    brand: 'Advance Protection',
    category: 'protection',
    categoryLabel: 'Safety & Earthing',
    image: '/products/lightning-arrestor.jpg',
    badge: 'Class-1 Lightning Shield',
    warranty: '10 Years Warranty',
    efficiency: '60 to 107 Meter Radius',
    ratedOutput: '200 kA Withstand',
    certifications: 'NFC 17-102 (2011), IEC 62305, CPRI Certified',
    summary: 'High-altitude early streamer emission lightning rod creating an ion cloud to safely intercept direct lightning strokes and divert them harmlessly underground.',
    specs: {
      'Technology': 'Early Streamer Emission (ESE) Active Triggering Ionization',
      'Protection Radius': 'Up to 107 meters radius (Level IV) depending on mast elevation',
      'Material': 'Grade 316L Stainless Steel corrosion-proof tip and housing',
      'Mast': 'Hot-dip galvanized heavy pipe with lightning strike counter'
    },
    features: [
      'Guards expansive solar panel arrays against devastating direct cloud-to-ground lightning strikes',
      'Includes digital strike counter to register every atmospheric discharge event',
      'Zero external power required; energized entirely by the atmospheric electrical gradient'
    ],
    applications: ['Industrial Plant Roofs', 'Megawatt Ground Mounts', 'Stadiums & Carports', 'High-Rise Commercial Buildings']
  },
  {
    id: 'prod-cleaning-system',
    name: 'Automated Pressurized Solar Module Cleaning System',
    brand: 'N Solutions WashTech',
    category: 'protection',
    categoryLabel: 'Maintenance & Wash',
    image: '/products/module-cleaning-system.jpg',
    badge: 'Boosts Yield up to 15%',
    warranty: '5 Years System Warranty',
    efficiency: 'Water Conserving',
    ratedOutput: 'Automated Spray Cycle',
    certifications: 'ISO 9001, Industrial Rated',
    summary: 'Permanent rooftop pressurized wash pipeline network with specialized non-abrasive atomizing spray nozzles that wash dust and soot off solar panels on automated timers.',
    specs: {
      'Nozzle Type': 'Precision brass / polymer atomizing fan-spray nozzles',
      'Water Consumption': 'Less than 0.8 Liters per solar panel per wash cycle (80% less than manual wash)',
      'Pump Station': 'High-pressure booster pump with automated filtration and sediment trap',
      'Control': 'Programmable digital timer executing wash cycles at pre-dawn or dusk'
    },
    features: [
      'Eliminates soiling loss and restores peak power output without hazardous manual roof walking',
      'Uniform water misting prevents thermal shock micro-cracks on hot solar cell wafers',
      'Drastically cuts labor expenditure and water waste across commercial and industrial roofs'
    ],
    applications: ['Cement & Mining Belts', 'Highway Corridor Plants', 'Industrial Factory Sheds', 'Rooftops']
  }
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])
  const [catalogStatus, setCatalogStatus] = useState('loading')
  const [catalogError, setCatalogError] = useState('')

  const loadProducts = async () => {
    setCatalogStatus('loading')
    setCatalogError('')

    const result = await apiGet('/public/products')
    if (!result.success) {
      setProducts([])
      setCatalogStatus('error')
      setCatalogError(result.message || 'Unable to load products. Please try again.')
      return
    }

    const nextProducts = normalizePublicProducts(result.data)
    setProducts(nextProducts)
    setCatalogStatus(nextProducts.length ? 'ready' : 'empty')
  }

  useEffect(() => {
    document.title = 'Solar Products & Engineering Hardware | N Solutions'
    window.scrollTo({ top: 0, behavior: 'smooth' })
    loadProducts()
  }, [])

  const categories = [
    { id: 'ALL', label: 'All Products', count: products.length },
    {
      id: 'modules',
      label: 'Solar PV Modules',
      count: products.filter(p => p.category === 'modules').length
    },
    {
      id: 'inverters',
      label: 'Grid Inverters',
      count: products.filter(p => p.category === 'inverters').length
    },
    {
      id: 'pumps',
      label: 'Solar Agri Pumps',
      count: products.filter(p => p.category === 'pumps').length
    },
    {
      id: 'structures',
      label: 'Mounting Structures',
      count: products.filter(p => p.category === 'structures').length
    },
    {
      id: 'cables-bos',
      label: 'Cabling & BOS',
      count: products.filter(p => p.category === 'cables-bos').length
    },
    {
      id: 'protection',
      label: 'Safety & Protection',
      count: products.filter(p => p.category === 'protection').length
    },
  ]

  const filteredProducts = products.filter(prod => {
    const matchesCat = activeCategory === 'ALL' || prod.category === activeCategory
    const matchesSearch = searchQuery === '' ||
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="products-page">
      <SiteHeader activePath="/products" />

      <main>
        {/* HERO SECTION */}
        <section className="products-hero">
          <video 
            className="hero-video" 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="auto" 
            aria-hidden="true"
          >
            <source src="/media/products.mp4" type="video/mp4" />
          </video>
          <div className="products-hero-shade" />

          <div className="wrap products-hero-content">
            <p className="eyebrow light">
              <span /> Certified Tier-1 Equipment & Verified Hardware Standards
            </p>
            <h1>
              Engineered Solar Products.<br />
              <em>Built for Decades of Output.</em>
            </h1>
            <p className="products-hero-lead">
              From ALMM-listed Bi-Facial 625 Wp solar modules and DEYE/Microtek 3-phase smart grid inverters, to PM-KUSUM agricultural solar pumps, JSW elevated galvanized structures, Polycab armoured cables, and sub-1Ω chemical earthing—every component is field-tested for maximum generation and enduring safety.
            </p>

            <div className="products-hero-actions">
              <a 
                className="button button-accent" 
                href="/contact" 
                onClick={(e) => { e.preventDefault(); navigate('/contact') }}
              >
                Inquire for Hardware Supply <Arrow />
              </a>
              <a 
                className="button button-ghost" 
                href="#catalog-view"
              >
                Browse Product Catalog <FiArrowDown style={{ verticalAlign: 'middle' }} />
              </a>
            </div>
          </div>

          <div className="products-hero-strip">
            <div className="wrap products-hero-metrics">
              <div className="metric-cell">
                <AnimatedMetric value={25} suffix=" Yrs" label="Linear Module Performance" />
              </div>
              <div className="metric-cell">
                <AnimatedMetric value={100} suffix="%" label="ALMM & BIS Quality Certified" />
              </div>
              <div className="metric-cell">
                <AnimatedMetric value={10} suffix=" Yrs" label="Comprehensive Inverter Warranty" />
              </div>
              <div className="metric-cell">
                <AnimatedMetric value={180} suffix=" km/h" label="Cyclone Wind Resilience" />
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT CATALOG DIRECTORY */}
        <section className="products-directory wrap" id="catalog-view">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow"><span /> Complete Equipment Catalog</p>
              <h2>Certified solar components &<br /><em>system hardware.</em></h2>
            </div>
            
            {/* Search Input */}
            <div className="directory-search-box">
              <input 
                type="text"
                placeholder="Search by module, inverter, pump, brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
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

          {/* Category Filter Pills */}
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
  <p className="heading-note">Loading product catalog...</p>
) : null}

{catalogStatus === 'error' ? (
  <div className="projects-empty-results">
    <p role="alert">{catalogError}</p>
    <button
      type="button"
      className="button button-accent"
      onClick={loadProducts}
    >
      Retry
    </button>
  </div>
) : null}

{catalogStatus === 'empty' ? (
  <div className="projects-empty-results">
    <p>No products are currently listed.</p>
  </div>
) : null}

{/* Product Cards Grid */}
{catalogStatus === 'ready' ? (
  <div className="product-cards-grid">
    {filteredProducts.map((prod) => (
      <Reveal key={prod.id} className="product-item-card">
        <div className="product-card-media">
          {prod.image ? (
            <img
              src={prod.image}
              alt={prod.name}
              loading="lazy"
            />
          ) : null}

          {prod.badge ? (
            <span className="product-card-badge">
              {prod.badge}
            </span>
          ) : null}
        </div>

        <div className="product-card-body">
          <div className="product-card-meta">
            <span className="product-brand-tag">
              {prod.brand}
            </span>

            <span className="product-cat-marker">
              {prod.categoryLabel}
            </span>
          </div>

          <h3>{prod.name}</h3>

          <p className="product-summary-text">
            {prod.summary}
          </p>

          {(prod.efficiency ||
            prod.ratedOutput ||
            prod.warranty) ? (
            <div className="product-quick-specs">
              {(prod.efficiency || prod.ratedOutput) ? (
                <div>
                  <strong>
                    {prod.efficiency || prod.ratedOutput}
                  </strong>
                  <small>Rating / Output</small>
                </div>
              ) : null}

              {prod.warranty ? (
                <div>
                  <strong>{prod.warranty}</strong>
                  <small>Warranty</small>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="product-card-footer">
            <button
              type="button"
              className="product-specs-btn"
              onClick={() => setSelectedProduct(prod)}
            >
              Inspect Full Specs <Arrow />
            </button>

            <a
              href="/contact"
              className="product-inquire-btn"
              onClick={(e) => {
                e.preventDefault()
                navigate('/contact')
              }}
            >
              Request Quote
            </a>
          </div>
        </div>
      </Reveal>
    ))}
  </div>
) : null}

{catalogStatus === 'ready' && filteredProducts.length === 0 && (
            <div className="projects-empty-results">
              <p>No products match your current search query or filter.</p>
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

        {/* QUALITY ASSURANCE & PROCUREMENT PROTOCOL */}
        <section className="products-qa-section">
          <div className="wrap">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow light"><span /> Strict Quality Benchmarks</p>
                <h2>Why our hardware standards<br /><em>guarantee lasting yield.</em></h2>
              </div>
              <p className="heading-note light">
                Solar plants must endure 25+ years of intense tropical heat, coastal humidity, and severe monsoon storms. We strictly supply equipment meeting international certifications.
              </p>
            </Reveal>

            <div className="qa-features-grid">
              <Reveal className="qa-feature-card">
                <div className="qa-icon">01</div>
                <h4>100% ALMM & BIS Listed</h4>
                <p>All supplied solar modules are verified on the Ministry of New and Renewable Energy (MNRE) Approved List of Models and Manufacturers (ALMM), ensuring full eligibility for government subsidies and net-metering.</p>
              </Reveal>

              <Reveal className="qa-feature-card">
                <div className="qa-icon">02</div>
                <h4>DISCOM Net-Meter Approved</h4>
                <p>Every grid inverter supplied by N Solutions is pre-tested and certified by state power distribution utilities (APEPDCL, APCPDCL, TSSPDCL) for anti-islanding, harmonic mitigation, and bi-directional smart metering.</p>
              </Reveal>

              <Reveal className="qa-feature-card">
                <div className="qa-icon">03</div>
                <h4>Cyclone-Resilient Galvanization</h4>
                <p>Mounting structures use JSW / Mangal steel with 80+ micron hot-dip galvanization designed specifically for heavy coastal winds up to 180 km/h, preventing corrosion for 25+ years.</p>
              </Reveal>

              <Reveal className="qa-feature-card">
                <div className="qa-icon">04</div>
                <h4>Factory Testing & Flash Reports</h4>
                <p>Every batch of solar modules and inverters comes backed with factory laboratory flash reports, electroluminescence (EL) crack test verification, and manufacturer serial tracking.</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* HARDWARE CONSULTATION CTA */}
        <section className="projects-cta-section">
          <div className="wrap">
            <Reveal className="projects-cta-box">
              <p className="eyebrow light"><span /> Direct Hardware Supply & Turnkey EPC</p>
              <h2>Need a specific product specification or bulk procurement?<br /><em>Our technical supply desk is ready to assist.</em></h2>
              <p>
                Whether you need a single 3 kW residential kit under PM Surya Ghar or megawatt-scale utility equipment for an industrial power plant, we provide certified genuine hardware with warranty assurance.
              </p>
              <div className="cta-actions">
                <a 
                  className="button button-accent" 
                  href="/contact" 
                  onClick={(e) => { e.preventDefault(); navigate('/contact') }}
                >
                  Inquire for Product Supply <Arrow />
                </a>
                <a 
                  className="button button-ghost" 
                  href="tel:+917993836424"
                >
                  Call Hardware Desk (+91 7993836424)
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* DETAILED TECHNICAL SPECIFICATIONS MODAL */}
        {selectedProduct && (
          <div className="project-modal-backdrop" onClick={() => setSelectedProduct(null)}>
            <div className="project-modal-card" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                className="modal-close-btn"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>

              <div className="modal-header">
                <div className="modal-header-meta">
                  <span className="badge-tag">{selectedProduct.categoryLabel}</span>
{selectedProduct.badge ? (
  <span className="badge-capacity">
    {selectedProduct.badge}
  </span>
) : null}

{selectedProduct.brand ? (
  <span className="badge-status">
    {selectedProduct.brand}
  </span>
) : null}
</div>

<h2>{selectedProduct.name}</h2>

{selectedProduct.certifications ? (
  <p className="modal-location">
    Certifications:{' '}
    <strong>{selectedProduct.certifications}</strong>
  </p>
) : null}
</div>

{selectedProduct.image ? (
  <div className="modal-hero-image">
    <img
      src={selectedProduct.image}
      alt={selectedProduct.name}
    />
  </div>
) : null}

              <div className="modal-body-content">
                <div className="modal-overview-text">
                  <h3>Product Overview</h3>
                  <p>{selectedProduct.summary}</p>
                </div>

                {selectedProduct.specs &&
Object.keys(selectedProduct.specs).length > 0 ? (
  <div className="product-telemetry-hud">
    <div
      className="cockpit-header-bar"
      style={{ marginBottom: '16px' }}
    >
      <div className="cockpit-title-wrap">
        <div className="cockpit-radar-icon">
          <FiCpu size={14} />
        </div>

        <h3
          style={{
            fontSize: '15px',
            color: '#ffffff'
          }}
        >
          Hardware Engineering & Performance Telemetry
        </h3>
      </div>

      <span className="cockpit-status-chip">
        <span className="cockpit-pulse-dot" />
        Verified Specification
      </span>
    </div>

    <div className="hud-capsules-grid">
      {Object.entries(selectedProduct.specs).map(
        ([key, val], idx) => (
          <div
            key={key}
            className="hud-spec-capsule"
          >
            <span className="spec-k">
              PAR-
              {idx + 1 < 10
                ? `0${idx + 1}`
                : idx + 1}{' '}
              · {key}
            </span>

            <span className="spec-v">
              {val}
            </span>

            <div className="spec-indicator-bar">
              <div
                className="spec-indicator-fill"
                style={{
                  width: `${85 + (idx % 3) * 5}%`
                }}
              />
            </div>
          </div>
        )
      )}
    </div>
  </div>
) : null}

                {Array.isArray(selectedProduct.features) &&
selectedProduct.features.length > 0 ? (
  <div className="modal-highlights-section">
    <h3>Key Advantages & Engineering Benchmarks</h3>

    <div className="engineering-log-stream">
      {selectedProduct.features.map((f, i) => (
        <div
          key={i}
          className="log-stream-entry"
        >
          <div className="log-stream-node">
            <div className="log-stream-node-inner" />
          </div>

          <div className="log-stream-content">
            <span className="log-stream-tag">
              ✓ Certified Standard Advantage {i + 1}
            </span>

            <p className="log-stream-text">
              {f}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
) : null}

                {selectedProduct.applications && (
                  <div className="modal-highlights-section" style={{ marginTop: '20px' }}>
                    <h3>Recommended Applications</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                      {selectedProduct.applications.map((app, i) => (
                        <span key={i} className="client-pill" style={{ padding: '6px 14px', fontSize: '12px' }}>
                          <span className="client-dot" />
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="modal-footer-cta">
                  <p>Require pricing, datasheet, or bulk quantity supply for this product?</p>
                  <a 
                    className="button button-accent" 
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedProduct(null)
                      navigate('/contact')
                    }}
                  >
                    Inquire About {selectedProduct.name} <Arrow />
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
