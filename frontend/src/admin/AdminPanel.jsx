import { useState, useEffect } from 'react'
import { getStoredData, saveStoredData, adminLogout } from './adminAuth'
import { navigate } from '../components/Shared'
import { apiGet, apiPost, apiPatch, apiDelete } from '../utils/api'
import {
  FiBarChart2,
  FiUsers,
  FiZap,
  FiPackage,
  FiInbox,
  FiBriefcase,
  FiSettings,
  FiLogOut,
  FiGlobe,
  FiArrowUpRight,
  FiTrendingUp,
  FiCheck,
  FiPhone,
  FiMail,
  FiX,
  FiMessageSquare
} from 'react-icons/fi'
import { FaSun } from 'react-icons/fa'
import './admin.css'


export default function AdminPanel({ adminUser, onLogout }) {
  

  const [activeTab, setActiveTab] = useState('overview')
  const [data, setData] = useState(() => getStoredData())
  const [toastMessage, setToastMessage] = useState('')
  const [projects, setProjects] = useState([])
  const [projectsLoading, setProjectsLoading] = useState(false)
  // Search and filter states
  const [leadSearch, setLeadSearch] = useState('')
  const [leadFilter, setLeadFilter] = useState('all')
  const [products, setProducts] = useState([])
const [productsLoading, setProductsLoading] = useState(false)
  // Modals
  const [showAddLeadModal, setShowAddLeadModal] = useState(false)
  const [newLead, setNewLead] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    type: 'commercial',
    location: '',
    capacity: '',
    status: 'new'
  })
  const [enquiries, setEnquiries] = useState([])
const [enquiriesLoading, setEnquiriesLoading] = useState(false)
  const [showAddProjectModal, setShowAddProjectModal] = useState(false)
  const [newProject, setNewProject] = useState({
  title: '',
  category: 'commercial',
  location: '',
  description: '',
  services: '',
  status: 'in_progress',
  image: null
})

  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
  name: '',
  category: 'Solar Panels',
  brand: '',
  description: '',
  applications: '',
  image: null
})

  useEffect(() => {
  if (activeTab === 'projects') {
    fetchProjects()
  }
  if (activeTab === 'products') {
    fetchProducts()
  }
  if (activeTab === 'enquiries') {
    loadEnquiries()
  }
}, [activeTab])

  // Toast helper
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Persist whenever data changes
  const updateData = (updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveStoredData(next)
      return next
    })
  }

  const handleLogout = () => {
    adminLogout()
    if (onLogout) onLogout()
  }
  const fetchProjects = async () => {
  setProjectsLoading(true)

  try {
    const result = await apiGet('/projects')

    if (result.success) {
      const items = Array.isArray(result.data)
        ? result.data
        : []

      setProjects(items)
    } else {
      console.error('Failed to fetch projects:', result.message)
      showToast(result.message || 'Failed to load projects')
    }
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    showToast('Failed to load projects')
  } finally {
    setProjectsLoading(false)
  }
}

const fetchProducts = async () => {
  setProductsLoading(true)

  try {
    const result = await apiGet('/products')

    if (!result.success) {
      showToast(result.message || 'Failed to fetch products')
      return
    }

    setProducts(result.data || [])
  } catch (error) {
    console.error('Failed to fetch products:', error)
    showToast('Failed to fetch products')
  } finally {
    setProductsLoading(false)
  }
}

const loadEnquiries = async () => {
  setEnquiriesLoading(true)

  try {
    const listResponse = await apiGet('/enquiries')

    if (!listResponse.success) {
      showToast(listResponse.message || 'Failed to load enquiries.', 'error')
      return
    }

    const enquiryList = Array.isArray(listResponse.data)
      ? listResponse.data
      : []

    // The list endpoint intentionally returns summary fields only.
    // Fetch each enquiry's full details without changing the backend API.
    const detailedEnquiries = await Promise.all(
      enquiryList.map(async (enquiry) => {
        const detailResponse = await apiGet(`/enquiries/${enquiry.id}`)

        if (!detailResponse.success) {
          return {
            ...enquiry,
            phoneNumber: '',
            projectLocation: '',
            projectType: '',
            monthlyElectricityBill: null,
            message: ''
          }
        }

        return detailResponse.data
      })
    )

    setEnquiries(detailedEnquiries)
  } catch (error) {
    console.error('Failed to load enquiries:', error)
    showToast('Failed to load enquiries.', 'error')
  } finally {
    setEnquiriesLoading(false)
  }
}

  // Filtered leads
  const filteredLeads = data.leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.company.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.location.toLowerCase().includes(leadSearch.toLowerCase())
    const matchesStatus = leadFilter === 'all' || lead.status === leadFilter
    return matchesSearch && matchesStatus
  })
  // Lead status updater
  const handleLeadStatusChange = (id, newStatus) => {
    updateData((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    }))
    showToast(`Lead marked as ${newStatus}`)
  }

  // Delete lead
  const handleDeleteLead = (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return
    updateData((prev) => ({
      ...prev,
      leads: prev.leads.filter((l) => l.id !== id),
      stats: { ...prev.stats, totalLeads: Math.max(0, prev.stats.totalLeads - 1) }
    }))
    showToast('Lead deleted successfully')
  }

  // Add lead
  const handleCreateLead = (e) => {
    e.preventDefault()
    if (!newLead.name || !newLead.phone) return
    const created = {
      ...newLead,
      id: 'lead-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    }
    updateData((prev) => ({
      ...prev,
      leads: [created, ...prev.leads],
      stats: { ...prev.stats, totalLeads: prev.stats.totalLeads + 1 }
    }))
    setShowAddLeadModal(false)
    setNewLead({
      name: '',
      company: '',
      phone: '',
      email: '',
      type: 'commercial',
      location: '',
      capacity: '',
      status: 'new'
    })
    showToast('New lead added to database')
  }

  // Project status toggle
  const handleToggleProjectStatus = async (id) => {
  const project = projects.find((p) => p.id === id)

  if (!project) return

  const newStatus =
    project.status === 'completed'
      ? 'in_progress'
      : 'completed'

  try {
    const result = await apiPatch(
      `/projects/${id}/status`,
      { status: newStatus }
    )

    if (!result.success) {
      showToast(
        result.message || 'Failed to update project status'
      )
      return
    }

    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: newStatus
            }
          : p
      )
    )

    showToast('Project status updated')
  } catch (error) {
    console.error('Failed to update project status:', error)
    showToast('Failed to update project status')
  }
}

  // Delete project
 const handleDeleteProject = async (id) => {
  if (!window.confirm('Delete this project? This action cannot be undone.')) {
    return
  }

  try {
    const result = await apiDelete(`/projects/${id}`)

    if (!result.success) {
      showToast(result.message || 'Failed to delete project')
      return
    }

    setProjects((prev) =>
      prev.filter((project) => project.id !== id)
    )

    showToast('Project deleted successfully')
  } catch (error) {
    console.error('Failed to delete project:', error)
    showToast('Failed to delete project')
  }
}
  // Add Project
  const handleCreateProject = async (e) => {
  e.preventDefault()

  if (!newProject.title.trim()) {
    showToast('Project title is required')
    return
  }

  if (!newProject.location.trim()) {
    showToast('Project location is required')
    return
  }

  if (!newProject.description.trim()) {
    showToast('Project description is required')
    return
  }

  if (!newProject.services.trim()) {
    showToast('At least one service is required')
    return
  }

  if (!newProject.image) {
    showToast('Project image is required')
    return
  }

  try {
    const formData = new FormData()

    formData.append('title', newProject.title.trim())
    formData.append('category', newProject.category)
    formData.append('location', newProject.location.trim())
    formData.append('description', newProject.description.trim())
    formData.append('services', JSON.stringify(
      newProject.services
        .split(',')
        .map((service) => service.trim())
        .filter(Boolean)
    ))
    formData.append('status', newProject.status)
    formData.append('image', newProject.image)

    const result = await apiPost('/projects', formData)

    if (!result.success) {
      showToast(result.message || 'Failed to create project')
      return
    }

    const createdProject = result.data

    setProjects((prev) => [
      createdProject,
      ...prev
    ])

    setShowAddProjectModal(false)

    setNewProject({
      title: '',
      category: 'commercial',
      location: '',
      description: '',
      services: '',
      status: 'in_progress',
      image: null
    })

    showToast('Project registered successfully')
  } catch (error) {
    console.error('Failed to create project:', error)
    showToast('Failed to create project')
  }
}

  // Delete product
const handleDeleteProduct = async (id) => {
  if (!window.confirm('Delete this product? This action cannot be undone.')) {
    return
  }

  try {
    const result = await apiDelete(`/products/${id}`)

    if (!result.success) {
      showToast(result.message || 'Failed to delete product')
      return
    }

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    )

    showToast('Product deleted successfully')
  } catch (error) {
    console.error('Failed to delete product:', error)
    showToast('Failed to delete product')
  }
}

  // Add Product
  const handleCreateProduct = async (e) => {
  e.preventDefault()

  if (!newProduct.name.trim()) {
    showToast('Product name is required')
    return
  }

  if (!newProduct.brand.trim()) {
    showToast('Brand is required')
    return
  }

  if (!newProduct.description.trim()) {
    showToast('Product description is required')
    return
  }

  if (!newProduct.applications.trim()) {
    showToast('At least one application is required')
    return
  }

  if (!newProduct.image) {
    showToast('Product image is required')
    return
  }

  try {
    const formData = new FormData()

    formData.append('name', newProduct.name.trim())
    formData.append('category', newProduct.category)
    formData.append('brand', newProduct.brand.trim())
    formData.append(
      'description',
      newProduct.description.trim()
    )

    formData.append(
      'applications',
      JSON.stringify(
        newProduct.applications
          .split(',')
          .map((application) => application.trim())
          .filter(Boolean)
      )
    )

    formData.append('image', newProduct.image)

    const result = await apiPost('/products', formData)

    if (!result.success) {
      showToast(result.message || 'Failed to create product')
      return
    }

    const createdProduct = result.data

    setProducts((prev) => [
      createdProduct,
      ...prev
    ])

    setShowAddProductModal(false)

    setNewProduct({
      name: '',
      category: 'Solar Panels',
      brand: '',
      description: '',
      applications: '',
      image: null
    })

    showToast('Product added successfully')
  } catch (error) {
    console.error('Failed to create product:', error)
    showToast('Failed to create product')
  }
}

  // Application status
  const handleAppStatusChange = (id, newStatus) => {
    updateData((prev) => ({
      ...prev,
      applications: prev.applications.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    }))
    showToast(`Applicant status set to ${newStatus}`)
  }

  // Enquiry status
const handleEnquiryStatusChange = async (enquiryId, status) => {
  const response = await apiPatch(
    `/enquiries/${enquiryId}/status`,
    { status }
  )

  if (!response.success) {
    showToast(
      response.message || 'Failed to update enquiry status.',
      'error'
    )
    return
  }

  setEnquiries((prev) =>
    prev.map((enquiry) =>
      enquiry.id === enquiryId
        ? {
            ...enquiry,
            status: response.data?.status || status
          }
        : enquiry
    )
  )

  showToast(`Enquiry marked as ${status}.`)
}
  return (
    <div className="adm-layout">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-brand">
          <div className="brand" style={{ gap: '10px' }}>
            <span className="brand-logo" style={{ font: "400 20px/1 Georgia,'Times New Roman',serif", minWidth: '130px', minHeight: '32px', padding: '2px 10px 4px' }}>N Solutions</span>
          </div>
          <span className="adm-brand-badge">Admin</span>
        </div>

        <nav className="adm-sidebar-nav">
          <span className="adm-nav-heading">Main Navigation</span>
          <button
            className={`adm-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="adm-nav-icon"><FiBarChart2 /></span>
            <span>Dashboard</span>
          </button>
          <button
            className={`adm-nav-item ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            <span className="adm-nav-icon"><FiUsers /></span>
            <span>Leads</span>
            <span className="adm-badge highlight">{data.leads.length}</span>
          </button>
          <button
            className={`adm-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <span className="adm-nav-icon"><FiZap /></span>
            <span>Projects</span>
            <span className="adm-badge">{data.projects.length}</span>
          </button>
          <button
            className={`adm-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span className="adm-nav-icon"><FiPackage /></span>
            <span>Products</span>
            <span className="adm-badge">{data.products.length}</span>
          </button>
          <button
            className={`adm-nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
          >
            <span className="adm-nav-icon"><FiInbox /></span>
            <span>Enquiries</span>
            <span className="adm-badge">{data.enquiries.length}</span>
          </button>
          <button
            className={`adm-nav-item ${activeTab === 'careers' ? 'active' : ''}`}
            onClick={() => setActiveTab('careers')}
          >
            <span className="adm-nav-icon"><FiBriefcase /></span>
            <span>Job Applications</span>
            <span className="adm-badge">{data.applications.length}</span>
          </button>
          

          <span className="adm-nav-heading">Administration</span>
          <button
            className={`adm-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="adm-nav-icon"><FiSettings /></span>
            <span>Settings & Auth</span>
          </button>
        </nav>

        <div className="adm-sidebar-footer">
          <div className="adm-user-card">
            <div className="adm-user-avatar">
              {(adminUser?.name || 'A')[0].toUpperCase()}
            </div>
            <div className="adm-user-info">
              <div className="adm-user-name">{adminUser?.name || 'N Solutions Admin'}</div>
              <div className="adm-user-role">{adminUser?.email || 'admin@nsolutions.com'}</div>
            </div>
          </div>
          <button className="adm-btn-logout" onClick={handleLogout}>
            <span><FiLogOut /></span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="adm-main">
        {/* Topbar */}
        <header className="adm-topbar">
          <div className="adm-topbar-title">
            <h2>
              {activeTab === 'overview' && 'Executive Dashboard'}
              {activeTab === 'leads' && 'Solar Leads & Inquiries'}
              {activeTab === 'projects' && 'Project Portfolio Management'}
              {activeTab === 'products' && 'Product Supply Catalog'}
              {activeTab === 'enquiries' && 'Customer Inquiries & Messages'}
              {activeTab === 'careers' && 'Careers & Talent Applications'}
              {activeTab === 'settings' && 'System Settings & Security'}
            </h2>
          </div>

          <div className="adm-topbar-actions">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="adm-website-btn"
              title="Open public website in new tab"
            >
              <span><FiGlobe size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Public Website</span>
              <span style={{ fontSize: '0.75rem' }}><FiArrowUpRight style={{ verticalAlign: 'middle' }} /></span>
            </a>
          </div>
        </header>

        {/* Content Body */}
        <div className="adm-content">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              <div className="adm-stats-grid">
                <div className="adm-stat-card">
                  <div className="adm-stat-header">
                    <span className="adm-stat-label">Total Leads</span>
                    <div className="adm-stat-icon" style={{ background: 'rgba(8, 117, 182, 0.1)', color: '#0875b6' }}>
                      <FiUsers size={20} />
                    </div>
                  </div>
                  <div className="adm-stat-value">{data.leads.length}</div>
                  <div className="adm-stat-meta">
                    <span className="adm-pill-up"><FiTrendingUp size={12} style={{ verticalAlign: 'middle', marginRight: 3 }} /> Active inquiries</span> across AP & Telangana
                  </div>
                </div>

                <div className="adm-stat-card">
                  <div className="adm-stat-header">
                    <span className="adm-stat-label">Active Projects</span>
                    <div className="adm-stat-icon" style={{ background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7' }}>
                      <FiZap size={20} />
                    </div>
                  </div>
                  <div className="adm-stat-value">
                    {data.projects.filter((p) => p.status === 'in_progress').length}
                  </div>
                  <div className="adm-stat-meta">
                    <span>{data.projects.filter((p) => p.status === 'completed').length} completed portfolio</span>
                  </div>
                </div>

                <div className="adm-stat-card">
                  <div className="adm-stat-header">
                    <span className="adm-stat-label">Installed Capacity</span>
                    <div className="adm-stat-icon" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                      <FaSun size={20} />
                    </div>
                  </div>
                  <div className="adm-stat-value">{data.stats.solarCapacityInstalled}</div>
                  <div className="adm-stat-meta">
                    <span className="adm-pill-up">C&I + PM Surya Ghar</span>
                  </div>
                </div>

                <div className="adm-stat-card">
                  <div className="adm-stat-header">
                    <span className="adm-stat-label">Catalog Products</span>
                    <div className="adm-stat-icon" style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' }}>
                      <FiPackage size={20} />
                    </div>
                  </div>
                  <div className="adm-stat-value">{data.products.length}</div>
                  <div className="adm-stat-meta">
                    <span>Panels, Inverters, Pumps</span>
                  </div>
                </div>
              </div>

              {/* Recent Leads Preview */}
              <div className="adm-panel-card">
                <div className="adm-card-header">
                  <h3 className="adm-card-title">
                    <span>Recent Customer Leads</span>
                  </h3>
                  <button
                    className="adm-btn-action"
                    onClick={() => setActiveTab('leads')}
                  >
                     View All Leads <FiArrowUpRight style={{ verticalAlign: 'middle' }} />
                  </button>
                </div>
                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Customer / Organization</th>
                        <th>Type</th>
                        <th>Capacity</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.leads.slice(0, 4).map((lead) => (
                        <tr key={lead.id}>
                          <td>
                            <strong>{lead.name}</strong>
                            <div style={{ color: 'var(--adm-text-dim)', fontSize: '0.76rem' }}>
                              {lead.company}
                            </div>
                          </td>
                          <td>
                            <span className="adm-type-badge">{lead.type}</span>
                          </td>
                          <td>{lead.capacity || '—'}</td>
                          <td>{lead.location}</td>
                          <td>
                            <span className={`adm-status-tag ${lead.status}`}>
                              {lead.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td style={{ color: 'var(--adm-text-dim)' }}>{lead.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Enquiries Preview */}
              <div className="adm-panel-card">
                <div className="adm-card-header">
                  <h3 className="adm-card-title">
                    <span>Recent Website Enquiries</span>
                  </h3>
                  <button
                    className="adm-btn-action"
                    onClick={() => setActiveTab('enquiries')}
                  >
                    View Enquiries ({data.enquiries.length}) <FiArrowUpRight style={{ verticalAlign: 'middle' }} />
                  </button>
                </div>
                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Sender</th>
                        <th>Interest Area</th>
                        <th>Message</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.enquiries.map((enq) => (
                        <tr key={enq.id}>
                          <td>
                            <strong>{enq.name}</strong>
                            <div style={{ color: 'var(--adm-text-dim)', fontSize: '0.76rem' }}>
                              {enq.phone} · {enq.email}
                            </div>
                          </td>
                          <td>
                            <span className="adm-type-badge">{enq.service}</span>
                          </td>
                          <td style={{ maxWidth: '350px' }}>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--adm-text-muted)' }}>
                              {enq.message}
                            </p>
                          </td>
                          <td>
                            <span className={`adm-status-tag ${enq.status}`}>
                              {enq.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB: LEADS */}
          {activeTab === 'leads' && (
            <div className="adm-panel-card">
              <div className="adm-card-header">
                <h3 className="adm-card-title">
                  <span>Customer Leads & Inquiries Database</span>
                </h3>
                <div className="adm-card-controls">
                  <input
                    type="text"
                    className="adm-search-input"
                    placeholder="Search name, company, city..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                  />
                  <select
                    className="adm-filter-select"
                    value={leadFilter}
                    onChange={(e) => setLeadFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="qualified">Qualified</option>
                  </select>
                  <button
                    className="adm-btn-action"
                    onClick={() => setShowAddLeadModal(true)}
                  >
                    + Add New Lead
                  </button>
                </div>
              </div>

              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Lead Contact</th>
                      <th>Category</th>
                      <th>Capacity Requirement</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: 'var(--adm-text-dim)' }}>
                          No matching leads found.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id}>
                          <td>
                            <strong>{lead.name}</strong>
                            <div style={{ color: 'var(--adm-text-muted)', fontSize: '0.76rem' }}>
                              {lead.company}
                            </div>
                            <div style={{ color: 'var(--adm-text-dim)', fontSize: '0.72rem' }}>
                              {lead.phone} | {lead.email}
                            </div>
                          </td>
                          <td>
                            <span className="adm-type-badge">{lead.type}</span>
                          </td>
                          <td>{lead.capacity || '—'}</td>
                          <td>{lead.location}</td>
                          <td>
                            <select
                              className="adm-filter-select"
                              style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                              value={lead.status}
                              onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                            >
                              <option value="new">New</option>
                              <option value="in_progress">In Progress</option>
                              <option value="qualified">Qualified</option>
                            </select>
                          </td>
                          <td style={{ color: 'var(--adm-text-dim)', fontSize: '0.78rem' }}>
                            {lead.date}
                          </td>
                          <td>
                            <div className="adm-actions-cell">
                              <button
                                className="adm-btn-tiny danger"
                                onClick={() => handleDeleteLead(lead.id)}
                                title="Delete Lead"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}


          {/* TAB: PRODUCTS */}
          {activeTab === 'projects' && (
  <div className="adm-panel-card">
    <div className="adm-card-header">
      <h3 className="adm-card-title">
        <span>Solar Project Portfolio</span>
      </h3>

      <div className="adm-card-controls">
        <button
          className="adm-btn-action"
          onClick={() => setShowAddProjectModal(true)}
        >
          + Register New Project
        </button>
      </div>
    </div>

    <div className="adm-table-wrap">
      <table className="adm-table">
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Category</th>
            <th>Services</th>
            <th>Location</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {projectsLoading ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: 'center',
                  padding: '40px'
                }}
              >
                Loading projects...
              </td>
            </tr>
          ) : projects.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: 'center',
                  padding: '40px'
                }}
              >
                No projects found.
              </td>
            </tr>
          ) : (
            projects.map((proj) => (
              <tr key={proj.id}>
                {/* Project Title */}
                <td>
                  <strong>{proj.title}</strong>

                  <div
                    style={{
                      color: 'var(--adm-text-dim)',
                      fontSize: '0.75rem'
                    }}
                  >
                    Added:{' '}
                    {proj.createdAt
                      ? new Date(proj.createdAt).toLocaleDateString()
                      : '—'}
                  </div>
                </td>

                {/* Category */}
                <td>
                  <span className="adm-type-badge">
                    {proj.category}
                  </span>
                </td>

                {/* Services */}
                <td>
                  {Array.isArray(proj.services) &&
                  proj.services.length > 0 ? (
                    <span>
                      {proj.services.length}{' '}
                      {proj.services.length === 1
                        ? 'Service'
                        : 'Services'}
                    </span>
                  ) : (
                    '—'
                  )}
                </td>

                {/* Location */}
                <td>
                  {proj.location || '—'}
                </td>

                {/* Description */}
                <td
                  style={{
                    color: 'var(--adm-text-muted)',
                    maxWidth: '280px'
                  }}
                >
                  {proj.description
                    ? proj.description.length > 70
                      ? `${proj.description.slice(0, 70)}...`
                      : proj.description
                    : '—'}
                </td>

                {/* Status */}
                <td>
                  <button
                    className={`adm-status-tag ${proj.status}`}
                    style={{
                      cursor: 'pointer',
                      border: 'none'
                    }}
                    onClick={() =>
                      handleToggleProjectStatus(proj.id)
                    }
                    title="Click to toggle status"
                  >
                    {proj.status === 'completed' ? (
                      <>
                        <FiCheck
                          size={13}
                          style={{
                            verticalAlign: 'middle',
                            marginRight: 2
                          }}
                        />
                        Completed
                      </>
                    ) : (
                      <>
                        <FiSettings
                          size={13}
                          style={{
                            verticalAlign: 'middle',
                            marginRight: 2
                          }}
                        />
                        In Progress
                      </>
                    )}
                  </button>
                </td>

                {/* Actions */}
                <td>
                  <button
                    className="adm-btn-tiny danger"
                    onClick={() =>
                      handleDeleteProject(proj.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)}
          {activeTab === 'products' && (
  <div className="adm-panel-card">
    <div className="adm-card-header">
      <h3 className="adm-card-title">
        <span>Product Supply & Inventory</span>
      </h3>

      <div className="adm-card-controls">
        <button
          className="adm-btn-action"
          onClick={() => setShowAddProductModal(true)}
        >
          + Add Product
        </button>
      </div>
    </div>

    <div className="adm-table-wrap">
      <table className="adm-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Applications</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {productsLoading ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: 'center',
                  padding: '2rem'
                }}
              >
                Loading products...
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: 'var(--adm-text-muted)'
                }}
              >
                No products found.
              </td>
            </tr>
          ) : (
            products.map((prod) => (
              <tr key={prod.id}>

                {/* Product */}
                <td>
                  <strong>{prod.name}</strong>
                </td>

                {/* Category */}
                <td>
                  <span className="adm-type-badge">
                    {prod.category}
                  </span>
                </td>

                {/* Brand */}
                <td>
                  {prod.brand || '—'}
                </td>

                {/* Description */}
                <td
                  style={{
                    maxWidth: '260px',
                    whiteSpace: 'normal',
                    lineHeight: '1.4'
                  }}
                >
                  {prod.description || '—'}
                </td>

                {/* Applications */}
                <td
                  style={{
                    maxWidth: '220px',
                    whiteSpace: 'normal'
                  }}
                >
                  {Array.isArray(prod.applications)
                    ? prod.applications.join(', ')
                    : prod.applications || '—'}
                </td>

                {/* Image */}
                <td>
                  {prod.image?.url ? (
                    <img
                      src={prod.image.url}
                      alt={prod.name}
                      style={{
                        width: '55px',
                        height: '55px',
                        objectFit: 'cover',
                        borderRadius: '6px'
                      }}
                    />
                  ) : (
                    '—'
                  )}
                </td>

                {/* Delete */}
                <td>
                  <button
                    className="adm-btn-tiny danger"
                    onClick={() => handleDeleteProduct(prod.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)}
          {/* TAB: ENQUIRIES */}
         {activeTab === 'enquiries' && (
  <div className="adm-panel-card">
    <div className="adm-card-header">
      <h3 className="adm-card-title">
        <span>Customer Messages & Consultation Inquiries</span>
      </h3>
    </div>

    <div className="adm-table-wrap">
      {enquiriesLoading ? (
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            color: 'var(--adm-text-muted)'
          }}
        >
          Loading enquiries...
        </div>
      ) : enquiries.length === 0 ? (
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            color: 'var(--adm-text-muted)'
          }}
        >
          No customer enquiries found.
        </div>
      ) : (
        <table className="adm-table">
          <thead>
            <tr>
              <th>Customer Details</th>
              <th>Area / Service</th>
              <th>Inquiry Message</th>
              <th>Received</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {enquiries.map((enq) => (
              <tr key={enq.id}>
                {/* CUSTOMER DETAILS */}
                <td>
                  <strong>{enq.fullName}</strong>

                  {enq.companyName && (
                    <div
                      style={{
                        color: 'var(--adm-text-muted)',
                        fontSize: '0.75rem',
                        marginTop: '3px'
                      }}
                    >
                      {enq.companyName}
                    </div>
                  )}

                  <div
                    style={{
                      color: 'var(--adm-text-muted)',
                      fontSize: '0.75rem',
                      marginTop: '3px'
                    }}
                  >
                    <FiPhone
                      size={11}
                      style={{
                        verticalAlign: 'middle',
                        marginRight: 3
                      }}
                    />
                    {enq.phoneNumber || '—'}
                  </div>

                  <div
                    style={{
                      color: 'var(--adm-text-dim)',
                      fontSize: '0.72rem',
                      marginTop: '3px'
                    }}
                  >
                    <FiMail
                      size={11}
                      style={{
                        verticalAlign: 'middle',
                        marginRight: 3
                      }}
                    />
                    {enq.emailAddress}
                  </div>
                </td>

                {/* AREA / SERVICE */}
                <td>
                  <span className="adm-type-badge">
                    {enq.projectType || '—'}
                  </span>

                  {enq.projectLocation && (
                    <div
                      style={{
                        marginTop: '6px',
                        color: 'var(--adm-text-dim)',
                        fontSize: '0.72rem'
                      }}
                    >
                      {enq.projectLocation}
                    </div>
                  )}
                </td>

                {/* MESSAGE */}
                <td style={{ maxWidth: '400px' }}>
                  <div
                    style={{
                      fontSize: '0.84rem',
                      color: 'var(--adm-text)',
                      background: 'rgba(255,255,255,0.03)',
                      padding: '10px',
                      borderRadius: '6px'
                    }}
                  >
                    {enq.message || 'No message provided.'}
                  </div>

                  {enq.monthlyElectricityBill !== null &&
                    enq.monthlyElectricityBill !== undefined && (
                      <div
                        style={{
                          marginTop: '6px',
                          color: 'var(--adm-text-dim)',
                          fontSize: '0.72rem'
                        }}
                      >
                        Monthly electricity bill:{' '}
                        ₹{Number(enq.monthlyElectricityBill).toLocaleString('en-IN')}
                      </div>
                    )}
                </td>

                {/* RECEIVED */}
                <td
                  style={{
                    color: 'var(--adm-text-dim)',
                    fontSize: '0.75rem'
                  }}
                >
                  {enq.createdAt
                    ? new Date(enq.createdAt).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : '—'}
                </td>

                {/* STATUS */}
                <td>
                  <select
                    className="adm-filter-select"
                    value={enq.status}
                    onChange={(e) =>
                      handleEnquiryStatusChange(
                        enq.id,
                        e.target.value
                      )
                    }
                    disabled={enq.status === 'Resolved'}
                  >
                    <option value="Unread">Unread</option>
                    <option value="Read">Read</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
)}

          {/* TAB: CAREERS */}
          {activeTab === 'careers' && (
            <div className="adm-panel-card">
              <div className="adm-card-header">
                <h3 className="adm-card-title">
                  <span>Job Applications & Candidate Profiles</span>
                </h3>
              </div>

              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Candidate Name</th>
                      <th>Applied Role</th>
                      <th>Experience</th>
                      <th>Contact</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.applications.map((app) => (
                      <tr key={app.id}>
                        <td>
                          <strong>{app.candidate}</strong>
                          <div style={{ color: 'var(--adm-text-dim)', fontSize: '0.75rem' }}>
                            Submitted: {app.date}
                          </div>
                        </td>
                        <td>
                          <span className="adm-type-badge">{app.role}</span>
                        </td>
                        <td>{app.experience}</td>
                        <td>
                          <div>{app.phone}</div>
                          <div style={{ color: 'var(--adm-text-dim)', fontSize: '0.75rem' }}>{app.email}</div>
                        </td>
                        <td>
                          <select
                            className="adm-filter-select"
                            value={app.status}
                            onChange={(e) => handleAppStatusChange(app.id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="shortlisted">Shortlisted</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="adm-panel-card" style={{ maxWidth: '600px' }}>
              <div className="adm-card-header">
                <h3 className="adm-card-title">
                  <span>Admin Credentials & Security</span>
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--adm-text-muted)', marginBottom: '6px' }}>
                    Active Administrator Email
                  </label>
                  <input
                    type="text"
                    disabled
                    value={adminUser?.email || 'admin@nsolutions.com'}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'var(--adm-surface-light)',
                      border: '1px solid var(--adm-border)',
                      borderRadius: '8px',
                      color: 'var(--adm-text)'
                    }}
                  />
                </div>

                <div style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '10px' }}>
                  <strong style={{ color: 'var(--adm-primary)', fontSize: '0.88rem' }}>Direct URL Access Protocol</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--adm-text-muted)', margin: '8px 0 0' }}>
                    As requested, the admin panel remains completely hidden from the public website with no buttons or links in navigation. You can access it anytime by entering <code>/admin</code> directly in the browser address bar.
                  </p>
                </div>

                <div style={{ paddingTop: '12px' }}>
                  <button
                    className="adm-btn-primary"
                    style={{ maxWidth: '200px' }}
                    onClick={handleLogout}
                  >
                    Log Out of Admin
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ADD LEAD MODAL */}
      {showAddLeadModal && (
        <div className="adm-modal-backdrop" onClick={() => setShowAddLeadModal(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h3>Add New Customer Lead</h3>
              <button className="adm-modal-close" onClick={() => setShowAddLeadModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateLead}>
              <div className="adm-modal-body">
                <div className="adm-form-group">
                  <label>Customer / Contact Name *</label>
                  <input
                    type="text"
                    required
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="e.g. Ramesh Varma"
                  />
                </div>
                <div className="adm-form-group">
                  <label>Company / Organization</label>
                  <input
                    type="text"
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    placeholder="e.g. Varma Poly Plast"
                  />
                </div>
                <div className="adm-form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+91 98480 XXXXX"
                  />
                </div>
                <div className="adm-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="contact@company.com"
                  />
                </div>
                <div className="adm-form-group">
                  <label>Project Type</label>
                  <select
                    className="adm-filter-select"
                    style={{ width: '100%' }}
                    value={newLead.type}
                    onChange={(e) => setNewLead({ ...newLead, type: e.target.value })}
                  >
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="residential">Residential</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Capacity Requirement</label>
                  <input
                    type="text"
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newLead.capacity}
                    onChange={(e) => setNewLead({ ...newLead, capacity: e.target.value })}
                    placeholder="e.g. 100 kW Solar Rooftop"
                  />
                </div>
                <div className="adm-form-group">
                  <label>Location / City</label>
                  <input
                    type="text"
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newLead.location}
                    onChange={(e) => setNewLead({ ...newLead, location: e.target.value })}
                    placeholder="e.g. Visakhapatnam, AP"
                  />
                </div>
              </div>
              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn-secondary"
                  onClick={() => setShowAddLeadModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn-action">
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PROJECT MODAL */}
      {showAddProjectModal && (
  <div
    className="adm-modal-backdrop"
    onClick={() => setShowAddProjectModal(false)}
  >
    <div
      className="adm-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="adm-modal-header">
        <h3>Register New Solar Project</h3>

        <button
          type="button"
          className="adm-modal-close"
          onClick={() => setShowAddProjectModal(false)}
        >
          <FiX />
        </button>
      </div>

      <form onSubmit={handleCreateProject}>
        <div className="adm-modal-body">

          {/* Project Title */}
          <div className="adm-form-group">
            <label>Project Title *</label>

            <input
              type="text"
              required
              className="adm-search-input"
              style={{ width: '100%' }}
              value={newProject.title}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  title: e.target.value
                })
              }
              placeholder="e.g. Vizianagaram Industrial Solar Facility"
            />
          </div>

          {/* Category */}
          <div className="adm-form-group">
            <label>Category *</label>

            <select
  required
  className="adm-filter-select"
  style={{ width: '100%' }}
  value={newProject.category}
  onChange={(e) =>
    setNewProject({
      ...newProject,
      category: e.target.value
    })
  }
>
  <option value="commercial">Commercial</option>
  <option value="industrial">Industrial</option>
  <option value="residential">Residential</option>
  <option value="government">Government</option>
</select>
          </div>

          {/* Location */}
          <div className="adm-form-group">
            <label>Location *</label>

            <input
              type="text"
              required
              className="adm-search-input"
              style={{ width: '100%' }}
              value={newProject.location}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  location: e.target.value
                })
              }
              placeholder="e.g. Parawada, Visakhapatnam"
            />
          </div>

          {/* Description */}
          <div className="adm-form-group">
            <label>Project Description *</label>

            <textarea
              required
              className="adm-search-input"
              style={{
                width: '100%',
                minHeight: '110px',
                resize: 'vertical'
              }}
              value={newProject.description}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  description: e.target.value
                })
              }
              placeholder="Describe the project, installation, capacity, scope, or other important details..."
            />
          </div>

          {/* Services */}
          <div className="adm-form-group">
            <label>Services *</label>

            <input
              type="text"
              required
              className="adm-search-input"
              style={{ width: '100%' }}
              value={newProject.services}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  services: e.target.value
                })
              }
              placeholder="e.g. EPC, Installation, O&M"
            />

            <small
              style={{
                display: 'block',
                marginTop: '6px',
                color: 'var(--adm-text-dim)'
              }}
            >
              Separate multiple services with commas.
            </small>
          </div>

          {/* Status */}
          <div className="adm-form-group">
            <label>Status</label>

            <select
              className="adm-filter-select"
              style={{ width: '100%' }}
              value={newProject.status}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  status: e.target.value
                })
              }
            >
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Project Image */}
          <div className="adm-form-group">
            <label>Project Image *</label>

            <input
              type="file"
              required
              accept="image/*"
              className="adm-search-input"
              style={{ width: '100%' }}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  image: e.target.files?.[0] || null
                })
              }
            />

            <small
              style={{
                display: 'block',
                marginTop: '6px',
                color: 'var(--adm-text-dim)'
              }}
            >
              Upload the main image for this project.
            </small>

            {newProject.image && (
              <div
                style={{
                  marginTop: '10px',
                  fontSize: '0.85rem',
                  color: 'var(--adm-text-muted)'
                }}
              >
                Selected: {newProject.image.name}
              </div>
            )}
          </div>

        </div>

        <div className="adm-modal-footer">
          <button
            type="button"
            className="adm-btn-secondary"
            onClick={() => setShowAddProjectModal(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="adm-btn-action"
          >
            Register Project
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
  <div
    className="adm-modal-backdrop"
    onClick={() => setShowAddProductModal(false)}
  >
    <div
      className="adm-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <div className="adm-modal-header">
        <h3>Add New Product</h3>

        <button
          type="button"
          className="adm-modal-close"
          onClick={() => setShowAddProductModal(false)}
        >
          <FiX />
        </button>
      </div>

      <form onSubmit={handleCreateProduct}>

        <div className="adm-modal-body">

          {/* Product Name */}
          <div className="adm-form-group">
            <label>Product Name *</label>

            <input
              type="text"
              required
              className="adm-search-input"
              style={{ width: '100%' }}
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  name: e.target.value
                })
              }
              placeholder="e.g. 550W Mono PERC Solar Panel"
            />
          </div>

          {/* Category */}
          <div className="adm-form-group">
            <label>Category *</label>

            <select
              required
              className="adm-filter-select"
              style={{ width: '100%' }}
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  category: e.target.value
                })
              }
            >
              <option value="Solar Panels">
                Solar Panels
              </option>

              <option value="Solar Inverters">
                Solar Inverters
              </option>

              <option value="Mounting Structures">
                Mounting Structures
              </option>

              <option value="Solar Cables">
                Solar Cables
              </option>

              <option value="Earth Pits & Arrestors">
                Earth Pits & Arrestors
              </option>

              <option value="Solar Pumps">
                Solar Pumps
              </option>

              <option value="Electrical Accessories">
                Electrical Accessories
              </option>

              <option value="Other Components">
                Other Components
              </option>
            </select>
          </div>

          {/* Brand */}
          <div className="adm-form-group">
            <label>Brand *</label>

            <input
              type="text"
              required
              className="adm-search-input"
              style={{ width: '100%' }}
              value={newProduct.brand}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  brand: e.target.value
                })
              }
              placeholder="e.g. Tata Power Solar"
            />
          </div>

          {/* Description */}
          <div className="adm-form-group">
            <label>Product Description *</label>

            <textarea
              required
              className="adm-search-input"
              style={{
                width: '100%',
                minHeight: '110px',
                resize: 'vertical'
              }}
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value
                })
              }
              placeholder="Describe the product, specifications, features, etc."
            />
          </div>

          {/* Applications */}
          <div className="adm-form-group">
            <label>Applications *</label>

            <input
              type="text"
              required
              className="adm-search-input"
              style={{ width: '100%' }}
              value={newProduct.applications}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  applications: e.target.value
                })
              }
              placeholder="e.g. Rooftop Solar, Industrial, Commercial"
            />

            <small
              style={{
                display: 'block',
                marginTop: '6px',
                color: 'var(--adm-text-dim)'
              }}
            >
              Separate multiple applications with commas.
            </small>
          </div>

          {/* Image */}
          <div className="adm-form-group">
            <label>Product Image *</label>

            <input
              type="file"
              required
              accept="image/*"
              className="adm-search-input"
              style={{ width: '100%' }}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  image: e.target.files?.[0] || null
                })
              }
            />

            {newProduct.image && (
              <div
                style={{
                  marginTop: '8px',
                  fontSize: '0.85rem',
                  color: 'var(--adm-text-muted)'
                }}
              >
                Selected: {newProduct.image.name}
              </div>
            )}
          </div>

        </div>

        <div className="adm-modal-footer">

          <button
            type="button"
            className="adm-btn-secondary"
            onClick={() => setShowAddProductModal(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="adm-btn-action"
          >
            Add Product
          </button>

        </div>

      </form>
    </div>
  </div>
)}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="adm-toast">
          <span><FiZap size={15} style={{ verticalAlign: 'middle', marginRight: 4 }} /></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
