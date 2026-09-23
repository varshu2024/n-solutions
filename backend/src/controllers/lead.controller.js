import { createLead, getLead, listLeads, updateLead, deleteLead } from '../services/lead.service.js';
import { sendSuccess } from '../utils/response.js';

const allowedFields = new Set(['name', 'company', 'type', 'location', 'status']);

const validateUpdateInput = (input) => {
  const details = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    details.body = 'Request body must be a JSON object.';
    return details;
  }

  const fields = Object.keys(input);
  if (fields.length === 0) details.body = 'At least one lead field is required.';
  const unknownFields = fields.filter((field) => !allowedFields.has(field));
  if (unknownFields.length > 0) details.fields = `Unsupported fields: ${unknownFields.join(', ')}.`;

  if (Object.hasOwn(input, 'name') && (typeof input.name !== 'string' || input.name.trim().length === 0)) {
    details.name = 'Name is required.';
  }
  if (Object.hasOwn(input, 'company') && typeof input.company !== 'string') {
    details.company = 'Company must be a string.';
  }
  if (Object.hasOwn(input, 'type') && !['residential', 'commercial', 'industrial', 'other'].includes(input.type)) {
    details.type = 'Type must be residential, commercial, industrial, or other.';
  }
  if (Object.hasOwn(input, 'location') && (typeof input.location !== 'string' || input.location.trim().length === 0)) {
    details.location = 'Location is required.';
  }
  if (Object.hasOwn(input, 'status') && !['new', 'in_progress', 'qualified'].includes(input.status)) {
    details.status = 'Status must be new, in_progress, or qualified.';
  }

  return details;
};

const validationError = (details) => {
  const error = new Error('Request validation failed.');
  error.statusCode = 400;
  error.details = details;
  return error;
};

const validateCreateInput = (input) => {
  const details = validateUpdateInput(input);
  if (Object.hasOwn(input || {}, 'name') === false) details.name = 'Name is required.';
  if (Object.hasOwn(input || {}, 'type') === false) details.type = 'Lead type is required.';
  if (Object.hasOwn(input || {}, 'location') === false) details.location = 'Location is required.';
  return details;
};

const validateStatusUpdate = (input) => {
  const details = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    details.body = 'Request body must be a JSON object.';
    return details;
  }

  const fields = Object.keys(input);
  if (fields.length !== 1 || fields[0] !== 'status') {
    details.fields = 'Only the status field can be updated.';
  }
  if (!['new', 'in_progress', 'qualified'].includes(input.status)) {
    details.status = 'Status must be new, in_progress, or qualified.';
  }
  return details;
};

export const create = async (request, response) => {
  const details = validateCreateInput(request.body);
  if (Object.keys(details).length > 0) throw validationError(details);
  return sendSuccess(
    response,
    201,
    'Lead created successfully.',
    await createLead(request.body)
  );
};

export const list = async (request, response) => sendSuccess(
  response,
  200,
  'Leads fetched successfully.',
  await listLeads()
);

export const get = async (request, response) => sendSuccess(
  response,
  200,
  'Lead fetched successfully.',
  await getLead(request.params.id)
);

export const update = async (request, response) => {
  const details = validateStatusUpdate(request.body);
  if (Object.keys(details).length > 0) throw validationError(details);
  return sendSuccess(
    response,
    200,
    'Lead updated successfully.',
    await updateLead(request.params.id, request.body)
  );
};

export const remove = async (request, response) => {
  await deleteLead(request.params.id);
  return response.status(200).json({ success: true, message: 'Lead deleted successfully.' });
};