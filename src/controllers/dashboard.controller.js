import { env } from '../config/env.js';
import { getDashboardStats, getRecentEnquiries, getRecentLeads } from '../services/dashboard.service.js';
import { sendSuccess } from '../utils/response.js';
import { parseLimit } from '../utils/validation.js';

const limitFor = (request) => parseLimit(
  request.query.limit,
  env.dashboardDefaultLimit,
  env.dashboardMaxLimit
);

export const stats = async (request, response) => {
  const data = await getDashboardStats();
  return sendSuccess(response, 200, 'Dashboard statistics fetched successfully.', data);
};

export const recentEnquiries = async (request, response) => {
  const data = await getRecentEnquiries(limitFor(request));
  return sendSuccess(response, 200, 'Recent enquiries fetched successfully.', data);
};

export const recentLeads = async (request, response) => {
  const data = await getRecentLeads(limitFor(request));
  return sendSuccess(response, 200, 'Recent leads fetched successfully.', data);
};
