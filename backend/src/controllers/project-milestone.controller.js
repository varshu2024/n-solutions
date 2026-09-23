import { createMilestone, deleteMilestone, getMilestone, listMilestones, updateMilestone } from '../services/project-milestone.service.js';
import { sendSuccess } from '../utils/response.js';

const validationError = (details) => { const error = new Error('Request validation failed.'); error.statusCode = 400; error.details = details; return error; };
const validate = (input, partial = false) => {
  const details = {};
  ['period', 'title', 'type', 'description'].forEach((field) => {
    if ((!partial && (!input[field] || typeof input[field] !== 'string' || !input[field].trim())) || (partial && input[field] !== undefined && (typeof input[field] !== 'string' || !input[field].trim()))) details[field] = `${field} is required.`;
  });
  if (partial && Object.keys(input).length === 0) details.milestone = 'At least one field is required.';
  return details;
};

export const create = async (request, response) => { const input = { ...request.body }; const details = validate(input); if (Object.keys(details).length) throw validationError(details); return sendSuccess(response, 201, 'Project milestone created successfully.', await createMilestone(input)); };
export const list = async (request, response) => sendSuccess(response, 200, 'Project milestones fetched successfully.', await listMilestones());
export const get = async (request, response) => sendSuccess(response, 200, 'Project milestone fetched successfully.', await getMilestone(request.params.id));
export const update = async (request, response) => { const input = { ...request.body }; const details = validate(input, true); if (Object.keys(details).length) throw validationError(details); return sendSuccess(response, 200, 'Project milestone updated successfully.', await updateMilestone(request.params.id, input)); };
export const remove = async (request, response) => { await deleteMilestone(request.params.id); return sendSuccess(response, 200, 'Project milestone deleted successfully.'); };
