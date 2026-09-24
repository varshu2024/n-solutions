const TOKEN_KEY = 'nsolutions_admin_token'
const USER_KEY = 'nsolutions_admin_user'
const DATA_STORAGE_KEY = 'nsolutions_admin_data'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// Initial seed data so the dashboard is rich and fully interactive on day 1
const INITIAL_DEMO_DATA = {
  stats: {
    totalLeads: 142,
    activeProjects: 18,
    productsListed: 24,
    openPositions: 6,
    totalEnquiries: 89,
    solarCapacityInstalled: '12.4 MW'
  },
  leads: [
    {
      id: 'lead-101',
      name: 'Dr. Ramesh Varma',
      company: 'Varma Specialty Hospital',
      phone: '+91 98480 23451',
      email: 'ramesh.varma@varmahospitals.in',
      type: 'commercial',
      location: 'Visakhapatnam, AP',
      status: 'new',
      capacity: '100 kW Rooftop',
      date: '2026-09-20'
    },
    {
      id: 'lead-102',
      name: 'K. Srinivasa Rao',
      company: 'Coastal Poly Plast Pvt Ltd',
      phone: '+91 94401 56782',
      email: 'srinivas@coastalpoly.com',
      type: 'industrial',
      location: 'Vizianagaram Industrial Estate',
      status: 'in_progress',
      capacity: '500 kW Ground Mount',
      date: '2026-09-19'
    },
    {
      id: 'lead-103',
      name: 'M. Anand Sharma',
      company: 'Greenfield Villa Residency',
      phone: '+91 99890 11223',
      email: 'anand.sharma@gmail.com',
      type: 'residential',
      location: 'MVP Colony, Visakhapatnam',
      status: 'qualified',
      capacity: '10 kW Solar Rooftop',
      date: '2026-09-18'
    },
    {
      id: 'lead-104',
      name: 'P. Venkata Reddy',
      company: 'Sri Venkateswara Rice Mills',
      phone: '+91 91772 88440',
      email: 'pvreddy.agro@gmail.com',
      type: 'industrial',
      location: 'Bobbali, AP',
      status: 'in_progress',
      capacity: '250 kW C&I',
      date: '2026-09-17'
    },
    {
      id: 'lead-105',
      name: 'Smt. Lakshmi Devi',
      company: 'Residential / PM Surya Ghar',
      phone: '+91 93902 44321',
      email: 'lakshmidevi.vizag@gmail.com',
      type: 'residential',
      location: 'Gajuwaka, Visakhapatnam',
      status: 'new',
      capacity: '3 kW Rooftop Subsidy',
      date: '2026-09-16'
    }
  ],
  projects: [
    {
      id: 'proj-201',
      title: 'Vizianagaram 500+ PM Surya Ghar Cluster',
      category: 'residential',
      location: 'Vizianagaram District, AP',
      capacity: '1.5 MW Aggregate',
      status: 'completed',
      client: 'PM Surya Ghar Muft Bijli Yojana',
      year: '2025-2026'
    },
    {
      id: 'proj-202',
      title: 'Coastal Agro Processing C&I Solar Plant',
      category: 'industrial',
      location: 'Parawada Industrial Corridor',
      capacity: '850 kW Solar PV',
      status: 'in_progress',
      client: 'Coastal Agro Ltd',
      year: '2026'
    },
    {
      id: 'proj-203',
      title: 'Heritage Educational Institution Rooftop',
      category: 'commercial',
      location: 'Madhurawada, Visakhapatnam',
      capacity: '200 kW Grid-Tied',
      status: 'completed',
      client: 'Heritage Group of Institutions',
      year: '2025'
    },
    {
      id: 'proj-204',
      title: 'Steel Fabricators Captive Solar Facility',
      category: 'industrial',
      location: 'Autonagar, Visakhapatnam',
      capacity: '1.2 MW Ground Mount',
      status: 'in_progress',
      client: 'Apex Steel Industries',
      year: '2026'
    }
  ],
  products: [
    {
      id: 'prod-301',
      name: 'Mono PERC Bifacial Solar Modules 550W+',
      category: 'Solar Panels',
      model: 'NS-MB-550',
      efficiency: '21.8%',
      warranty: '25 Years Performance',
      inStock: true
    },
    {
      id: 'prod-302',
      name: 'Three-Phase On-Grid Solar Inverter 50kW',
      category: 'Inverters',
      model: 'NS-INV-50K-3P',
      efficiency: '98.6%',
      warranty: '5 Years Extendable',
      inStock: true
    },
    {
      id: 'prod-303',
      name: 'Solar Submersible Water Pump 7.5 HP',
      category: 'Solar Pumps',
      model: 'NS-PUMP-7.5',
      efficiency: 'High Head VFD',
      warranty: '5 Years',
      inStock: true
    },
    {
      id: 'prod-304',
      name: 'LiFePO4 Solar Energy Storage 15kWh',
      category: 'Batteries',
      model: 'NS-BATT-15K',
      efficiency: '95% DoD',
      warranty: '10 Years',
      inStock: true
    }
  ],
  enquiries: [
    {
      id: 'enq-401',
      name: 'M. Suresh Kumar',
      email: 'suresh.m@gmail.com',
      phone: '+91 98491 22334',
      service: 'Commercial & Industrial Solar',
      message: 'Looking for a 200kW rooftop installation feasibility audit for our manufacturing unit in Atchutapuram.',
      status: 'new',
      date: '2026-09-21'
    },
    {
      id: 'enq-402',
      name: 'Radha Krishna',
      email: 'rkrishna.pm@gmail.com',
      phone: '+91 97001 88990',
      service: 'PM Surya Ghar Scheme',
      message: 'Want to install 5kW rooftop under subsidy. Need subsidy procedure guidance and site visit.',
      status: 'responded',
      date: '2026-09-20'
    }
  ],
  applications: [
    {
      id: 'app-501',
      candidate: 'K. Sai Teja',
      email: 'saiteja.solar@gmail.com',
      phone: '+91 96180 55443',
      role: 'Solar Design Engineer',
      experience: '3 Years (AutoCAD, PVsyst)',
      status: 'shortlisted',
      date: '2026-09-20'
    },
    {
      id: 'app-502',
      candidate: 'V. Naresh Babu',
      email: 'naresh.babu.ee@outlook.com',
      phone: '+91 91210 99887',
      role: 'Site Execution Engineer',
      experience: '4 Years (MW EPC)',
      status: 'pending',
      date: '2026-09-19'
    }
  ]
}

export function getStoredData() {
  try {
    const raw = localStorage.getItem(DATA_STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.error('Failed to parse admin data from storage', e)
  }
  localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_DATA))
  return INITIAL_DEMO_DATA
}

export function saveStoredData(data) {
  try {
    localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save admin data', e)
  }
}

export function getAuthAdmin() {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    const userRaw = localStorage.getItem(USER_KEY)
    if (!token || !userRaw) return null
    return JSON.parse(userRaw)
  } catch (e) {
    return null
  }
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export async function adminLogin(email, password) {
  try {
    const controller = new AbortController()

    const timeoutId = setTimeout(() => {
      controller.abort()
    }, 8000)

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.trim(),
        password
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      return {
        success: false,
        message:
          result.message ||
          'Login failed. Please check your email and password.'
      }
    }

    if (!result.success || !result.data?.token) {
      return {
        success: false,
        message: result.message || 'Invalid login response from server.'
      }
    }

    const token = result.data.token

    const admin = result.data.admin || {
      name: 'Admin',
      email: email.trim().toLowerCase(),
      role: 'admin'
    }

    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(admin))

    return {
      success: true,
      user: admin,
      mode: 'api'
    }
  } catch (error) {
    console.error('Admin login request failed:', error)

    return {
      success: false,
      message:
        error.name === 'AbortError'
          ? 'Login request timed out. Please try again.'
          : 'Unable to connect to the authentication server.'
    }
  }
}

export function adminLogout() {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token && !token.startsWith('nsolutions_demo_')) {
    fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).catch(() => {})
  }
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
