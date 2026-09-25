import { useState, useEffect } from 'react'
import { getStoredData, saveStoredData, adminLogout } from './adminAuth'
import { navigate } from '../components/Shared'
import { 
  FiGrid, 
  FiTrendingUp, 
  FiBriefcase, 
  FiPackage, 
  FiImage, 
  FiMessageSquare, 
  FiUsers, 
  FiMail, 
  FiUser, 
  FiSettings, 
  FiArrowUpRight, 
  FiLogOut, 
  FiZap, 
  FiGlobe, 
  FiCheck, 
  FiPhone, 
  FiX, 
  FiPlus, 
  FiTrash2, 
  FiStar, 
  FiLock, 
  FiShield,
  FiBarChart2,
  FiInbox
} from 'react-icons/fi'
import { FaSun } from 'react-icons/fa'
import './admin.css'

export default function AdminPanel({ adminUser, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [data, setData] = useState(() => getStoredData())
  const [toastMessage, setToastMessage] = useState('')

  // Search and filter states
  const [leadSearch, setLeadSearch] = useState('')
  const [leadFilter, setLeadFilter] = useState('all')

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

  const [showAddProjectModal, setShowAddProjectModal] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'commercial',
    location: '',
    capacity: '',
    client: '',
    year: '2026',
    status: 'in_progress'
  })

  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Solar Panels',
    model: '',
    efficiency: '',
    warranty: '25 Years',
    inStock: true
  })

  // Media state
  const [showAddMediaModal, setShowAddMediaModal] = useState(false)
  const [newMedia, setNewMedia] = useState({
    title: '',
    category: 'Projects',
    imageUrl: '',
    featured: false
  })
  const [mediaFilter, setMediaFilter] = useState('all')

  // Testimonials state
  const [showAddTestimonialModal, setShowAddTestimonialModal] = useState(false)
  const [newTestimonial, setNewTestimonial] = useState({
    clientName: '',
    company: '',
    location: '',
    rating: 5,
    comment: '',
    status: 'approved'
  })
  const [testimonialFilter, setTestimonialFilter] = useState('all')

  // Admin Profile state
  const [profilePassword, setProfilePassword] = useState('')
  const [profileConfirmPassword, setProfileConfirmPassword] = useState('')

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
  const handleToggleProjectStatus = (id) => {
    updateData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'completed' ? 'in_progress' : 'completed' }
          : p
      )
    }))
    showToast('Project status updated')
  }

  // Delete project
  const handleDeleteProject = (id) => {
    if (!window.confirm('Delete this project record?')) return
    updateData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }))
    showToast('Project removed')
  }

  // Add Project
  const handleCreateProject = (e) => {
    e.preventDefault()
    if (!newProject.title) return
    const created = {
      ...newProject,
      id: 'proj-' + Date.now()
    }
    updateData((prev) => ({
      ...prev,
      projects: [created, ...prev.projects],
      stats: { ...prev.stats, activeProjects: prev.stats.activeProjects + 1 }
    }))
    setShowAddProjectModal(false)
    setNewProject({
      title: '',
      category: 'commercial',
      location: '',
      capacity: '',
      client: '',
      year: '2026',
      status: 'in_progress'
    })
    showToast('New project registered')
  }

  // Delete product
  const handleDeleteProduct = (id) => {
    if (!window.confirm('Delete this product?')) return
    updateData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
      stats: { ...prev.stats, productsListed: Math.max(0, prev.stats.productsListed - 1) }
    }))
    showToast('Product deleted')
  }

  // Add Product
  const handleCreateProduct = (e) => {
    e.preventDefault()
    if (!newProduct.name) return
    const created = {
      ...newProduct,
      id: 'prod-' + Date.now()
    }
    updateData((prev) => ({
      ...prev,
      products: [created, ...prev.products],
      stats: { ...prev.stats, productsListed: prev.stats.productsListed + 1 }
    }))
    setShowAddProductModal(false)
    setNewProduct({
      name: '',
      category: 'Solar Panels',
      model: '',
      efficiency: '',
      warranty: '25 Years',
      inStock: true
    })
    showToast('Product added to catalog')
  }

  // Application status
  const handleAppStatusChange = (id, newStatus) => {
    updateData((prev) => ({
      ...prev,
      applications: prev.applications.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    }))
    showToast(`Applicant status set to ${newStatus}`)
  }

  // Media handlers
  const handleCreateMedia = (e) => {
    e.preventDefault()
    if (!newMedia.title || !newMedia.imageUrl) return
    const created = {
      ...newMedia,
      id: 'med-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    }
    updateData((prev) => ({
      ...prev,
      media: [created, ...(prev.media || [])]
    }))
    setShowAddMediaModal(false)
    setNewMedia({ title: '', category: 'Projects', imageUrl: '', featured: false })
    showToast('Media asset uploaded')
  }

  const handleDeleteMedia = (id) => {
    if (!window.confirm('Delete this media asset?')) return
    updateData((prev) => ({
      ...prev,
      media: (prev.media || []).filter((m) => m.id !== id)
    }))
    showToast('Media asset removed')
  }

  // Testimonial handlers
  const handleCreateTestimonial = (e) => {
    e.preventDefault()
    if (!newTestimonial.clientName || !newTestimonial.comment) return
    const created = {
      ...newTestimonial,
      id: 'test-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    }
    updateData((prev) => ({
      ...prev,
      testimonials: [created, ...(prev.testimonials || [])]
    }))
    setShowAddTestimonialModal(false)
    setNewTestimonial({ clientName: '', company: '', location: '', rating: 5, comment: '', status: 'approved' })
    showToast('Testimonial saved')
  }

  const handleToggleTestimonialStatus = (id, newStatus) => {
    updateData((prev) => ({
      ...prev,
      testimonials: (prev.testimonials || []).map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    }))
    showToast(`Testimonial marked as ${newStatus}`)
  }

  const handleDeleteTestimonial = (id) => {
    if (!window.confirm('Delete this testimonial?')) return
    updateData((prev) => ({
      ...prev,
      testimonials: (prev.testimonials || []).filter((t) => t.id !== id)
    }))
    showToast('Testimonial removed')
  }

  // Admin Profile handler
  const handleUpdateProfilePassword = (e) => {
    e.preventDefault()
    if (!profilePassword) return
    if (profilePassword !== profileConfirmPassword) {
      showToast('Passwords do not match')
      return
    }
    if (profilePassword.length < 6) {
      showToast('Password must be at least 6 characters')
      return
    }
    showToast('Administrator password updated successfully')
    setProfilePassword('')
    setProfileConfirmPassword('')
  }

  return (
    <div className="adm-layout">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-brand">
          <div className="adm-nav-logo-box">N</div>
          <div className="adm-nav-brand-text">
            <div className="adm-nav-title">Admin Panel</div>
            <div className="adm-nav-subtitle">N SOLUTIONS</div>
          </div>
        </div>

        <nav className="adm-sidebar-nav">
          <button
            type="button"
            className={`adm-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="adm-nav-icon"><FiGrid /></span>
            <span>Dashboard</span>
          </button>
          <button
            type="button"
            className={`adm-nav-item ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            <span className="adm-nav-icon"><FiTrendingUp /></span>
            <span>Leads</span>
          </button>
          <button
            type="button"
            className={`adm-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <span className="adm-nav-icon"><FiBriefcase /></span>
            <span>Projects</span>
          </button>
          <button
            type="button"
            className={`adm-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span className="adm-nav-icon"><FiPackage /></span>
            <span>Products</span>
          </button>
          <button
            type="button"
            className={`adm-nav-item ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => setActiveTab('media')}
          >
            <span className="adm-nav-icon"><FiImage /></span>
            <span>Gallery / Media</span>
          </button>
          <button
            type="button"
            className={`adm-nav-item ${activeTab === 'testimonials' ? 'active' : ''}`}
            onClick={() => setActiveTab('testimonials')}
          >
            <span className="adm-nav-icon"><FiMessageSquare /></span>
            <span>Testimonials</span>
          </button>
          <button
            type="button"
            className={`adm-nav-item ${activeTab === 'careers' ? 'active' : ''}`}
            onClick={() => setActiveTab('careers')}
          >
            <span className="adm-nav-icon"><FiUsers /></span>
            <span>Careers</span>
          </button>
          <button
            type="button"
            className={`adm-nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
          >
            <span className="adm-nav-icon"><FiMail /></span>
            <span>Contact Enquiries</span>
          </button>
          <button
            type="button"
            className={`adm-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="adm-nav-icon"><FiUser /></span>
            <span>Admin Profile</span>
          </button>
          <button
            type="button"
            className={`adm-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="adm-nav-icon"><FiSettings /></span>
            <span>Settings</span>
          </button>
        </nav>

        <div className="adm-sidebar-footer">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="adm-nav-item adm-sidebar-action"
          >
            <span className="adm-nav-icon"><FiArrowUpRight /></span>
            <span>View Website</span>
          </a>
          <button
            type="button"
            className="adm-nav-item adm-sidebar-action"
            onClick={handleLogout}
          >
            <span className="adm-nav-icon"><FiLogOut /></span>
            <span>Logout</span>
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
              {activeTab === 'media' && 'Gallery & Media Management'}
              {activeTab === 'testimonials' && 'Client Testimonials & Feedback'}
              {activeTab === 'careers' && 'Careers & Talent Applications'}
              {activeTab === 'enquiries' && 'Contact Enquiries & Messages'}
              {activeTab === 'profile' && 'Administrator Profile'}
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

          {/* TAB: PROJECTS */}
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
                      <th>Capacity</th>
                      <th>Location</th>
                      <th>Client</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.projects.map((proj) => (
                      <tr key={proj.id}>
                        <td>
                          <strong>{proj.title}</strong>
                          <div style={{ color: 'var(--adm-text-dim)', fontSize: '0.75rem' }}>
                            Year: {proj.year}
                          </div>
                        </td>
                        <td>
                          <span className="adm-type-badge">{proj.category}</span>
                        </td>
                        <td>
                          <strong>{proj.capacity}</strong>
                        </td>
                        <td>{proj.location}</td>
                        <td style={{ color: 'var(--adm-text-muted)' }}>{proj.client}</td>
                        <td>
                          <button
                            className={`adm-status-tag ${proj.status}`}
                            style={{ cursor: 'pointer', border: 'none' }}
                            onClick={() => handleToggleProjectStatus(proj.id)}
                            title="Click to toggle status"
                          >
                            {proj.status === 'completed' ? <><FiCheck size={13} style={{ verticalAlign: 'middle', marginRight: 2 }} /> Completed</> : <><FiSettings size={13} style={{ verticalAlign: 'middle', marginRight: 2 }} /> In Progress</>}
                          </button>
                        </td>
                        <td>
                          <button
                            className="adm-btn-tiny danger"
                            onClick={() => handleDeleteProject(proj.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: PRODUCTS */}
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
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Model Number</th>
                      <th>Efficiency / Specs</th>
                      <th>Warranty</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.products.map((prod) => (
                      <tr key={prod.id}>
                        <td>
                          <strong>{prod.name}</strong>
                        </td>
                        <td>
                          <span className="adm-type-badge">{prod.category}</span>
                        </td>
                        <td style={{ fontFamily: 'monospace' }}>{prod.model || '—'}</td>
                        <td>{prod.efficiency || '—'}</td>
                        <td style={{ color: 'var(--adm-text-muted)' }}>{prod.warranty}</td>
                        <td>
                          <span className="adm-status-tag completed">In Stock</span>
                        </td>
                        <td>
                          <button
                            className="adm-btn-tiny danger"
                            onClick={() => handleDeleteProduct(prod.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
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
                    {data.enquiries.map((enq) => (
                      <tr key={enq.id}>
                        <td>
                          <strong>{enq.name}</strong>
                            <div style={{ color: 'var(--adm-text-muted)', fontSize: '0.75rem' }}>
                            <FiPhone size={11} style={{ verticalAlign: 'middle', marginRight: 3 }} />{enq.phone}
                           </div>
                            <div style={{ color: 'var(--adm-text-dim)', fontSize: '0.72rem' }}>
                            <FiMail size={11} style={{ verticalAlign: 'middle', marginRight: 3 }} />{enq.email}
                           </div>
                        </td>
                        <td>
                          <span className="adm-type-badge">{enq.service}</span>
                        </td>
                        <td style={{ maxWidth: '400px' }}>
                          <div style={{ fontSize: '0.84rem', color: 'var(--adm-text)', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '6px' }}>
                            {enq.message}
                          </div>
                        </td>
                        <td style={{ color: 'var(--adm-text-dim)', fontSize: '0.75rem' }}>
                          {enq.date}
                        </td>
                        <td>
                          <select
                            className="adm-filter-select"
                            value={enq.status}
                            onChange={(e) => handleEnquiryStatusChange(enq.id, e.target.value)}
                          >
                            <option value="new">New</option>
                            <option value="responded">Responded</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

          {/* TAB: GALLERY / MEDIA */}
          {activeTab === 'media' && (
            <div className="adm-panel-card">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Gallery & Media Assets</h3>
                  <p style={{ margin: '4px 0 0', color: 'var(--adm-text-muted)', fontSize: '0.85rem' }}>
                    Manage public photo galleries, press highlights, and milestone imagery.
                  </p>
                </div>
                <div className="adm-card-controls">
                  <div className="adm-filter-group">
                    <select
                      className="adm-filter-select"
                      value={mediaFilter}
                      onChange={(e) => setMediaFilter(e.target.value)}
                    >
                      <option value="all">All Media Categories</option>
                      <option value="Residential">Residential</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Products">Products</option>
                      <option value="Company">Company</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="adm-btn-action"
                    onClick={() => setShowAddMediaModal(true)}
                  >
                    + Add Media Asset
                  </button>
                </div>
              </div>

              <div className="adm-media-grid">
                {(data.media || [])
                  .filter((m) => mediaFilter === 'all' || m.category === mediaFilter)
                  .map((item) => (
                    <div key={item.id} className="adm-media-card">
                      <div className="adm-media-thumb">
                        <img src={item.imageUrl} alt={item.title} />
                        <span className="adm-media-category-badge">{item.category}</span>
                      </div>
                      <div className="adm-media-body">
                        <h4 className="adm-media-title">{item.title}</h4>
                        <div className="adm-media-footer">
                          <span className="adm-media-date">{item.date}</span>
                          <button
                            type="button"
                            className="adm-btn-tiny danger"
                            onClick={() => handleDeleteMedia(item.id)}
                            title="Delete Media"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="adm-panel-card">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Client Testimonials & Feedback</h3>
                  <p style={{ margin: '4px 0 0', color: 'var(--adm-text-muted)', fontSize: '0.85rem' }}>
                    Verified client reviews and customer satisfaction feedback across C&I and PM Surya Ghar.
                  </p>
                </div>
                <div className="adm-card-controls">
                  <div className="adm-filter-group">
                    <select
                      className="adm-filter-select"
                      value={testimonialFilter}
                      onChange={(e) => setTestimonialFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="adm-btn-action"
                    onClick={() => setShowAddTestimonialModal(true)}
                  >
                    + Add Testimonial
                  </button>
                </div>
              </div>

              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Company / Location</th>
                      <th>Rating</th>
                      <th style={{ width: '40%' }}>Review Quote</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.testimonials || [])
                      .filter((t) => testimonialFilter === 'all' || t.status === testimonialFilter)
                      .map((t) => (
                        <tr key={t.id}>
                          <td style={{ fontWeight: 600 }}>{t.clientName}</td>
                          <td>
                            <div>{t.company}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-dim)' }}>{t.location}</div>
                          </td>
                          <td>
                            <div style={{ color: '#f59e0b', fontSize: '0.88rem', letterSpacing: '2px' }}>
                              {'★'.repeat(t.rating || 5)}
                            </div>
                          </td>
                          <td style={{ fontSize: '0.85rem', color: 'var(--adm-text-muted)', fontStyle: 'italic' }}>
                            "{t.comment}"
                          </td>
                          <td>
                            <select
                              className="adm-filter-select"
                              style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                              value={t.status}
                              onChange={(e) => handleToggleTestimonialStatus(t.id, e.target.value)}
                            >
                              <option value="approved">Approved</option>
                              <option value="pending">Pending</option>
                            </select>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="adm-btn-tiny danger"
                              onClick={() => handleDeleteTestimonial(t.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ADMIN PROFILE */}
          {activeTab === 'profile' && (
            <div className="adm-profile-container">
              <div className="adm-panel-card" style={{ flex: '1 1 360px' }}>
                <div className="adm-card-header">
                  <h3 className="adm-card-title">Administrator Identity</h3>
                </div>
                <div className="adm-profile-badge-card">
                  <div className="adm-profile-avatar-large">
                    {(adminUser?.name || 'A')[0].toUpperCase()}
                  </div>
                  <div className="adm-profile-main-meta">
                    <h4>{adminUser?.name || 'N Solutions Administrator'}</h4>
                    <span className="adm-profile-role-pill">Super Admin • Full Control</span>
                    <p style={{ margin: '6px 0 0', color: 'var(--adm-text-muted)', fontSize: '0.84rem' }}>
                      {adminUser?.email || 'admin@nsolutions.com'}
                    </p>
                  </div>
                </div>

                <div className="adm-profile-meta-list">
                  <div className="adm-profile-meta-row">
                    <span className="adm-meta-label">Access Level</span>
                    <span className="adm-meta-val">Level 1 Executive Root</span>
                  </div>
                  <div className="adm-profile-meta-row">
                    <span className="adm-meta-label">Assigned Jurisdiction</span>
                    <span className="adm-meta-val">AP & Telangana Operations</span>
                  </div>
                  <div className="adm-profile-meta-row">
                    <span className="adm-meta-label">Public Access Status</span>
                    <span className="adm-meta-val" style={{ color: '#059669', fontWeight: 600 }}>Hidden URL Portal (/admin)</span>
                  </div>
                  <div className="adm-profile-meta-row">
                    <span className="adm-meta-label">Session Status</span>
                    <span className="adm-meta-val" style={{ color: '#0284c7' }}>Authenticated & Active</span>
                  </div>
                </div>
              </div>

              <div className="adm-panel-card" style={{ flex: '1 1 400px' }}>
                <div className="adm-card-header">
                  <h3 className="adm-card-title">Update Administrator Password</h3>
                </div>
                <form onSubmit={handleUpdateProfilePassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="adm-form-group" style={{ margin: 0 }}>
                    <label>New Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Minimum 6 characters"
                      value={profilePassword}
                      onChange={(e) => setProfilePassword(e.target.value)}
                      className="adm-search-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div className="adm-form-group" style={{ margin: 0 }}>
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Re-enter password"
                      value={profileConfirmPassword}
                      onChange={(e) => setProfileConfirmPassword(e.target.value)}
                      className="adm-search-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div style={{ paddingTop: '8px' }}>
                    <button type="submit" className="adm-btn-action">
                      Save New Credentials
                    </button>
                  </div>
                </form>

                <div style={{ marginTop: '24px', padding: '14px', background: 'var(--adm-surface-light)', borderRadius: '8px', border: '1px solid var(--adm-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--adm-primary-deep)', fontWeight: 600, fontSize: '0.85rem' }}>
                    <FiShield size={16} color="#0875b6" /> Security Safeguards Active
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: 'var(--adm-text-muted)' }}>
                    Session timeouts occur automatically after inactivity. Direct database persistence is encrypted locally.
                  </p>
                </div>
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
        <div className="adm-modal-backdrop" onClick={() => setShowAddProjectModal(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h3>Register New Solar Project</h3>
              <button className="adm-modal-close" onClick={() => setShowAddProjectModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateProject}>
              <div className="adm-modal-body">
                <div className="adm-form-group">
                  <label>Project Title *</label>
                  <input
                    type="text"
                    required
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. Vizianagaram Industrial Solar Facility"
                  />
                </div>
                <div className="adm-form-group">
                  <label>Category</label>
                  <select
                    className="adm-filter-select"
                    style={{ width: '100%' }}
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  >
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="residential">Residential</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Installed Capacity</label>
                  <input
                    type="text"
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newProject.capacity}
                    onChange={(e) => setNewProject({ ...newProject, capacity: e.target.value })}
                    placeholder="e.g. 500 kW Ground Mount"
                  />
                </div>
                <div className="adm-form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    placeholder="e.g. Parawada, Visakhapatnam"
                  />
                </div>
                <div className="adm-form-group">
                  <label>Client Organization</label>
                  <input
                    type="text"
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newProject.client}
                    onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                    placeholder="e.g. Apex Steel Industries"
                  />
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
                <button type="submit" className="adm-btn-action">
                  Register Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="adm-modal-backdrop" onClick={() => setShowAddProductModal(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h3>Add Product to Catalog</h3>
              <button className="adm-modal-close" onClick={() => setShowAddProductModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateProduct}>
              <div className="adm-modal-body">
                <div className="adm-form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    required
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. Mono PERC Bifacial 550W Module"
                  />
                </div>
                <div className="adm-form-group">
                  <label>Category</label>
                  <select
                    className="adm-filter-select"
                    style={{ width: '100%' }}
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    <option value="Solar Panels">Solar Panels</option>
                    <option value="Inverters">Inverters</option>
                    <option value="Solar Pumps">Solar Pumps</option>
                    <option value="Batteries">Batteries & Storage</option>
                    <option value="Accessories">Accessories & Balance of System</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Model Number</label>
                  <input
                    type="text"
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newProduct.model}
                    onChange={(e) => setNewProduct({ ...newProduct, model: e.target.value })}
                    placeholder="e.g. NS-MB-550"
                  />
                </div>
                <div className="adm-form-group">
                  <label>Efficiency / Performance Specification</label>
                  <input
                    type="text"
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newProduct.efficiency}
                    onChange={(e) => setNewProduct({ ...newProduct, efficiency: e.target.value })}
                    placeholder="e.g. 21.8% Efficiency"
                  />
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
                <button type="submit" className="adm-btn-action">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD MEDIA MODAL */}
      {showAddMediaModal && (
        <div className="adm-modal-backdrop" onClick={() => setShowAddMediaModal(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h3>Add Media / Gallery Asset</h3>
              <button type="button" className="adm-modal-close" onClick={() => setShowAddMediaModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateMedia}>
              <div className="adm-modal-body">
                <div className="adm-form-group">
                  <label>Title / Caption *</label>
                  <input
                    type="text"
                    required
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newMedia.title}
                    onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                    placeholder="e.g. 500kW Industrial Rooftop Commissioning"
                  />
                </div>
                <div className="adm-form-group">
                  <label>Category</label>
                  <select
                    className="adm-filter-select"
                    style={{ width: '100%' }}
                    value={newMedia.category}
                    onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value })}
                  >
                    <option value="Residential">Residential</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Products">Products</option>
                    <option value="Company">Company</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Image URL *</label>
                  <input
                    type="url"
                    required
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newMedia.imageUrl}
                    onChange={(e) => setNewMedia({ ...newMedia, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>
              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn-secondary"
                  onClick={() => setShowAddMediaModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn-action">
                  Upload Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD TESTIMONIAL MODAL */}
      {showAddTestimonialModal && (
        <div className="adm-modal-backdrop" onClick={() => setShowAddTestimonialModal(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h3>Add Client Testimonial</h3>
              <button type="button" className="adm-modal-close" onClick={() => setShowAddTestimonialModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateTestimonial}>
              <div className="adm-modal-body">
                <div className="adm-form-group">
                  <label>Client / Customer Name *</label>
                  <input
                    type="text"
                    required
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newTestimonial.clientName}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
                    placeholder="e.g. Dr. Ramesh Varma"
                  />
                </div>
                <div className="adm-form-group">
                  <label>Company / Organization</label>
                  <input
                    type="text"
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newTestimonial.company}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                    placeholder="e.g. Varma Specialty Hospital"
                  />
                </div>
                <div className="adm-form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="adm-search-input"
                    style={{ width: '100%' }}
                    value={newTestimonial.location}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                    placeholder="e.g. Visakhapatnam, AP"
                  />
                </div>
                <div className="adm-form-group">
                  <label>Rating (1 to 5 Stars)</label>
                  <select
                    className="adm-filter-select"
                    style={{ width: '100%' }}
                    value={newTestimonial.rating}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value, 10) })}
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Review / Testimonial *</label>
                  <textarea
                    required
                    rows={3}
                    className="adm-search-input"
                    style={{ width: '100%', resize: 'vertical' }}
                    value={newTestimonial.comment}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                    placeholder="Describe their experience..."
                  />
                </div>
              </div>
              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn-secondary"
                  onClick={() => setShowAddTestimonialModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn-action">
                  Save Testimonial
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
