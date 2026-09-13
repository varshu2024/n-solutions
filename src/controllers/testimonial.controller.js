import {
  createTestimonial,
  deleteTestimonial,
  listAdminTestimonials,
  listPublicTestimonials,
  updateTestimonial
} from '../services/testimonial.service.js';
import { sendSuccess } from '../utils/response.js';

const testimonialFields = ['description', 'clientName', 'company', 'location'];

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

  const fields = Object.keys(input);
  const unknownFields = fields.filter((field) => !testimonialFields.includes(field));
  if (unknownFields.length > 0) details.fields = `Unsupported fields: ${unknownFields.join(', ')}.`;
  if (partial && fields.length === 0) details.body = 'At least one testimonial field is required.';

  testimonialFields.forEach((field) => {
    if (!partial && (input[field] === undefined || input[field] === '')) {
      details[field] = `${field} is required.`;
    }
    if (input[field] !== undefined && (typeof input[field] !== 'string' || input[field].trim().length === 0)) {
      details[field] = `${field} must be a non-empty string.`;
    }
  });

  return details;
};

const normalizeInput = (input) => Object.fromEntries(
  Object.entries(input).map(([field, value]) => [field, value.trim()])
);

export const create = async (request, response) => {
  const details = validateInput(request.body);
  if (Object.keys(details).length > 0) throw validationError(details);

  return sendSuccess(
    response,
    201,
    'Testimonial created successfully.',
    await createTestimonial(normalizeInput(request.body))
  );
};

export const update = async (request, response) => {
  const details = validateInput(request.body, true);
  if (Object.keys(details).length > 0) throw validationError(details);

  return sendSuccess(
    response,
    200,
    'Testimonial updated successfully.',
    await updateTestimonial(request.params.id, normalizeInput(request.body))
  );
};

export const remove = async (request, response) => {
  await deleteTestimonial(request.params.id);
  return response.status(200).json({ success: true, message: 'Testimonial deleted successfully.' });
};

export const list = async (request, response) => sendSuccess(
  response,
  200,
  'Testimonials fetched successfully.',
  await listPublicTestimonials()
);

export const listAdmin = async (request, response) => sendSuccess(
  response,
  200,
  'Admin testimonials fetched successfully.',
  await listAdminTestimonials()
);
