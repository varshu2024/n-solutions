import { JOB_STATUS_VALUES } from '../models/Job.js';
import { createJob, deleteJob, listAdminJobs, listPublicJobs, updateJob } from '../services/job.service.js';
import { sendSuccess } from '../utils/response.js';

const jobFields = [
  'jobTitle',
  'department',
  'location',
  'employmentType',
  'experienceRequired',
  'qualification',
  'jobDescription',
  'jobResponsibilities',
  'numberOfOpenings',
  'applicationDeadline',
  'jobStatus'
];

const textFields = jobFields.filter((field) => !['jobResponsibilities', 'numberOfOpenings', 'applicationDeadline', 'jobStatus'].includes(field));

const validationError = (details) => {
  const error = new Error('Request validation failed.');
  error.statusCode = 400;
  error.details = details;
  return error;
};

const validateInput = (input, partial = false) => {
  const details = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    details.body = 'Request body must be a JSON object.';
    return details;
  }

  const unknownFields = Object.keys(input).filter((field) => !jobFields.includes(field));
  if (unknownFields.length > 0) details.fields = `Unsupported fields: ${unknownFields.join(', ')}.`;

  if (!partial) {
    jobFields.forEach((field) => {
      if (input[field] === undefined || input[field] === '') details[field] = `${field} is required.`;
    });
  }

  textFields.forEach((field) => {
    if (input[field] !== undefined && (typeof input[field] !== 'string' || input[field].trim().length === 0)) {
      details[field] = `${field} must be a non-empty string.`;
    }
  });

  if (input.jobResponsibilities !== undefined && (!Array.isArray(input.jobResponsibilities)
    || input.jobResponsibilities.length === 0
    || input.jobResponsibilities.some((responsibility) => typeof responsibility !== 'string' || responsibility.trim().length === 0))) {
    details.jobResponsibilities = 'Job responsibilities must be a non-empty array of strings.';
  }

  if (input.numberOfOpenings !== undefined && (!Number.isInteger(input.numberOfOpenings) || input.numberOfOpenings < 1)) {
    details.numberOfOpenings = 'Number of openings must be a positive whole number.';
  }

  if (input.applicationDeadline !== undefined && (typeof input.applicationDeadline !== 'string'
    || Number.isNaN(Date.parse(input.applicationDeadline)))) {
    details.applicationDeadline = 'Application deadline must be a valid date.';
  }

  if (input.jobStatus !== undefined && !JOB_STATUS_VALUES.includes(input.jobStatus)) {
    details.jobStatus = 'Job status must be Open or Closed.';
  }

  if (partial && Object.keys(input).length === 0) details.body = 'At least one job field is required.';
  return details;
};

const normalizeInput = (input) => {
  const normalized = { ...input };
  textFields.forEach((field) => {
    if (normalized[field] !== undefined) normalized[field] = normalized[field].trim();
  });
  if (normalized.jobResponsibilities) normalized.jobResponsibilities = normalized.jobResponsibilities.map((responsibility) => responsibility.trim());
  if (normalized.applicationDeadline !== undefined) normalized.applicationDeadline = new Date(normalized.applicationDeadline);
  return normalized;
};

export const create = async (request, response) => {
  const details = validateInput(request.body);
  if (Object.keys(details).length > 0) throw validationError(details);
  return sendSuccess(response, 201, 'Job created successfully.', await createJob(normalizeInput(request.body)));
};

export const update = async (request, response) => {
  const details = validateInput(request.body, true);
  if (Object.keys(details).length > 0) throw validationError(details);
  return sendSuccess(response, 200, 'Job updated successfully.', await updateJob(request.params.id, normalizeInput(request.body)));
};

export const remove = async (request, response) => {
  await deleteJob(request.params.id);
  return response.status(200).json({ success: true, message: 'Job deleted successfully.' });
};

export const list = async (request, response) => sendSuccess(
  response,
  200,
  'Jobs fetched successfully.',
  await listPublicJobs()
);

export const listAll = async (request, response) => sendSuccess(
  response,
  200,
  'All jobs fetched successfully.',
  await listAdminJobs()
);
