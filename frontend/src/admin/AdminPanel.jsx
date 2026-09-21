import { useState, useEffect } from 'react'
import { getStoredData, saveStoredData, adminLogout } from './adminAuth'
import { navigate } from '../components/Shared'
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

  // Enquiry status
  const handleEnquiryStatusChange = (id, newStatus) => {
    updateData((prev) => ({
      ...prev,
      enquiries: prev.enquiries.map((enq) => (enq.id === id ? { ...enq, status: newStatus } : enq))
    }))
    showToast(`Enquiry marked as ${newStatus}`)
  }

  return (
    <div className="adm-layout">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-brand">
          <div className="adm-brand-text">
            <span className="adm-brand-name">N Solutions</span>
            <span className="adm-brand-sub">Admin Portal</span>
          </div>
        </div>

        <nav className="adm-sidebar-nav">
          <span className="adm-nav-heading">Main Navigation</span>
          <button
            className={`adm-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="adm-nav-icon">📊</span>
            <span>Dashboard</span>
          </button>
          <button
            className={`adm-nav-item ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            <span className="adm-nav-icon">👥</span>
            <span>Leads</span>
            <span className="adm-badge highlight">{data.leads.length}</span>
          </button>
          <button
            className={`adm-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <span className="adm-nav-icon">⚡</span>
            <span>Projects</span>
            <span className="adm-badge">{data.projects.length}</span>
          </button>
          <button
            className={`adm-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span className="adm-nav-icon">📦</span>
            <span>Products</span>
            <span className="adm-badge">{data.products.length}</span>
          </button>
          <button
            className={`adm-nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
          >
            <span className="adm-nav-icon">📩</span>
            <span>Enquiries</span>
            <span className="adm-badge">{data.enquiries.length}</span>
          </button>
          <button
            className={`adm-nav-item ${activeTab === 'careers' ? 'active' : ''}`}
            onClick={() => setActiveTab('careers')}
          >
            <span className="adm-nav-icon">💼</span>
            <span>Job Applications</span>
            <span className="adm-badge">{data.applications.length}</span>
          </button>

          <span className="adm-nav-heading">Administration</span>
          <button
            className={`adm-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="adm-nav-icon">⚙️</span>
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
            <span>🚪</span>
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
              <span>🌐 Public Website</span>
              <span style={{ fontSize: '0.75rem' }}>↗</span>
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
                    <div className="adm-stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                      👥
                    </div>
                  </div>
                  <div className="adm-stat-value">{data.leads.length}</div>
                  <div className="adm-stat-meta">
                    <span className="adm-pill-up">↑ Active inquiries</span> across AP & Telangana
                  </div>
                </div>

                <div className="adm-stat-card">
                  <div className="adm-stat-header">
                    <span className="adm-stat-label">Active Projects</span>
                    <div className="adm-stat-icon" style={{ background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8' }}>
                      ⚡
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
                    <div className="adm-stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                      ☀️
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
                    <div className="adm-stat-icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
                      📦
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
                    View All Leads →
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
                    View Enquiries ({data.enquiries.length}) →
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
                            {proj.status === 'completed' ? '✓ Completed' : '⚙ In Progress'}
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
                            📞 {enq.phone}
                          </div>
                          <div style={{ color: 'var(--adm-text-dim)', fontSize: '0.72rem' }}>
                            ✉️ {enq.email}
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
              <button className="adm-modal-close" onClick={() => setShowAddLeadModal(false)}>✕</button>
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
              <button className="adm-modal-close" onClick={() => setShowAddProjectModal(false)}>✕</button>
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
              <button className="adm-modal-close" onClick={() => setShowAddProductModal(false)}>✕</button>
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

      {/* Toast Notification */}
      {toastMessage && (
        <div className="adm-toast">
          <span>⚡</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
