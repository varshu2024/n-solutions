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
    countDocuments(Position, { status: 'open' })
  ]);

  return { totalLeads, activeProjects, productsListed, openPositions };
};

export const getRecentEnquiries = async (limit) => {
  const { Enquiry } = getDashboardModels();
  return findRecent(Enquiry, { _id: 0, fullName: 1, projectType: 1, status: 1, createdAt: 1 }, limit);
};

export const getRecentLeads = async (limit) => {
  const { Lead } = getDashboardModels();
  return findRecent(Lead, { _id: 0, name: 1, type: 1, location: 1, status: 1, createdAt: 1 }, limit);
};
