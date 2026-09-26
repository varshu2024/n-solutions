import {
  createTestimonial,
  deleteTestimonial,
  listAdminTestimonials,
  listPublicTestimonials,
  updateTestimonial
} from '../services/testimonial.service.js';
import { sendSuccess } from '../utils/response.js';

const testimonialFields = [
  'clientName',
  'company',
  'location',
  'rating',
  'comment',
  'status'
]
const validationError = (details) => {
  const error = new Error('Request validation failed.');
  error.statusCode = 400;
  error.details = details;
  return error;
};

const validateInput = (input, partial = false) => {
  const details = {}

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    details.body = 'Request body must be a JSON object.'
    return details
  }

  const fields = Object.keys(input)

  const unknownFields = fields.filter(
    (field) => !testimonialFields.includes(field)
  )

  if (unknownFields.length > 0) {
    details.fields = `Unsupported fields: ${unknownFields.join(', ')}.`
  }

  if (partial && fields.length === 0) {
    details.body = 'At least one testimonial field is required.'
  }

  // Required fields for CREATE
  if (!partial) {
    ;['clientName', 'company', 'location', 'comment'].forEach((field) => {
      if (
        input[field] === undefined ||
        typeof input[field] !== 'string' ||
        input[field].trim().length === 0
      ) {
        details[field] = `${field} is required.`
      }
    })

    if (input.rating === undefined) {
      details.rating = 'rating is required.'
    }
  }

  // Validate strings when supplied
  ;['clientName', 'company', 'location', 'comment'].forEach((field) => {
    if (
      input[field] !== undefined &&
      (typeof input[field] !== 'string' ||
        input[field].trim().length === 0)
    ) {
      details[field] = `${field} must be a non-empty string.`
    }
  })

  // Validate rating when supplied
  if (input.rating !== undefined) {
    const rating = Number(input.rating)

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      details.rating = 'rating must be an integer between 1 and 5.'
    }
  }

  // Validate status when supplied
  if (input.status !== undefined) {
    if (!['approved', 'pending'].includes(input.status)) {
      details.status = 'status must be approved or pending.'
    }
  }

  return details
}

const normalizeInput = (input) =>
  Object.fromEntries(
    Object.entries(input).map(([field, value]) => {
      if (typeof value === 'string') {
        return [field, value.trim()]
      }

      if (field === 'rating') {
        return [field, Number(value)]
      }

      return [field, value]
    })
  )

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

  const { status } = request.body

  if (!status) {
    const error = new Error('Status is required.')
    error.statusCode = 400
    throw error
  }

  if (!['approved', 'pending'].includes(status)) {
    const error = new Error('Status must be approved or pending.')
    error.statusCode = 400
    throw error
  }

  return sendSuccess(
    response,
    200,
    'Testimonial status updated successfully.',
    await updateTestimonial(request.params.id, { status })
  )
}

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
