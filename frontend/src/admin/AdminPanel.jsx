import { useState, useEffect } from 'react'
import { adminLogout } from './adminAuth'
import { navigate } from '../components/Shared'
import { apiGet, apiPost, apiPut, apiPatch, apiDelete, apiRequest, apiUpload  } from '../utils/api'
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
  FiInbox,
  FiDownload,
  FiEye,
  FiFileText,
  FiSearch,
  FiFilter
} from 'react-icons/fi'

import { FaSun } from 'react-icons/fa'
import './admin.css'


export default function AdminPanel({ adminUser, onLogout }) {
  

  const [activeTab, setActiveTab] = useState('overview')
  const [dashboardStats, setDashboardStats] = useState({
  totalLeads: 0,
  activeProjects: 0,
  productsListed: 0,
  openPositions: 0,
  solarCapacityInstalled: 0
})

const [recentLeads, setRecentLeads] = useState([])
const [recentEnquiries, setRecentEnquiries] = useState([])
const [testimonials, setTestimonials] = useState([])
  const [leads, setLeads] = useState([])
  const [toastMessage, setToastMessage] = useState('')
  const [projects, setProjects] = useState([])
  const [projectsLoading, setProjectsLoading] = useState(false)
  const [leadSearch, setLeadSearch] = useState('')
  const [leadFilter, setLeadFilter] = useState('all')
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(false)
  const [applications, setApplications] = useState([])
  const [applicationsLoading, setApplicationsLoading] = useState(false)
  const [applicationSearch, setApplicationSearch] = useState('')
  const [applicationStatusFilter, setApplicationStatusFilter] = useState('all')
  const [selectedApplication, setSelectedApplication] = useState(null)
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
  const [mediaItems, setMediaItems] = useState([])
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

const [mediaData, setMediaData] = useState({
  news: [],
  projectMilestones: [],
  gallery: [],
  videos: []
})
const [newMedia, setNewMedia] = useState({
  type: 'photo',
  name: '',
  category: 'Residential',
  location: '',
  description: '',
  duration: '',
  source: '',
  articleUrl: '',
  publicationDate: new Date().toISOString().split('T')[0],
  clientRole: 'Homeowner',
  clientLocation: '',
  photo: null,
  video: null,
  file: null
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
const [mediaTab, setMediaTab] = useState('all');

  // Media state
  const [showAddMediaModal, setShowAddMediaModal] = useState(false)

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

const [jobs, setJobs] = useState([]);
const [jobsLoading, setJobsLoading] = useState(false);

const [showJobModal, setShowJobModal] = useState(false);
const [jobSubmitting, setJobSubmitting] = useState(false);

const [jobForm, setJobForm] = useState({
  jobTitle: '',
  department: '',
  location: '',
  employmentType: '',
  experienceRequired: '',
  qualification: '',
  jobDescription: '',
  jobResponsibilities: [''],
  numberOfOpenings: 1,
  applicationDeadline: '',
  jobStatus: 'Open'
});

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

    if (activeTab === 'careers') {
      loadApplications()
    }

    if (activeTab === 'leads') {
      loadLeads()
    }

    if (activeTab === 'media') {
      loadMedia()
    }

    if (activeTab === 'testimonials') {
      loadTestimonials()
    }
    if(activeTab === 'jobs'){
      loadJobs()
    }

    if (activeTab === 'overview') {
      loadDashboard()
      loadRecentLeads()
      loadRecentEnquiries()
    }
}, [activeTab])

 const loadJobs = async () => {
  try {
    setJobsLoading(true);

    const response = await apiGet('/jobs/admin');

    const jobsData = Array.isArray(response)
      ? response
      : response?.data || [];

    setJobs(jobsData);
  } catch (error) {
    console.error('Failed to load jobs:', error);

    showToast(
      error?.message || 'Failed to load jobs',
      'error'
    );
  } finally {
    setJobsLoading(false);
  }
};

const handleJobStatusChange = async (jobId, newStatus) => {
  try {
    const response = await apiRequest(
      `/jobs/${jobId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          jobStatus: newStatus
        })
      }
    );

    const updatedJob =
      response?.data || response;

    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              jobStatus:
                updatedJob?.jobStatus ||
                newStatus
            }
          : job
      )
    );

    showToast(
      `Job status changed to ${newStatus}.`,
      'success'
    );
  } catch (error) {
    console.error(
      'Failed to update job status:',
      error
    );

    showToast(
      error?.message ||
        'Failed to update job status.',
      'error'
    );
  }
};

const handleDeleteJob = async (jobId) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this job?'
  );

  if (!confirmed) return;

  try {
    await apiRequest(
      `/jobs/${jobId}`,
      {
        method: 'DELETE'
      }
    );

    setJobs((currentJobs) =>
      currentJobs.filter(
        (job) => job.id !== jobId
      )
    );

    showToast(
      'Job deleted successfully.',
      'success'
    );
  } catch (error) {
    console.error(
      'Failed to delete job:',
      error
    );
    await loadjobs()
    showToast(
      error?.message ||
        'Failed to delete job.',
      'error'
    );
  }
};

const handleDeleteApplication = async (applicationId) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this job application?'
  );

  if (!confirmed) return;

  try {
    await apiRequest(`/job-applications/${applicationId}`, {
      method: 'DELETE'
    });

    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== applicationId
      )
    );

    showToast('Job application deleted successfully.', 'success');
  } catch (error) {
    console.error('Failed to delete application:', error);

    showToast(
      error?.message || 'Failed to delete job application.',
      'error'
    );
  }
};
const handleCreateJob = async (e) => {
  e.preventDefault();

  try {
    setJobSubmitting(true);

    const payload = {
      ...jobForm,
      jobResponsibilities:
        jobForm.jobResponsibilities
          .map((item) => item.trim())
          .filter(Boolean),
      numberOfOpenings: Number(
        jobForm.numberOfOpenings
      )
    };

    const response = await apiRequest(
      '/jobs',
      {
        method: 'POST',
        body: JSON.stringify(payload)
      }
    );

    const createdJob =
      response?.data || response;

    setJobs((currentJobs) => [
      createdJob,
      ...currentJobs
    ]);

    setShowJobModal(false);

    setJobForm({
      jobTitle: '',
      department: '',
      location: '',
      employmentType: '',
      experienceRequired: '',
      qualification: '',
      jobDescription: '',
      jobResponsibilities: [''],
      numberOfOpenings: 1,
      applicationDeadline: '',
      jobStatus: 'Open'
    });

    showToast(
      'Job posted successfully.',
      'success'
    );
  } catch (error) {
    console.error(
      'Failed to create job:',
      error
    );

    showToast(
      error?.message ||
        'Failed to post job.',
      'error'
    );
  } finally {
    setJobSubmitting(false);
  }
};

const handleJobFormChange = (e) => {
  const { name, value } = e.target;

  setJobForm((current) => ({
    ...current,
    [name]:
      name === 'numberOfOpenings'
        ? Number(value)
        : value
  }));
};

const handleResponsibilityChange = (index, value) => {
  setJobForm((current) => {
    const responsibilities = [
      ...current.jobResponsibilities
    ];

    responsibilities[index] = value;

    return {
      ...current,
      jobResponsibilities: responsibilities
    };
  });
};

const addResponsibility = () => {
  setJobForm((current) => ({
    ...current,
    jobResponsibilities: [
      ...current.jobResponsibilities,
      ''
    ]
  }));
};

const removeResponsibility = (index) => {
  setJobForm((current) => ({
    ...current,
    jobResponsibilities:
      current.jobResponsibilities.filter(
        (_, i) => i !== index
      )
  }));
};

  const loadRecentEnquiries = async () => {
  try {
    const result = await apiGet(
      '/dashboard/recent-enquiries?limit=4'
    )

    if (!result.success) {
      throw new Error(
        result.message || 'Failed to load recent enquiries'
      )
    }

    setRecentEnquiries(
      Array.isArray(result.data)
        ? result.data
        : []
    )
  } catch (error) {
    console.error('Failed to load recent enquiries:', error)

    showToast(
      error.message || 'Failed to load recent enquiries'
    )
  }
}


  const loadRecentLeads = async () => {
  try {
    const result = await apiGet('/dashboard/recent-leads?limit=4')

    if (!result.success) {
      throw new Error(
        result.message || 'Failed to load recent leads'
      )
    }

   setRecentLeads(
  Array.isArray(result.data)
    ? result.data
    : []
  
  )
  } catch (error) {
    console.error('Failed to load recent leads:', error)
    showToast(
      error.message || 'Failed to load recent leads'
    )
  }
}

  const loadDashboard = async () => {
  try {
    const result = await apiGet('/dashboard/stats')

    if (!result.success) {
      throw new Error(
        result.message || 'Failed to load dashboard statistics'
      )
    }

    setDashboardStats((prev) => ({
  ...prev,
  totalLeads: result.data?.totalLeads ?? 0,
  activeProjects: result.data?.activeProjects ?? 0,
  productsListed: result.data?.productsListed ?? 0,
  openPositions: result.data?.openPositions ?? 0,
  solarCapacityInstalled:
    result.data?.solarCapacityInstalled ??
    prev.solarCapacityInstalled ??
    0
}))
  } catch (error) {
    console.error('Failed to load dashboard statistics:', error)
    showToast(
      error.message || 'Failed to load dashboard statistics'
    )
  }
}

const handleEnquiryDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this enquiry?')) {
    return
  }

  try {
    const result = await apiDelete(`/enquiries/${id}`)

    if (!result.success) {
      throw new Error(
        result.message || 'Failed to delete enquiry'
      )
    }

    setEnquiries((prevEnquiries) =>
      prevEnquiries.filter((enquiry) => enquiry.id !== id)
    )

    showToast('Enquiry deleted successfully')
  } catch (error) {
    console.error('Failed to delete enquiry:', error)
    showToast(
      error.message || 'Failed to delete enquiry'
    )
  }
}
const loadTestimonials = async () => {
  try {
    const result = await apiGet('/testimonials/admin')

    if (!result.success) {
      throw new Error(result.message || 'Failed to load testimonials')
    }

    const testimonials = Array.isArray(result.data)
      ? result.data
      : []
    setTestimonials(testimonials)
  } catch (error) {
    console.error('Failed to load testimonials:', error)
  }
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
    const result = await apiGet('/public/products')

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

  const loadLeads = async () => {
  try {
    const result = await apiGet('/leads')

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch leads')
    }

    setLeads(result.data || [])
  } catch (error) {
    showToast(error.message || 'Failed to fetch leads')
  }
}

  const loadApplications = async () => {
  setApplicationsLoading(true)

  try {
    const response = await apiGet('/job-applications')

    if (!response.success) {
      showToast(
        response.message || 'Failed to load job applications.',
        'error'
      )
      return
    }

    setApplications(
      Array.isArray(response.data) ? response.data : []
    )
  } catch (error) {
    console.error('Failed to load job applications:', error)
    showToast('Failed to load job applications.', 'error')
  } finally {
    setApplicationsLoading(false)
  }
}
  // Filtered leads
const filteredLeads = leads.filter((lead) => {
  const search = leadSearch.toLowerCase()

  const matchesSearch =
    (lead.name || '').toLowerCase().includes(search) ||
    (lead.company || '').toLowerCase().includes(search) ||
    (lead.location || '').toLowerCase().includes(search)

  const matchesStatus =
    leadFilter === 'all' || lead.status === leadFilter

  return matchesSearch && matchesStatus
})

  // Filtered job applications
  const filteredApplications = applications.filter((app) => {
    const search = applicationSearch.toLowerCase().trim()
    const matchesSearch =
      !search ||
      (app.fullName || '').toLowerCase().includes(search) ||
      (app.positionAppliedFor || '').toLowerCase().includes(search) ||
      (app.jobTitle || '').toLowerCase().includes(search) ||
      (app.email || '').toLowerCase().includes(search) ||
      (app.phoneNumber || '').toLowerCase().includes(search)

    const matchesStatus =
      applicationStatusFilter === 'all' ||
      (app.applicationStatus || 'Applied').toLowerCase() === applicationStatusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })
  // Lead status updater
 const handleLeadStatusChange = async (id, newStatus) => {
  try {
   
    const result = await apiPut(`/leads/${id}`, {
      status: newStatus
    })

  
    if (!result.success) {
      throw new Error(
        result.message || 'Failed to update lead status'
      )
    }

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? {
              ...lead,
              status: result.data?.status || newStatus
            }
          : lead
      )
    )

    showToast(`Lead marked as ${newStatus}`)
  } catch (error) {
    showToast(error.message || 'Failed to update lead status')
  }
}

  // Delete lead
 const handleDeleteLead = async (id) => {
  if (!window.confirm('Are you sure you want to delete this lead?')) {
    return
  }

  try {
    const result = await apiDelete(`/leads/${id}`)

    if (!result.success) {
      throw new Error(
        result.message || 'Failed to delete lead'
      )
    }

    setLeads((prev) =>
      prev.filter((lead) => lead.id !== id)
    )

    setDashboardStats((prev) => ({
      ...prev,
      totalLeads: Math.max(0, prev.totalLeads - 1)
    }))

    showToast('Lead deleted successfully')
  } catch (error) {
    console.error('Failed to delete lead:', error)
    showToast(error.message || 'Failed to delete lead')
  }
}

  // Add lead
  const handleCreateLead = async (e) => {
  e.preventDefault()

  if (!newLead.name || !newLead.phone) return

  try {
    const result = await apiPost('/leads', {
      name: newLead.name,
      company: newLead.company,
      phone: newLead.phone,
      email: newLead.email,
      type: newLead.type,
      location: newLead.location,
      capacity: newLead.capacity,
      status: newLead.status
    })

    if (!result.success) {
      throw new Error(
        result.message || 'Failed to create lead'
      )
    }

    const createdLead = result.data

    setLeads((prev) => [
      createdLead,
      ...prev
    ])

    setDashboardStats((prev) => ({
      ...prev,
      totalLeads: prev.totalLeads + 1
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

    showToast('New lead added successfully')
  } catch (error) {
    console.error('Failed to create lead:', error)

    showToast(
      error.message || 'Failed to create lead'
    )
  }
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
    await fetchProjects()
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
    await fetchProjects()
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
    await fetchProducts()
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
  }}


  // Media handlers

const handleCreateMedia = async (e) => {
  e.preventDefault()

  try {
    // 1. PHOTO ARCHIVE / PROJECT GALLERY
    if (newMedia.type === 'photo') {
      if (!newMedia.name) {
        showToast('Please enter project / photo title')
        return
      }
      if (!newMedia.photo) {
        showToast('Please select a photo image')
        return
      }

      const formData = new FormData()
      formData.append('title', newMedia.name)
      formData.append('category', newMedia.category || 'Residential')
      formData.append('location', newMedia.location || '')
      formData.append('description', newMedia.description || '')
      formData.append('image', newMedia.photo)

      const result = await apiUpload('/gallery', formData)
      await loadMedia()
      if (!result.success) {
        throw new Error(result.message || 'Failed to create gallery item')
      }
      showToast('Photo asset uploaded successfully')
    }

    // 2. VIDEO SPOTLIGHT
    if (newMedia.type === 'video') {
      if (!newMedia.name) {
        showToast('Please enter video title')
        return
      }
      if (!newMedia.video) {
        showToast('Please select a video file')
        return
      }
      if (!newMedia.file) {
        showToast('Please select a video thumbnail image')
        return
      }

      const formData = new FormData()
      formData.append('title', newMedia.name)
      formData.append('category', newMedia.category || 'Corporate')
      formData.append('duration', newMedia.duration || '')
      formData.append('description', newMedia.description || '')
      formData.append('video', newMedia.video)
      formData.append('thumbnail', newMedia.file)

      const result = await apiUpload('/videos', formData)
      if (!result.success) {
        throw new Error(result.message || 'Failed to create video')
      }
      showToast('Video spotlight uploaded successfully')
    }

    // 3. CLIENT STORY
    if (newMedia.type === 'client') {
      if (!newMedia.name) {
        showToast('Please enter client name')
        return
      }
      if (!newMedia.description) {
        showToast('Please enter client quote or story')
        return
      }

      const clientRole = newMedia.clientRole || 'Homeowner'
      const clientLoc = newMedia.clientLocation || newMedia.location || ''

      const formData = new FormData()
      formData.append('name', newMedia.name)
      formData.append('title', newMedia.name)
      formData.append('role', clientRole)
      formData.append('category', clientRole)
      formData.append('location', clientLoc)
      formData.append('description', newMedia.description)
      formData.append('quote', newMedia.description)
      if (newMedia.photo) {
        formData.append('image', newMedia.photo)
      }

      let base64Img = ''
      if (newMedia.photo) {
        try {
          base64Img = await new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.onerror = () => resolve('')
            reader.readAsDataURL(newMedia.photo)
          })
        } catch (err) {
          base64Img = ''
        }
      }

      try {
        await apiUpload('/clients', formData)
      } catch (err) {
        console.warn('API /clients upload notice:', err)
      }

      try {
        const stored = JSON.parse(localStorage.getItem('nsolutions_media_clients') || '[]')
        const newClient = {
          id: 'client_' + Date.now(),
          type: 'client',
          title: newMedia.name,
          name: newMedia.name,
          role: clientRole,
          category: clientRole,
          location: clientLoc,
          description: newMedia.description,
          quote: newMedia.description,
          imageUrl: base64Img || (newMedia.photo ? URL.createObjectURL(newMedia.photo) : ''),
          date: new Date().toISOString().split('T')[0]
        }
        stored.unshift(newClient)
        localStorage.setItem('nsolutions_media_clients', JSON.stringify(stored))
      } catch (err) {
        console.error('Failed to save client to localStorage:', err)
      }

      showToast('Client media asset added successfully')
    }

    // 4. PRESS & NEWS
    if (newMedia.type === 'press') {
      if (!newMedia.name) {
        showToast('Please enter article title')
        return
      }

      const formData = new FormData()
      formData.append('title', newMedia.name)
      formData.append('source', newMedia.source || 'N Solutions')
      formData.append('articleUrl', newMedia.articleUrl || '#')
      formData.append(
        'publicationDate',
        newMedia.publicationDate || new Date().toISOString().split('T')[0]
      )
      formData.append('summary', newMedia.name)
      if (newMedia.photo) {
        formData.append('image', newMedia.photo)
      }

      const result = await apiUpload('/news', formData)
      if (!result.success) {
        showToast(result.message || 'Failed to upload press release')
        return
      }
      showToast('Press article added successfully')
    }

    // Refresh admin media list
    await loadMedia()

    // Reset form
    setNewMedia({
      type: 'photo',
      name: '',
      category: 'Residential',
      location: '',
      description: '',
      duration: '',
      source: '',
      articleUrl: '',
      publicationDate: new Date().toISOString().split('T')[0],
      clientRole: 'Homeowner',
      clientLocation: '',
      photo: null,
      video: null,
      file: null
    })

    setShowAddMediaModal(false)

  } catch (error) {
    console.error('Failed to create media:', error)
    showToast(error.message || 'Failed to create media asset')
  }
}


  // Application status
  const handleApplicationStatusChange = async (applicationId, newStatus) => {
  try {
    const result = await apiPatch(
      `/job-applications/${applicationId}/status`,
      {
        status: newStatus
      }
    )

    if (!result.success) {
      throw new Error(
        result.message || 'Failed to update application status'
      )
    }

    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === applicationId
          ? {
              ...app,
              applicationStatus:
                result.data?.applicationStatus || newStatus
            }
          : app
      )
    )
    showToast(`Status updated to ${newStatus}`, 'success')
  } catch (error) {
    console.error(
      'Failed to update application status:',
      error
    )
  }
}

  // Resume Download Handler
  const handleDownloadResume = async (app, e) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    if (!app?.resumeUrl) {
      showToast('No resume file attached to this application.', 'error')
      return
    }

    const candidateName = (app.fullName || 'Candidate').trim()
    const safeName = candidateName.replace(/[^a-zA-Z0-9_-]/g, '_') || 'Candidate'

    let ext = 'pdf'
    try {
      const urlParts = app.resumeUrl.split(/[#?]/)[0].split('.')
      if (urlParts.length > 1) {
        const detectedExt = urlParts.pop().toLowerCase()
        if (['pdf', 'doc', 'docx'].includes(detectedExt)) {
          ext = detectedExt
        }
      }
    } catch (err) {}

    const filename = `${safeName}_Resume.${ext}`
    showToast(`Downloading ${candidateName}'s resume...`, 'info')

    try {
      // 1. Attempt blob fetch for direct browser file save with candidate filename
      const response = await fetch(app.resumeUrl)
      if (!response.ok) throw new Error('Fetch failed')
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
      showToast(`Downloaded ${filename} successfully!`, 'success')
    } catch (fetchErr) {
      // 2. Fallback: Use Cloudinary fl_attachment or backend download endpoint
      let downloadUrl = app.resumeUrl
      if (downloadUrl.includes('cloudinary.com') && downloadUrl.includes('/upload/')) {
        downloadUrl = downloadUrl.replace(
          '/upload/',
          `/upload/fl_attachment:${encodeURIComponent(safeName + '_Resume')}/`
        )
      } else if (app.id) {
        const token = localStorage.getItem('nsolutions_admin_token')
        const apiBase = import.meta.env.VITE_API_BASE_URL || '/api'
        downloadUrl = `${apiBase}/job-applications/${app.id}/resume/download?token=${encodeURIComponent(token || '')}`
      }
      const link = document.createElement('a')
      link.href = downloadUrl
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      showToast(`Resume download started for ${candidateName}!`, 'success')
    }
  }

  // Resume Preview Handler
  const handleViewResume = (app, e) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    if (!app?.resumeUrl) {
      showToast('No resume file attached to this application.', 'error')
      return
    }
    window.open(app.resumeUrl, '_blank', 'noopener,noreferrer')
  }

const handleDeleteMedia = async (id) => {
  try {
    const item = mediaItems.find((media) => media.id === id)

    if (!item) return

    let endpoint = ''

    if (item.type === 'press') {
      endpoint = `/news/${id}`
    } else if (item.type === 'video') {
      endpoint = `/videos/${id}`
    } else if (item.type === 'photo') {
      endpoint = `/gallery/${id}`
    } else if (item.type === 'client') {
      endpoint = `/clients/${id}`
      try {
        const stored = JSON.parse(localStorage.getItem('nsolutions_media_clients') || '[]')
        const filtered = stored.filter((c) => c.id !== id)
        localStorage.setItem('nsolutions_media_clients', JSON.stringify(filtered))
      } catch (err) {
        console.error('Failed to update localStorage clients:', err)
      }
    }

    if (endpoint) {
      try {
        const result = await apiDelete(endpoint)
        if (result && !result.success && item.type !== 'client') {
          throw new Error(result.message || 'Failed to delete media')
        }
      } catch (err) {
        if (item.type !== 'client') throw err
      }
    }

    showToast('Media item deleted successfully')
    // Refresh the list from backend
    await loadMedia()

  } catch (error) {
    console.error('Failed to delete media:', error)
    showToast('Failed to delete media item')
  }
}
const loadMedia = async () => {
  try {
    const [galleryResult, videosResult, newsResult, clientsResult] = await Promise.allSettled([
      apiGet('/gallery/'),
      apiGet('/videos'),
      apiGet('/news'),
      apiGet('/clients')
    ])

    const galleryData = galleryResult.status === 'fulfilled' ? galleryResult.value : null
    const videosData = videosResult.status === 'fulfilled' ? videosResult.value : null
    const newsData = newsResult.status === 'fulfilled' ? newsResult.value : null
    const clientsData = clientsResult.status === 'fulfilled' ? clientsResult.value : null

    const galleryItems =
      galleryData?.success && Array.isArray(galleryData.data)
        ? galleryData.data.map((item) => ({
            id: item.id || item._id,
            type: 'photo',
            title: item.title || '',
            description: item.description || '',
            location: item.location || '',
            imageUrl: item.image?.url || '',
            date: item.createdAt || '',
            category: item.category || ''
          }))
        : []

    const videoItems =
      videosData?.success && Array.isArray(videosData.data)
        ? videosData.data.map((item) => ({
            id: item.id || item._id,
            type: 'video',
            title: item.title || '',
            description: item.description || '',
            duration: item.duration || '',
            imageUrl: item.thumbnail?.url || '',
            videoUrl: item.videoUrl || '',
            date: item.createdAt || '',
            category: item.category || ''
          }))
        : []

    const newsItems =
      newsData?.success && Array.isArray(newsData.data)
        ? newsData.data.map((item) => ({
            id: item.id || item._id,
            type: 'press',
            title: item.title || '',
            description: item.summary || '',
            source: item.source || '',
            imageUrl: item.image?.url || '',
            date: item.publicationDate || item.createdAt || '',
            category: item.source || 'Press & News',
            articleUrl: item.articleUrl || ''
          }))
        : []

    // Map fetched clients from API
    const apiClients =
      clientsData?.success && Array.isArray(clientsData.data)
        ? clientsData.data.map((item) => ({
            id: item.id || item._id,
            type: 'client',
            title: item.name || item.title || '',
            role: item.role || item.category || 'Client',
            location: item.location || '',
            company: item.company || '',
            description: item.quote || item.description || '',
            imageUrl: item.image?.url || item.imageUrl || '',
            date: item.createdAt || '',
            category: item.role || 'Client'
          }))
        : []

    // Read local clients from localStorage
    let localClients = []
    try {
      localClients = JSON.parse(localStorage.getItem('nsolutions_media_clients') || '[]')
    } catch (e) {
      localClients = []
    }

    // Default seed clients to ensure "Clients" tab has initial content
    const seedClients = [
      {
        id: 'client_c1',
        type: 'client',
        title: 'K. Srinivasa Rao',
        role: 'Homeowner',
        location: 'Vizianagaram, AP',
        description: '"Our electricity bill reduced significantly. Great service and professional team!"',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        date: '2025-01-15',
        category: 'Homeowner'
      },
      {
        id: 'client_c2',
        type: 'client',
        title: 'V. Ramakrishna Murthy',
        role: 'Business Owner',
        location: 'Hyderabad, TG',
        description: '"Professional team and excellent execution across our entire facility."',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        date: '2025-02-10',
        category: 'Business Owner'
      },
      {
        id: 'client_c3',
        type: 'client',
        title: 'M. Anand Reddy',
        role: 'Factory Manager',
        location: 'Kurnool, AP',
        description: '"Reliable and efficient industrial solution. ROI achieved in under 4 years."',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        date: '2025-02-28',
        category: 'Factory Manager'
      },
      {
        id: 'client_c4',
        type: 'client',
        title: 'Ch. Venkata Narayana',
        role: 'Farmer',
        location: 'Anakapalli, AP',
        description: '"Solar pump changed our farming life. We water our crops every day now."',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        date: '2025-03-05',
        category: 'Farmer'
      }
    ]

    // Deduplicate clients by id or title
    const clientMap = new Map()
    seedClients.forEach((c) => clientMap.set(c.id, c))
    apiClients.forEach((c) => clientMap.set(c.id, c))
    localClients.forEach((c) => clientMap.set(c.id, c))

    const clientItems = Array.from(clientMap.values())

    setMediaItems([
      ...newsItems,
      ...galleryItems,
      ...videoItems,
      ...clientItems
    ])
  } catch (error) {
    console.error('Failed to load media', error)
  }
}
  // Testimonial handlers
  const handleCreateTestimonial = async (e) => {
  e.preventDefault()

  if (!newTestimonial.clientName || !newTestimonial.comment) return

  try {
    const result = await apiPost('/testimonials', {
      clientName: newTestimonial.clientName,
      company: newTestimonial.company,
      location: newTestimonial.location,
      rating: Number(newTestimonial.rating),
      comment: newTestimonial.comment,
      status: newTestimonial.status || 'approved'
    })

    if (!result.success) {
      throw new Error(
        result.message || 'Failed to create testimonial'
      )
    }

    await loadTestimonials()

    setShowAddTestimonialModal(false)

    setNewTestimonial({
      clientName: '',
      company: '',
      location: '',
      rating: 5,
      comment: '',
      status: 'approved'
    })

    showToast('Testimonial saved')
  } catch (error) {
    console.error('Failed to create testimonial:', error)
    showToast(error.message || 'Failed to save testimonial')
  }
}

 const handleToggleTestimonialStatus = async (id, status) => {
  try {
    const result = await apiPatch(`/testimonials/${id}`, {
      status
    })

    if (!result.success) {
      throw new Error(
        result.message || 'Failed to update testimonial status'
      )
    }

    await loadTestimonials()

    showToast('Testimonial status updated')
  } catch (error) {
    console.error('Failed to update testimonial status:', error)
    showToast(error.message || 'Failed to update status')
  }
}

  const handleDeleteTestimonial = async (id) => {
  try {
    const result = await apiDelete(`/testimonials/${id}`)

    if (!result.success) {
      throw new Error(
        result.message || 'Failed to delete testimonial'
      )
    }

    await loadTestimonials()

    showToast('Testimonial deleted')
  } catch (error) {
    console.error('Failed to delete testimonial:', error)
    showToast(error.message || 'Failed to delete testimonial')
  }
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
            <span className="adm-badge highlight">{dashboardStats.totalLeads ?? 0}</span>
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
            className={`adm-nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            <span className="adm-nav-icon"><FiBriefcase /></span>
            <span>Jobs</span>
          </button>
          <span className="adm-nav-heading">Administration</span>
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
                  <div className="adm-stat-value">{dashboardStats.totalLeads ?? 0}</div>
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
                    {dashboardStats.activeProjects ?? 0}
                  </div>
                  <div className="adm-stat-meta">
                  <span> {projects.filter((p) => p.status === 'completed').length} completed portfolio</span>
                  </div>
                </div>

                <div className="adm-stat-card">
                  <div className="adm-stat-header">
                    <span className="adm-stat-label">Installed Capacity</span>
                    <div className="adm-stat-icon" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                      <FaSun size={20} />
                    </div>
                  </div>
                  <div className="adm-stat-value">{dashboardStats.solarCapacityInstalled ?? 0}</div>
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
                  <div className="adm-stat-value">{dashboardStats.productsListed ?? 0}</div>
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
                      {recentLeads?.map((lead) => (
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
                    View Enquiries <FiArrowUpRight style={{ verticalAlign: 'middle' }} />
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
                      {recentEnquiries?.map((enq) => (
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
                           Loading Leads...
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
  projects.map((proj) => {
  return (
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
    )
  })
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
  (Array.isArray(products) ? products : []).map((prod) => (
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
  <th>Actions</th>
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
                <td>
  <div className="adm-actions-cell">
    <button
      className="adm-btn-tiny danger"
      onClick={() => handleEnquiryDelete(enq.id)}
      title="Delete Enquiry"
    >
      Delete
    </button>
  </div>
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
              <div className="adm-card-header" style={{ flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                <div>
                  <h3 className="adm-card-title">
                    <span>Job Applications & Candidate Resumes</span>
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--adm-text-dim)' }}>
                    Review candidate submissions, download resumes directly, and update interview/hiring status.
                  </p>
                </div>

                <div className="adm-app-toolbar">
                  <div className="adm-search-box">
                    <FiSearch size={14} className="adm-search-icon" />
                    <input
                      type="text"
                      placeholder="Search candidate, role, phone..."
                      value={applicationSearch}
                      onChange={(e) => setApplicationSearch(e.target.value)}
                      className="adm-search-input"
                    />
                    {applicationSearch && (
                      <button
                        type="button"
                        onClick={() => setApplicationSearch('')}
                        className="adm-search-clear"
                        title="Clear search"
                      >
                        <FiX size={12} />
                      </button>
                    )}
                  </div>

                  <select
                    className="adm-status-select"
                    value={applicationStatusFilter}
                    onChange={(e) => setApplicationStatusFilter(e.target.value)}
                    style={{ minWidth: '150px' }}
                  >
                    <option value="all">All Statuses ({applications.length})</option>
                    <option value="Applied">Applied ({applications.filter(a => (a.applicationStatus || 'Applied') === 'Applied').length})</option>
                    <option value="Shortlisted">Shortlisted ({applications.filter(a => a.applicationStatus === 'Shortlisted').length})</option>
                    <option value="Interview">Interview ({applications.filter(a => a.applicationStatus === 'Interview').length})</option>
                    <option value="Selected">Selected ({applications.filter(a => a.applicationStatus === 'Selected').length})</option>
                    <option value="Rejected">Rejected ({applications.filter(a => a.applicationStatus === 'Rejected').length})</option>
                  </select>
                </div>
              </div>

              {/* Status summary pills */}
              <div className="adm-app-stats-bar">
                <span className="adm-app-stat-pill total">
                  Total: <strong>{applications.length}</strong>
                </span>
                <span className="adm-app-stat-pill applied">
                  New: <strong>{applications.filter(a => (a.applicationStatus || 'Applied') === 'Applied').length}</strong>
                </span>
                <span className="adm-app-stat-pill shortlisted">
                  Shortlisted: <strong>{applications.filter(a => a.applicationStatus === 'Shortlisted').length}</strong>
                </span>
                <span className="adm-app-stat-pill interview">
                  Interview: <strong>{applications.filter(a => a.applicationStatus === 'Interview').length}</strong>
                </span>
                <span className="adm-app-stat-pill selected">
                  Selected: <strong>{applications.filter(a => a.applicationStatus === 'Selected').length}</strong>
                </span>
                <span className="adm-app-stat-pill resumes">
                  Resumes Available: <strong>{applications.filter(a => !!a.resumeUrl).length}</strong>
                </span>
              </div>

              <div className="adm-table-wrap">
                {applicationsLoading ? (
                  <div
                    style={{
                      padding: '40px',
                      textAlign: 'center',
                      color: 'var(--adm-text-muted)'
                    }}
                  >
                    Loading job applications...
                  </div>
                ) : filteredApplications.length === 0 ? (
                  <div
                    style={{
                      padding: '40px',
                      textAlign: 'center',
                      color: 'var(--adm-text-muted)'
                    }}
                  >
                    {applicationSearch || applicationStatusFilter !== 'all'
                      ? 'No applications match your search filter.'
                      : 'No job applications found.'}
                  </div>
                ) : (
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Candidate Name</th>
                        <th>Applied Role</th>
                        <th>Experience</th>
                        <th>Contact</th>
                        <th>Resume</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredApplications.map((app) => (
                        <tr key={app.id}>
                          {/* CANDIDATE */}
                          <td>
                            <strong
                              style={{ cursor: 'pointer', color: 'var(--adm-primary)' }}
                              onClick={() => setSelectedApplication(app)}
                              title="Click to view candidate details"
                            >
                              {app.fullName}
                            </strong>

                            <div
                              style={{
                                color: 'var(--adm-text-dim)',
                                fontSize: '0.75rem'
                              }}
                            >
                              Submitted:{' '}
                              {app.appliedDate
                                ? new Date(app.appliedDate).toLocaleString('en-IN', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })
                                : '—'}
                            </div>
                          </td>

                          {/* ROLE */}
                          <td>
                            <span className="adm-type-badge">
                              {app.positionAppliedFor || app.jobTitle || '—'}
                            </span>

                            {app.jobTitle &&
                              app.positionAppliedFor &&
                              app.jobTitle !== app.positionAppliedFor && (
                                <div
                                  style={{
                                    color: 'var(--adm-text-dim)',
                                    fontSize: '0.72rem',
                                    marginTop: '5px'
                                  }}
                                >
                                  Job: {app.jobTitle}
                                </div>
                              )}
                          </td>

                          {/* EXPERIENCE */}
                          <td>
                            {app.yearsOfExperience !== null && app.yearsOfExperience !== undefined
                              ? `${app.yearsOfExperience} ${app.yearsOfExperience === 1 ? 'year' : 'years'}`
                              : 'Not specified'}
                          </td>

                          {/* CONTACT */}
                          <td>
                            <div>
                              <a href={`tel:${app.phoneNumber}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                {app.phoneNumber}
                              </a>
                            </div>

                            <div
                              style={{
                                color: 'var(--adm-text-dim)',
                                fontSize: '0.75rem'
                              }}
                            >
                              <a href={`mailto:${app.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                {app.email}
                              </a>
                            </div>
                          </td>

                          {/* RESUME DOWNLOAD & PREVIEW */}
                          <td>
                            {app.resumeUrl ? (
                              <div className="adm-resume-cell">
                                <button
                                  type="button"
                                  onClick={(e) => handleDownloadResume(app, e)}
                                  className="adm-resume-download-btn"
                                  title={`Download ${app.fullName}'s resume directly`}
                                >
                                  <FiDownload size={13} /> Download
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => handleViewResume(app, e)}
                                  className="adm-resume-view-btn"
                                  title="Preview resume in new tab"
                                >
                                  <FiEye size={13} /> View
                                </button>
                              </div>
                            ) : (
                              <span className="adm-no-file-pill">No file</span>
                            )}
                          </td>

                          {/* STATUS */}
                          <td>
                            <select
                              className="adm-status-select"
                              value={app.applicationStatus || 'Applied'}
                              onChange={(e) => handleApplicationStatusChange(app.id, e.target.value)}
                            >
                              <option value="Applied">Applied</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Interview">Interview</option>
                              <option value="Selected">Selected</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>

                          {/* ACTIONS */}
                          <td>
                            <div className="adm-actions-cell">
                              <button
                                type="button"
                                className="adm-btn-tiny"
                                onClick={() => setSelectedApplication(app)}
                                title="View candidate profile and cover message"
                              >
                                View Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

    {activeTab === 'jobs' && (
  <div className="adm-panel-card">
    <div className="adm-card-header">
      <h3 className="adm-card-title">
        <span>Current Opportunities</span>
      </h3>
      <button
        type="button"
        className="adm-btn-action"
        onClick={() => setShowJobModal(true)}
      >
        + Post Job
      </button>


    </div>

    <div className="adm-table-wrap">
      {jobsLoading ? (
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            color: 'var(--adm-text-muted)'
          }}
        >
          Loading jobs...
        </div>
      ) : jobs.length === 0 ? (
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            color: 'var(--adm-text-muted)'
          }}
        >
          No jobs found.
        </div>
      ) : (
        <table className="adm-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Department</th>
              <th>Location</th>
              <th>Employment Type</th>
              <th>Experience Required</th>
              <th>Qualification</th>
              <th>Job Description</th>
              <th>Job Responsibilities</th>
              <th>Number of Openings</th>
              <th>Application Deadline</th>
              <th>Job Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                {/* JOB TITLE */}
                <td>
                  <strong>
                    {job.title ||
                      job.jobTitle ||
                      '—'}
                  </strong>
                </td>

                {/* DEPARTMENT */}
                <td>
                  {job.department || '—'}
                </td>

                {/* LOCATION */}
                <td>
                  {job.location || '—'}
                </td>

                {/* EMPLOYMENT TYPE */}
                <td>
                  <span className="adm-type-badge">
                    {job.employmentType ||
                      job.type ||
                      '—'}
                  </span>
                </td>

                {/* EXPERIENCE */}
                <td>
                  {job.experienceRequired ||
                    job.experience ||
                    '—'}
                </td>

                {/* QUALIFICATION */}
                <td>
                  {job.qualification ||
                    job.qualifications ||
                    '—'}
                </td>

                {/* JOB DESCRIPTION */}
                <td>
                  <div
                    style={{
                      maxWidth: '280px',
                      whiteSpace: 'normal',
                      lineHeight: '1.5'
                    }}
                  >
                    {job.description ||
                      job.jobDescription ||
                      '—'}
                  </div>
                </td>

                {/* JOB RESPONSIBILITIES */}
                <td>
                  <div
                    style={{
                      maxWidth: '320px',
                      whiteSpace: 'normal',
                      lineHeight: '1.5'
                    }}
                  >
                    {Array.isArray(
                      job.responsibilities
                    ) ? (
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: '18px'
                        }}
                      >
                        {job.responsibilities.map(
                          (responsibility, index) => (
                            <li key={index}>
                              {responsibility}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      job.responsibilities ||
                      job.jobResponsibilities ||
                      '—'
                    )}
                  </div>
                </td>

                {/* NUMBER OF OPENINGS */}
                <td>
                  {job.numberOfOpenings ??
                    job.openings ??
                    '—'}
                </td>

                {/* APPLICATION DEADLINE */}
                <td>
                  {job.applicationDeadline
                    ? new Date(
                        job.applicationDeadline
                      ).toLocaleDateString(
                        'en-IN',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }
                      )
                    : job.deadline
                    ? new Date(
                        job.deadline
                      ).toLocaleDateString(
                        'en-IN',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }
                      )
                    : '—'}
                </td>

                {/* JOB STATUS */}
                <td>
                 <select
                  className="adm-status-select"
                  value={job.jobStatus || 'Open'}
                  onChange={(e) =>
                    handleJobStatusChange(
                      job.id,
                      e.target.value
                    )
                  }
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
                </td>

                <td>
  <button
    type="button"
    className="adm-btn-tiny danger"
    onClick={() =>
      handleDeleteJob(job.id)
    }
  >
    Delete
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
)}

          {/* TAB: GALLERY / MEDIA */}
          {activeTab === 'media' && (
  <div className="adm-panel-card">

    {/* Header */}
    <div className="adm-card-header">
      <div>
        <h3 className="adm-card-title">Gallery & Media Assets</h3>
        <p
          style={{
            margin: '4px 0 0',
            color: 'var(--adm-text-muted)',
            fontSize: '0.85rem'
          }}
        >
          Manage press releases, videos, photo galleries, and brand assets.
        </p>
      </div>

      <div className="adm-card-controls">
        <button
          type="button"
          className="adm-btn-action"
          onClick={() => setShowAddMediaModal(true)}
        >
          + Add Media Asset
        </button>
      </div>
    </div>

    {/* Media Type Tabs */}
    <div className="adm-media-tabs">

      <button
        type="button"
        className={`adm-media-tab ${
          mediaTab === 'all' ? 'active' : ''
        }`}
        onClick={() => setMediaTab('all')}
      >
        All Updates
      </button>

      <button
        type="button"
        className={`adm-media-tab ${
          mediaTab === 'press' ? 'active' : ''
        }`}
        onClick={() => setMediaTab('press')}
      >
        Press Releases
      </button>

      <button
        type="button"
        className={`adm-media-tab ${
          mediaTab === 'video' ? 'active' : ''
        }`}
        onClick={() => setMediaTab('video')}
      >
        Video Spotlights
      </button>

      <button
        type="button"
        className={`adm-media-tab ${
          mediaTab === 'photo' ? 'active' : ''
        }`}
        onClick={() => setMediaTab('photo')}
      >
        Photo Archive
      </button>

      <button
        type="button"
        className={`adm-media-tab ${
          mediaTab === 'client' ? 'active' : ''
        }`}
        onClick={() => setMediaTab('client')}
      >
        Clients
      </button>

    </div>

    {/* Clients Section Banner (when Clients tab is selected) */}
    {mediaTab === 'client' && (
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(23,105,194,0.06), rgba(16,185,129,0.06))',
          border: '1px solid rgba(23,105,194,0.15)',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <h4 style={{ margin: 0, fontSize: '0.98rem', color: 'var(--adm-text)' }}>
            Client Success Stories & Featured Partners
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--adm-text-muted)' }}>
            Manage client testimonials, project stories, and partner profiles displayed in the media showcase.
          </p>
        </div>
        <span
          style={{
            background: '#1769c2',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.8rem',
            padding: '4px 14px',
            borderRadius: '999px'
          }}
        >
          {(mediaItems || []).filter((item) => item.type === 'client').length} Clients
        </span>
      </div>
    )}

    {/* Media Grid */}
    <div className="adm-media-grid">

      {(mediaItems || [])
        .filter((item) => {
          if (mediaTab === 'all') return true;
          return item.type === mediaTab;
        })
        .map((item) => (

          <div key={item.id} className="adm-media-card">

            <div className="adm-media-thumb">

              {item.type === 'video' ? (
                <div className="adm-media-video-placeholder">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                  />

                  <span>▶</span>
                </div>
              ) : item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    color: '#38bdf8',
                    fontWeight: 700,
                    fontSize: '2.2rem'
                  }}
                >
                  {item.title ? item.title.charAt(0).toUpperCase() : 'C'}
                </div>
              )}

              {item.type === 'video' && item.duration && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    background: 'rgba(0, 0, 0, 0.75)',
                    color: '#fff',
                    fontSize: '0.72rem',
                    padding: '2px 6px',
                    borderRadius: 4,
                    fontWeight: 600
                  }}
                >
                  {item.duration}
                </span>
              )}

              <span
                className="adm-media-category-badge"
                style={item.type === 'client' ? { background: '#1769c2', color: '#fff' } : {}}
              >
                {item.type === 'press' && (item.source || 'Press')}
                {item.type === 'video' && (item.category || 'Video')}
                {item.type === 'photo' && (item.category || 'Photo')}
                {item.type === 'client' && 'Client'}
                {item.type === 'brand' && 'Media Kit'}
              </span>

            </div>

            <div className="adm-media-body">

              <h4 className="adm-media-title">
                {item.title}
              </h4>

              {/* Sub-meta depending on asset type */}
              {(item.role || item.location || item.source || item.category) && (
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--adm-text-muted)',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexWrap: 'wrap'
                  }}
                >
                  {item.type === 'client' && item.role && (
                    <span style={{ fontWeight: 600, color: '#1769c2' }}>
                      {item.role}
                    </span>
                  )}
                  {item.type === 'press' && item.source && (
                    <span style={{ fontWeight: 600, color: '#b91c1c' }}>
                      {item.source}
                    </span>
                  )}
                  {item.location && <span>• {item.location}</span>}
                  {item.type === 'press' && item.articleUrl && item.articleUrl !== '#' && (
                    <a
                      href={item.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1769c2', textDecoration: 'none', marginLeft: 'auto' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit ↗
                    </a>
                  )}
                </div>
              )}

              {item.description && (
                <p className="adm-media-description">
                  {item.description}
                </p>
              )}

              <div className="adm-media-footer">

                <span className="adm-media-date">
                  {item.date ? String(item.date).split('T')[0] : ''}
                </span>

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

      {(mediaItems || []).filter((item) => mediaTab === 'all' || item.type === mediaTab).length === 0 && (
        <div
          style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '48px 20px',
            color: 'var(--adm-text-muted)',
            background: 'var(--adm-surface-alt, #f8fafc)',
            borderRadius: '12px',
            border: '1px dashed var(--adm-border)'
          }}
        >
          <p style={{ margin: 0, fontWeight: 500 }}>
            No {mediaTab === 'all' ? 'media assets' : mediaTab === 'client' ? 'clients' : mediaTab} found.
          </p>
          <button
            type="button"
            className="adm-btn-action"
            style={{ marginTop: '14px' }}
            onClick={() => {
              setNewMedia((prev) => ({
                ...prev,
                type: mediaTab === 'all' ? 'press' : mediaTab
              }))
              setShowAddMediaModal(true)
            }}
          >
            + Add {mediaTab === 'client' ? 'Client' : 'Media Asset'}
          </button>
        </div>
      )}

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
                    {testimonials
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
                    required
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
                    required
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
                    required
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
                    required
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

      {/* ADD MEDIA MODAL */}

{showAddMediaModal && (
  <div
    className="adm-modal-backdrop"
    onClick={() => setShowAddMediaModal(false)}
  >
    <div
      className="adm-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="adm-modal-header">
        <h3>Add Media / Gallery Asset</h3>

        <button
          type="button"
          className="adm-modal-close"
          onClick={() => setShowAddMediaModal(false)}
        >
          <FiX />
        </button>
      </div>

      <form onSubmit={handleCreateMedia}>
        <div className="adm-modal-body">

          {/* 1. Media Type Selector at Top */}
          <div className="adm-form-group">
            <label>Media Asset Type *</label>
            <select
              required
              className="adm-filter-select"
              style={{ width: '100%', fontWeight: 600 }}
              value={newMedia.type}
              onChange={(e) =>
                setNewMedia({
                  type: e.target.value,
                  name: '',
                  category:
                    e.target.value === 'client'
                      ? 'Homeowner'
                      : e.target.value === 'video'
                      ? 'Corporate'
                      : 'Residential',
                  location: '',
                  description: '',
                  duration: '',
                  source: '',
                  articleUrl: '',
                  publicationDate: new Date().toISOString().split('T')[0],
                  clientRole: 'Homeowner',
                  clientLocation: '',
                  photo: null,
                  video: null,
                  file: null
                })
              }
            >
              <option value="photo">Photo Archive / Project Gallery</option>
              <option value="video">Video Spotlight</option>
              <option value="client">Client Story</option>
              <option value="press">Press & News Coverage</option>
            </select>
          </div>

          {/* ═════════════════════════════════════════════════════════════
              TYPE 1: PHOTO ARCHIVE / PROJECT GALLERY
              Frontend fields: title, category, location, description, image
          ═════════════════════════════════════════════════════════════ */}
          {newMedia.type === 'photo' && (
            <>
              <div className="adm-form-group">
                <label>Project / Photo Title *</label>
                <input
                  type="text"
                  required
                  className="adm-search-input"
                  style={{ width: '100%' }}
                  value={newMedia.name}
                  onChange={(e) =>
                    setNewMedia({ ...newMedia, name: e.target.value })
                  }
                  placeholder="e.g. 5 kW Rooftop Solar System"
                />
              </div>

              <div className="adm-form-group">
                <label>Category *</label>
                <select
                  required
                  className="adm-filter-select"
                  style={{ width: '100%' }}
                  value={newMedia.category}
                  onChange={(e) =>
                    setNewMedia({ ...newMedia, category: e.target.value })
                  }
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Installations">Installations</option>
                  <option value="Company">Company & Events</option>
                </select>
              </div>

              <div className="adm-form-group">
                <label>Location *</label>
                <input
                  type="text"
                  required
                  className="adm-search-input"
                  style={{ width: '100%' }}
                  value={newMedia.location}
                  onChange={(e) =>
                    setNewMedia({ ...newMedia, location: e.target.value })
                  }
                  placeholder="e.g. Vizianagaram, Andhra Pradesh"
                />
              </div>

              <div className="adm-form-group">
                <label>Description</label>
                <textarea
                  className="adm-search-input"
                  style={{ width: '100%', minHeight: '70px' }}
                  value={newMedia.description}
                  onChange={(e) =>
                    setNewMedia({ ...newMedia, description: e.target.value })
                  }
                  placeholder="Short description of the installation or project"
                />
              </div>

              <div className="adm-form-group">
                <label>Photo Image *</label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) =>
                    setNewMedia({
                      ...newMedia,
                      photo: e.target.files?.[0] || null
                    })
                  }
                />
                {newMedia.photo && (
                  <small style={{ color: 'var(--adm-text-muted)' }}>
                    Selected: {newMedia.photo.name}
                  </small>
                )}
              </div>
            </>
          )}

          {/* ═════════════════════════════════════════════════════════════
              TYPE 2: VIDEO SPOTLIGHT
              Frontend fields: title, category, duration, description, video, thumbnail
          ═════════════════════════════════════════════════════════════ */}
          {newMedia.type === 'video' && (
            <>
              <div className="adm-form-group">
                <label>Video Title *</label>
                <input
                  type="text"
                  required
                  className="adm-search-input"
                  style={{ width: '100%' }}
                  value={newMedia.name}
                  onChange={(e) =>
                    setNewMedia({ ...newMedia, name: e.target.value })
                  }
                  placeholder="e.g. EPC Installation Process"
                />
              </div>

              <div className="adm-form-group">
                <label>Category *</label>
                <select
                  required
                  className="adm-filter-select"
                  style={{ width: '100%' }}
                  value={newMedia.category}
                  onChange={(e) =>
                    setNewMedia({ ...newMedia, category: e.target.value })
                  }
                >
                  <option value="Corporate">Corporate</option>
                  <option value="Technical">Technical</option>
                  <option value="Project">Project</option>
                  <option value="Client Story">Client Story</option>
                </select>
              </div>

              <div className="adm-form-group">
                <label>Duration (Optional)</label>
                <input
                  type="text"
                  className="adm-search-input"
                  style={{ width: '100%' }}
                  value={newMedia.duration}
                  onChange={(e) =>
                    setNewMedia({ ...newMedia, duration: e.target.value })
                  }
                  placeholder="e.g. 1:48 or 3:24"
                />
              </div>

              <div className="adm-form-group">
                <label>Description</label>
                <textarea
                  className="adm-search-input"
                  style={{ width: '100%', minHeight: '70px' }}
                  value={newMedia.description}
                  onChange={(e) =>
                    setNewMedia({ ...newMedia, description: e.target.value })
                  }
                  placeholder="Short description of the video content"
                />
              </div>

              <div className="adm-form-group">
                <label>Video File *</label>
                <input
                  type="file"
                  required
                  accept="video/*"
                  onChange={(e) =>
                    setNewMedia({
                      ...newMedia,
                      video: e.target.files?.[0] || null
                    })
                  }
                />
                {newMedia.video && (
                  <small style={{ color: 'var(--adm-text-muted)' }}>
                    Selected: {newMedia.video.name}
                  </small>
                )}
              </div>

              <div className="adm-form-group">
                <label>Thumbnail Image *</label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) =>
                    setNewMedia({
                      ...newMedia,
                      file: e.target.files?.[0] || null
                    })
                  }
                />
                {newMedia.file && (
                  <small style={{ color: 'var(--adm-text-muted)' }}>
                    Selected: {newMedia.file.name}
                  </small>
                )}
              </div>
            </>
          )}

          {/* ═════════════════════════════════════════════════════════════
              TYPE 3: CLIENT STORY
              Frontend fields: name, role, location, quote, image
          ═════════════════════════════════════════════════════════════ */}
          {newMedia.type === 'client' && (
            <>
              <div className="adm-form-group">
                <label>Client Name *</label>
                <input
                  type="text"
                  required
                  className="adm-search-input"
                  style={{ width: '100%' }}
                  value={newMedia.name}
                  onChange={(e) =>
                    setNewMedia({ ...newMedia, name: e.target.value })
                  }
                  placeholder="e.g. K. Srinivasa Rao"
                />
              </div>

              <div className="adm-form-group">
                <label>Client Role / Segment *</label>
                <select
                  required
                  className="adm-filter-select"
                  style={{ width: '100%' }}
                  value={newMedia.clientRole || 'Homeowner'}
                  onChange={(e) =>
                    setNewMedia({
                      ...newMedia,
                      clientRole: e.target.value,
                      category: e.target.value
                    })
                  }
                >
                  <option value="Homeowner">Homeowner (Residential)</option>
                  <option value="Business Owner">Business Owner (Commercial)</option>
                  <option value="Factory Manager">Factory Manager (Industrial)</option>
                  <option value="Farmer">Farmer (Agriculture Solar)</option>
                  <option value="Commercial Client">Commercial Client</option>
                  <option value="Industrial Partner">Industrial Partner</option>
                </select>
              </div>

              <div className="adm-form-group">
                <label>Location *</label>
                <input
                  type="text"
                  required
                  className="adm-search-input"
                  style={{ width: '100%' }}
                  value={newMedia.clientLocation || ''}
                  onChange={(e) =>
                    setNewMedia({
                      ...newMedia,
                      clientLocation: e.target.value
                    })
                  }
                  placeholder="e.g. Vizianagaram, AP"
                />
              </div>

              <div className="adm-form-group">
                <label>Review Quote / Client Story *</label>
                <textarea
                  required
                  className="adm-search-input"
                  style={{ width: '100%', minHeight: '80px' }}
                  value={newMedia.description}
                  onChange={(e) =>
                    setNewMedia({
                      ...newMedia,
                      description: e.target.value
                    })
                  }
                  placeholder="e.g. 'Our electricity bill reduced significantly. Great service and professional team!'"
                />
              </div>

              <div className="adm-form-group">
                <label>Client Photo / Logo (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewMedia({
                      ...newMedia,
                      photo: e.target.files?.[0] || null
                    })
                  }
                />
                {newMedia.photo && (
                  <small style={{ color: 'var(--adm-text-muted)' }}>
                    Selected: {newMedia.photo.name}
                  </small>
                )}
              </div>
            </>
          )}

          {/* ═════════════════════════════════════════════════════════════
              TYPE 4: PRESS & NEWS
              Frontend fields: title, publication/source, url, date, image
          ═════════════════════════════════════════════════════════════ */}
          {newMedia.type === 'press' && (
            <>
              <div className="adm-form-group">
                <label>Article Headline / Title *</label>
                <input
                  type="text"
                  required
                  className="adm-search-input"
                  style={{ width: '100%' }}
                  value={newMedia.name}
                  onChange={(e) =>
                    setNewMedia({ ...newMedia, name: e.target.value })
                  }
                  placeholder="e.g. Solar Irrigation Changing Farmers Lives in Andhra Pradesh"
                />
              </div>

              <div className="adm-form-group">
                <label>Publication / News Source *</label>
                <input
                  type="text"
                  required
                  className="adm-search-input"
                  style={{ width: '100%' }}
                  value={newMedia.source}
                  onChange={(e) =>
                    setNewMedia({ ...newMedia, source: e.target.value })
                  }
                  placeholder="e.g. The Hindu, BusinessLine, Times of India"
                />
              </div>

              <div className="adm-form-group">
                <label>Article Link URL *</label>
                <input
                  type="url"
                  required
                  className="adm-search-input"
                  style={{ width: '100%' }}
                  value={newMedia.articleUrl}
                  onChange={(e) =>
                    setNewMedia({ ...newMedia, articleUrl: e.target.value })
                  }
                  placeholder="https://example.com/news-article"
                />
              </div>

              <div className="adm-form-group">
                <label>Publication Date *</label>
                <input
                  type="date"
                  required
                  className="adm-search-input"
                  style={{ width: '100%' }}
                  value={newMedia.publicationDate}
                  onChange={(e) =>
                    setNewMedia({
                      ...newMedia,
                      publicationDate: e.target.value
                    })
                  }
                />
              </div>
            </>
          )}

        </div>

        <div className="adm-modal-footer">

          <button
            type="button"
            className="adm-btn-secondary"
            onClick={() => setShowAddMediaModal(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="adm-btn-action"
          >
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

 {showJobModal && (
      <div className="adm-modal-overlay">
        <div
          className="adm-modal"
          style={{
            width: 'min(900px, 95vw)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <div className="adm-modal-header">
            <h3>Post New Job</h3>

            <button
              type="button"
              className="adm-modal-close"
              onClick={() => setShowJobModal(false)}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleCreateJob}>
            <div className="adm-form-grid">

              {/* JOB TITLE */}
              <div className="adm-form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={jobForm.jobTitle}
                  onChange={handleJobFormChange}
                  placeholder="e.g. Solar Design Engineer"
                  required
                />
              </div>

              {/* DEPARTMENT */}
              <div className="adm-form-group">
                <label>Department *</label>
                <input
                  type="text"
                  name="department"
                  value={jobForm.department}
                  onChange={handleJobFormChange}
                  placeholder="e.g. Engineering"
                  required
                />
              </div>

              {/* LOCATION */}
              <div className="adm-form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={jobForm.location}
                  onChange={handleJobFormChange}
                  placeholder="e.g. Visakhapatnam"
                  required
                />
              </div>

              {/* EMPLOYMENT TYPE */}
              <div className="adm-form-group">
                <label>Employment Type *</label>
                <select
                  name="employmentType"
                  value={jobForm.employmentType}
                  onChange={handleJobFormChange}
                  required
                >
                  <option value="">
                    Select employment type
                  </option>
                  <option value="Full Time">
                    Full Time
                  </option>
                  <option value="Part Time">
                    Part Time
                  </option>
                  <option value="Internship">
                    Internship
                  </option>
                  <option value="Contract">
                    Contract
                  </option>
                </select>
              </div>

              {/* EXPERIENCE */}
              <div className="adm-form-group">
                <label>Experience Required *</label>
                <input
                  type="text"
                  name="experienceRequired"
                  value={jobForm.experienceRequired}
                  onChange={handleJobFormChange}
                  placeholder="e.g. 2-4 years"
                  required
                />
              </div>

              {/* NUMBER OF OPENINGS */}
              <div className="adm-form-group">
                <label>Number of Openings *</label>
                <input
                  type="number"
                  name="numberOfOpenings"
                  min="1"
                  value={jobForm.numberOfOpenings}
                  onChange={handleJobFormChange}
                  required
                />
              </div>

              {/* QUALIFICATION */}
              <div
                className="adm-form-group"
                style={{ gridColumn: '1 / -1' }}
              >
                <label>Qualification *</label>
                <input
                  type="text"
                  name="qualification"
                  value={jobForm.qualification}
                  onChange={handleJobFormChange}
                  placeholder="e.g. B.Tech / B.E. in Electrical Engineering"
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div
                className="adm-form-group"
                style={{ gridColumn: '1 / -1' }}
              >
                <label>Job Description *</label>
                <textarea
                  name="jobDescription"
                  value={jobForm.jobDescription}
                  onChange={handleJobFormChange}
                  rows="5"
                  placeholder="Enter the job description..."
                  required
                />
              </div>

              {/* RESPONSIBILITIES */}
              <div
                className="adm-form-group"
                style={{ gridColumn: '1 / -1' }}
              >
                <label>Job Responsibilities *</label>

                {jobForm.jobResponsibilities.map(
                  (responsibility, index) => (
                    <div className="adm-responsibility-row">
          <input
            type="text"
            value={responsibility}
            onChange={(e) =>
              handleResponsibilityChange(
                index,
                e.target.value
              )
            }
            placeholder={`Responsibility ${index + 1}`}
            required
          />

          {jobForm.jobResponsibilities.length > 1 && (
            <button
              type="button"
              className="adm-responsibility-remove"
              onClick={() => removeResponsibility(index)}
            >
              ×
            </button>
          )}
        </div>
                          )
                        )}

                        <button
  type="button"
  className="adm-add-responsibility"
  onClick={addResponsibility}
>
  + Add Responsibility
</button>
              </div>

              {/* DEADLINE */}
              <div className="adm-form-group">
                <label>Application Deadline *</label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={jobForm.applicationDeadline}
                  onChange={handleJobFormChange}
                  required
                />
              </div>

              {/* STATUS */}
              <div className="adm-form-group">
                <label>Job Status *</label>
                <select
                  name="jobStatus"
                  value={jobForm.jobStatus}
                  onChange={handleJobFormChange}
                  required
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="adm-modal-actions">
              <button
                type="button"
                onClick={() => setShowJobModal(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="adm-primary-btn"
                disabled={jobSubmitting}
              >
                {jobSubmitting
                  ? 'Posting...'
                  : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

      {/* CANDIDATE PROFILE MODAL */}
      {selectedApplication && (
        <div className="adm-modal-overlay" onClick={() => setSelectedApplication(null)}>
          <div className="adm-modal adm-candidate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div>
                <h3 className="adm-modal-title">{selectedApplication.fullName}</h3>
                <span className="adm-type-badge" style={{ marginTop: '4px' }}>
                  {selectedApplication.positionAppliedFor || selectedApplication.jobTitle || 'Applicant'}
                </span>
              </div>
              <button
                type="button"
                className="adm-modal-close"
                onClick={() => setSelectedApplication(null)}
                title="Close modal"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="adm-modal-body">
              {/* Candidate Info Grid */}
              <div className="adm-candidate-grid">
                <div className="adm-candidate-field">
                  <label>Email Address</label>
                  <div>
                    <a href={`mailto:${selectedApplication.email}`} className="adm-candidate-link">
                      <FiMail size={13} style={{ marginRight: 5 }} />
                      {selectedApplication.email}
                    </a>
                  </div>
                </div>

                <div className="adm-candidate-field">
                  <label>Phone Number</label>
                  <div>
                    <a href={`tel:${selectedApplication.phoneNumber}`} className="adm-candidate-link">
                      <FiPhone size={13} style={{ marginRight: 5 }} />
                      {selectedApplication.phoneNumber}
                    </a>
                  </div>
                </div>

                <div className="adm-candidate-field">
                  <label>Experience</label>
                  <div>
                    {selectedApplication.yearsOfExperience !== null && selectedApplication.yearsOfExperience !== undefined
                      ? `${selectedApplication.yearsOfExperience} ${selectedApplication.yearsOfExperience === 1 ? 'year' : 'years'}`
                      : 'Not specified'}
                  </div>
                </div>

                <div className="adm-candidate-field">
                  <label>Applied Date</label>
                  <div>
                    {selectedApplication.appliedDate
                      ? new Date(selectedApplication.appliedDate).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : '—'}
                  </div>
                </div>
              </div>

              {/* Cover Note / Candidate Message */}
              {selectedApplication.message && (
                <div className="adm-candidate-message-box">
                  <label><FiFileText size={13} style={{ marginRight: 4 }} /> Cover Note / Candidate Message</label>
                  <p>{selectedApplication.message}</p>
                </div>
              )}

              {/* Resume Download & Preview Box */}
              <div className="adm-candidate-resume-box">
                <div className="adm-resume-box-header">
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>Curriculum Vitae / Resume</strong>
                    <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--adm-text-dim)' }}>
                      {selectedApplication.resumeUrl
                        ? 'Candidate has provided an official resume document'
                        : 'No resume attached to this application'}
                    </p>
                  </div>

                  {selectedApplication.resumeUrl && (
                    <div className="adm-resume-box-actions">
                      <button
                        type="button"
                        className="adm-resume-download-btn"
                        onClick={(e) => handleDownloadResume(selectedApplication, e)}
                        title="Download resume file directly to computer"
                      >
                        <FiDownload size={14} /> Download Resume
                      </button>
                      <button
                        type="button"
                        className="adm-resume-view-btn"
                        onClick={(e) => handleViewResume(selectedApplication, e)}
                        title="Preview resume in new tab"
                      >
                        <FiEye size={14} /> Preview
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Hiring Status Selector */}
              <div className="adm-candidate-status-box">
                <label>Update Candidate Status:</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <select
                    className="adm-status-select"
                    value={selectedApplication.applicationStatus || 'Applied'}
                    onChange={(e) => {
                      const newStatus = e.target.value
                      handleApplicationStatusChange(selectedApplication.id, newStatus)
                      setSelectedApplication(prev => ({ ...prev, applicationStatus: newStatus }))
                    }}
                    style={{ minWidth: '160px' }}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview">Interview</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <span className={`adm-status-tag ${selectedApplication.applicationStatus || 'Applied'}`}>
                    {selectedApplication.applicationStatus || 'Applied'}
                  </span>
                </div>
              </div>
            </div>

            <div className="adm-modal-actions">
              <button
                type="button"
                className="adm-btn-secondary"
                onClick={() => setSelectedApplication(null)}
              >
                Close
              </button>
            </div>
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

