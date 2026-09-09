import { createEnquiry, deleteEnquiry, getEnquiry, listEnquiries, resolveEnquiry } from '../services/enquiry.service.js';
import { sendSuccess } from '../utils/response.js';
import { ENQUIRY_PROJECT_TYPES, ENQUIRY_STATUS_VALUES } from '../models/Enquiry.js';

const allowedFields = new Set([
  'fullName',
  'companyName',
  'phoneNumber',
  'emailAddress',
  'projectLocation',
  'projectType',
  'monthlyElectricityBill',
  'message',
  'status'
]);

const validationError = (details) => {
  const error = new Error('Request validation failed.');
  error.statusCode = 400;
  error.details = details;
  return error;
};

const validateCreateInput = (input) => {
  const details = {};

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    details.body = 'Request body must be a JSON object.';
    return details;
  }

  const fields = Object.keys(input);
  const unknownFields = fields.filter((field) => !allowedFields.has(field));
  if (unknownFields.length > 0) {
    details.fields = `Unsupported fields: ${unknownFields.join(', ')}.`;
  }

  if (Object.hasOwn(input, 'status')) {
    details.status = 'Status cannot be set by the client.';
  }
  if (typeof input.fullName !== 'string' || input.fullName.trim().length === 0) {
    details.fullName = 'Full name is required.';
  }
  if (Object.hasOwn(input, 'companyName') && typeof input.companyName !== 'string') {
    details.companyName = 'Company name must be a string.';
  }
  if (typeof input.phoneNumber !== 'string' || input.phoneNumber.trim().length === 0) {
    details.phoneNumber = 'Phone number is required.';
  }
  if (typeof input.emailAddress !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.emailAddress.trim())) {
    details.emailAddress = 'A valid email is required.';
  }
  if (Object.hasOwn(input, 'projectLocation') && typeof input.projectLocation !== 'string') {
    details.projectLocation = 'Project location must be a string.';
  }
  if (typeof input.projectType !== 'string' || !ENQUIRY_PROJECT_TYPES.includes(input.projectType)) {
    details.projectType = 'Project type is invalid.';
  }
  if (Object.hasOwn(input, 'monthlyElectricityBill') && (
    typeof input.monthlyElectricityBill !== 'number' || Number.isNaN(input.monthlyElectricityBill) || input.monthlyElectricityBill < 0
  )) {
    details.monthlyElectricityBill = 'Monthly electricity bill must be a non-negative number.';
  }
  if (Object.hasOwn(input, 'message') && typeof input.message !== 'string') {
    details.message = 'Message must be a string.';
  }

  return details;
};

const validateResolveInput = (input) => {
  const details = {};

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    details.body = 'Request body must be a JSON object.';
    return details;
  }

  if (Object.keys(input).length !== 1 || input.status !== 'Resolved') {
    details.status = 'Status must be Resolved and no other fields are allowed.';
  }

  return details;
};

export const create = async (request, response) => {
  const details = validateCreateInput(request.body);
  if (Object.keys(details).length > 0) throw validationError(details);

  const payload = {
    fullName: request.body.fullName.trim(),
    companyName: request.body.companyName ? request.body.companyName.trim() : '',
    phoneNumber: request.body.phoneNumber.trim(),
    emailAddress: request.body.emailAddress.trim(),
    projectLocation: request.body.projectLocation ? request.body.projectLocation.trim() : '',
    projectType: request.body.projectType,
    monthlyElectricityBill: Object.hasOwn(request.body, 'monthlyElectricityBill') ? Number(request.body.monthlyElectricityBill) : undefined,
    message: request.body.message ? request.body.message.trim() : ''
  };

  return sendSuccess(response, 201, 'Enquiry created successfully.', await createEnquiry(payload));
};

export const list = async (request, response) => sendSuccess(
  response,
  200,
  'Enquiries fetched successfully.',
  await listEnquiries()
);

export const get = async (request, response) => sendSuccess(
  response,
  200,
  'Enquiry fetched successfully.',
  await getEnquiry(request.params.id)
);

export const updateStatus = async (request, response) => {
  const details = validateResolveInput(request.body);
  if (Object.keys(details).length > 0) throw validationError(details);

  return sendSuccess(
    response,
    200,
    'Enquiry status updated successfully.',
    await resolveEnquiry(request.params.id)
  );
};

export const remove = async (request, response) => {
  await deleteEnquiry(request.params.id);
  return response.status(200).json({ success: true, message: 'Enquiry deleted successfully.' });
};
