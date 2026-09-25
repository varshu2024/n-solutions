import { getDashboardModels } from '../config/dashboardModels.js';

const countDocuments = (model, filter = {}) => (model ? model.countDocuments(filter) : Promise.resolve(0));

const findRecent = async (model, projection, limit) => {
  if (!model) return [];
  return model.find({}, projection).sort({ createdAt: -1 }).limit(limit).lean();
};

export const getDashboardStats = async () => {
  const { Lead, Project, Product, Position } = getDashboardModels();
  const [totalLeads, activeProjects, productsListed, openPositions] = await Promise.all([
    countDocuments(Lead),
    countDocuments(Project, { status: 'in_progress' }),
    countDocuments(Product),
    countDocuments(Position, { jobStatus: 'Open' })
  ]);

  return { totalLeads, activeProjects, productsListed, openPositions };
};

export const getRecentEnquiries = async (limit) => {
  const { Enquiry } = getDashboardModels()

  const enquiries = await Enquiry.find(
    {},
    {
      _id: 1,
      fullName: 1,
      companyName: 1,
      phoneNumber: 1,
      emailAddress: 1,
      projectType: 1,
      message: 1,
      status: 1,
      createdAt: 1
    }
  )
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean()

  return enquiries.map((enquiry) => ({
    id: enquiry._id.toString(),
    name: enquiry.fullName,
    company: enquiry.companyName || '',
    phone: enquiry.phoneNumber,
    email: enquiry.emailAddress,
    service: enquiry.projectType,
    message: enquiry.message || '',
    status: enquiry.status
  }))
}



export const getRecentLeads = async (limit) => {
  const { Lead } = getDashboardModels()

  const leads = await Lead.find(
    {},
    {
      _id: 1,
      name: 1,
      company: 1,
      type: 1,
      capacity: 1,
      location: 1,
      status: 1,
      date: 1,
      createdAt: 1
    }
  )
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean()

  return leads.map((lead) => {
    let date = ''

    if (lead.createdAt) {
      const parsedDate = new Date(lead.createdAt)

      if (!Number.isNaN(parsedDate.getTime())) {
        date = parsedDate.toISOString().slice(0, 10)
      }
    }

    if (!date && lead.date) {
      date = lead.date
    }

    return {
      id: lead._id.toString(),
      name: lead.name,
      company: lead.company || '',
      type: lead.type,
      capacity: lead.capacity || '',
      location: lead.location,
      status: lead.status,
      date
    }
  })
}